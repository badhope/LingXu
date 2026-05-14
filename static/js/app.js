/* ==================== DATA-AI Frontend Application ==================== */
(function () {
    'use strict';

    // ==================== State ====================
    let ws = null;
    let appSettings = {};
    let conversations = {};
    let currentConvId = null;
    let isStreaming = false;
    let messageQueue = [];
    let reconnectTimer = null;
    let webSearchEnabled = false;

    // ==================== DOM References ====================
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // ==================== Utility Functions ====================
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ==================== Toast System ====================
    function showToast(message, type) {
        type = type || 'info';
        const container = $('#toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        const icons = { success: 'fa-check', error: 'fa-xmark', info: 'fa-info' };
        toast.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.info) + '"></i><span>' + escapeHtml(message) + '</span>';
        container.appendChild(toast);
        setTimeout(function () {
            toast.classList.add('toast-out');
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }

    // ==================== Markdown & Code Highlighting ====================
    function initMarked() {
        if (typeof marked === 'undefined') return;
        const renderer = new marked.Renderer();
        renderer.code = function (codeObj) {
            var code = codeObj.text || '';
            var lang = codeObj.lang || '';
            var highlighted = '';
            if (lang && typeof hljs !== 'undefined') {
                try {
                    highlighted = hljs.highlight(code, { language: lang }).value;
                } catch (e) {
                    highlighted = escapeHtml(code);
                }
            } else {
                highlighted = escapeHtml(code);
            }
            var id = 'code-' + generateId();
            return '<div class="code-block-wrapper">' +
                '<div class="code-block-header">' +
                '<span class="code-block-lang">' + escapeHtml(lang) + '</span>' +
                '<button class="code-block-copy" onclick="window.__copyCode(\'' + id + '\', this)">' +
                '<i class="fa-regular fa-copy"></i> 复制</button>' +
                '</div>' +
                '<pre><code id="' + id + '">' + highlighted + '</code></pre>' +
                '</div>';
        };
        renderer.image = function (href, title, text) {
            return '<img src="' + escapeHtml(href) + '" alt="' + escapeHtml(text || '') + '" title="' + escapeHtml(title || '') + '" onclick="window.__previewImage(this.src)" loading="lazy">';
        };
        marked.setOptions({
            renderer: renderer,
            breaks: true,
            gfm: true
        });
    }

    window.__copyCode = function (id, btn) {
        var codeEl = document.getElementById(id);
        if (!codeEl) return;
        navigator.clipboard.writeText(codeEl.textContent).then(function () {
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> 已复制';
            setTimeout(function () {
                btn.classList.remove('copied');
                btn.innerHTML = '<i class="fa-regular fa-copy"></i> 复制';
            }, 2000);
        });
    };

    window.__previewImage = function (src) {
        var overlay = $('#image-preview-overlay');
        var img = $('#image-preview-img');
        img.src = src;
        overlay.classList.add('show');
    };

    function renderMarkdown(text) {
        if (typeof marked === 'undefined') return escapeHtml(text).replace(/\n/g, '<br>');
        try {
            return marked.parse(text);
        } catch (e) {
            return escapeHtml(text).replace(/\n/g, '<br>');
        }
    }

    // ==================== Conversation Management ====================
    function loadConversations() {
        try {
            var data = localStorage.getItem('data-ai-conversations');
            if (data) conversations = JSON.parse(data);
        } catch (e) {
            conversations = {};
        }
    }

    function saveConversations() {
        try {
            localStorage.setItem('data-ai-conversations', JSON.stringify(conversations));
        } catch (e) {
            console.error('Save conversations error:', e);
        }
    }

    function createConversation() {
        var id = generateId();
        conversations[id] = {
            id: id,
            title: '新对话',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            starred: false
        };
        saveConversations();
        currentConvId = id;
        renderConversationList();
        renderChatArea();
        closeSidebar();
        return id;
    }

    function switchConversation(id) {
        if (!conversations[id]) return;
        currentConvId = id;
        renderConversationList();
        renderChatArea();
        closeSidebar();
    }

    function deleteConversation(id) {
        if (!conversations[id]) return;
        delete conversations[id];
        saveConversations();
        if (currentConvId === id) {
            var keys = Object.keys(conversations);
            currentConvId = keys.length > 0 ? keys[keys.length - 1] : null;
        }
        renderConversationList();
        renderChatArea();
    }

    function toggleStarConversation(id) {
        if (!conversations[id]) return;
        conversations[id].starred = !conversations[id].starred;
        saveConversations();
        renderConversationList();
    }

    function autoTitleConversation(convId, firstMessage) {
        if (!conversations[convId]) return;
        var title = firstMessage.substring(0, 20).replace(/\n/g, ' ');
        if (firstMessage.length > 20) title += '...';
        conversations[convId].title = title;
        saveConversations();
        renderConversationList();
    }

    function getConversationMessages(convId) {
        if (!conversations[convId]) return [];
        return conversations[convId].messages || [];
    }

    function addMessageToConversation(convId, msg) {
        if (!conversations[convId]) return;
        if (!conversations[convId].messages) conversations[convId].messages = [];
        conversations[convId].messages.push(msg);
        conversations[convId].updatedAt = Date.now();
        saveConversations();
    }

    // ==================== Render Conversation List ====================
    function renderConversationList(filter) {
        var container = $('#sidebar-conversations');
        if (!container) return;
        filter = filter || '';
        var convList = Object.values(conversations).sort(function (a, b) {
            if (a.starred && !b.starred) return -1;
            if (!a.starred && b.starred) return 1;
            return b.updatedAt - a.updatedAt;
        });

        if (filter) {
            convList = convList.filter(function (c) {
                return c.title.toLowerCase().includes(filter.toLowerCase());
            });
        }

        if (convList.length === 0) {
            container.innerHTML = '<div style="padding:20px 10px;text-align:center;color:var(--text-muted);font-size:13px;">' +
                (filter ? '没有找到匹配的对话' : '暂无对话') + '</div>';
            return;
        }

        var now = Date.now();
        var today = new Date(); today.setHours(0, 0, 0, 0);
        var yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        var weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

        var groups = { starred: [], today: [], yesterday: [], week: [], older: [] };
        convList.forEach(function (c) {
            var d = new Date(c.updatedAt);
            if (c.starred) { groups.starred.push(c); return; }
            if (d >= today) groups.today.push(c);
            else if (d >= yesterday) groups.yesterday.push(c);
            else if (d >= weekAgo) groups.week.push(c);
            else groups.older.push(c);
        });

        var html = '';
        var groupLabels = {
            starred: '收藏',
            today: '今天',
            yesterday: '昨天',
            week: '近7天',
            older: '更早'
        };

        Object.keys(groupLabels).forEach(function (key) {
            if (groups[key].length === 0) return;
            html += '<div class="conv-group-label">' + groupLabels[key] + '</div>';
            groups[key].forEach(function (c) {
                var isActive = c.id === currentConvId;
                html += '<div class="conv-item' + (isActive ? ' active' : '') + '" data-id="' + c.id + '">' +
                    '<span class="conv-item-title">' + escapeHtml(c.title) + '</span>' +
                    (c.starred
                        ? '<button class="conv-item-star starred" data-action="star" title="取消收藏"><i class="fa-solid fa-star"></i></button>'
                        : '<button class="conv-item-star" data-action="star" title="收藏"><i class="fa-regular fa-star"></i></button>') +
                    '<button class="conv-item-delete" data-action="delete" title="删除"><i class="fa-solid fa-trash"></i></button>' +
                    '</div>';
            });
        });

        container.innerHTML = html;

        // Bind events
        container.querySelectorAll('.conv-item').forEach(function (el) {
            el.addEventListener('click', function (e) {
                var action = e.target.closest('[data-action]');
                if (action) {
                    e.stopPropagation();
                    var act = action.getAttribute('data-action');
                    var id = el.getAttribute('data-id');
                    if (act === 'delete') deleteConversation(id);
                    else if (act === 'star') toggleStarConversation(id);
                    return;
                }
                switchConversation(el.getAttribute('data-id'));
            });
        });
    }

    // ==================== Render Chat Area ====================
    function renderChatArea() {
        var chatArea = $('#chat-area');
        var welcome = $('#welcome-screen');

        if (!currentConvId || !conversations[currentConvId]) {
            chatArea.innerHTML = '';
            chatArea.appendChild(welcome || createWelcomeScreen());
            if (welcome) welcome.classList.remove('hidden');
            return;
        }

        var msgs = getConversationMessages(currentConvId);
        if (welcome) welcome.classList.add('hidden');

        var html = '';
        msgs.forEach(function (msg) {
            html += buildMessageHTML(msg);
        });

        chatArea.innerHTML = html;
        scrollToBottom();
        highlightAllCode();
        bindMessageActions();
    }

    function createWelcomeScreen() {
        var div = document.createElement('div');
        div.className = 'welcome-screen';
        div.id = 'welcome-screen';
        div.innerHTML =
            '<div class="welcome-logo">' +
            '<div class="welcome-logo-icon"><i class="fa-solid fa-robot"></i></div>' +
            '<h1 class="welcome-title">DATA-AI</h1>' +
            '<p class="welcome-subtitle">万能智能助手</p>' +
            '</div>' +
            '<div class="welcome-suggestions">' +
            '<div class="suggestion-card" data-prompt="帮我写一段 Python 代码，实现快速排序">' +
            '<div class="suggestion-icon"><i class="fa-solid fa-code"></i></div>' +
            '<div class="suggestion-text">帮我写一段 Python 代码，实现快速排序</div></div>' +
            '<div class="suggestion-card" data-prompt="分析以下数据并生成可视化图表">' +
            '<div class="suggestion-icon"><i class="fa-solid fa-chart-line"></i></div>' +
            '<div class="suggestion-text">分析以下数据并生成可视化图表</div></div>' +
            '<div class="suggestion-card" data-prompt="帮我总结这篇文档的核心要点">' +
            '<div class="suggestion-icon"><i class="fa-solid fa-file-lines"></i></div>' +
            '<div class="suggestion-text">帮我总结这篇文档的核心要点</div></div>' +
            '<div class="suggestion-card" data-prompt="解释什么是 Transformer 架构">' +
            '<div class="suggestion-icon"><i class="fa-solid fa-graduation-cap"></i></div>' +
            '<div class="suggestion-text">解释什么是 Transformer 架构</div></div>' +
            '</div>';
        return div;
    }

    function buildMessageHTML(msg) {
        if (msg.type === 'system') {
            return '<div class="message system"><div class="message-inner">' +
                '<div class="message-content">' + escapeHtml(msg.content) + '</div>' +
                '</div></div>';
        }

        var avatarIcon = msg.type === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';
        var roleName = msg.type === 'user' ? '你' : 'DATA-AI';
        var contentHtml = '';

        if (msg.type === 'assistant' && msg.rendered) {
            contentHtml = msg.rendered;
        } else if (msg.type === 'user') {
            contentHtml = escapeHtml(msg.content).replace(/\n/g, '<br>');
        } else {
            contentHtml = renderMarkdown(msg.content);
        }

        var actions = '';
        if (msg.type !== 'system') {
            actions = '<div class="message-actions">' +
                '<button class="message-action-btn" data-action="copy" title="复制"><i class="fa-regular fa-copy"></i></button>';
            if (msg.type === 'assistant') {
                actions += '<button class="message-action-btn" data-action="regenerate" title="重新生成"><i class="fa-solid fa-rotate"></i></button>';
            }
            if (msg.type === 'user') {
                actions += '<button class="message-action-btn" data-action="edit" title="编辑"><i class="fa-solid fa-pen"></i></button>';
            }
            actions += '</div>';
        }

        return '<div class="message ' + msg.type + '" data-msg-id="' + (msg.id || '') + '">' +
            '<div class="message-inner">' +
            '<div class="message-avatar">' + avatarIcon + '</div>' +
            '<div class="message-body">' +
            '<div class="message-role">' + roleName + '</div>' +
            '<div class="message-content">' + contentHtml + '</div>' +
            actions +
            '</div></div></div>';
    }

    function bindMessageActions() {
        $$('.message').forEach(function (msgEl) {
            msgEl.querySelectorAll('.message-action-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var action = btn.getAttribute('data-action');
                    var msgId = msgEl.getAttribute('data-msg-id');
                    if (action === 'copy') copyMessageContent(msgEl);
                    else if (action === 'regenerate') regenerateMessage(msgId);
                    else if (action === 'edit') editMessage(msgId);
                });
            });
        });
    }

    function copyMessageContent(msgEl) {
        var contentEl = msgEl.querySelector('.message-content');
        if (!contentEl) return;
        var text = contentEl.innerText || contentEl.textContent;
        navigator.clipboard.writeText(text).then(function () {
            var btn = msgEl.querySelector('[data-action="copy"]');
            if (btn) {
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            }
            showToast('已复制到剪贴板', 'success');
        });
    }

    function regenerateMessage(msgId) {
        if (isStreaming) return;
        if (!currentConvId || !conversations[currentConvId]) return;
        var msgs = conversations[currentConvId].messages;
        var idx = msgs.findIndex(function (m) { return m.id === msgId; });
        if (idx === -1) return;

        // Remove this message and all after it
        var userMsg = null;
        for (var i = idx - 1; i >= 0; i--) {
            if (msgs[i].type === 'user') {
                userMsg = msgs[i];
                break;
            }
        }
        if (!userMsg) return;

        // Remove messages from idx onwards
        conversations[currentConvId].messages = msgs.slice(0, idx);
        saveConversations();
        renderChatArea();

        // Re-send
        sendToWebSocket(userMsg.content);
    }

    function editMessage(msgId) {
        if (isStreaming) return;
        if (!currentConvId || !conversations[currentConvId]) return;
        var msgs = conversations[currentConvId].messages;
        var idx = msgs.findIndex(function (m) { return m.id === msgId; });
        if (idx === -1) return;

        var msg = msgs[idx];
        var inputBox = $('#input-box');
        inputBox.value = msg.content;
        autoResizeTextarea();
        inputBox.focus();

        // Remove this message and all after it
        conversations[currentConvId].messages = msgs.slice(0, idx);
        saveConversations();
        renderChatArea();
    }

    function scrollToBottom() {
        var chatArea = $('#chat-area');
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    }

    function highlightAllCode() {
        if (typeof hljs === 'undefined') return;
        $$('.message-content pre code').forEach(function (block) {
            if (!block.dataset.highlighted) {
                hljs.highlightElement(block);
                block.dataset.highlighted = 'true';
            }
        });
    }

    // ==================== WebSocket ====================
    function connectWS() {
        if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
        var protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        try {
            ws = new WebSocket(protocol + '//' + window.location.host + '/ws');
        } catch (e) {
            console.error('WebSocket create error:', e);
            return;
        }

        ws.onopen = function () {
            console.log('WebSocket connected');
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
            // Process message queue
            while (messageQueue.length > 0) {
                var msg = messageQueue.shift();
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(msg));
                }
            }
        };

        ws.onmessage = function (event) {
            try {
                var data = JSON.parse(event.data);
                handleWSMessage(data);
            } catch (e) {
                console.error('Parse WS message error:', e);
            }
        };

        ws.onclose = function () {
            console.log('WebSocket disconnected, reconnecting...');
            reconnectTimer = setTimeout(connectWS, 3000);
        };

        ws.onerror = function (e) {
            console.error('WebSocket error:', e);
        };
    }

    function handleWSMessage(data) {
        var chatArea = $('#chat-area');

        if (data.type === 'thinking') {
            var thinkingEl = chatArea.querySelector('.thinking-container');
            if (!thinkingEl) {
                thinkingEl = document.createElement('div');
                thinkingEl.className = 'thinking-container';
                chatArea.appendChild(thinkingEl);
            }

            var phaseNum = thinkingEl.querySelectorAll('.thinking-item').length + 1;
            var phaseEl = document.createElement('div');
            phaseEl.className = 'thinking-item active';
            phaseEl.innerHTML =
                '<div class="thinking-header" onclick="window.__toggleThinking(this)">' +
                '<div class="thinking-badge">' + phaseNum + '</div>' +
                '<div class="thinking-title">' + escapeHtml(data.title || '思考中...') + '</div>' +
                '<div class="thinking-toggle"><i class="fa-solid fa-chevron-down"></i></div>' +
                '</div>' +
                '<div class="thinking-content">' + renderMarkdown(data.content || '') + '</div>';

            thinkingEl.appendChild(phaseEl);
            highlightAllCode();
            scrollToBottom();

        } else if (data.type === 'stream_start') {
            // Remove thinking container
            var tc = chatArea.querySelector('.thinking-container');
            if (tc) tc.remove();

            // Hide welcome screen
            var ws2 = $('#welcome-screen');
            if (ws2) ws2.classList.add('hidden');

            var msgEl = document.createElement('div');
            msgEl.className = 'message assistant streaming';
            msgEl.setAttribute('data-msg-id', generateId());
            msgEl.innerHTML =
                '<div class="message-inner">' +
                '<div class="message-avatar"><i class="fa-solid fa-robot"></i></div>' +
                '<div class="message-body">' +
                '<div class="message-role">DATA-AI</div>' +
                '<div class="message-content"><span class="stream-text"></span></div>' +
                '</div></div>';

            chatArea.appendChild(msgEl);
            scrollToBottom();

        } else if (data.type === 'stream_data') {
            var streamingEl = chatArea.querySelector('.message.streaming .stream-text');
            if (streamingEl) {
                var currentText = streamingEl.getAttribute('data-raw') || '';
                currentText += data.content;
                streamingEl.setAttribute('data-raw', currentText);
                streamingEl.innerHTML = renderMarkdown(currentText);
                highlightAllCode();
                scrollToBottom();
            }

        } else if (data.type === 'stream_end') {
            var streamMsg = chatArea.querySelector('.message.streaming');
            if (streamMsg) {
                streamMsg.classList.remove('streaming');
                var streamTextEl = streamMsg.querySelector('.stream-text');
                if (streamTextEl) {
                    var finalText = streamTextEl.getAttribute('data-raw') || streamTextEl.textContent;
                    streamTextEl.removeAttribute('data-raw');
                    streamTextEl.innerHTML = renderMarkdown(finalText);
                    highlightAllCode();

                    // Save to conversation
                    if (currentConvId && conversations[currentConvId]) {
                        addMessageToConversation(currentConvId, {
                            id: streamMsg.getAttribute('data-msg-id'),
                            type: 'assistant',
                            content: finalText,
                            rendered: streamTextEl.innerHTML,
                            timestamp: Date.now()
                        });
                    }
                }
                bindMessageActions();
            }
            finishProcessing();

        } else if (data.type === 'response') {
            var tc2 = chatArea.querySelector('.thinking-container');
            if (tc2) tc2.remove();

            var ws3 = $('#welcome-screen');
            if (ws3) ws3.classList.add('hidden');

            var msgId2 = generateId();
            var rendered = renderMarkdown(data.content);
            var msgEl2 = document.createElement('div');
            msgEl2.className = 'message assistant';
            msgEl2.setAttribute('data-msg-id', msgId2);
            msgEl2.innerHTML =
                '<div class="message-inner">' +
                '<div class="message-avatar"><i class="fa-solid fa-robot"></i></div>' +
                '<div class="message-body">' +
                '<div class="message-role">DATA-AI</div>' +
                '<div class="message-content">' + rendered + '</div>' +
                '<div class="message-actions">' +
                '<button class="message-action-btn" data-action="copy" title="复制"><i class="fa-regular fa-copy"></i></button>' +
                '<button class="message-action-btn" data-action="regenerate" title="重新生成"><i class="fa-solid fa-rotate"></i></button>' +
                '</div></div></div>';

            chatArea.appendChild(msgEl2);
            highlightAllCode();
            bindMessageActions();

            if (currentConvId && conversations[currentConvId]) {
                addMessageToConversation(currentConvId, {
                    id: msgId2,
                    type: 'assistant',
                    content: data.content,
                    rendered: rendered,
                    timestamp: Date.now()
                });
            }

            scrollToBottom();
            finishProcessing();

        } else if (data.type === 'error') {
            var tc3 = chatArea.querySelector('.thinking-container');
            if (tc3) tc3.remove();
            var streamMsg2 = chatArea.querySelector('.message.streaming');
            if (streamMsg2) streamMsg2.remove();

            var errMsg = document.createElement('div');
            errMsg.className = 'message system';
            errMsg.innerHTML =
                '<div class="message-inner">' +
                '<div class="message-content" style="color:var(--toast-error-bg);">' +
                '<i class="fa-solid fa-circle-exclamation"></i> ' + escapeHtml(data.content) +
                '</div></div>';

            chatArea.appendChild(errMsg);
            scrollToBottom();
            finishProcessing();
        }
    }

    window.__toggleThinking = function (header) {
        var content = header.nextElementSibling;
        var toggle = header.querySelector('.thinking-toggle');
        if (content) content.classList.toggle('collapsed');
        if (toggle) toggle.classList.toggle('collapsed');
    };

    function finishProcessing() {
        isStreaming = false;
        updateSendButton();
    }

    // ==================== Send Message ====================
    function sendMessage() {
        var inputBox = $('#input-box');
        var content = inputBox.value.trim();
        if (!content) return;

        // Ensure conversation exists
        if (!currentConvId) {
            createConversation();
        }

        // Add user message to UI
        var chatArea = $('#chat-area');
        var ws4 = $('#welcome-screen');
        if (ws4) ws4.classList.add('hidden');

        var userMsgId = generateId();
        var userMsgEl = document.createElement('div');
        userMsgEl.className = 'message user';
        userMsgEl.setAttribute('data-msg-id', userMsgId);
        userMsgEl.innerHTML =
            '<div class="message-inner">' +
            '<div class="message-avatar"><i class="fa-solid fa-user"></i></div>' +
            '<div class="message-body">' +
            '<div class="message-role">你</div>' +
            '<div class="message-content">' + escapeHtml(content).replace(/\n/g, '<br>') + '</div>' +
            '<div class="message-actions">' +
            '<button class="message-action-btn" data-action="copy" title="复制"><i class="fa-regular fa-copy"></i></button>' +
            '<button class="message-action-btn" data-action="edit" title="编辑"><i class="fa-solid fa-pen"></i></button>' +
            '</div></div></div>';

        chatArea.appendChild(userMsgEl);
        bindMessageActions();

        // Save to conversation
        addMessageToConversation(currentConvId, {
            id: userMsgId,
            type: 'user',
            content: content,
            timestamp: Date.now()
        });

        // Auto title
        if (conversations[currentConvId].messages.filter(function (m) { return m.type === 'user'; }).length === 1) {
            autoTitleConversation(currentConvId, content);
        }

        // Clear input
        inputBox.value = '';
        autoResizeTextarea();
        updateSendButton();
        scrollToBottom();

        // Send to WebSocket
        sendToWebSocket(content);
    }

    function sendToWebSocket(content) {
        isStreaming = true;
        updateSendButton();

        var payload = {
            content: content,
            options: {
                web_search: webSearchEnabled
            }
        };

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
        } else {
            messageQueue.push(payload);
            if (!ws || ws.readyState === WebSocket.CLOSED) {
                connectWS();
            }
            showToast('正在连接服务器...', 'info');
        }
    }

    function updateSendButton() {
        var btn = $('#send-btn');
        var inputBox = $('#input-box');
        if (!btn || !inputBox) return;

        if (isStreaming) {
            btn.disabled = true;
            btn.classList.remove('ready');
            btn.classList.add('not-ready');
        } else {
            btn.disabled = false;
            if (inputBox.value.trim()) {
                btn.classList.add('ready');
                btn.classList.remove('not-ready');
            } else {
                btn.classList.remove('ready');
                btn.classList.add('not-ready');
            }
        }
    }

    // ==================== Input System ====================
    function autoResizeTextarea() {
        var textarea = $('#input-box');
        if (!textarea) return;
        textarea.style.height = 'auto';
        var newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = newHeight + 'px';
    }

    function initInputSystem() {
        var inputBox = $('#input-box');
        if (!inputBox) return;

        inputBox.addEventListener('input', function () {
            autoResizeTextarea();
            updateSendButton();
        });

        inputBox.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isStreaming && inputBox.value.trim()) {
                    sendMessage();
                }
            }
        });

        // Drag & Drop
        var inputContainer = $('#input-container');
        if (inputContainer) {
            inputContainer.addEventListener('dragover', function (e) {
                e.preventDefault();
                inputContainer.classList.add('drag-over');
            });
            inputContainer.addEventListener('dragleave', function (e) {
                e.preventDefault();
                inputContainer.classList.remove('drag-over');
            });
            inputContainer.addEventListener('drop', function (e) {
                e.preventDefault();
                inputContainer.classList.remove('drag-over');
                var files = e.dataTransfer.files;
                if (files.length > 0) handleFileUpload(files);
            });
        }

        // File input
        var fileInput = $('#file-input');
        var attachBtn = $('#attach-btn');
        if (attachBtn && fileInput) {
            attachBtn.addEventListener('click', function () {
                fileInput.click();
            });
            fileInput.addEventListener('change', function () {
                if (fileInput.files.length > 0) {
                    handleFileUpload(fileInput.files);
                    fileInput.value = '';
                }
            });
        }

        // Send button
        var sendBtn = $('#send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', function () {
                if (!isStreaming) sendMessage();
            });
        }

        // Web search toggle
        var webSearchBtn = $('#web-search-toggle');
        if (webSearchBtn) {
            webSearchBtn.addEventListener('click', function () {
                webSearchEnabled = !webSearchEnabled;
                webSearchBtn.classList.toggle('active', webSearchEnabled);
                showToast(webSearchEnabled ? '已启用联网搜索' : '已关闭联网搜索', 'info');
            });
        }

        // Skill quick btn
        var skillQuickBtn = $('#skill-quick-btn');
        if (skillQuickBtn) {
            skillQuickBtn.addEventListener('click', function () {
                openDrawer('skill-drawer', 'skill-drawer-overlay');
                loadSkills();
            });
        }

        updateSendButton();
    }

    function handleFileUpload(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            showToast('已选择文件: ' + file.name + ' (' + formatFileSize(file.size) + ')', 'info');
        }
    }

    // ==================== Sidebar ====================
    function openSidebar() {
        var sidebar = $('#sidebar');
        var overlay = $('#sidebar-overlay');
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('show');
    }

    function closeSidebar() {
        var sidebar = $('#sidebar');
        var overlay = $('#sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
    }

    function initSidebar() {
        var toggleBtn = $('#sidebar-toggle-btn');
        var closeBtn = $('#sidebar-close-btn');
        var overlay = $('#sidebar-overlay');
        var newChatBtn = $('#new-chat-btn');

        if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);
        if (newChatBtn) newChatBtn.addEventListener('click', function () {
            createConversation();
        });

        // Search
        var searchInput = $('#search-input');
        var searchClear = $('#search-clear-btn');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function () {
                var val = searchInput.value.trim();
                if (searchClear) searchClear.style.display = val ? 'flex' : 'none';
                renderConversationList(val);
            }, 200));
        }
        if (searchClear) {
            searchClear.addEventListener('click', function () {
                searchInput.value = '';
                searchClear.style.display = 'none';
                renderConversationList();
                searchInput.focus();
            });
        }

        // Bottom items
        var kbBtn = $('#sidebar-kb-btn');
        var skillBtn = $('#sidebar-skill-btn');
        var mcpBtn = $('#sidebar-mcp-btn');
        var settingsBtn = $('#sidebar-settings-btn');

        if (kbBtn) kbBtn.addEventListener('click', function () { openDrawer('kb-drawer', 'kb-drawer-overlay'); loadKnowledgeBases(); closeSidebar(); });
        if (skillBtn) skillBtn.addEventListener('click', function () { openDrawer('skill-drawer', 'skill-drawer-overlay'); loadSkills(); closeSidebar(); });
        if (mcpBtn) mcpBtn.addEventListener('click', function () { openDrawer('mcp-drawer', 'mcp-drawer-overlay'); loadMcpServers(); closeSidebar(); });
        if (settingsBtn) settingsBtn.addEventListener('click', function () { openDrawer('settings-drawer', 'settings-drawer-overlay'); closeSidebar(); });

        // Header buttons
        var headerKb = $('#header-kb-btn');
        var headerSkill = $('#header-skill-btn');
        var headerMcp = $('#header-mcp-btn');
        var headerSettings = $('#header-settings-btn');

        if (headerKb) headerKb.addEventListener('click', function () { openDrawer('kb-drawer', 'kb-drawer-overlay'); loadKnowledgeBases(); });
        if (headerSkill) headerSkill.addEventListener('click', function () { openDrawer('skill-drawer', 'skill-drawer-overlay'); loadSkills(); });
        if (headerMcp) headerMcp.addEventListener('click', function () { openDrawer('mcp-drawer', 'mcp-drawer-overlay'); loadMcpServers(); });
        if (headerSettings) headerSettings.addEventListener('click', function () { openDrawer('settings-drawer', 'settings-drawer-overlay'); });
    }

    // ==================== Drawer System ====================
    function openDrawer(drawerId, overlayId) {
        var drawer = $('#' + drawerId);
        var overlay = $('#' + overlayId);
        if (drawer) drawer.classList.add('open');
        if (overlay) overlay.classList.add('show');
    }

    function closeDrawer(drawerId, overlayId) {
        var drawer = $('#' + drawerId);
        var overlay = $('#' + overlayId);
        if (drawer) drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
    }

    function initDrawers() {
        // Settings drawer
        var settingsClose = $('#settings-drawer-close');
        var settingsOverlay = $('#settings-drawer-overlay');
        if (settingsClose) settingsClose.addEventListener('click', function () { closeDrawer('settings-drawer', 'settings-drawer-overlay'); });
        if (settingsOverlay) settingsOverlay.addEventListener('click', function () { closeDrawer('settings-drawer', 'settings-drawer-overlay'); });

        // KB drawer
        var kbClose = $('#kb-drawer-close');
        var kbOverlay = $('#kb-drawer-overlay');
        if (kbClose) kbClose.addEventListener('click', function () { closeDrawer('kb-drawer', 'kb-drawer-overlay'); });
        if (kbOverlay) kbOverlay.addEventListener('click', function () { closeDrawer('kb-drawer', 'kb-drawer-overlay'); });

        // Skill drawer
        var skillClose = $('#skill-drawer-close');
        var skillOverlay = $('#skill-drawer-overlay');
        if (skillClose) skillClose.addEventListener('click', function () { closeDrawer('skill-drawer', 'skill-drawer-overlay'); });
        if (skillOverlay) skillOverlay.addEventListener('click', function () { closeDrawer('skill-drawer', 'skill-drawer-overlay'); });

        // MCP drawer
        var mcpClose = $('#mcp-drawer-close');
        var mcpOverlay = $('#mcp-drawer-overlay');
        if (mcpClose) mcpClose.addEventListener('click', function () { closeDrawer('mcp-drawer', 'mcp-drawer-overlay'); });
        if (mcpOverlay) mcpOverlay.addEventListener('click', function () { closeDrawer('mcp-drawer', 'mcp-drawer-overlay'); });

        // Help modal
        var helpClose = $('#help-modal-close');
        var helpOverlay = $('#help-modal');
        if (helpClose) helpClose.addEventListener('click', function () { helpOverlay.classList.remove('show'); });
        if (helpOverlay) helpOverlay.addEventListener('click', function (e) { if (e.target === helpOverlay) helpOverlay.classList.remove('show'); });

        // Image preview
        var imgOverlay = $('#image-preview-overlay');
        if (imgOverlay) imgOverlay.addEventListener('click', function () { imgOverlay.classList.remove('show'); });

        // Drawer tabs
        initDrawerTabs();

        // Settings buttons
        var saveBtn = $('#save-settings-btn');
        var resetBtn = $('#reset-settings-btn');
        if (saveBtn) saveBtn.addEventListener('click', saveSettings);
        if (resetBtn) resetBtn.addEventListener('click', resetSettings);

        // Temperature range
        var tempRange = $('#setting-temperature');
        var tempValue = $('#temperature-value');
        if (tempRange && tempValue) {
            tempRange.addEventListener('input', function () {
                tempValue.textContent = tempRange.value;
            });
        }

        // API key toggle
        var apiKeyToggle = $('#api-key-toggle');
        if (apiKeyToggle) {
            apiKeyToggle.addEventListener('click', function () {
                var input = $('#setting-api-key');
                if (!input) return;
                if (input.type === 'password') {
                    input.type = 'text';
                    apiKeyToggle.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    apiKeyToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
                }
            });
        }

        // Theme options
        $$('.theme-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var theme = btn.getAttribute('data-theme');
                setTheme(theme);
                $$('.theme-option').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });

        // Switches
        $$('.setting-switch').forEach(function (sw) {
            sw.addEventListener('click', function () {
                sw.classList.toggle('on');
            });
        });

        // KB create
        var createKbBtn = $('#create-kb-btn');
        if (createKbBtn) createKbBtn.addEventListener('click', createKnowledgeBase);

        // Skill create
        var createSkillBtn = $('#create-skill-btn');
        if (createSkillBtn) createSkillBtn.addEventListener('click', createSkill);

        // AI generate skill
        var aiGenBtn = $('#ai-generate-skill-btn');
        if (aiGenBtn) aiGenBtn.addEventListener('click', aiGenerateSkill);

        // MCP create
        var createMcpBtn = $('#create-mcp-btn');
        if (createMcpBtn) createMcpBtn.addEventListener('click', createMcpServer);

        // MCP quick add
        $$('.mcp-quick-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                quickAddMcp(btn.getAttribute('data-mcp'));
            });
        });

        // Provider change -> update models
        var providerSelect = $('#setting-provider');
        if (providerSelect) {
            providerSelect.addEventListener('change', function () {
                updateModelList(providerSelect.value);
            });
        }
    }

    function initDrawerTabs() {
        // Generic tab switching for all drawers
        $$('.drawer-tabs').forEach(function (tabBar) {
            var drawer = tabBar.closest('.drawer');
            if (!drawer) return;
            tabBar.querySelectorAll('.drawer-tab').forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var targetId = tab.getAttribute('data-tab');
                    // Deactivate all tabs in this drawer
                    tabBar.querySelectorAll('.drawer-tab').forEach(function (t) { t.classList.remove('active'); });
                    drawer.querySelectorAll('.drawer-tab-content').forEach(function (c) { c.classList.remove('active'); });
                    // Activate selected
                    tab.classList.add('active');
                    var target = drawer.querySelector('#' + targetId);
                    if (target) target.classList.add('active');
                });
            });
        });
    }

    // ==================== Theme ====================
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('data-ai-theme', theme);
        } catch (e) { /* ignore */ }

        // Update highlight.js theme
        var hljsLink = $('#hljs-theme');
        if (hljsLink) {
            if (theme === 'light') {
                hljsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
            } else {
                hljsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
            }
        }
    }

    function loadTheme() {
        try {
            var saved = localStorage.getItem('data-ai-theme');
            if (saved) {
                setTheme(saved);
                $$('.theme-option').forEach(function (btn) {
                    btn.classList.toggle('active', btn.getAttribute('data-theme') === saved);
                });
            }
        } catch (e) { /* ignore */ }
    }

    // ==================== Model Selector ====================
    var providerModels = {
        aliyun: [
            { name: 'qwen-plus-latest', desc: '通义千问 Plus' },
            { name: 'qwen-max', desc: '通义千问 Max' },
            { name: 'qwen-turbo', desc: '通义千问 Turbo' },
            { name: 'qwen-long', desc: '通义千问 Long' }
        ],
        openai: [
            { name: 'gpt-4o', desc: 'GPT-4o' },
            { name: 'gpt-4o-mini', desc: 'GPT-4o Mini' },
            { name: 'gpt-4-turbo', desc: 'GPT-4 Turbo' },
            { name: 'gpt-3.5-turbo', desc: 'GPT-3.5 Turbo' }
        ],
        anthropic: [
            { name: 'claude-sonnet-4-20250514', desc: 'Claude Sonnet 4' },
            { name: 'claude-3-5-sonnet-20241022', desc: 'Claude 3.5 Sonnet' },
            { name: 'claude-3-haiku-20240307', desc: 'Claude 3 Haiku' }
        ],
        deepseek: [
            { name: 'deepseek-chat', desc: 'DeepSeek Chat' },
            { name: 'deepseek-reasoner', desc: 'DeepSeek Reasoner' }
        ],
        ollama: [
            { name: 'llama3', desc: 'Llama 3' },
            { name: 'qwen2', desc: 'Qwen 2' },
            { name: 'codellama', desc: 'Code Llama' }
        ]
    };

    function initModelSelector() {
        var selector = $('#model-selector');
        var btn = $('#model-selector-btn');
        var dropdown = $('#model-dropdown');
        var searchInput = $('#model-search-input');

        if (!selector || !btn) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            selector.classList.toggle('open');
            if (selector.classList.contains('open') && searchInput) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (selector && !selector.contains(e.target)) {
                selector.classList.remove('open');
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                renderModelDropdownList(searchInput.value.trim());
            });
        }

        // Load current model from settings
        if (appSettings && appSettings.llm) {
            updateModelDisplay(appSettings.llm.model || '');
        }
    }

    function updateModelDisplay(modelName) {
        var display = $('#model-name-display');
        if (display) display.textContent = modelName || '选择模型';
    }

    function updateModelList(provider) {
        var models = providerModels[provider] || [];
        renderModelDropdownList('', models);

        // Auto-select first model
        if (models.length > 0) {
            var modelSelect = $('#setting-model');
            if (modelSelect) {
                modelSelect.innerHTML = '';
                models.forEach(function (m) {
                    var opt = document.createElement('option');
                    opt.value = m.name;
                    opt.textContent = m.name;
                    modelSelect.appendChild(opt);
                });
            }
            updateModelDisplay(models[0].name);
        }
    }

    function renderModelDropdownList(filter, models) {
        var list = $('#model-dropdown-list');
        if (!list) return;

        if (!models) {
            var provider = $('#setting-provider');
            var pVal = provider ? provider.value : 'aliyun';
            models = providerModels[pVal] || [];
        }

        if (filter) {
            filter = filter.toLowerCase();
            models = models.filter(function (m) {
                return m.name.toLowerCase().includes(filter) || m.desc.toLowerCase().includes(filter);
            });
        }

        var currentModel = '';
        var modelSelect = $('#setting-model');
        if (modelSelect) currentModel = modelSelect.value;

        var html = '';
        models.forEach(function (m) {
            var selected = m.name === currentModel ? ' selected' : '';
            html += '<div class="model-dropdown-item' + selected + '" data-model="' + escapeHtml(m.name) + '">' +
                '<div class="model-dropdown-item-icon"><i class="fa-solid fa-cube"></i></div>' +
                '<div class="model-dropdown-item-info">' +
                '<div class="model-dropdown-item-name">' + escapeHtml(m.name) + '</div>' +
                '<div class="model-dropdown-item-desc">' + escapeHtml(m.desc) + '</div>' +
                '</div>' +
                '<div class="model-dropdown-item-check"><i class="fa-solid fa-check"></i></div>' +
                '</div>';
        });

        if (models.length === 0) {
            html = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">没有找到模型</div>';
        }

        list.innerHTML = html;

        list.querySelectorAll('.model-dropdown-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var modelName = item.getAttribute('data-model');
                updateModelDisplay(modelName);
                if (modelSelect) modelSelect.value = modelName;
                var selector = $('#model-selector');
                if (selector) selector.classList.remove('open');
            });
        });
    }

    // ==================== Settings ====================
    async function loadSettings() {
        try {
            var res = await fetch('/api/settings');
            if (!res.ok) return;
            appSettings = await res.json();
            populateSettings(appSettings);
        } catch (e) {
            console.error('Load settings error:', e);
        }
    }

    function populateSettings(settings) {
        if (!settings) return;

        var provider = $('#setting-provider');
        var model = $('#setting-model');
        var baseUrl = $('#setting-base-url');
        var apiKey = $('#setting-api-key');
        var maxTokens = $('#setting-max-tokens');
        var temperature = $('#setting-temperature');
        var tempValue = $('#temperature-value');
        var sandboxTimeout = $('#setting-sandbox-timeout');

        if (provider && settings.llm && settings.llm.provider) provider.value = settings.llm.provider;
        if (model && settings.llm && settings.llm.model) model.value = settings.llm.model;
        if (baseUrl && settings.llm && settings.llm.base_url) baseUrl.value = settings.llm.base_url;
        if (apiKey && settings.llm && settings.llm.api_key) apiKey.value = settings.llm.api_key;
        if (maxTokens && settings.llm && settings.llm.max_tokens) maxTokens.value = settings.llm.max_tokens;
        if (temperature && settings.llm && settings.llm.temperature != null) {
            temperature.value = settings.llm.temperature;
            if (tempValue) tempValue.textContent = settings.llm.temperature;
        }
        if (sandboxTimeout && settings.sandbox && settings.sandbox.timeout) sandboxTimeout.value = settings.sandbox.timeout;

        if (settings.langsmith) {
            var lsEnabled = $('#setting-langsmith-enabled');
            var lsKey = $('#setting-langsmith-api-key');
            var lsProject = $('#setting-langsmith-project');
            var lsEndpoint = $('#setting-langsmith-endpoint');
            if (lsEnabled && settings.langsmith.enabled) lsEnabled.classList.add('on');
            if (lsKey) lsKey.value = settings.langsmith.api_key || '';
            if (lsProject) lsProject.value = settings.langsmith.project || 'dataagent';
            if (lsEndpoint) lsEndpoint.value = settings.langsmith.endpoint || 'https://api.smith.langchain.com';
        }

        // Update model display
        if (settings.llm && settings.llm.model) {
            updateModelDisplay(settings.llm.model);
        }

        // Update model list based on provider
        if (settings.llm && settings.llm.provider) {
            updateModelList(settings.llm.provider);
        }
    }

    async function saveSettings() {
        var provider = $('#setting-provider');
        var model = $('#setting-model');
        var baseUrl = $('#setting-base-url');
        var apiKey = $('#setting-api-key');
        var maxTokens = $('#setting-max-tokens');
        var temperature = $('#setting-temperature');
        var sandboxEnabled = $('#setting-sandbox-enabled');
        var sandboxTimeout = $('#setting-sandbox-timeout');
        var kbEnabled = $('#setting-kb-enabled');
        var maxSteps = $('#setting-max-steps');
        var lsEnabled = $('#setting-langsmith-enabled');
        var lsKey = $('#setting-langsmith-api-key');
        var lsProject = $('#setting-langsmith-project');
        var lsEndpoint = $('#setting-langsmith-endpoint');

        var settings = {
            llm: {
                provider: provider ? provider.value : 'aliyun',
                model: model ? model.value : 'qwen-plus-latest',
                base_url: baseUrl ? baseUrl.value : '',
                api_key: apiKey ? apiKey.value : '',
                max_tokens: maxTokens ? parseInt(maxTokens.value) : 4096,
                temperature: temperature ? parseFloat(temperature.value) : 0.7,
                top_p: 0.9,
                stream: false
            },
            sandbox: {
                enabled: sandboxEnabled ? sandboxEnabled.classList.contains('on') : true,
                timeout: sandboxTimeout ? parseInt(sandboxTimeout.value) : 60,
                allow_network: false
            },
            knowledge_base: {
                enabled: kbEnabled ? kbEnabled.classList.contains('on') : true,
                vector_db: 'sqlite',
                chunk_size: 1000,
                chunk_overlap: 200,
                embedding_model: 'text-embedding-v3'
            },
            conversation: { history_enabled: true, max_history: 50, auto_title: true },
            display: { theme: document.documentElement.getAttribute('data-theme') || 'dark', thinking_chain: true, code_highlight: true, markdown_render: true },
            agent: { max_steps: maxSteps ? parseInt(maxSteps.value) : 5, auto_mode: true, reasoning_mode: 'auto' },
            langsmith: {
                enabled: lsEnabled ? lsEnabled.classList.contains('on') : false,
                api_key: lsKey ? lsKey.value : '',
                project: lsProject ? lsProject.value : 'dataagent',
                endpoint: lsEndpoint ? lsEndpoint.value : 'https://api.smith.langchain.com'
            }
        };

        if (!settings.llm.api_key) {
            showToast('请输入 API Key', 'error');
            return;
        }

        try {
            var res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (!res.ok) {
                var errData = await res.json().catch(function () { return { detail: '保存失败' }; });
                throw new Error(errData.detail || '请求失败');
            }
            appSettings = settings;
            closeDrawer('settings-drawer', 'settings-drawer-overlay');
            showToast('设置已保存', 'success');
            updateModelDisplay(settings.llm.model);
        } catch (e) {
            showToast('保存失败: ' + e.message, 'error');
        }
    }

    function resetSettings() {
        var provider = $('#setting-provider');
        var model = $('#setting-model');
        var baseUrl = $('#setting-base-url');
        var apiKey = $('#setting-api-key');
        var maxTokens = $('#setting-max-tokens');
        var temperature = $('#setting-temperature');
        var tempValue = $('#temperature-value');

        if (provider) provider.value = 'aliyun';
        if (model) model.value = 'qwen-plus-latest';
        if (baseUrl) baseUrl.value = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
        if (apiKey) apiKey.value = '';
        if (maxTokens) maxTokens.value = 4096;
        if (temperature) temperature.value = 0.7;
        if (tempValue) tempValue.textContent = '0.7';

        updateModelList('aliyun');
        showToast('已重置为默认设置', 'info');
    }

    // ==================== Knowledge Base ====================
    async function loadKnowledgeBases() {
        try {
            var res = await fetch('/api/knowledge-bases');
            if (!res.ok) return;
            var kbs = await res.json();
            var grid = $('#kb-grid');
            if (!grid) return;

            if (kbs.length === 0) {
                grid.innerHTML = '<div style="padding:30px 10px;text-align:center;color:var(--text-muted);font-size:13px;">还没有知识库，点击上方标签创建</div>';
                return;
            }

            grid.innerHTML = kbs.map(function (kb) {
                return '<div class="kb-card" data-kb-id="' + kb.id + '">' +
                    '<div class="kb-card-header">' +
                    '<div class="kb-card-icon"><i class="fa-solid fa-book"></i></div>' +
                    '<h4>' + escapeHtml(kb.name || '未命名') + '</h4>' +
                    '</div>' +
                    '<p>' + escapeHtml(kb.description || '暂无描述') + '</p>' +
                    '<div class="kb-meta">' +
                    '<span>创建: ' + new Date(kb.created_at).toLocaleDateString() + '</span>' +
                    '<span>文档: ' + (kb.document_count || 0) + '</span>' +
                    '</div></div>';
            }).join('');
        } catch (e) {
            console.error('Load KB error:', e);
        }
    }

    async function createKnowledgeBase() {
        var nameEl = $('#kb-name');
        var descEl = $('#kb-desc');
        if (!nameEl) return;
        var name = nameEl.value.trim();
        var desc = descEl ? descEl.value.trim() : '';

        if (!name) {
            showToast('请输入知识库名称', 'error');
            return;
        }

        try {
            var res = await fetch('/api/knowledge-bases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, description: desc })
            });
            if (!res.ok) {
                var err = await res.json().catch(function () { return { detail: '创建失败' }; });
                throw new Error(err.detail || '请求失败');
            }
            nameEl.value = '';
            if (descEl) descEl.value = '';
            loadKnowledgeBases();
            showToast('知识库「' + name + '」创建成功', 'success');

            // Switch to list tab
            var kbDrawer = $('#kb-drawer');
            if (kbDrawer) {
                var listTab = kbDrawer.querySelector('[data-tab="kb-tab-list"]');
                if (listTab) listTab.click();
            }
        } catch (e) {
            showToast('创建失败: ' + e.message, 'error');
        }
    }

    // ==================== Skills ====================
    async function loadSkills() {
        try {
            var res = await fetch('/api/skills');
            if (!res.ok) return;
            var skills = await res.json();
            var list = $('#skill-list-content');
            if (!list) return;

            if (skills.length === 0) {
                list.innerHTML = '<div style="padding:30px 10px;text-align:center;color:var(--text-muted);font-size:13px;">暂无技能</div>';
                return;
            }

            list.innerHTML = skills.map(function (skill) {
                return '<div class="skill-item" data-skill-id="' + skill.id + '">' +
                    '<div class="skill-info">' +
                    '<div class="skill-icon-box">' + escapeHtml(skill.icon || '⚡') + '</div>' +
                    '<div class="skill-details">' +
                    '<h4>' + escapeHtml(skill.name || '未命名') + '</h4>' +
                    '<p>' + escapeHtml(skill.description || '') + '</p>' +
                    '</div></div>' +
                    '<div class="skill-actions">' +
                    '<button class="skill-use-btn" data-action="use">使用</button>' +
                    '<span class="skill-badge">' + escapeHtml(skill.type || 'custom') + '</span>' +
                    '</div></div>';
            }).join('');

            list.querySelectorAll('.skill-use-btn').forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var skillId = btn.closest('.skill-item').getAttribute('data-skill-id');
                    useSkillPrompt(skillId);
                });
            });
        } catch (e) {
            console.error('Load skills error:', e);
        }
    }

    function useSkillPrompt(skillId) {
        var inputBox = $('#input-box');
        if (inputBox) {
            inputBox.value = '使用技能 [' + skillId + ']: ';
            inputBox.focus();
            autoResizeTextarea();
        }
        closeDrawer('skill-drawer', 'skill-drawer-overlay');
    }

    async function createSkill() {
        var nameEl = $('#skill-name');
        var iconEl = $('#skill-icon');
        var descEl = $('#skill-desc');
        if (!nameEl) return;

        var name = nameEl.value.trim();
        var icon = iconEl ? iconEl.value.trim() || '⚡' : '⚡';
        var desc = descEl ? descEl.value.trim() : '';

        if (!name) {
            showToast('请输入技能名称', 'error');
            return;
        }

        try {
            var res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, icon: icon, description: desc, parameters: [], prompts: {} })
            });
            if (!res.ok) {
                var err = await res.json().catch(function () { return { detail: '创建失败' }; });
                throw new Error(err.detail || '请求失败');
            }
            nameEl.value = '';
            if (descEl) descEl.value = '';
            loadSkills();
            showToast('技能「' + name + '」创建成功', 'success');

            var skillDrawer = $('#skill-drawer');
            if (skillDrawer) {
                var listTab = skillDrawer.querySelector('[data-tab="skill-tab-list"]');
                if (listTab) listTab.click();
            }
        } catch (e) {
            showToast('创建失败: ' + e.message, 'error');
        }
    }

    async function aiGenerateSkill() {
        var purposeEl = $('#skill-purpose');
        var genDiv = $('#ai-generating');
        if (!purposeEl) return;
        var purpose = purposeEl.value.trim();

        if (!purpose) {
            showToast('请先描述技能用途', 'error');
            return;
        }

        if (genDiv) genDiv.style.display = 'flex';

        try {
            var res = await fetch('/api/skills/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose: purpose })
            });
            if (!res.ok) throw new Error('生成失败');

            var result = await res.json();
            var nameEl = $('#skill-name');
            var iconEl = $('#skill-icon');
            var descEl = $('#skill-desc');
            if (nameEl) nameEl.value = result.name || '';
            if (iconEl) iconEl.value = result.icon || '⚡';
            if (descEl) descEl.value = result.description || '';
            showToast('AI已生成技能建议', 'success');
        } catch (e) {
            showToast('AI生成失败: ' + e.message, 'error');
        } finally {
            if (genDiv) genDiv.style.display = 'none';
        }
    }

    // ==================== MCP ====================
    async function loadMcpServers() {
        try {
            var res = await fetch('/api/mcp/servers');
            if (!res.ok) return;
            var servers = await res.json();
            var list = $('#mcp-list-content');
            if (!list) return;

            if (servers.length === 0) {
                list.innerHTML = '<div style="padding:20px 10px;text-align:center;color:var(--text-muted);font-size:13px;">还没有配置MCP服务器</div>';
                return;
            }

            list.innerHTML = servers.map(function (s) {
                return '<div class="mcp-item">' +
                    '<div class="skill-info">' +
                    '<div class="skill-icon-box">' + escapeHtml(s.icon || '🔌') + '</div>' +
                    '<div class="skill-details">' +
                    '<h4>' + escapeHtml(s.name) + '</h4>' +
                    '<p>类型: ' + escapeHtml(s.type) + '</p>' +
                    '</div></div>' +
                    '<div class="setting-switch' + (s.enabled ? ' on' : '') + '"></div>' +
                    '</div>';
            }).join('');

            list.querySelectorAll('.setting-switch').forEach(function (sw) {
                sw.addEventListener('click', function () {
                    sw.classList.toggle('on');
                });
            });
        } catch (e) {
            console.error('Load MCP error:', e);
        }
    }

    async function createMcpServer() {
        var nameEl = $('#mcp-name');
        var typeEl = $('#mcp-type');
        var commandEl = $('#mcp-command');
        if (!nameEl) return;

        var name = nameEl.value.trim();
        var type = typeEl ? typeEl.value : 'stdio';
        var command = commandEl ? commandEl.value.trim() : '';

        if (!name) {
            showToast('请输入MCP服务器名称', 'error');
            return;
        }

        try {
            var res = await fetch('/api/mcp/servers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, type: type, command: command, args: [], enabled: true })
            });
            if (!res.ok) {
                var err = await res.json().catch(function () { return { detail: '创建失败' }; });
                throw new Error(err.detail || '请求失败');
            }
            nameEl.value = '';
            if (commandEl) commandEl.value = '';
            loadMcpServers();
            showToast('MCP服务器「' + name + '」配置成功', 'success');
        } catch (e) {
            showToast('配置失败: ' + e.message, 'error');
        }
    }

    function quickAddMcp(type) {
        var presets = {
            filesystem: { name: '文件系统', command: 'npx -y @modelcontextprotocol/server-filesystem /' },
            github: { name: 'GitHub', command: 'npx -y @modelcontextprotocol/server-github' },
            notion: { name: 'Notion', command: 'npx -y @modelcontextprotocol/server-notion' },
            brave: { name: 'Brave搜索', command: 'npx -y @modelcontextprotocol/server-brave-search' },
            sqlite: { name: 'SQLite', command: 'npx -y @modelcontextprotocol/server-sqlite' },
            postgres: { name: 'PostgreSQL', command: 'npx -y @modelcontextprotocol/server-postgres' },
            slack: { name: 'Slack', command: 'npx -y @modelcontextprotocol/server-slack' },
            gmail: { name: 'Gmail', command: 'npx -y @modelcontextprotocol/server-gmail' }
        };

        var preset = presets[type];
        if (!preset) return;

        var nameEl = $('#mcp-name');
        var commandEl = $('#mcp-command');
        if (nameEl) nameEl.value = preset.name;
        if (commandEl) commandEl.value = preset.command;
        showToast('已填充 ' + preset.name + ' 配置', 'info');
    }

    // ==================== Welcome Suggestions ====================
    function initWelcomeSuggestions() {
        $$('.suggestion-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var prompt = card.getAttribute('data-prompt');
                if (prompt) {
                    var inputBox = $('#input-box');
                    if (inputBox) {
                        inputBox.value = prompt;
                        autoResizeTextarea();
                        updateSendButton();
                        sendMessage();
                    }
                }
            });
        });
    }

    // ==================== Keyboard Shortcuts ====================
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            // Ctrl/Cmd + N: New conversation
            if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
                e.preventDefault();
                createConversation();
            }
            // Escape: Close drawers/modals
            if (e.key === 'Escape') {
                closeDrawer('settings-drawer', 'settings-drawer-overlay');
                closeDrawer('kb-drawer', 'kb-drawer-overlay');
                closeDrawer('skill-drawer', 'skill-drawer-overlay');
                closeDrawer('mcp-drawer', 'mcp-drawer-overlay');
                var helpModal = $('#help-modal');
                if (helpModal) helpModal.classList.remove('show');
                var imgPreview = $('#image-preview-overlay');
                if (imgPreview) imgPreview.classList.remove('show');
                closeSidebar();
            }
        });
    }

    // ==================== Init ====================
    function init() {
        initMarked();
        loadTheme();
        loadConversations();

        // If no conversations, show welcome
        var keys = Object.keys(conversations);
        if (keys.length > 0) {
            currentConvId = keys[keys.length - 1];
        }

        renderConversationList();
        renderChatArea();
        initSidebar();
        initInputSystem();
        initDrawers();
        initModelSelector();
        initWelcomeSuggestions();
        initKeyboardShortcuts();

        connectWS();
        loadSettings();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
