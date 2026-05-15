/* ==================== DATA-AI Frontend Application ==================== */
(function () {
    'use strict';

    // ==================== State ====================
    var ws = null;
    var appSettings = {};
    var conversations = {};
    var currentConvId = null;
    var isStreaming = false;
    var isGenerating = false;
    var messageQueue = [];
    var pendingUserMessages = [];
    var reconnectTimer = null;
    var webSearchEnabled = false;
    var autoScroll = true;
    var streamRafId = null;
    var pendingStreamText = '';
    var attachedFiles = [];

    // ==================== DOM References ====================
    var $ = function (sel) { return document.querySelector(sel); };
    var $$ = function (sel) { return document.querySelectorAll(sel); };

    // ==================== Open Source Libraries Initialization ====================
    var libs = {
        chartjs: null,
        mermaid: null,
        sortable: null,
        dayjs: null,
        numeral: null,
        lodash: null,
        axios: null,
        yup: null,
        anime: null,
        dropzone: null,
        cropper: null,
        pdfjs: null,
        codemirror: null,
        io: null,
        nlpjs: null,
        winknlp: null,
        tfidf: null,
        clipboard: null,
        toastify: null,
        swal: null,
        alpine: null,
        transformers: null,
        lucide: null,
        pptxgen: null
    };

    function initLibraries() {
        if (typeof Chart !== 'undefined') {
            libs.chartjs = Chart;
            console.log('[LIB] Chart.js loaded');
        }

        if (typeof mermaid !== 'undefined') {
            libs.mermaid = mermaid;
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                flowchart: { useMaxWidth: true },
                sequence: { useMaxWidth: true }
            });
            console.log('[LIB] Mermaid loaded');
        }

        if (typeof Sortable !== 'undefined') {
            libs.sortable = Sortable;
            console.log('[LIB] SortableJS loaded');
        }

        if (typeof dayjs !== 'undefined') {
            libs.dayjs = dayjs;
            console.log('[LIB] DayJS loaded');
        }

        if (typeof numeral !== 'undefined') {
            libs.numeral = numeral;
            console.log('[LIB] Numeral.js loaded');
        }

        if (typeof _ !== 'undefined') {
            libs.lodash = _;
            console.log('[LIB] Lodash loaded');
        }

        if (typeof axios !== 'undefined') {
            libs.axios = axios;
            axios.defaults.baseURL = '/api';
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            console.log('[LIB] Axios loaded');
        }

        if (typeof yup !== 'undefined') {
            libs.yup = yup;
            console.log('[LIB] Yup loaded');
        }

        if (typeof anime !== 'undefined') {
            libs.anime = anime;
            console.log('[LIB] Anime.js loaded');
        }

        if (typeof Dropzone !== 'undefined') {
            libs.dropzone = Dropzone;
            Dropzone.autoDiscover = false;
            console.log('[LIB] Dropzone loaded');
        }

        if (typeof Cropper !== 'undefined') {
            libs.cropper = Cropper;
            console.log('[LIB] Cropper.js loaded');
        }

        if (typeof pdfjsLib !== 'undefined') {
            libs.pdfjs = pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
            console.log('[LIB] PDF.js loaded');
        }

        if (typeof CodeMirror !== 'undefined') {
            libs.codemirror = CodeMirror;
            console.log('[LIB] CodeMirror loaded');
        }

        if (typeof io !== 'undefined') {
            libs.io = io;
            console.log('[LIB] Socket.IO loaded');
        }

        if (typeof window.nlp !== 'undefined') {
            libs.nlpjs = window.nlp;
            console.log('[LIB] NLP.js loaded');
        }

        if (typeof winkNLP !== 'undefined' && typeof winkEngLiteWebModel !== 'undefined') {
            libs.winknlp = winkNLP(winkEngLiteWebModel);
            console.log('[LIB] Wink-NLP loaded');
        }

        if (typeof TFIDF !== 'undefined') {
            libs.tfidf = TFIDF;
            console.log('[LIB] TF-IDF loaded');
        }

        if (typeof ClipboardJS !== 'undefined') {
            libs.clipboard = ClipboardJS;
            initClipboard();
            console.log('[LIB] Clipboard.js loaded');
        }

        if (typeof Toastify !== 'undefined') {
            libs.toastify = Toastify;
            console.log('[LIB] Toastify loaded');
        }

        if (typeof Swal !== 'undefined') {
            libs.swal = Swal;
            console.log('[LIB] SweetAlert2 loaded');
        }

        if (typeof Alpine !== 'undefined') {
            libs.alpine = Alpine;
            console.log('[LIB] Alpine.js loaded');
        }

        if (typeof window.transformers !== 'undefined') {
            libs.transformers = window.transformers;
            console.log('[LIB] Transformers.js loaded');
        }

        if (typeof lucide !== 'undefined') {
            libs.lucide = lucide;
            console.log('[LIB] Lucide loaded');
        }

        if (typeof PptxGenJS !== 'undefined' || typeof pptxgen !== 'undefined') {
            libs.pptxgen = PptxGenJS || pptxgen;
            console.log('[LIB] PptxGenJS loaded');
        }
    }

    function checkPPTLibrary() {
        if (!libs.pptxgen) {
            showToast('正在加载PPT生成库...', 'info');
            setTimeout(function() {
                if (typeof pptxgen !== 'undefined') {
                    libs.pptxgen = pptxgen;
                    showToast('PPT生成库加载成功！', 'success');
                }
            }, 1000);
        }
    }

    function initClipboard() {
        if (!libs.clipboard) return;

        var clipboard = new libs.clipboard('.copy-btn');

        clipboard.on('success', function(e) {
            showToast('已复制到剪贴板', 'success');
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            showToast('复制失败，请手动复制', 'error');
        });
    }

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
        var timer;
        return function () {
            var args = arguments;
            var ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
        };
    }

    function getFileIcon(fileName) {
        var ext = (fileName || '').split('.').pop().toLowerCase();
        var iconMap = {
            pdf: 'fa-file-pdf', txt: 'fa-file-lines', md: 'fa-file-lines',
            docx: 'fa-file-word', doc: 'fa-file-word',
            csv: 'fa-file-csv', xlsx: 'fa-file-excel', xls: 'fa-file-excel',
            pptx: 'fa-file-powerpoint', ppt: 'fa-file-powerpoint',
            png: 'fa-file-image', jpg: 'fa-file-image', jpeg: 'fa-file-image',
            gif: 'fa-file-image', webp: 'fa-file-image'
        };
        return iconMap[ext] || 'fa-file';
    }

    // ==================== Toast System ====================
    function showToast(message, type) {
        type = type || 'info';

        if (libs.toastify) {
            var bgColor = '#333';
            if (type === 'success') bgColor = '#27ae60';
            else if (type === 'error') bgColor = '#e74c3c';
            else if (type === 'warning') bgColor = '#f39c12';
            else if (type === 'info') bgColor = '#3498db';

            libs.toastify({
                text: message,
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                backgroundColor: bgColor,
                stopOnFocus: true
            }).showToast();
            return;
        }

        var container = $('#toast-container');
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        var icons = { success: 'fa-check', error: 'fa-xmark', info: 'fa-info' };
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
        var renderer = new marked.Renderer();
        renderer.code = function (code, lang, escaped) {
            var actualCode = code || '';
            var actualLang = lang || '';
            var highlighted = '';

            if (!actualCode.trim()) {
                actualCode = '// 暂无代码内容';
                actualLang = 'javascript';
            }

            if (actualLang && typeof hljs !== 'undefined') {
                try {
                    highlighted = hljs.highlight(actualCode, { language: actualLang }).value;
                } catch (e) {
                    highlighted = escapeHtml(actualCode);
                }
            } else {
                highlighted = escapeHtml(actualCode);
            }

            var id = 'code-' + generateId();
            var codeLines = actualCode.split('\n').length;
            var isLong = codeLines > 10;
            var collapsedClass = isLong ? 'code-collapsed' : '';

            return '<div class="code-block-wrapper ' + collapsedClass + '" id="code-wrapper-' + id + '">' +
                '<div class="code-block-header">' +
                '<span class="code-block-lang">' + escapeHtml(actualLang || 'code') + '</span>' +
                '<span class="code-block-lines">' + codeLines + ' 行</span>' +
                '<button class="code-block-fold" onclick="window.__toggleCodeFold(\'code-wrapper-' + id + '\', this)" title="' + (isLong ? '展开代码' : '折叠代码') + '">' +
                '<i class="fa-solid fa-chevron-' + (isLong ? 'down' : 'up') + '"></i></button>' +
                '<button class="code-block-copy" onclick="window.__copyCode(\'' + id + '\', this)" title="复制代码">' +
                '<i class="fa-regular fa-copy"></i> 复制</button>' +
                '</div>' +
                '<pre><code id="' + id + '" class="language-' + actualLang + '">' + highlighted + '</code></pre>' +
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

    window.__toggleCodeFold = function (wrapperId, btn) {
        var wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;

        var isCollapsed = wrapper.classList.contains('code-collapsed');

        if (isCollapsed) {
            wrapper.classList.remove('code-collapsed');
            btn.title = '折叠代码';
        } else {
            wrapper.classList.add('code-collapsed');
            btn.title = '展开代码';
        }

        var icon = btn.querySelector('i');
        if (icon) {
            icon.className = 'fa-solid fa-chevron-' + (isCollapsed ? 'up' : 'down');
        }
    };

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

    // ==================== Auto Scroll ====================
    function initAutoScroll() {
        var chatArea = $('#chat-area');
        if (!chatArea) return;

        chatArea.addEventListener('scroll', function () {
            var threshold = 50;
            if (chatArea.scrollTop + chatArea.clientHeight >= chatArea.scrollHeight - threshold) {
                autoScroll = true;
                hideScrollToBottomBtn();
            } else {
                autoScroll = false;
                showScrollToBottomBtn();
            }
        });
    }

    function scrollToBottom(smooth) {
        if (typeof smooth === 'undefined') smooth = true;
        var chatArea = $('#chat-area');
        if (!chatArea || !autoScroll) return;
        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: smooth ? 'smooth' : 'instant'
        });
    }

    function showScrollToBottomBtn() {
        var btn = $('#scroll-to-bottom-btn');
        if (btn) btn.classList.add('visible');
    }

    function hideScrollToBottomBtn() {
        var btn = $('#scroll-to-bottom-btn');
        if (btn) btn.classList.remove('visible');
    }

    function initScrollToBottomBtn() {
        var btn = $('#scroll-to-bottom-btn');
        if (!btn) return;
        btn.addEventListener('click', function () {
            autoScroll = true;
            var chatArea = $('#chat-area');
            if (chatArea) {
                chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
            }
            hideScrollToBottomBtn();
        });
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

    // ==================== Export Conversations ====================
    function exportConversationMarkdown() {
        if (!currentConvId || !conversations[currentConvId]) return;
        var conv = conversations[currentConvId];
        var md = '# ' + escapeHtml(conv.title) + '\n\n';
        (conv.messages || []).forEach(function (msg) {
            if (msg.type === 'user') {
                md += '## 你\n\n' + msg.content + '\n\n';
            } else if (msg.type === 'assistant') {
                md += '## DATA-AI\n\n' + msg.content + '\n\n';
            }
        });
        downloadFile(conv.title + '.md', md, 'text/markdown');
    }

    function exportConversationJSON() {
        if (!currentConvId || !conversations[currentConvId]) return;
        var json = JSON.stringify(conversations[currentConvId], null, 2);
        downloadFile(currentConvId + '.json', json, 'application/json');
    }

    function downloadFile(filename, content, mimeType) {
        var blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
        scrollToBottom(false);
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
            '</div>' +
            '<div class="welcome-shortcuts">' +
            '<div class="welcome-shortcut-item"><kbd>Enter</kbd> 发送</div>' +
            '<div class="welcome-shortcut-item"><kbd>Shift + Enter</kbd> 换行</div>' +
            '<div class="welcome-shortcut-item"><kbd>Ctrl + /</kbd> 快捷键</div>' +
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
                actions += '<button class="message-action-btn speech-btn" data-action="speak" title="朗读"><i class="fa-solid fa-volume-high"></i></button>';
                actions += '<button class="message-action-btn" data-action="reaction" title="表情反应"><i class="fa-regular fa-face-smile"></i></button>';
                actions += '<button class="message-action-btn" data-action="quick-reply" title="快捷回复"><i class="fa-regular fa-message-circle"></i></button>';
                actions += '<button class="message-action-btn" data-action="regenerate" title="重新生成"><i class="fa-solid fa-rotate"></i></button>';
                actions += '<button class="message-action-btn" data-action="download-ppt" title="下载PPT"><i class="fa-solid fa-file-powerpoint"></i></button>';
                actions += '<button class="message-action-btn" data-action="thumbs-up" title="有帮助"><i class="fa-regular fa-thumbs-up"></i></button>';
                actions += '<button class="message-action-btn" data-action="thumbs-down" title="需改进"><i class="fa-regular fa-thumbs-down"></i></button>';
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
                    else if (action === 'download-ppt') window.__generatePPT();
                    else if (action === 'edit') editMessage(msgId);
                    else if (action === 'thumbs-up') handleFeedback(msgEl, msgId, 'up');
                    else if (action === 'thumbs-down') handleFeedback(msgEl, msgId, 'down');
                    else if (action === 'speak') speakMessage(msgEl, btn);
                    else if (action === 'reaction') showReactionPicker(msgId);
                    else if (action === 'quick-reply') showQuickReplies(msgId);
                });
            });
        });
    }

    function speakMessage(msgEl, btn) {
        var contentEl = msgEl.querySelector('.message-content');
        if (!contentEl) return;

        var text = contentEl.innerText || contentEl.textContent;
        if (!text.trim()) return;

        var allSpeechBtns = document.querySelectorAll('[data-action="speak"]');
        allSpeechBtns.forEach(function(b) {
            b.classList.remove('speaking');
            b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        });

        btn.classList.add('speaking');
        btn.innerHTML = '<i class="fa-solid fa-stop"></i>';

        speak(text);

        setTimeout(function() {
            btn.classList.remove('speaking');
            btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }, text.length * 100 + 500);
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

        var userMsg = null;
        for (var i = idx - 1; i >= 0; i--) {
            if (msgs[i].type === 'user') {
                userMsg = msgs[i];
                break;
            }
        }
        if (!userMsg) return;

        conversations[currentConvId].messages = msgs.slice(0, idx);
        saveConversations();
        renderChatArea();

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
        updateSendButton();
        inputBox.focus();

        conversations[currentConvId].messages = msgs.slice(0, idx);
        saveConversations();
        renderChatArea();
    }

    // ==================== Feedback (Thumbs Up/Down) ====================
    function handleFeedback(msgEl, msgId, type) {
        var existing = msgEl.querySelector('.feedback-options');
        if (existing) { existing.remove(); return; }

        var feedbackData = loadFeedbackData();
        var saved = feedbackData[msgId];

        var options = type === 'up'
            ? ['准确有用', '清晰易懂', '回答完整']
            : ['不准确', '不相关', '太复杂'];

        var html = '<div class="feedback-options">';
        options.forEach(function (opt) {
            var isActive = saved === opt;
            html += '<button class="feedback-option-btn' + (isActive ? ' active-feedback' : '') + '" data-feedback="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</button>';
        });
        html += '</div>';

        var msgBody = msgEl.querySelector('.message-body');
        if (msgBody) {
            msgBody.insertAdjacentHTML('beforeend', html);

            msgBody.querySelectorAll('.feedback-option-btn').forEach(function (fbBtn) {
                fbBtn.addEventListener('click', function () {
                    var val = fbBtn.getAttribute('data-feedback');
                    feedbackData[msgId] = val;
                    saveFeedbackData(feedbackData);
                    msgBody.querySelectorAll('.feedback-option-btn').forEach(function (b) {
                        b.classList.remove('active-feedback');
                    });
                    fbBtn.classList.add('active-feedback');
                    showToast('感谢你的反馈', 'success');
                });
            });
        }
    }

    function loadFeedbackData() {
        try {
            return JSON.parse(localStorage.getItem('data-ai-feedback') || '{}');
        } catch (e) { return {}; }
    }

    function saveFeedbackData(data) {
        try {
            localStorage.setItem('data-ai-feedback', JSON.stringify(data));
        } catch (e) { /* ignore */ }
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
            handleThinkingPhase(data, chatArea);

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
            pendingStreamText = '';
            scrollToBottom();

        } else if (data.type === 'stream_data') {
            pendingStreamText += data.content;

            var streamingEl = chatArea.querySelector('.message.streaming .stream-text');
            if (streamingEl) {
                streamingEl.setAttribute('data-raw', pendingStreamText);
                streamingEl.innerHTML = renderMarkdown(pendingStreamText);
            }

            scrollToBottom(true);

        } else if (data.type === 'stream_end') {
            // Cancel any pending rAF
            if (streamRafId) {
                cancelAnimationFrame(streamRafId);
                streamRafId = null;
            }

            var streamMsg = chatArea.querySelector('.message.streaming');
            if (streamMsg) {
                streamMsg.classList.remove('streaming');
                var streamTextEl = streamMsg.querySelector('.stream-text');
                if (streamTextEl) {
                    var finalText = streamTextEl.getAttribute('data-raw') || pendingStreamText;
                    streamTextEl.removeAttribute('data-raw');
                    streamTextEl.innerHTML = renderMarkdown(finalText);
                    highlightAllCode();

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
                pendingStreamText = '';
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
                '<button class="message-action-btn" data-action="thumbs-up" title="有帮助"><i class="fa-regular fa-thumbs-up"></i></button>' +
                '<button class="message-action-btn" data-action="thumbs-down" title="需改进"><i class="fa-regular fa-thumbs-down"></i></button>' +
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

        } else if (data.type === 'rag_sources') {
            var sources = data.sources || [];
            if (sources.length === 0) return;

            var lastAssistant = chatArea.querySelector('.message.assistant:last-of-type');
            if (!lastAssistant) return;

            var existingRefs = lastAssistant.querySelector('.rag-references');
            if (existingRefs) existingRefs.remove();

            var refsHtml = '<div class="rag-references">' +
                '<div class="rag-references-title"><i class="fa-solid fa-book"></i> 知识库引用 (' + sources.length + ')</div>' +
                '<div class="rag-references-list">';

            sources.forEach(function (src) {
                var name = src.metadata ? (src.metadata.name || '未知文档') : '未知文档';
                var score = src.score || 0;
                var snippet = (src.content || '').substring(0, 100);
                if ((src.content || '').length > 100) snippet += '...';
                refsHtml += '<div class="rag-ref-item" title="' + escapeHtml(src.content || '') + '">' +
                    '<div class="rag-ref-header">' +
                    '<span class="rag-ref-name"><i class="fa-solid fa-file-lines"></i> ' + escapeHtml(name) + '</span>' +
                    '<span class="rag-ref-score">相关度: ' + (score * 100).toFixed(1) + '%</span>' +
                    '</div>' +
                    '<div class="rag-ref-snippet">' + escapeHtml(snippet) + '</div>' +
                    '</div>';
            });

            refsHtml += '</div></div>';

            var msgBody = lastAssistant.querySelector('.message-body');
            if (msgBody) {
                msgBody.insertAdjacentHTML('beforeend', refsHtml);
            }
            scrollToBottom();
        }
    }

    window.__toggleThinking = function (header) {
        var content = header.nextElementSibling;
        var toggle = header.querySelector('.thinking-toggle');
        if (content) content.classList.toggle('collapsed');
        if (toggle) toggle.classList.toggle('collapsed');
    };

    // ==================== Thinking Animation System ====================
    var thinkingPhases = [];
    var currentPhaseIndex = 0;
    var phaseTimestamps = [];

    var PHASE_TYPES = {
        intent_recognition: { icon: '🧠', label: '意图识别', color: '#8b5cf6' },
        knowledge_search: { icon: '🔍', label: '知识检索', color: '#3b82f6' },
        tool_selection: { icon: '🛠️', label: '工具选择', color: '#10a37f' },
        plan_generation: { icon: '📋', label: '计划生成', color: '#f59e0b' },
        api_call: { icon: '📡', label: 'API调用', color: '#ef4444' },
        response_generation: { icon: '✍️', label: '响应生成', color: '#22c55e' },
        summarization: { icon: '📝', label: '总结整理', color: '#6366f1' },
        analysis: { icon: '🔬', label: '深度分析', color: '#ec4899' }
    };

    function handleThinkingPhase(data, chatArea) {
        var thinkingEl = chatArea.querySelector('.thinking-container');
        if (!thinkingEl) {
            thinkingEl = document.createElement('div');
            thinkingEl.className = 'thinking-container';
            chatArea.appendChild(thinkingEl);
            thinkingPhases = [];
            currentPhaseIndex = 0;
            phaseTimestamps = [];
        }

        var phaseType = data.phase || 'analysis';
        var phaseInfo = PHASE_TYPES[phaseType] || { icon: '🤔', label: '处理中', color: '#6b7280' };

        var phaseNum = thinkingPhases.length + 1;
        var phaseData = {
            id: Date.now(),
            type: phaseType,
            title: data.title || phaseInfo.label,
            content: data.content || '',
            icon: phaseInfo.icon,
            color: phaseInfo.color,
            startTime: Date.now()
        };
        thinkingPhases.push(phaseData);

        var phaseEl = document.createElement('div');
        phaseEl.className = 'thinking-item active';
        phaseEl.setAttribute('data-phase-type', phaseType);

        var progressBar = '';
        if (data.progress !== undefined) {
            progressBar = `<div class="thinking-progress"><div class="thinking-progress-bar" style="width: ${data.progress}%"></div></div>`;
        }

        phaseEl.innerHTML = `
            <div class="thinking-header" onclick="window.__toggleThinking(this)">
                <div class="thinking-badge" style="background: ${phaseInfo.color}">${phaseInfo.icon}</div>
                <div class="thinking-title">
                    <span class="phase-label">${phaseNum}. ${phaseInfo.label}</span>
                    <span class="phase-title-text">${escapeHtml(data.title || '')}</span>
                    <span class="thinking-dots"><span></span><span></span><span></span></span>
                </div>
                <div class="thinking-time">0.0s</div>
                <div class="thinking-toggle"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
            ${progressBar}
            <div class="thinking-content">${renderMarkdown(data.content || '')}</div>
        `;

        thinkingEl.appendChild(phaseEl);

        updatePhaseTimers();
        scrollToBottom();

        addLog(`思考阶段: ${phaseInfo.label} - ${data.title || ''}`, 'info');
    }

    function updatePhaseTimers() {
        var thinkingItems = document.querySelectorAll('.thinking-item');
        thinkingItems.forEach(function(item, index) {
            var timeEl = item.querySelector('.thinking-time');
            if (timeEl && thinkingPhases[index]) {
                var elapsed = (Date.now() - thinkingPhases[index].startTime) / 1000;
                timeEl.textContent = elapsed.toFixed(1) + 's';
            }
        });

        if (isStreaming === false) {
            requestAnimationFrame(updatePhaseTimers);
        }
    }

    function simulateThinkingSequence(text, chatArea) {
        var phases = [
            { type: 'intent_recognition', title: '正在分析用户意图...', delay: 800 },
            { type: 'knowledge_search', title: '检索相关知识...', delay: 1200 },
            { type: 'plan_generation', title: '制定响应计划...', delay: 600 },
            { type: 'response_generation', title: '生成响应内容...', delay: 400 }
        ];

        phases.forEach(function(phase, index) {
            setTimeout(function() {
                var thinkingEl = chatArea.querySelector('.thinking-container');
                if (!thinkingEl) return;

                var prevPhase = thinkingEl.querySelector('.thinking-item.active');
                if (prevPhase) prevPhase.classList.remove('active');

                handleThinkingPhase(phase, chatArea);
            }, phases.slice(0, index).reduce(function(sum, p) { return sum + p.delay; }, 0));
        });
    }

    function finishProcessing() {
        isStreaming = false;
        isGenerating = false;
        updateSendButton();
        updateStopButton();
        showToast('回复完成', 'success');

        // Process pending user messages
        processPendingMessages();
    }

    // ==================== Stop Generation ====================
    function stopGeneration() {
        if (!isGenerating) return;
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'stop' }));
        }
        // Clean up streaming state
        if (streamRafId) {
            cancelAnimationFrame(streamRafId);
            streamRafId = null;
        }
        var chatArea = $('#chat-area');
        var streamMsg = chatArea.querySelector('.message.streaming');
        if (streamMsg) {
            streamMsg.classList.remove('streaming');
            var streamTextEl = streamMsg.querySelector('.stream-text');
            if (streamTextEl) {
                var finalText = streamTextEl.getAttribute('data-raw') || pendingStreamText || streamTextEl.textContent;
                streamTextEl.removeAttribute('data-raw');
                streamTextEl.innerHTML = renderMarkdown(finalText);
                highlightAllCode();

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
        pendingStreamText = '';
        var tc = chatArea.querySelector('.thinking-container');
        if (tc) tc.remove();

        isStreaming = false;
        isGenerating = false;
        updateSendButton();
        updateStopButton();
        showToast('已停止生成', 'info');
    }

    function updateStopButton() {
        var stopBtn = $('#stop-btn');
        var sendBtn = $('#send-btn');
        if (!stopBtn || !sendBtn) return;

        if (isGenerating) {
            stopBtn.classList.add('visible');
            sendBtn.style.display = 'none';
        } else {
            stopBtn.classList.remove('visible');
            sendBtn.style.display = 'flex';
        }
    }

    function initStopButton() {
        var stopBtn = $('#stop-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', stopGeneration);
        }
    }

    // ==================== Message Queue ====================
    function processPendingMessages() {
        if (isStreaming || pendingUserMessages.length === 0) {
            updateQueueIndicator();
            return;
        }
        var nextMsg = pendingUserMessages.shift();
        updateQueueIndicator();
        sendToWebSocket(nextMsg);
    }

    function updateQueueIndicator() {
        var indicator = $('#message-queue-indicator');
        var countText = $('#queue-count-text');
        if (!indicator || !countText) return;

        var count = pendingUserMessages.length;
        if (count > 0) {
            countText.textContent = count + ' 条消息排队中';
            indicator.classList.add('visible');
        } else {
            indicator.classList.remove('visible');
        }
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

        // Add user message to UI immediately
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

        // Search knowledge base
        searchKnowledgeBase(content);

        // Handle intent and send message
        handleIntent(content).then(function(intent) {
            if (intent && intent.handler) {
                showToast('识别到意图: ' + intent.display, 'info');
                intent.handler(content);
                return;
            }

            // Send to WebSocket or queue
            if (isStreaming) {
                pendingUserMessages.push(content);
                updateQueueIndicator();
            } else {
                sendToWebSocket(content, intent);
            }
        }).catch(function(err) {
            console.error('Intent handling error:', err);
            sendToWebSocket(content, null);
        });
    }

    // ==================== RAG Knowledge Base Search ====================
    function searchKnowledgeBase(query) {
        if (!query || !query.trim()) return;
        httpPost('/api/knowledge-bases/search', {
            query: query,
            top_k: 3,
            min_score: 0.1
        }).then(function (res) {
            if (!res.ok) return;
            return res.json();
        }).then(function (results) {
            if (!results || results.length === 0) return;
            var chatArea = $('#chat-area');
            var lastUserMsg = chatArea.querySelector('.message.user:last-of-type');
            if (lastUserMsg) {
                var existingPreview = lastUserMsg.querySelector('.rag-search-preview');
                if (existingPreview) existingPreview.remove();

                var previewHtml = '<div class="rag-search-preview">' +
                    '<i class="fa-solid fa-book"></i> 已检索知识库，找到 ' + results.length + ' 条相关内容</div>';
                var msgBody = lastUserMsg.querySelector('.message-body');
                if (msgBody) {
                    msgBody.insertAdjacentHTML('beforeend', previewHtml);
                }
            }
        }).catch(function (e) {
            console.log('KB search skipped:', e.message);
        });
    }

    function sendToWebSocket(content, intent) {
        isStreaming = true;
        isGenerating = true;
        updateSendButton();
        updateStopButton();

        var payload = {
            type: 'chat',
            content: content,
            options: {
                web_search: webSearchEnabled,
                intent: intent ? intent.intent : 'general'
            }
        };

        console.log('[WS] Sending message:', payload);

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
            addLog('发送消息到服务器', 'ws');
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
                if (inputBox.value.trim()) {
                    sendMessage();
                }
            }
            // Up Arrow - edit last user message when input is empty
            if (e.key === 'ArrowUp' && !inputBox.value.trim()) {
                e.preventDefault();
                editLastUserMessage();
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
                if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files);
            });
        }

        // Paste images
        inputBox.addEventListener('paste', function (e) {
            var items = e.clipboardData && e.clipboardData.items;
            if (!items) return;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    e.preventDefault();
                    var file = items[i].getAsFile();
                    if (file) handleFileUpload([file]);
                    return;
                }
            }
        });

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

        // Polish button
        var polishBtn = $('#polish-btn');
        if (polishBtn) {
            polishBtn.addEventListener('click', function () {
                togglePanel('polish-panel');
            });
        }

        // Meeting minutes button
        var meetingBtn = $('#meeting-btn');
        if (meetingBtn) {
            meetingBtn.addEventListener('click', function () {
                togglePanel('meeting-panel');
            });
        }

        // Summary button
        var summaryBtn = $('#summary-btn');
        if (summaryBtn) {
            summaryBtn.addEventListener('click', function () {
                togglePanel('summary-panel');
            });
        }

        // Memory button
        var memoryBtn = $('#memory-btn');
        if (memoryBtn) {
            memoryBtn.addEventListener('click', function () {
                togglePanel('memory-panel');
            });
        }

        // Panel close buttons
        initPanelCloseButtons();

        // Memory tabs
        initMemoryTabs();

        // Swap language button
        var swapLangBtn = $('#swap-lang-btn');
        if (swapLangBtn) {
            swapLangBtn.addEventListener('click', swapLanguages);
        }

        // Polish mode buttons
        var polishModeBtns = document.querySelectorAll('.polish-mode-btn');
        polishModeBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                polishModeBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        updateSendButton();
    }

    function togglePanel(panelId) {
        var panel = $('#' + panelId);
        if (!panel) return;

        var allPanels = document.querySelectorAll('.feature-panel');
        allPanels.forEach(function(p) {
            if (p.id !== panelId) {
                p.classList.add('hidden');
            }
        });

        panel.classList.toggle('hidden');
    }

    function initPanelCloseButtons() {
        var closeButtons = document.querySelectorAll('.panel-close');
        closeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var panel = this.closest('.feature-panel');
                if (panel) {
                    panel.classList.add('hidden');
                }
            });
        });
    }

    function initMemoryTabs() {
        var memoryTabs = document.querySelectorAll('.memory-tab');
        memoryTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                var tabId = this.getAttribute('data-tab');
                memoryTabs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');

                var allContents = document.querySelectorAll('.memory-tab-content');
                allContents.forEach(function(c) { c.classList.remove('active'); });
                var activeContent = $('#memory-' + tabId);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }

    function swapLanguages() {
        var fromSelect = $('#polish-from-lang');
        var toSelect = $('#polish-to-lang');
        if (!fromSelect || !toSelect) return;

        var temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
    }

    function editLastUserMessage() {
        if (!currentConvId || !conversations[currentConvId]) return;
        var msgs = conversations[currentConvId].messages;
        for (var i = msgs.length - 1; i >= 0; i--) {
            if (msgs[i].type === 'user') {
                editMessage(msgs[i].id);
                return;
            }
        }
    }

    // ==================== File Upload ====================
    function handleFileUpload(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            attachedFiles.push(file);
            renderFilePreviews();
            showToast('已添加文件: ' + file.name, 'info');
        }
    }

    function renderFilePreviews() {
        var container = $('#file-preview-list');
        if (!container) return;

        if (attachedFiles.length === 0) {
            container.innerHTML = '';
            return;
        }

        var html = '';
        attachedFiles.forEach(function (file, idx) {
            var icon = getFileIcon(file.name);
            html += '<div class="file-preview-card">' +
                '<i class="fa-solid ' + icon + ' file-icon"></i>' +
                '<div class="file-info">' +
                '<div class="file-name">' + escapeHtml(file.name) + '</div>' +
                '<div class="file-size">' + formatFileSize(file.size) + '</div>' +
                '</div>' +
                '<button class="file-remove" data-file-idx="' + idx + '" title="移除"><i class="fa-solid fa-xmark"></i></button>' +
                '</div>';
        });

        container.innerHTML = html;

        container.querySelectorAll('.file-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-file-idx'));
                attachedFiles.splice(idx, 1);
                renderFilePreviews();
            });
        });
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
        var artifactsBtn = $('#sidebar-artifacts-btn');
        var logsBtn = $('#sidebar-logs-btn');
        var settingsBtn = $('#sidebar-settings-btn');

        if (kbBtn) kbBtn.addEventListener('click', function () { openDrawer('kb-drawer', 'kb-drawer-overlay'); loadKnowledgeBases(); closeSidebar(); });
        if (skillBtn) skillBtn.addEventListener('click', function () { openDrawer('settings-drawer', 'settings-drawer-overlay'); closeSidebar(); setTimeout(function() { switchTab('tab-skills'); }, 300); });
        if (mcpBtn) mcpBtn.addEventListener('click', function () { openDrawer('settings-drawer', 'settings-drawer-overlay'); closeSidebar(); setTimeout(function() { switchTab('tab-mcp'); }, 300); });
        if (artifactsBtn) artifactsBtn.addEventListener('click', function () { var panel = $('#artifacts-panel'); var toggle = $('#artifacts-toggle-btn'); if (panel) panel.classList.toggle('open'); if (toggle) toggle.classList.toggle('active'); closeSidebar(); });
        if (logsBtn) logsBtn.addEventListener('click', function () { var panel = $('#logs-panel'); if (panel) panel.classList.add('open'); closeSidebar(); });
        if (settingsBtn) settingsBtn.addEventListener('click', function () { openDrawer('settings-drawer', 'settings-drawer-overlay'); closeSidebar(); });
    }

    // ==================== Log System ====================
    var logs = [];
    var currentLogFilter = 'all';
    var logSearchQuery = '';
    var LOG_TYPE_DISPLAY = {
        debug: '调试',
        info: '信息',
        success: '成功',
        warning: '警告',
        error: '错误',
        api: 'API',
        ws: 'WS',
        system: '系统'
    };

    function addLog(message, type, meta) {
        type = type || 'info';
        var now = new Date();
        var log = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            time: now.toLocaleTimeString('zh-CN', { hour12: false }),
            timestamp: now.toISOString(),
            message: message,
            type: type,
            meta: meta || null,
            details: null
        };
        logs.unshift(log);

        if (logs.length > 5000) {
            logs = logs.slice(0, 5000);
        }

        renderLogs();
        updateLogStats();

        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    function addAPILog(method, url, status, duration) {
        addLog(`${method} ${url} - ${status} (${duration}ms)`, 'api', {
            method: method,
            url: url,
            status: status,
            duration: duration
        });
    }

    function addWSLog(event, data) {
        var msg = `WebSocket ${event}`;
        if (data) {
            try {
                var parsed = typeof data === 'string' ? JSON.parse(data) : data;
                if (parsed.type) {
                    msg += ` [${parsed.type}]`;
                }
            } catch (e) {
                msg += ` (${data.length} bytes)`;
            }
        }
        addLog(msg, 'ws');
    }

    function addSystemLog(message) {
        addLog(message, 'system');
    }

    function updateLogStats() {
        var statsEl = $('#logs-panel-stats');
        if (!statsEl) return;

        var stats = {
            total: logs.length,
            error: logs.filter(l => l.type === 'error').length,
            warning: logs.filter(l => l.type === 'warning').length
        };
        statsEl.textContent = `${stats.total} 条日志 | ${stats.error} 错误 | ${stats.warning} 警告`;
    }

    function renderLogs() {
        var panelBody = $('#logs-panel-body');
        if (!panelBody) return;

        var filteredLogs = logs.filter(function(log) {
            if (currentLogFilter !== 'all' && log.type !== currentLogFilter) {
                return false;
            }
            if (logSearchQuery) {
                var query = logSearchQuery.toLowerCase();
                return log.message.toLowerCase().includes(query);
            }
            return true;
        });

        if (filteredLogs.length === 0) {
            panelBody.innerHTML = '<div class="logs-empty"><i class="fa-solid fa-file-text"></i><span>' +
                (logSearchQuery ? '没有找到匹配的日志' : '暂无日志') + '</span></div>';
            return;
        }

        panelBody.innerHTML = filteredLogs.map(function(log) {
            var metaHtml = '';
            var expanderHtml = '';

            if (log.meta) {
                metaHtml = '<div class="log-meta">';
                Object.keys(log.meta).forEach(function(key) {
                    metaHtml += `<span>${key}: ${log.meta[key]}</span>`;
                });
                metaHtml += '</div>';
            }

            if (log.details) {
                expanderHtml = '<div class="log-expander"><pre>' + escapeHtml(JSON.stringify(log.details, null, 2)) + '</pre></div>';
            }

            return `
                <div class="log-entry ${log.type}" data-log-id="${log.id}" onclick="window.__toggleLogDetails('${log.id}')">
                    <div class="log-header">
                        <span class="log-time">${log.time}</span>
                        <span class="log-type ${log.type}">${LOG_TYPE_DISPLAY[log.type] || log.type}</span>
                        <span class="log-timestamp">${log.timestamp}</span>
                    </div>
                    <div class="log-message">${escapeHtml(log.message)}</div>
                    ${metaHtml}
                    ${expanderHtml}
                </div>
            `;
        }).join('');
    }

    window.__toggleLogDetails = function(logId) {
        var entry = document.querySelector(`[data-log-id="${logId}"]`);
        if (entry) {
            entry.classList.toggle('expanded');
        }
    };

    function initLogsPanel() {
        var closeBtn = $('#logs-panel-close');
        var clearBtn = $('#logs-panel-clear');
        var exportBtn = $('#logs-panel-export');
        var searchInput = $('#logs-search-input');
        var filterBtns = document.querySelectorAll('.log-filter-btn');

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                var panel = $('#logs-panel');
                if (panel) panel.classList.remove('open');
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                logs = [];
                renderLogs();
                updateLogStats();
                addLog('日志已清空', 'success');
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', exportLogs);
        }

        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                logSearchQuery = searchInput.value.trim();
                renderLogs();
            }, 150));
        }

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentLogFilter = btn.dataset.filter;
                renderLogs();
            });
        });
    }

    function exportLogs() {
        if (logs.length === 0) {
            showToast('没有日志可导出', 'info');
            return;
        }

        var exportData = logs.map(function(log) {
            return {
                timestamp: log.timestamp,
                time: log.time,
                type: log.type,
                message: log.message,
                meta: log.meta
            };
        });

        downloadFile('logs.json', JSON.stringify(exportData, null, 2), 'application/json');
        showToast('日志已导出', 'success');
    }

    // ==================== Learning System ====================
    var learningData = {
        feedbacks: [],
        patterns: [],
        preferences: {}
    };

    function initLearningSystem() {
        loadLearningData();
        addLog('学习系统初始化完成', 'system');
    }

    function loadLearningData() {
        try {
            var stored = localStorage.getItem('ai-learning-data');
            if (stored) {
                learningData = JSON.parse(stored);
                addLog('学习数据加载成功', 'info');
            }
        } catch (e) {
            addLog('学习数据加载失败: ' + e.message, 'error');
        }
    }

    function saveLearningData() {
        try {
            localStorage.setItem('ai-learning-data', JSON.stringify(learningData));
        } catch (e) {
            addLog('学习数据保存失败: ' + e.message, 'error');
        }
    }

    function addUserFeedback(messageId, feedbackType, comment) {
        var feedback = {
            id: Date.now(),
            messageId: messageId,
            type: feedbackType,
            comment: comment || '',
            timestamp: new Date().toISOString()
        };
        learningData.feedbacks.push(feedback);

        if (learningData.feedbacks.length > 1000) {
            learningData.feedbacks = learningData.feedbacks.slice(-1000);
        }

        analyzeFeedbackPatterns();
        saveLearningData();
        addLog(`用户反馈: ${feedbackType} - ${messageId}`, 'system');
    }

    function analyzeFeedbackPatterns() {
        var patternAnalysis = {
            positive: 0,
            negative: 0,
            suggestions: []
        };

        learningData.feedbacks.forEach(function(fb) {
            if (fb.type === 'thumbs_up') patternAnalysis.positive++;
            if (fb.type === 'thumbs_down') patternAnalysis.negative++;
            if (fb.type === 'suggestion' && fb.comment) {
                patternAnalysis.suggestions.push(fb.comment);
            }
        });

        addLog(`反馈分析: 正面${patternAnalysis.positive}条, 负面${patternAnalysis.negative}条`, 'info');
        return patternAnalysis;
    }

    function analyzeConversationHistory() {
        var analysis = {
            totalMessages: messages.length,
            topics: [],
            frequentPatterns: {},
            responseTimeStats: []
        };

        messages.forEach(function(msg) {
            if (msg.role === 'user') {
                var topic = classifyTopic(msg.content);
                if (topic) {
                    analysis.topics.push(topic);
                    analysis.frequentPatterns[topic] =
                        (analysis.frequentPatterns[topic] || 0) + 1;
                }
            }
            if (msg.responseTime) {
                analysis.responseTimeStats.push(msg.responseTime);
            }
        });

        return analysis;
    }

    function classifyTopic(text) {
        var topicKeywords = {
            '总结': ['总结', '概括', '摘要', '要点'],
            '翻译': ['翻译', '润色', '语言', '英文', '中文'],
            'PPT': ['PPT', '幻灯片', '演示', '汇报'],
            '代码': ['代码', '编程', '开发', 'function', 'import'],
            '图表': ['图表', '可视化', '图表生成', '数据图'],
            '问题解决': ['问题', '错误', 'bug', '修复', '怎么办'],
            '知识问答': ['什么是', '如何', '为什么', '原理'],
            '创意生成': ['写', '创作', '生成', '设计']
        };

        for (var topic in topicKeywords) {
            if (topicKeywords[topic].some(function(kw) {
                return text.includes(kw);
            })) {
                return topic;
            }
        }
        return '其他';
    }

    function getLearningInsights() {
        var feedbackAnalysis = analyzeFeedbackPatterns();
        var conversationAnalysis = analyzeConversationHistory();

        return {
            feedback: feedbackAnalysis,
            conversation: conversationAnalysis,
            suggestions: generateSuggestions(feedbackAnalysis, conversationAnalysis)
        };
    }

    function generateSuggestions(feedback, conversation) {
        var suggestions = [];

        if (feedback.negative > feedback.positive * 0.5) {
            suggestions.push('建议检查最近的负面反馈，优化响应质量');
        }

        var topTopics = Object.entries(conversation.frequentPatterns)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        if (topTopics.length > 0) {
            suggestions.push(`用户最常讨论的话题: ${topTopics.map(t => t[0]).join(', ')}`);
        }

        return suggestions;
    }

    function learnFromInteraction(userMessage, response, success) {
        var learningEntry = {
            id: Date.now(),
            userInput: userMessage,
            response: response,
            success: success,
            timestamp: new Date().toISOString(),
            intent: detectIntent(userMessage)
        };

        if (!learningData.patterns.some(function(p) {
            return p.userInput === userMessage;
        })) {
            learningData.patterns.push(learningEntry);
            if (learningData.patterns.length > 500) {
                learningData.patterns = learningData.patterns.slice(-500);
            }
            saveLearningData();
        }
    }

    function detectIntent(text) {
        var intents = {
            'summarize': ['总结', '概括', '摘要'],
            'translate': ['翻译', '润色', '翻译为', '英文'],
            'generate_ppt': ['生成PPT', 'PPT', '幻灯片'],
            'generate_code': ['写代码', '代码', '编程'],
            'generate_chart': ['图表', '可视化', '图表生成'],
            'question': ['什么是', '为什么', '如何', '怎样'],
            'complaint': ['不行', '不好', '错误', '失败'],
            'praise': ['好', '棒', '不错', '优秀']
        };

        for (var intent in intents) {
            if (intents[intent].some(function(kw) {
                return text.includes(kw);
            })) {
                return intent;
            }
        }
        return 'unknown';
    }

    // ==================== Error Handling System ====================
    var errorHandler = {
        errors: [],
        retryCount: {},
        maxRetries: 3,
        rateLimitReset: null
    };

    function initErrorHandling() {
        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handlePromiseRejection);
        addLog('异常处理系统初始化完成', 'system');
    }

    function handleGlobalError(event) {
        logError('global', event.message, {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    }

    function handlePromiseRejection(event) {
        logError('promise', event.reason ? event.reason.message || event.reason : 'Unknown', {
            reason: event.reason
        });
    }

    function logError(type, message, details) {
        var error = {
            id: Date.now(),
            type: type,
            message: message,
            details: details,
            timestamp: new Date().toISOString()
        };

        errorHandler.errors.push(error);
        if (errorHandler.errors.length > 500) {
            errorHandler.errors = errorHandler.errors.slice(-500);
        }

        addLog(`[ERROR] ${type}: ${message}`, 'error');

        if (type === 'api') {
            handleAPIError(message, details);
        }
    }

    function handleAPIError(message, details) {
        if (message.includes('429') || message.includes('rate limit')) {
            errorHandler.rateLimitReset = Date.now() + 60000;
            addLog('API限流，等待60秒后重试', 'warning');
        }

        if (details && details.status === 500) {
            triggerRetry(details.url, details.options, details.retryCount || 0);
        }
    }

    function triggerRetry(url, options, count) {
        if (count >= errorHandler.maxRetries) {
            addLog(`重试失败 ${count} 次，放弃请求: ${url}`, 'error');
            return;
        }

        var delay = Math.pow(2, count) * 1000;
        addLog(`重试第 ${count + 1} 次，延迟 ${delay}ms: ${url}`, 'warning');

        setTimeout(function() {
            fetch(url, options)
                .then(function(response) {
                    if (!response.ok) throw new Error('Retry failed');
                    addLog(`重试成功: ${url}`, 'success');
                })
                .catch(function() {
                    triggerRetry(url, options, count + 1);
                });
        }, delay);
    }

    function safeFetch(url, options) {
        var retries = errorHandler.retryCount[url] || 0;

        return fetch(url, options)
            .then(function(response) {
                if (response.status === 429) {
                    throw new Error('Rate limited');
                }
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                errorHandler.retryCount[url] = 0;
                return response;
            })
            .catch(function(error) {
                addLog(`请求失败: ${url} - ${error.message}`, 'error');

                if (retries < errorHandler.maxRetries) {
                    errorHandler.retryCount[url] = retries + 1;
                    return new Promise(function(resolve) {
                        setTimeout(function() {
                            resolve(safeFetch(url, options));
                        }, Math.pow(2, retries) * 1000);
                    });
                }

                throw error;
            });
    }

    // ==================== Memory & Cache System ====================
    var memoryCache = {
        shortTerm: {},
        longTerm: {},
        contextWindow: []
    };

    function initMemorySystem() {
        loadLongTermMemory();
        addLog('记忆系统初始化完成', 'system');
    }

    function loadLongTermMemory() {
        try {
            var stored = localStorage.getItem('ai-longterm-memory');
            if (stored) {
                memoryCache.longTerm = JSON.parse(stored);
            }
        } catch (e) {
            addLog('长期记忆加载失败: ' + e.message, 'error');
        }
    }

    function saveLongTermMemory() {
        try {
            localStorage.setItem('ai-longterm-memory', JSON.stringify(memoryCache.longTerm));
        } catch (e) {
            addLog('长期记忆保存失败: ' + e.message, 'error');
        }
    }

    function addToContext(message) {
        memoryCache.contextWindow.push({
            id: Date.now(),
            content: message,
            timestamp: new Date().toISOString()
        });

        if (memoryCache.contextWindow.length > 20) {
            memoryCache.contextWindow = memoryCache.contextWindow.slice(-20);
        }
    }

    function getContext() {
        return memoryCache.contextWindow.map(function(m) {
            return m.content;
        }).join('\n');
    }

    function remember(key, value, duration) {
        var expires = duration ? Date.now() + duration : null;

        memoryCache.shortTerm[key] = {
            value: value,
            expires: expires,
            timestamp: new Date().toISOString()
        };

        cleanExpiredCache();
    }

    function recall(key) {
        cleanExpiredCache();
        var item = memoryCache.shortTerm[key];
        return item ? item.value : null;
    }

    function cleanExpiredCache() {
        var now = Date.now();
        for (var key in memoryCache.shortTerm) {
            if (memoryCache.shortTerm[key].expires &&
                memoryCache.shortTerm[key].expires < now) {
                delete memoryCache.shortTerm[key];
            }
        }
    }

    function storeLongTerm(key, value) {
        memoryCache.longTerm[key] = {
            value: value,
            timestamp: new Date().toISOString(),
            accessCount: 1
        };
        saveLongTermMemory();
    }

    function retrieveLongTerm(key) {
        var item = memoryCache.longTerm[key];
        if (item) {
            item.accessCount++;
            saveLongTermMemory();
            return item.value;
        }
        return null;
    }

    function getRelevantMemory(query) {
        var relevant = [];

        for (var key in memoryCache.longTerm) {
            if (key.toLowerCase().includes(query.toLowerCase()) ||
                JSON.stringify(memoryCache.longTerm[key].value).toLowerCase().includes(query.toLowerCase())) {
                relevant.push({
                    key: key,
                    value: memoryCache.longTerm[key].value,
                    score: memoryCache.longTerm[key].accessCount
                });
            }
        }

        return relevant.sort((a, b) => b.score - a.score).slice(0, 5);
    }

    // ==================== Speech Synthesis System ====================
    var speechSynthesisSupported = false;
    var voices = [];
    var currentVoice = null;

    function initSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            speechSynthesisSupported = true;

            var loadVoices = function() {
                voices = window.speechSynthesis.getVoices();
                currentVoice = voices.find(function(v) {
                    return v.lang.startsWith('zh') || v.lang.startsWith('zh-CN');
                }) || voices[0];
                addLog('语音合成引擎就绪', 'system');
            };

            loadVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        } else {
            addLog('浏览器不支持语音合成', 'warning');
        }
    }

    function speak(text, rate) {
        if (!speechSynthesisSupported) {
            showToast('浏览器不支持语音合成', 'warning');
            return;
        }

        window.speechSynthesis.cancel();

        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = currentVoice;
        utterance.rate = rate || 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = function() {
            addLog('开始语音合成', 'info');
        };

        utterance.onend = function() {
            addLog('语音合成完成', 'info');
        };

        utterance.onerror = function(event) {
            addLog('语音合成错误: ' + event.error, 'error');
        };

        window.speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
        if (speechSynthesisSupported) {
            window.speechSynthesis.cancel();
        }
    }

    // ==================== Quick Replies System ====================
    var quickReplies = [
        { text: '继续', trigger: '继续' },
        { text: '详细说明', trigger: '详细说明' },
        { text: '举个例子', trigger: '举个例子' },
        { text: '总结一下', trigger: '总结一下' },
        { text: '换个说法', trigger: '换个说法' },
        { text: '好的', trigger: '好的' },
        { text: '我明白了', trigger: '我明白了' },
        { text: '还有问题', trigger: '还有问题' }
    ];

    function initQuickReplies() {
        addLog('快捷回复系统初始化', 'system');
    }

    function showQuickReplies(messageId) {
        var messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        if (!messageEl) return;

        var existingReplies = messageEl.querySelector('.quick-replies');
        if (existingReplies) {
            existingReplies.remove();
            return;
        }

        var repliesContainer = document.createElement('div');
        repliesContainer.className = 'quick-replies';

        quickReplies.forEach(function(reply) {
            var button = document.createElement('button');
            button.className = 'quick-reply-btn';
            button.textContent = reply.text;
            button.addEventListener('click', function() {
                sendMessage(reply.trigger);
                repliesContainer.remove();
            });
            repliesContainer.appendChild(button);
        });

        var messageActions = messageEl.querySelector('.message-actions');
        if (messageActions) {
            messageActions.appendChild(repliesContainer);
        }
    }

    // ==================== Emoji Reactions System ====================
    var availableReactions = ['👍', '👎', '❤️', '😂', '😮', '🎉'];

    function addReaction(messageId, emoji) {
        var messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        if (!messageEl) return;

        var reactionsContainer = messageEl.querySelector('.message-reactions');
        if (!reactionsContainer) {
            reactionsContainer = document.createElement('div');
            reactionsContainer.className = 'message-reactions';
            var messageActions = messageEl.querySelector('.message-actions');
            if (messageActions) {
                messageActions.appendChild(reactionsContainer);
            }
        }

        var existingReaction = reactionsContainer.querySelector(`[data-emoji="${emoji}"]`);
        if (existingReaction) {
            var count = parseInt(existingReaction.dataset.count) || 1;
            existingReaction.dataset.count = count + 1;
            existingReaction.innerHTML = emoji + ' ' + (count + 1);
        } else {
            var reactionBtn = document.createElement('button');
            reactionBtn.className = 'reaction-btn';
            reactionBtn.dataset.emoji = emoji;
            reactionBtn.dataset.count = 1;
            reactionBtn.innerHTML = emoji + ' 1';
            reactionsContainer.appendChild(reactionBtn);
        }

        if (emoji === '👍') {
            addUserFeedback(messageId, 'thumbs_up');
        } else if (emoji === '👎') {
            addUserFeedback(messageId, 'thumbs_down');
        }

        addLog(`用户添加表情反应: ${emoji}`, 'system');
    }

    function showReactionPicker(messageId) {
        var messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        if (!messageEl) return;

        var pickerEl = document.createElement('div');
        pickerEl.className = 'reaction-picker';

        availableReactions.forEach(function(emoji) {
            var btn = document.createElement('button');
            btn.className = 'reaction-picker-btn';
            btn.textContent = emoji;
            btn.addEventListener('click', function() {
                addReaction(messageId, emoji);
                pickerEl.remove();
            });
            pickerEl.appendChild(btn);
        });

        var messageActions = messageEl.querySelector('.message-actions');
        if (messageActions) {
            messageActions.appendChild(pickerEl);
        }

        document.addEventListener('click', function closePicker(e) {
            if (!pickerEl.contains(e.target)) {
                pickerEl.remove();
                document.removeEventListener('click', closePicker);
            }
        });
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

        // Help modal
        var helpClose = $('#help-modal-close');
        var helpOverlay = $('#help-modal');
        if (helpClose) helpClose.addEventListener('click', function () { helpOverlay.classList.remove('show'); });
        if (helpOverlay) helpOverlay.addEventListener('click', function (e) { if (e.target === helpOverlay) helpOverlay.classList.remove('show'); });

        // Shortcuts modal
        var shortcutsClose = $('#shortcuts-modal-close');
        var shortcutsOverlay = $('#shortcuts-modal');
        if (shortcutsClose) shortcutsClose.addEventListener('click', function () { shortcutsOverlay.classList.remove('show'); });
        if (shortcutsOverlay) shortcutsOverlay.addEventListener('click', function (e) { if (e.target === shortcutsOverlay) shortcutsOverlay.classList.remove('show'); });

        // Image preview
        var imgOverlay = $('#image-preview-overlay');
        if (imgOverlay) imgOverlay.addEventListener('click', function () { imgOverlay.classList.remove('show'); });

        // Artifacts panel
        var artifactsClose = $('#artifacts-panel-close');
        var artifactsToggle = $('#artifacts-toggle-btn');
        if (artifactsClose) artifactsClose.addEventListener('click', function () {
            var panel = $('#artifacts-panel');
            if (panel) panel.classList.remove('open');
            if (artifactsToggle) artifactsToggle.classList.remove('active');
        });
        if (artifactsToggle) artifactsToggle.addEventListener('click', function () {
            var panel = $('#artifacts-panel');
            if (panel) {
                panel.classList.toggle('open');
                artifactsToggle.classList.toggle('active');
            }
        });

        // Drawer tabs
        initDrawerTabs();

        // Settings buttons
        var saveBtn = $('#save-settings-btn');
        var resetBtn = $('#reset-settings-btn');
        if (saveBtn) saveBtn.addEventListener('click', saveSettings);
        if (resetBtn) resetBtn.addEventListener('click', resetSettings);

        // Model provider selection
        var providerList = $('#provider-list');
        if (providerList) {
            providerList.addEventListener('click', function (e) {
                var target = e.target.closest('.provider-item');
                if (target) {
                    var provider = target.dataset.provider;
                    selectProvider(provider);
                }
            });
        }

        // Model tag selection
        var modelTagsContainer = $('#model-tags');
        if (modelTagsContainer) {
            modelTagsContainer.addEventListener('click', function (e) {
                var target = e.target.closest('.model-tag');
                if (target) {
                    var tags = target.parentElement.querySelectorAll('.model-tag');
                    tags.forEach(function (tag) {
                        tag.classList.remove('active');
                    });
                    target.classList.add('active');
                }
            });
        }

        // Custom model add button
        document.addEventListener('click', function (e) {
            var addBtn = e.target.closest('.model-tag-add-btn');
            if (addBtn) {
                addCustomModel();
            }

            var input = e.target.closest('.model-tag-input');
            if (input && e.key === 'Enter') {
                addCustomModel();
            }
        });

        // Model test button
        var modelTestBtn = $('#model-test-btn');
        if (modelTestBtn) {
            modelTestBtn.addEventListener('click', testModelConnection);
        }

        // Model save button
        var modelSaveBtn = $('#model-save-btn');
        if (modelSaveBtn) {
            modelSaveBtn.addEventListener('click', saveModelSettings);
        }

        // Voice input button
        var voiceBtn = $('#voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', toggleVoiceInput);
        }

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

        // Top P range
        var topPRange = $('#setting-top-p');
        var topPValue = $('#top-p-value');
        if (topPRange && topPValue) {
            topPRange.addEventListener('input', function () {
                topPValue.textContent = topPRange.value;
            });
        }

        // Frequency penalty range
        var freqPenaltyRange = $('#setting-frequency-penalty');
        var freqPenaltyValue = $('#frequency-penalty-value');
        if (freqPenaltyRange && freqPenaltyValue) {
            freqPenaltyRange.addEventListener('input', function () {
                freqPenaltyValue.textContent = freqPenaltyRange.value;
            });
        }

        // Presence penalty range
        var presPenaltyRange = $('#setting-presence-penalty');
        var presPenaltyValue = $('#presence-penalty-value');
        if (presPenaltyRange && presPenaltyValue) {
            presPenaltyRange.addEventListener('input', function () {
                presPenaltyValue.textContent = presPenaltyRange.value;
            });
        }

        // Sandbox environment management
        var addEnvBtn = $('#sandbox-add-env-btn');
        if (addEnvBtn) {
            addEnvBtn.addEventListener('click', function () {
                var envModal = $('#sandbox-env-modal');
                if (envModal) {
                    envModal.style.display = envModal.style.display === 'none' ? 'block' : 'none';
                }
            });
        }

        // Sandbox environment install
        $$('.sandbox-env-install').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var card = btn.closest('.sandbox-env-card');
                var image = card.getAttribute('data-image');
                installSandboxEnv(image, btn);
            });
        });

        // Load sandbox environments
        loadSandboxEnvironments();

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
        $$('.drawer-tabs').forEach(function (tabBar) {
            var drawer = tabBar.closest('.drawer');
            if (!drawer) return;
            tabBar.querySelectorAll('.drawer-tab').forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var targetId = tab.getAttribute('data-tab');
                    switchTabInternal(tabBar, drawer, targetId);
                });
            });
        });
    }

    function switchTab(tabId) {
        var drawer = $('#settings-drawer');
        if (!drawer) return;
        var tabBar = drawer.querySelector('.drawer-tabs');
        if (!tabBar) return;
        switchTabInternal(tabBar, drawer, tabId);

        if (tabId === 'tab-mcp') {
            loadMcpServers();
        }

        if (tabId === 'tab-skills') {
            loadSkills();
        }
    }

    function switchTabInternal(tabBar, drawer, targetId) {
        tabBar.querySelectorAll('.drawer-tab').forEach(function (t) { t.classList.remove('active'); });
        drawer.querySelectorAll('.drawer-tab-content').forEach(function (c) { c.classList.remove('active'); });
        var tab = tabBar.querySelector('[data-tab="' + targetId + '"]');
        if (tab) tab.classList.add('active');
        var target = drawer.querySelector('#' + targetId);
        if (target) target.classList.add('active');
    }

    // ==================== Theme ====================
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('data-ai-theme', theme);
        } catch (e) { /* ignore */ }

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
            { name: 'qwen-long', desc: '通义千问 Long' },
            { name: 'qwen2-7b-instruct', desc: 'Qwen2 7B' },
            { name: 'qwen2-14b-instruct', desc: 'Qwen2 14B' },
            { name: 'qwen2-72b-instruct', desc: 'Qwen2 72B' }
        ],
        openai: [
            { name: 'gpt-4o', desc: 'GPT-4o' },
            { name: 'gpt-4o-mini', desc: 'GPT-4o Mini' },
            { name: 'gpt-4-turbo', desc: 'GPT-4 Turbo' },
            { name: 'gpt-3.5-turbo', desc: 'GPT-3.5 Turbo' },
            { name: 'gpt-4-turbo-preview', desc: 'GPT-4 Turbo Preview' },
            { name: 'gpt-4', desc: 'GPT-4' }
        ],
        anthropic: [
            { name: 'claude-sonnet-4-20250514', desc: 'Claude Sonnet 4' },
            { name: 'claude-3-5-sonnet-20241022', desc: 'Claude 3.5 Sonnet' },
            { name: 'claude-3-opus-20240229', desc: 'Claude 3 Opus' },
            { name: 'claude-3-sonnet-20240229', desc: 'Claude 3 Sonnet' },
            { name: 'claude-3-haiku-20240307', desc: 'Claude 3 Haiku' }
        ],
        google: [
            { name: 'gemini-1.5-pro', desc: 'Gemini 1.5 Pro' },
            { name: 'gemini-1.5-flash', desc: 'Gemini 1.5 Flash' },
            { name: 'gemini-pro', desc: 'Gemini Pro' },
            { name: 'gemini-pro-vision', desc: 'Gemini Pro Vision' }
        ],
        azure: [
            { name: 'gpt-4o', desc: 'GPT-4o' },
            { name: 'gpt-4o-mini', desc: 'GPT-4o Mini' },
            { name: 'gpt-4-turbo', desc: 'GPT-4 Turbo' },
            { name: 'gpt-35-turbo', desc: 'GPT-3.5 Turbo' }
        ],
        baidu: [
            { name: 'ernie-4.0', desc: '文心一言 4.0' },
            { name: 'ernie-3.5', desc: '文心一言 3.5' },
            { name: 'ernie-turbo', desc: '文心一言 Turbo' },
            { name: 'ernie-longtext', desc: '文心一言 长文本' }
        ],
        tencent: [
            { name: 'hunyuan-pro', desc: '混元大模型' },
            { name: 'hunyuan-standard', desc: '混元标准版' },
            { name: 'hunyuan-lite', desc: '混元轻量版' }
        ],
        zhipu: [
            { name: 'glm-4', desc: 'GLM-4' },
            { name: 'glm-4v', desc: 'GLM-4V' },
            { name: 'glm-3-turbo', desc: 'GLM-3 Turbo' },
            { name: 'chatglm3-6b', desc: 'ChatGLM3-6B' }
        ],
        deepseek: [
            { name: 'deepseek-chat', desc: 'DeepSeek Chat' },
            { name: 'deepseek-reasoner', desc: 'DeepSeek Reasoner' },
            { name: 'deepseek-math', desc: 'DeepSeek Math' },
            { name: 'deepseek-coder', desc: 'DeepSeek Coder' }
        ],
        minimax: [
            { name: 'abab6-chat', desc: 'MiniMax ABAB6' },
            { name: 'abab5-chat', desc: 'MiniMax ABAB5' },
            { name: 'abab5.5-chat', desc: 'MiniMax ABAB5.5' }
        ],
        ollama: [
            { name: 'llama3', desc: 'Llama 3' },
            { name: 'llama3.1', desc: 'Llama 3.1' },
            { name: 'qwen2', desc: 'Qwen 2' },
            { name: 'codellama', desc: 'Code Llama' },
            { name: 'mistral', desc: 'Mistral' },
            { name: 'phi3', desc: 'Phi-3' },
            { name: 'gemma', desc: 'Gemma' }
        ],
        custom: [
            { name: 'custom-model', desc: '自定义模型' }
        ]
    };

    var providerDefaults = {
        aliyun: { base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1', api_version: '' },
        openai: { base_url: 'https://api.openai.com/v1', api_version: '' },
        anthropic: { base_url: 'https://api.anthropic.com/v1', api_version: '' },
        google: { base_url: 'https://generativelanguage.googleapis.com/v1beta', api_version: '' },
        azure: { base_url: 'https://{region}.openai.azure.com/openai', api_version: '2024-08-01-preview' },
        baidu: { base_url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions', api_version: '' },
        tencent: { base_url: 'https://hunyuan.tencentcloudapi.com', api_version: '' },
        zhipu: { base_url: 'https://open.bigmodel.cn/api/paas/v4', api_version: '' },
        deepseek: { base_url: 'https://api.deepseek.com/v1', api_version: '' },
        minimax: { base_url: 'https://api.minimax.chat/v1', api_version: '' },
        ollama: { base_url: 'http://localhost:11434/v1', api_version: '' },
        custom: { base_url: '', api_version: '' }
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
        var defaults = providerDefaults[provider] || {};
        renderModelDropdownList('', models);

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

        var baseUrlInput = $('#setting-base-url');
        if (baseUrlInput && defaults.base_url) {
            baseUrlInput.value = defaults.base_url;
        }

        var apiVersionInput = $('#setting-api-version');
        var apiVersionGroup = $('#setting-api-version-group');
        var azureDeploymentGroup = $('#setting-azure-deployment-group');

        if (apiVersionInput && defaults.api_version) {
            apiVersionInput.value = defaults.api_version;
        }

        if (provider === 'azure') {
            if (apiVersionGroup) apiVersionGroup.style.display = 'block';
            if (azureDeploymentGroup) azureDeploymentGroup.style.display = 'block';
        } else {
            if (apiVersionGroup) apiVersionGroup.style.display = 'none';
            if (azureDeploymentGroup) azureDeploymentGroup.style.display = 'none';
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
    function loadSettings() {
        httpGet('/api/settings').then(function (res) {
            if (!res.ok) return;
            return res.json();
        }).then(function (data) {
            appSettings = data;
            populateSettings(appSettings);
        }).catch(function (e) {
            console.error('Load settings error:', e);
        });
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

        if (settings.llm && settings.llm.model) {
            updateModelDisplay(settings.llm.model);
        }

        if (settings.llm && settings.llm.provider) {
            updateModelList(settings.llm.provider);
        }
    }

    function saveSettings() {
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

        httpPost('/api/settings', settings).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return { detail: '保存失败' }; }).then(function (errData) {
                    throw new Error(errData.detail || '请求失败');
                });
            }
            appSettings = settings;
            closeDrawer('settings-drawer', 'settings-drawer-overlay');
            showToast('设置已保存', 'success');
            updateModelDisplay(settings.llm.model);
        }).catch(function (e) {
            showToast('保存失败: ' + e.message, 'error');
        });
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
    function loadKnowledgeBases() {
        httpGet('/api/knowledge-bases').then(function (res) {
            if (!res.ok) return;
            return res.json();
        }).then(function (kbs) {
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
        }).catch(function (e) {
            console.error('Load KB error:', e);
        });
    }

    function createKnowledgeBase() {
        var nameEl = $('#kb-name');
        var descEl = $('#kb-desc');
        if (!nameEl) return;
        var name = nameEl.value.trim();
        var desc = descEl ? descEl.value.trim() : '';

        if (!name) {
            showToast('请输入知识库名称', 'error');
            return;
        }

        httpPost('/api/knowledge-bases', {
            name: name,
            description: desc
        }).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return { detail: '创建失败' }; }).then(function (err) {
                    throw new Error(err.detail || '请求失败');
                });
            }
            nameEl.value = '';
            if (descEl) descEl.value = '';
            loadKnowledgeBases();
            showToast('知识库「' + name + '」创建成功', 'success');

            var kbDrawer = $('#kb-drawer');
            if (kbDrawer) {
                var listTab = kbDrawer.querySelector('[data-tab="kb-tab-list"]');
                if (listTab) listTab.click();
            }
        }).catch(function (e) {
            showToast('创建失败: ' + e.message, 'error');
        });
    }

    // ==================== Skills ====================
    function loadSkills() {
        httpGet('/api/skills').then(function (res) {
            if (!res.ok) return;
            return res.json();
        }).then(function (skills) {
            var lists = ['skill-list-content', 'skill-list-content-settings'];

            lists.forEach(function(listId) {
                var list = $('#' + listId);
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
            });
        }).catch(function (e) {
            console.error('Load skills error:', e);
        });
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

    function createSkill() {
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

        httpPost('/api/skills', {
            name: name,
            icon: icon,
            description: desc,
            parameters: [],
            prompts: {}
        }).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return { detail: '创建失败' }; }).then(function (err) {
                    throw new Error(err.detail || '请求失败');
                });
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
        }).catch(function (e) {
            showToast('创建失败: ' + e.message, 'error');
        });
    }

    function aiGenerateSkill() {
        var purposeEl = $('#skill-purpose');
        var genDiv = $('#ai-generating');
        if (!purposeEl) return;
        var purpose = purposeEl.value.trim();

        if (!purpose) {
            showToast('请先描述技能用途', 'error');
            return;
        }

        if (genDiv) genDiv.style.display = 'flex';

        httpPost('/api/skills/generate', {
            purpose: purpose
        }).then(function (res) {
            if (!res.ok) throw new Error('生成失败');
            return res.json();
        }).then(function (result) {
            var nameEl = $('#skill-name');
            var iconEl = $('#skill-icon');
            var descEl = $('#skill-desc');
            if (nameEl) nameEl.value = result.name || '';
            if (iconEl) iconEl.value = result.icon || '⚡';
            if (descEl) descEl.value = result.description || '';
            showToast('AI已生成技能建议', 'success');
        }).catch(function (e) {
            showToast('AI生成失败: ' + e.message, 'error');
        }).finally(function () {
            if (genDiv) genDiv.style.display = 'none';
        });
    }

    // ==================== MCP ====================
    function loadMcpServers() {
        httpGet('/api/mcp/servers').then(function (res) {
            if (!res.ok) return;
            return res.json();
        }).then(function (servers) {
            var lists = ['mcp-list-content', 'mcp-list-content-settings'];

            lists.forEach(function(listId) {
                var list = $('#' + listId);
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
            });
        }).catch(function (e) {
            console.error('Load MCP error:', e);
        });
    }

    function createMcpServer() {
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

        httpPost('/api/mcp/servers', {
            name: name,
            type: type,
            command: command,
            args: [],
            enabled: true
        }).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return { detail: '创建失败' }; }).then(function (err) {
                    throw new Error(err.detail || '请求失败');
                });
            }
            nameEl.value = '';
            if (commandEl) commandEl.value = '';
            loadMcpServers();
            showToast('MCP服务器「' + name + '」配置成功', 'success');
        }).catch(function (e) {
            showToast('配置失败: ' + e.message, 'error');
        });
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
            // Ctrl/Cmd + /: Shortcuts help
            if ((e.metaKey || e.ctrlKey) && e.key === '/') {
                e.preventDefault();
                var shortcutsModal = $('#shortcuts-modal');
                if (shortcutsModal) shortcutsModal.classList.add('show');
            }
            // Ctrl/Cmd + B: Toggle sidebar
            if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                e.preventDefault();
                var sidebar = $('#sidebar');
                if (sidebar) {
                    if (sidebar.classList.contains('open')) {
                        closeSidebar();
                    } else {
                        openSidebar();
                    }
                }
            }
            // Ctrl/Cmd + L: Focus input
            if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
                e.preventDefault();
                var inputBox = $('#input-box');
                if (inputBox) inputBox.focus();
            }
            // Escape: Close drawers/modals or stop generation
            if (e.key === 'Escape') {
                // Stop generation first
                if (isGenerating) {
                    stopGeneration();
                    return;
                }
                closeDrawer('settings-drawer', 'settings-drawer-overlay');
                closeDrawer('kb-drawer', 'kb-drawer-overlay');
                closeDrawer('skill-drawer', 'skill-drawer-overlay');
                closeDrawer('mcp-drawer', 'mcp-drawer-overlay');
                var helpModal = $('#help-modal');
                if (helpModal) helpModal.classList.remove('show');
                var shortcutsModal = $('#shortcuts-modal');
                if (shortcutsModal) shortcutsModal.classList.remove('show');
                var imgPreview = $('#image-preview-overlay');
                if (imgPreview) imgPreview.classList.remove('show');
                var artifactsPanel = $('#artifacts-panel');
                if (artifactsPanel) artifactsPanel.classList.remove('open');
                var artifactsToggle = $('#artifacts-toggle-btn');
                if (artifactsToggle) artifactsToggle.classList.remove('active');
                closeSidebar();
            }
        });
    }

    // ==================== Sandbox Environment Management ====================
    function loadSandboxEnvironments() {
        httpGet('/api/sandbox/environments').then(function (res) {
            if (!res.ok) {
                renderSandboxEnvs([]);
                return;
            }
            return res.json();
        }).then(function (envs) {
            renderSandboxEnvs(envs || []);
        }).catch(function (e) {
            console.error('Load sandbox envs error:', e);
            renderSandboxEnvs([]);
        });
    }

    function renderSandboxEnvs(envs) {
        var list = $('#sandbox-envs-list');
        if (!list) return;

        if (envs.length === 0) {
            list.innerHTML = '<div style="padding:20px 10px;text-align:center;color:var(--text-muted);font-size:13px;">暂无安装的环境，点击下方按钮添加</div>';
            return;
        }

        list.innerHTML = envs.map(function (env) {
            var statusIcon = env.status === 'installed' ? 'fa-check-circle text-green' : 'fa-circle-dot text-yellow';
            return '<div class="sandbox-env-item">' +
                '<div class="sandbox-env-info">' +
                '<div class="sandbox-env-icon-small"><i class="fa-solid ' + statusIcon + '"></i></div>' +
                '<div>' +
                '<div class="sandbox-env-name-small">' + escapeHtml(env.name) + '</div>' +
                '<div class="sandbox-env-detail">版本: ' + escapeHtml(env.tag) + ' | 大小: ' + formatFileSize(env.size || 0) + '</div>' +
                '</div></div>' +
                '<button class="sandbox-env-delete" data-image="' + escapeHtml(env.image) + '"><i class="fa-solid fa-trash"></i></button>' +
                '</div>';
        }).join('');

        list.querySelectorAll('.sandbox-env-delete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var image = btn.getAttribute('data-image');
                if (confirm('确定要删除这个环境吗？')) {
                    deleteSandboxEnv(image);
                }
            });
        });
    }

    function installSandboxEnv(image, btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 安装中...';

        httpPost('/api/sandbox/environments/pull', {
            image: image
        }).then(function (res) {
            if (!res.ok) {
                return res.json().catch(function () { return { detail: '安装失败' }; }).then(function (err) {
                    throw new Error(err.detail || '请求失败');
                });
            }
            return res.json();
        }).then(function (result) {
            showToast('环境安装成功: ' + result.name, 'success');
            loadSandboxEnvironments();
        }).catch(function (e) {
            showToast('安装失败: ' + e.message, 'error');
        }).finally(function () {
            btn.disabled = false;
            btn.innerHTML = '安装';
        });
    }

    function deleteSandboxEnv(image) {
        httpPost('/api/sandbox/environments/delete', {
            image: image
        }).then(function (res) {
            if (!res.ok) {
                throw new Error('删除失败');
            }
            showToast('环境已删除', 'success');
            loadSandboxEnvironments();
        }).catch(function (e) {
            showToast('删除失败: ' + e.message, 'error');
        });
    }

    // ==================== Advanced Intent Recognition with NLP.js ====================
    var nlpManager = null;
    var intentModelLoaded = false;

    async function initNLPManager() {
        if (!libs.nlpjs) {
            console.warn('NLP.js not loaded, falling back to simple pattern matching');
            return;
        }

        try {
            nlpManager = new libs.nlpjs.NlpManager({
                languages: ['zh', 'en'],
                forceNER: true,
                nlu: { log: false },
                autoLoad: false
            });

            // 图片生成意图 - 扩展训练数据
            nlpManager.addDocument('zh', '帮我生成一张图片', 'image_generation');
            nlpManager.addDocument('zh', '画一张猫的图片', 'image_generation');
            nlpManager.addDocument('zh', '生成图片', 'image_generation');
            nlpManager.addDocument('zh', '创建图像', 'image_generation');
            nlpManager.addDocument('zh', '给我画', 'image_generation');
            nlpManager.addDocument('zh', '绘制', 'image_generation');
            nlpManager.addDocument('zh', 'AI画图', 'image_generation');
            nlpManager.addDocument('zh', '生成插画', 'image_generation');
            nlpManager.addDocument('zh', '创作图片', 'image_generation');
            nlpManager.addDocument('zh', '生成艺术作品', 'image_generation');
            nlpManager.addDocument('en', 'generate an image', 'image_generation');
            nlpManager.addDocument('en', 'create a picture', 'image_generation');
            nlpManager.addDocument('en', 'draw', 'image_generation');
            nlpManager.addDocument('en', 'AI art', 'image_generation');

            // PPT生成意图
            nlpManager.addDocument('zh', '生成PPT', 'ppt_generation');
            nlpManager.addDocument('zh', '制作演示文稿', 'ppt_generation');
            nlpManager.addDocument('zh', '创建幻灯片', 'ppt_generation');
            nlpManager.addDocument('zh', '做ppt', 'ppt_generation');
            nlpManager.addDocument('zh', '制作汇报材料', 'ppt_generation');
            nlpManager.addDocument('zh', '生成演示', 'ppt_generation');
            nlpManager.addDocument('zh', '幻灯片制作', 'ppt_generation');
            nlpManager.addDocument('en', 'create presentation', 'ppt_generation');
            nlpManager.addDocument('en', 'make ppt', 'ppt_generation');
            nlpManager.addDocument('en', 'create slides', 'ppt_generation');
            nlpManager.addDocument('en', 'generate presentation', 'ppt_generation');

            // 代码生成意图
            nlpManager.addDocument('zh', '写代码', 'code_generation');
            nlpManager.addDocument('zh', '生成Python代码', 'code_generation');
            nlpManager.addDocument('zh', '帮我写程序', 'code_generation');
            nlpManager.addDocument('zh', '编写代码', 'code_generation');
            nlpManager.addDocument('zh', '编程', 'code_generation');
            nlpManager.addDocument('zh', '实现功能', 'code_generation');
            nlpManager.addDocument('zh', '代码示例', 'code_generation');
            nlpManager.addDocument('zh', '写个函数', 'code_generation');
            nlpManager.addDocument('en', 'write code', 'code_generation');
            nlpManager.addDocument('en', 'generate python code', 'code_generation');
            nlpManager.addDocument('en', 'code example', 'code_generation');
            nlpManager.addDocument('en', 'implement feature', 'code_generation');

            // 数据分析意图
            nlpManager.addDocument('zh', '分析数据', 'data_analysis');
            nlpManager.addDocument('zh', '数据可视化', 'data_analysis');
            nlpManager.addDocument('zh', '统计分析', 'data_analysis');
            nlpManager.addDocument('zh', '数据报告', 'data_analysis');
            nlpManager.addDocument('zh', '数据处理', 'data_analysis');
            nlpManager.addDocument('zh', '数据分析报告', 'data_analysis');
            nlpManager.addDocument('en', 'analyze data', 'data_analysis');
            nlpManager.addDocument('en', 'data visualization', 'data_analysis');
            nlpManager.addDocument('en', 'data report', 'data_analysis');
            nlpManager.addDocument('en', 'statistical analysis', 'data_analysis');

            // 翻译意图
            nlpManager.addDocument('zh', '翻译这段文字', 'translation');
            nlpManager.addDocument('zh', '翻译成英文', 'translation');
            nlpManager.addDocument('zh', '润色文本', 'translation');
            nlpManager.addDocument('zh', '英译中', 'translation');
            nlpManager.addDocument('zh', '中译英', 'translation');
            nlpManager.addDocument('zh', '多语言翻译', 'translation');
            nlpManager.addDocument('zh', '语言转换', 'translation');
            nlpManager.addDocument('en', 'translate this', 'translation');
            nlpManager.addDocument('en', 'polish text', 'translation');
            nlpManager.addDocument('en', 'translate to English', 'translation');
            nlpManager.addDocument('en', 'translate to Chinese', 'translation');

            // 会议纪要意图
            nlpManager.addDocument('zh', '总结会议', 'meeting_summary');
            nlpManager.addDocument('zh', '会议纪要', 'meeting_summary');
            nlpManager.addDocument('zh', '会议记录', 'meeting_summary');
            nlpManager.addDocument('zh', '会议总结', 'meeting_summary');
            nlpManager.addDocument('zh', '记录会议内容', 'meeting_summary');
            nlpManager.addDocument('zh', '整理会议纪要', 'meeting_summary');
            nlpManager.addDocument('en', 'meeting summary', 'meeting_summary');
            nlpManager.addDocument('en', 'meeting notes', 'meeting_summary');
            nlpManager.addDocument('en', 'meeting minutes', 'meeting_summary');
            nlpManager.addDocument('en', 'summarize meeting', 'meeting_summary');

            // 文献摘要意图
            nlpManager.addDocument('zh', '文献摘要', 'literature_review');
            nlpManager.addDocument('zh', '论文分析', 'literature_review');
            nlpManager.addDocument('zh', '研究总结', 'literature_review');
            nlpManager.addDocument('zh', '学术论文', 'literature_review');
            nlpManager.addDocument('zh', '论文摘要', 'literature_review');
            nlpManager.addDocument('zh', '文献综述', 'literature_review');
            nlpManager.addDocument('en', 'literature review', 'literature_review');
            nlpManager.addDocument('en', 'paper summary', 'literature_review');
            nlpManager.addDocument('en', 'research paper', 'literature_review');
            nlpManager.addDocument('en', 'academic summary', 'literature_review');

            // 图表生成意图
            nlpManager.addDocument('zh', '生成图表', 'chart_generation');
            nlpManager.addDocument('zh', '画柱状图', 'chart_generation');
            nlpManager.addDocument('zh', '折线图', 'chart_generation');
            nlpManager.addDocument('zh', '饼图', 'chart_generation');
            nlpManager.addDocument('zh', '条形图', 'chart_generation');
            nlpManager.addDocument('zh', '数据图表', 'chart_generation');
            nlpManager.addDocument('en', 'create chart', 'chart_generation');
            nlpManager.addDocument('en', 'bar chart', 'chart_generation');
            nlpManager.addDocument('en', 'line chart', 'chart_generation');
            nlpManager.addDocument('en', 'pie chart', 'chart_generation');

            // 流程图意图
            nlpManager.addDocument('zh', '画流程图', 'flowchart');
            nlpManager.addDocument('zh', '创建架构图', 'flowchart');
            nlpManager.addDocument('zh', 'UML图', 'flowchart');
            nlpManager.addDocument('zh', '系统架构', 'flowchart');
            nlpManager.addDocument('zh', '流程图设计', 'flowchart');
            nlpManager.addDocument('zh', '业务流程', 'flowchart');
            nlpManager.addDocument('en', 'draw flowchart', 'flowchart');
            nlpManager.addDocument('en', 'create diagram', 'flowchart');
            nlpManager.addDocument('en', 'system architecture', 'flowchart');
            nlpManager.addDocument('en', 'sequence diagram', 'flowchart');

            // 总结意图
            nlpManager.addDocument('zh', '总结一下', 'summarize');
            nlpManager.addDocument('zh', '概括', 'summarize');
            nlpManager.addDocument('zh', '要点', 'summarize');
            nlpManager.addDocument('zh', '总结要点', 'summarize');
            nlpManager.addDocument('en', 'summarize', 'summarize');
            nlpManager.addDocument('en', 'summary', 'summarize');
            nlpManager.addDocument('en', 'brief summary', 'summarize');

            // 问题回答意图
            nlpManager.addDocument('zh', '什么是', 'question');
            nlpManager.addDocument('zh', '为什么', 'question');
            nlpManager.addDocument('zh', '如何', 'question');
            nlpManager.addDocument('zh', '怎样', 'question');
            nlpManager.addDocument('zh', '请问', 'question');
            nlpManager.addDocument('en', 'what is', 'question');
            nlpManager.addDocument('en', 'why', 'question');
            nlpManager.addDocument('en', 'how to', 'question');
            nlpManager.addDocument('en', 'explain', 'question');

            // 添加实体识别训练数据
            nlpManager.addNerRuleOptionTexts('zh', 'topic', ['图片', '代码', 'PPT', '图表', '数据', '翻译', '会议', '论文']);
            nlpManager.addNerRuleOptionTexts('en', 'topic', ['image', 'code', 'ppt', 'chart', 'data', 'translation', 'meeting', 'paper']);

            // 训练模型
            await nlpManager.train();
            intentModelLoaded = true;
            console.log('[NLP] NLP.js intent classifier trained successfully');
            addLog('意图识别模型训练完成', 'system');
        } catch (e) {
            console.error('NLP.js initialization failed:', e);
            nlpManager = null;
        }
    }

    async function recognizeIntent(text) {
        if (nlpManager) {
            try {
                const result = await nlpManager.process('zh', text);
                if (result.intent && result.score > 0.5) {
                    console.log(`[NLP] Intent: ${result.intent}, Confidence: ${result.score}`);
                    return result.intent;
                }
            } catch (e) {
                console.error('NLP processing error:', e);
            }
        }

        // Fallback to simple pattern matching
        return simpleRecognizeIntent(text);
    }

    function simpleRecognizeIntent(text) {
        var lowerText = text.toLowerCase();

        var intentPatterns = {
            'image_generation': [
                '画', '生成图片', '生成图像', '绘制', '创作图片', '生成一幅画',
                '给我画', '帮我画', '画一个', 'draw', 'generate image', 'create image'
            ],
            'ppt_generation': [
                '生成ppt', '生成演示', '做ppt', '做演示', '创建ppt', '创建演示',
                '演示文稿', 'slides', 'presentation', 'ppt'
            ],
            'code_generation': [
                '写代码', '生成代码', '编写代码', '代码', 'function', 'class',
                '写python', '写javascript', '写java', '写程序', '帮我写'
            ],
            'data_analysis': [
                '分析数据', '数据分析', '统计', '可视化', '图表', '画图',
                'analyze', 'analysis', 'chart', 'visualization'
            ],
            'translation': [
                '翻译', '润色', '改写', '翻译成', 'translate', 'polish'
            ],
            'meeting_summary': [
                '会议纪要', '会议记录', '会议总结', '会议摘要',
                'meeting notes', 'meeting summary'
            ],
            'literature_review': [
                '文献', '论文', '摘要', '研究', '学术',
                'literature', 'paper', 'research', 'academic'
            ],
            'chart_generation': [
                '图表', '折线图', '柱状图', '饼图', '条形图',
                'chart', 'graph', 'plot', 'visualize', 'diagram'
            ],
            'flowchart': [
                '流程图', '流程', '图表', '架构图', 'UML',
                'flow', 'flowchart', 'sequence', 'diagram'
            ],
            'date_format': [
                '日期', '时间', '格式化', '转换日期', '日期格式'
            ],
            'number_format': [
                '数字', '格式化', '货币', '百分比', '千分位'
            ]
        };

        for (var intent in intentPatterns) {
            var patterns = intentPatterns[intent];
            for (var i = 0; i < patterns.length; i++) {
                if (lowerText.includes(patterns[i])) {
                    return intent;
                }
            }
        }

        return 'general';
    }

    async function handleIntent(text) {
        var intent = await recognizeIntent(text);

        var intentDisplay = {
            'image_generation': '🎨 图片生成',
            'ppt_generation': '📊 PPT生成',
            'code_generation': '💻 代码生成',
            'data_analysis': '📈 数据分析',
            'translation': '🌐 翻译润色',
            'meeting_summary': '📋 会议纪要',
            'literature_review': '📚 文献摘要',
            'chart_generation': '📈 图表生成',
            'flowchart': '🗺️ 流程图',
            'date_format': '📅 日期处理',
            'number_format': '🔢 数字格式化',
            'general': '💬 通用对话'
        };

        var intentHandlers = {
            'ppt_generation': handlePPTGeneration,
            'chart_generation': handleChartGeneration,
            'flowchart': handleFlowchartGeneration
        };

        return {
            intent: intent,
            display: intentDisplay[intent] || '💬 通用对话',
            handler: intentHandlers[intent] || null
        };
    }

    // ==================== Intent Handlers ====================
    function handlePPTGeneration(text) {
        showToast('正在生成PPT...', 'info');
        generatePPTFromText(text);
    }

    function handleChartGeneration(text) {
        if (!libs.chartjs) {
            showToast('Chart.js 未加载', 'error');
            return;
        }

        showToast('正在生成图表...', 'info');
        generateChartFromText(text);
    }

    function handleFlowchartGeneration(text) {
        if (!libs.mermaid) {
            showToast('Mermaid 未加载', 'error');
            return;
        }

        showToast('正在生成流程图...', 'info');
        generateFlowchartFromText(text);
    }

    // ==================== PPT Generation with Library ====================
    function generatePPTFromText(text) {
        if (!libs.pptxgen) {
            showToast('PPT生成库未加载', 'error');
            return;
        }

        var pres = new libs.pptxgen();
        pres.layout = 'LAYOUT_16x9';
        pres.title = '演示文稿';

        var slide1 = pres.addSlide();
        slide1.addText(text.substring(0, 50) + '...', {
            x: 1, y: 3, w: 8, h: 1.5,
            fontSize: 32, bold: true, color: '000000',
            align: 'center'
        });

        var slide2 = pres.addSlide();
        slide2.addText('目录', {
            x: 1, y: 2, w: 8, h: 1,
            fontSize: 28, bold: true, color: '000000'
        });

        var slide3 = pres.addSlide();
        slide3.addText('总结', {
            x: 1, y: 3, w: 8, h: 1,
            fontSize: 28, bold: true, color: '000000',
            align: 'center'
        });

        pres.writeFile({ fileName: 'presentation.pptx' }).then(function() {
            showToast('PPT生成成功！', 'success');
        }).catch(function(err) {
            showToast('PPT生成失败: ' + err.message, 'error');
        });
    }

    // ==================== Chart Generation with Chart.js ====================
    function generateChartFromText(text) {
        var chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.innerHTML = '<canvas id="generated-chart"></canvas>';

        var chatArea = $('#chat-area');
        chatArea.appendChild(chartContainer);

        var ctx = document.getElementById('generated-chart').getContext('2d');
        var chartData = extractChartData(text);

        new Chart(ctx, {
            type: chartData.type || 'bar',
            data: {
                labels: chartData.labels || ['A', 'B', 'C', 'D', 'E'],
                datasets: [{
                    label: chartData.title || '数据',
                    data: chartData.data || [12, 19, 3, 5, 2],
                    backgroundColor: chartData.colors || [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: chartData.borderColors || [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        showToast('图表生成成功！', 'success');
    }

    function extractChartData(text) {
        var data = {
            type: 'bar',
            title: '数据图表',
            labels: [],
            data: [],
            colors: [],
            borderColors: []
        };

        if (text.includes('折线') || text.includes('line')) {
            data.type = 'line';
        } else if (text.includes('饼') || text.includes('pie')) {
            data.type = 'pie';
        } else if (text.includes('柱状') || text.includes('bar')) {
            data.type = 'bar';
        }

        var numPattern = /(\d+(?:\.\d+)?)/g;
        var numbers = text.match(numPattern);
        if (numbers && numbers.length > 0) {
            data.data = numbers.slice(0, 6).map(Number);
        }

        var labelPattern = /([\u4e00-\u9fa5a-zA-Z]+)/g;
        var labels = text.match(labelPattern);
        if (labels && labels.length > 0) {
            data.labels = labels.slice(0, 6);
        }

        return data;
    }

    // ==================== Flowchart Generation with Mermaid ====================
    function generateFlowchartFromText(text) {
        var flowchartCode = generateMermaidCode(text);

        var flowchartContainer = document.createElement('div');
        flowchartContainer.className = 'flowchart-container';
        flowchartContainer.innerHTML = '<pre class="mermaid">' + flowchartCode + '</pre>';

        var chatArea = $('#chat-area');
        chatArea.appendChild(flowchartContainer);

        if (libs.mermaid) {
            libs.mermaid.init();
        }

        showToast('流程图生成成功！', 'success');
    }

    function generateMermaidCode(text) {
        var code = 'flowchart TD\n';

        if (text.includes('开始') || text.includes('start')) {
            code += '    A[开始] --> B[处理]\n';
            code += '    B --> C[结束]\n';
        } else {
            code += '    A[输入] --> B{判断}\n';
            code += '    B -->|是| C[操作A]\n';
            code += '    B -->|否| D[操作B]\n';
            code += '    C --> E[输出]\n';
            code += '    D --> E\n';
        }

        return code;
    }

    // ==================== Chart.js Integration ====================
    function createChart(containerId, config) {
        if (!libs.chartjs) {
            showToast('Chart.js 未加载', 'error');
            return null;
        }

        var ctx = document.getElementById(containerId);
        if (!ctx) return null;

        try {
            return new libs.chartjs(ctx, config);
        } catch (e) {
            console.error('Chart creation error:', e);
            showToast('图表创建失败: ' + e.message, 'error');
            return null;
        }
    }

    // ==================== Mermaid Integration ====================
    function renderMermaid(containerId, code) {
        if (!libs.mermaid) {
            showToast('Mermaid 未加载', 'error');
            return;
        }

        var container = document.getElementById(containerId);
        if (!container) return;

        libs.mermaid.render(containerId, code, function(svgCode) {
            container.innerHTML = svgCode;
        });
    }

    // ==================== DayJS Integration ====================
    function formatDate(date, format) {
        if (!libs.dayjs) {
            return new Date(date).toLocaleString();
        }
        return libs.dayjs(date).format(format || 'YYYY-MM-DD HH:mm:ss');
    }

    // ==================== Numeral.js Integration ====================
    function formatNumber(num, format) {
        if (!libs.numeral) {
            return num.toString();
        }
        return libs.numeral(num).format(format || '0,0');
    }

    // ==================== Lodash Integration ====================
    var debounce = function(func, wait) {
        if (libs.lodash) {
            return libs.lodash.debounce(func, wait);
        }
        return func;
    };

    var throttle = function(func, limit) {
        if (libs.lodash) {
            return libs.lodash.throttle(func, limit);
        }
        return func;
    };

    // ==================== Axios HTTP Client ====================
    function httpGet(url, params) {
        if (libs.axios) {
            return libs.axios.get(url, { params: params });
        }
        return fetch(url + '?' + new URLSearchParams(params)).then(res => res.json());
    }

    function httpPost(url, data) {
        if (libs.axios) {
            return libs.axios.post(url, data);
        }
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    // ==================== Yup Form Validation ====================
    function validateForm(schema, data) {
        if (!libs.yup) {
            console.warn('Yup not loaded, skipping validation');
            return { valid: true, errors: [] };
        }

        try {
            libs.yup.object().shape(schema).validateSync(data, { abortEarly: false });
            return { valid: true, errors: [] };
        } catch (err) {
            return {
                valid: false,
                errors: err.errors || [err.message]
            };
        }
    }

    // ==================== Anime.js Animation ====================
    function animateElement(element, animation) {
        if (!libs.anime) {
            console.warn('Anime.js not loaded');
            return;
        }

        libs.anime({
            targets: element,
            ...animation
        });
    }

    // ==================== Dropzone File Upload ====================
    function initFileUpload(containerId, options) {
        if (!libs.dropzone) {
            console.warn('Dropzone not loaded');
            return null;
        }

        return new libs.dropzone(`#${containerId}`, {
            url: options.url || '/api/upload',
            maxFilesize: options.maxSize || 10,
            acceptedFiles: options.acceptedFiles || 'image/*,.pdf,.txt',
            ...options
        });
    }

    // ==================== Cropper Image Cropping ====================
    function initImageCropper(imageId, options) {
        if (!libs.cropper) {
            console.warn('Cropper.js not loaded');
            return null;
        }

        var image = document.getElementById(imageId);
        return new libs.cropper(image, {
            aspectRatio: options.aspectRatio || 1,
            viewMode: options.viewMode || 1,
            ...options
        });
    }

    // ==================== PDF.js Viewer ====================
    function renderPDF(url, containerId) {
        if (!libs.pdfjs) {
            console.warn('PDF.js not loaded');
            return;
        }

        libs.pdfjs.getDocument(url).promise.then(function(pdf) {
            pdf.getPage(1).then(function(page) {
                var container = document.getElementById(containerId);
                var canvas = document.createElement('canvas');
                container.appendChild(canvas);

                var viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport
                });
            });
        });
    }

    // ==================== CodeMirror Editor ====================
    function initCodeEditor(textareaId, options) {
        if (!libs.codemirror) {
            console.warn('CodeMirror not loaded');
            return null;
        }

        return libs.codemirror.fromTextArea(document.getElementById(textareaId), {
            mode: options.mode || 'javascript',
            theme: options.theme || 'default',
            lineNumbers: true,
            ...options
        });
    }

    // ==================== Socket.IO Real-time ====================
    function connectSocket(url) {
        if (!libs.io) {
            console.warn('Socket.IO not loaded');
            return null;
        }

        return libs.io(url);
    }

    // ==================== Text Polish System ====================
    function polishText() {
        var inputBox = $('#input-box');
        var text = inputBox.value.trim();

        if (!text) {
            showToast('请先输入要润色的文本', 'error');
            return;
        }

        var polishBtn = $('#polish-btn');
        if (polishBtn) {
            polishBtn.disabled = true;
            polishBtn.classList.add('polishing');
        }

        var intent = handleIntent(text);
        var originalText = text;
        var polishPhase = 0;
        var phaseMessages = [
            '正在分析文本结构...',
            '检测语法和拼写错误...',
            '优化表达流畅度...',
            '保持专业术语准确性...',
            '润色完成！'
        ];

        var phaseInterval = setInterval(function() {
            if (polishPhase < phaseMessages.length - 1) {
                polishPhase++;
                inputBox.value = phaseMessages[polishPhase];
            }
        }, 600);

        var systemPrompt = '你是一个专业的文本润色专家。请对用户输入的文本进行润色，改进语法、提升表达质量、保持原意。\n\n' +
            '润色规则：\n' +
            '1. 纠正语法错误和拼写错误\n' +
            '2. 优化句子结构，提升表达流畅度\n' +
            '3. 保持专业术语的准确性\n' +
            '4. 根据上下文增强表达的准确性\n' +
            '5. 保持原文的语气和风格\n\n' +
            '请直接输出润色后的文本，不需要解释。';

        var polishPrompt = '请润色以下文本：\n\n' + text;

        var payload = {
            content: polishPrompt,
            options: {
                web_search: false,
                intent: 'polish',
                system_prompt: systemPrompt
            }
        };

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
        } else {
            connectWS();
            setTimeout(function () {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(payload));
                }
            }, 1000);
        }

        var originalOnMessage = ws ? ws.onmessage : null;

        var polishHandler = function (event) {
            try {
                var data = JSON.parse(event.data);

                if (data.type === 'stream_start') {
                    clearInterval(phaseInterval);
                    inputBox.value = '正在润色...';
                    inputBox.disabled = true;
                } else if (data.type === 'stream_data') {
                    inputBox.value = data.content;
                    autoResizeTextarea();
                } else if (data.type === 'stream_end' || data.type === 'response') {
                    clearInterval(phaseInterval);
                    inputBox.value = data.content || originalText;
                    inputBox.disabled = false;
                    autoResizeTextarea();
                    updateSendButton();

                    if (polishBtn) {
                        polishBtn.disabled = false;
                        polishBtn.classList.remove('polishing');
                    }

                    if (data.content && data.content !== originalText) {
                        showToast('润色完成', 'success');
                    } else if (!data.content) {
                        showToast('润色失败：未获取到润色结果', 'error');
                    }

                    if (ws && originalOnMessage) {
                        ws.onmessage = originalOnMessage;
                    }
                } else if (data.type === 'error') {
                    clearInterval(phaseInterval);
                    inputBox.value = originalText;
                    inputBox.disabled = false;

                    if (polishBtn) {
                        polishBtn.disabled = false;
                        polishBtn.classList.remove('polishing');
                    }

                    if (ws && originalOnMessage) {
                        ws.onmessage = originalOnMessage;
                    }
                }
            } catch (e) {
                console.error('Polish error:', e);
            }
        };

        if (ws) {
            var originalHandler = ws.onmessage;
            ws.onmessage = function (event) {
                try {
                    var data = JSON.parse(event.data);

                    if (data.type === 'stream_start' || data.type === 'stream_data' || data.type === 'stream_end' || data.type === 'response' || data.type === 'error') {
                        polishHandler(event);
                    } else {
                        if (originalHandler) originalHandler.call(ws, event);
                    }
                } catch (e) {
                    if (originalHandler) originalHandler.call(ws, event);
                }
            };
        }
    }

    // ==================== Thinking Animation ====================
    function showThinkingAnimation(text, intent) {
        var chatArea = $('#chat-area');
        var welcome = $('#welcome-screen');
        if (welcome) welcome.classList.add('hidden');

        var thinkingEl = document.createElement('div');
        thinkingEl.className = 'thinking-container';
        thinkingEl.innerHTML =
            '<div class="thinking-header opacity-0">' +
            '<div class="thinking-title">' +
            '<i class="fa-solid fa-brain thinking-brain"></i> ' +
            '<span>正在分析...</span>' +
            '</div>' +
            '<div class="thinking-intent-badge">' + intent.display + '</div>' +
            '</div>' +
            '<div class="thinking-phases opacity-0">' +
            '<div class="thinking-phase">' +
            '<div class="thinking-phase-icon"><i class="fa-solid fa-search"></i></div>' +
            '<div class="thinking-phase-text">理解问题</div>' +
            '</div>' +
            '<div class="thinking-phase">' +
            '<div class="thinking-phase-icon"><i class="fa-solid fa-cog"></i></div>' +
            '<div class="thinking-phase-text">处理中</div>' +
            '</div>' +
            '<div class="thinking-phase">' +
            '<div class="thinking-phase-icon"><i class="fa-solid fa-check"></i></div>' +
            '<div class="thinking-phase-text">生成回复</div>' +
            '</div>' +
            '</div>' +
            '<div class="thinking-detail opacity-0">' +
            '<div class="thinking-animations">' +
            '<div class="thinking-dots"><span></span><span></span><span></span></div>' +
            '</div>' +
            '<div class="thinking-user-text">' +
            '<i class="fa-solid fa-user"></i> ' +
            escapeHtml(text.length > 100 ? text.substring(0, 100) + '...' : text) +
            '</div>' +
            '</div>';

        chatArea.appendChild(thinkingEl);
        scrollToBottom();

        setTimeout(function() {
            thinkingEl.querySelector('.thinking-header').classList.remove('opacity-0');
            thinkingEl.querySelector('.thinking-header').classList.add('fade-in');
        }, 100);

        setTimeout(function() {
            thinkingEl.querySelector('.thinking-phases').classList.remove('opacity-0');
            thinkingEl.querySelector('.thinking-phases').classList.add('fade-in');

            setTimeout(function() {
                var phases = thinkingEl.querySelectorAll('.thinking-phase');
                if (phases.length > 0) {
                    phases[0].classList.add('active');
                }
            }, 300);
        }, 400);

        setTimeout(function () {
            var phases = thinkingEl.querySelectorAll('.thinking-phase');
            if (phases.length > 0) {
                phases[0].classList.remove('active');
                phases[0].classList.add('completed');
            }
        }, 1200);

        setTimeout(function () {
            var phases = thinkingEl.querySelectorAll('.thinking-phase');
            if (phases.length > 1) {
                phases[1].classList.add('active');
            }

            thinkingEl.querySelector('.thinking-detail').classList.remove('opacity-0');
            thinkingEl.querySelector('.thinking-detail').classList.add('fade-in');
        }, 1500);

        return thinkingEl;
    }

    function updateThinkingAnimation(thinkingEl, phase) {
        if (!thinkingEl) return;

        var phases = thinkingEl.querySelectorAll('.thinking-phase');
        phases.forEach(function (p, index) {
            p.classList.remove('active', 'completed');
            if (index < phase) {
                p.classList.add('completed');
            } else if (index === phase) {
                p.classList.add('active');
            }
        });

        if (phase === 2) {
            var detail = thinkingEl.querySelector('.thinking-detail');
            if (detail) {
                detail.innerHTML = '<div class="thinking-text"><i class="fa-solid fa-pen"></i> 正在生成回复...</div>';
            }
        }
    }

    // ==================== Model Settings Functions ====================
    function selectProvider(provider) {
        var providerItems = document.querySelectorAll('.provider-item');
        providerItems.forEach(function (item) {
            item.classList.remove('active');
            if (item.dataset.provider === provider) {
                item.classList.add('active');
            }
        });

        var configSections = document.querySelectorAll('.config-section');
        configSections.forEach(function (section) {
            section.classList.remove('active');
        });

        var activeSection = $('#config-' + provider);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        var providerNames = {
            'openai': 'OpenAI',
            'anthropic': 'Anthropic',
            'google': 'Google',
            'azure': 'Azure OpenAI',
            'aliyun': '阿里云',
            'baidu': '百度',
            'tencent': '腾讯云',
            'zhipu': '智谱AI',
            'deepseek': 'DeepSeek',
            'ollama': 'Ollama',
            'siliconflow': '硅基流动',
            'custom': '自定义 API'
        };

        var configProviderName = document.querySelector('.config-provider-name');
        if (configProviderName) {
            configProviderName.textContent = providerNames[provider] || provider;
        }
    }

    function testModelConnection() {
        var activeProvider = document.querySelector('.provider-item.active');
        if (!activeProvider) {
            showToast('请先选择一个模型服务商', 'error');
            return;
        }

        var provider = activeProvider.dataset.provider;
        var configSection = $('#config-' + provider);
        if (!configSection) return;

        var apiKeyInput = configSection.querySelector('input[type="password"]');
        if (!apiKeyInput || !apiKeyInput.value) {
            showToast('请填写API Key', 'error');
            return;
        }

        var activeModelTag = configSection.querySelector('.model-tag.active');
        var modelName = activeModelTag ? activeModelTag.dataset.model : '';
        if (!modelName) {
            showToast('请选择或输入一个模型', 'error');
            return;
        }

        var testBtn = $('#model-test-btn');
        var originalText = testBtn.innerHTML;
        testBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 测试中...';
        testBtn.disabled = true;

        var baseUrlInput = configSection.querySelector('input[placeholder*="url"], input[placeholder*="URL"]');
        var baseUrl = baseUrlInput ? baseUrlInput.value : '';

        httpPost('/api/model/test', {
            provider: provider,
            api_key: apiKeyInput.value,
            base_url: baseUrl,
            model: modelInput.value
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            updateModelInfoPanel(configSection, data);

            if (data.success) {
                var statusEl = activeProvider.querySelector('.provider-status');
                if (statusEl) {
                    statusEl.classList.remove('offline');
                    statusEl.classList.add('online');
                }

                if (data.balance !== undefined) {
                    showToast(`连接测试成功！余额: ${data.balance}`, 'success');
                } else {
                    showToast('连接测试成功！', 'success');
                }
            } else {
                var statusEl = activeProvider.querySelector('.provider-status');
                if (statusEl) {
                    statusEl.classList.remove('online');
                    statusEl.classList.add('offline');
                }

                var errorMsg = data.error || '未知错误';
                if (data.balance === 0) {
                    errorMsg = '余额不足，请先充值';
                }
                showToast('连接失败: ' + errorMsg, 'error');
            }
        }).catch(function (e) {
            showToast('测试失败: ' + e.message, 'error');
            var statusEl = activeProvider.querySelector('.provider-status');
            if (statusEl) {
                statusEl.classList.remove('online');
                statusEl.classList.add('offline');
            }
        }).finally(function () {
            testBtn.innerHTML = originalText;
            testBtn.disabled = false;
        });
    }

    function updateModelInfoPanel(configSection, data) {
        var infoPanel = configSection.querySelector('.model-info-panel');
        if (!infoPanel) return;

        var statusEl = infoPanel.querySelector('.model-info-value');
        if (statusEl) {
            statusEl.classList.remove('status-pending', 'status-success', 'status-error');
            if (data.success) {
                statusEl.classList.add('status-success');
                statusEl.textContent = '可用';
            } else {
                statusEl.classList.add('status-error');
                statusEl.textContent = '不可用';
            }
        }

        var balanceEl = infoPanel.querySelectorAll('.model-info-value')[1];
        if (balanceEl) {
            if (data.balance !== undefined) {
                balanceEl.textContent = data.balance;
            } else if (data.success) {
                balanceEl.textContent = 'API未返回余额信息';
            } else {
                balanceEl.textContent = '--';
            }
        }
    }

    function addCustomModel() {
        var activeProvider = document.querySelector('.provider-item.active');
        if (!activeProvider) return;

        var provider = activeProvider.dataset.provider;
        var configSection = $('#config-' + provider);
        if (!configSection) return;

        var inputWrapper = configSection.querySelector('.model-tag-input-wrapper');
        if (!inputWrapper) return;

        var input = inputWrapper.querySelector('.model-tag-input');
        var modelName = input.value.trim();

        if (!modelName) {
            showToast('请输入模型名称', 'error');
            return;
        }

        var modelTags = configSection.querySelector('.model-tags');
        var existingTags = modelTags.querySelectorAll('.model-tag');
        for (var i = 0; i < existingTags.length; i++) {
            if (existingTags[i].dataset.model === modelName) {
                showToast('该模型已存在', 'error');
                return;
            }
        }

        var newTag = document.createElement('span');
        newTag.className = 'model-tag active';
        newTag.dataset.model = modelName;
        newTag.textContent = modelName;

        var addWrapper = modelTags.querySelector('.model-tag-input-wrapper');
        modelTags.insertBefore(newTag, addWrapper);

        existingTags.forEach(function (tag) {
            tag.classList.remove('active');
        });

        input.value = '';
        showToast('模型已添加', 'success');
    }

    function saveModelSettings() {
        var activeProvider = document.querySelector('.provider-item.active');
        if (!activeProvider) {
            showToast('请先选择一个模型服务商', 'error');
            return;
        }

        var provider = activeProvider.dataset.provider;
        var configSection = $('#config-' + provider);
        if (!configSection) return;

        var settings = {
            provider: provider,
            api_key: '',
            base_url: '',
            models: [],
            params: {
                max_tokens: parseInt($('#setting-max-tokens')?.value || '4096'),
                temperature: parseFloat($('#setting-temperature')?.value || '0.7'),
                top_p: parseFloat($('#setting-top-p')?.value || '0.9'),
                top_k: parseInt($('#setting-top-k')?.value || '0'),
                frequency_penalty: parseFloat($('#setting-frequency-penalty')?.value || '0'),
                presence_penalty: parseFloat($('#setting-presence-penalty')?.value || '0')
            }
        };

        var apiKeyInput = configSection.querySelector('input[type="password"]');
        if (apiKeyInput) settings.api_key = apiKeyInput.value;

        var baseUrlInput = configSection.querySelector('input[placeholder*="url"], input[placeholder*="URL"]');
        if (baseUrlInput) settings.base_url = baseUrlInput.value;

        var modelTags = configSection.querySelectorAll('.model-tag');
        modelTags.forEach(function (tag) {
            if (tag.classList.contains('active')) {
                settings.models.push(tag.dataset.model);
            }
        });

        httpPost('/api/model/save', settings).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.success) {
                showToast('配置保存成功！', 'success');
            } else {
                showToast('保存失败: ' + data.error, 'error');
            }
        }).catch(function (e) {
            showToast('保存失败: ' + e.message, 'error');
        });
    }

    // ==================== PPT Generation ====================
    function generatePPT(presentationData) {
        var pptxLib = libs.pptxgen || window.PptxGenJS || window.pptxgen;
        if (!pptxLib) {
            showToast('PPT生成库加载失败', 'error');
            return;
        }

        try {
            var pres = new pptxLib();
            pres.layout = 'LAYOUT_16x9';
            pres.title = presentationData.title || '演示文稿';
            pres.author = 'DATA-AI';

            if (presentationData.cover) {
                var slide1 = pres.addSlide();
                slide1.addText(presentationData.cover.title, {
                    x: 1, y: 3, w: 8, h: 1.5,
                    fontSize: 36, bold: true, color: '000000',
                    align: 'center'
                });
                if (presentationData.cover.subtitle) {
                    slide1.addText(presentationData.cover.subtitle, {
                        x: 1, y: 4.5, w: 8, h: 1,
                        fontSize: 20, color: '666666',
                        align: 'center'
                    });
                }
                if (presentationData.cover.speaker) {
                    slide1.addText(presentationData.cover.speaker, {
                        x: 1, y: 6, w: 8, h: 0.5,
                        fontSize: 14, color: '999999',
                        align: 'center'
                    });
                }
            }

            if (presentationData.tableOfContents && presentationData.tableOfContents.length > 0) {
                var slide2 = pres.addSlide();
                slide2.addText('目录', {
                    x: 1, y: 1.5, w: 8, h: 1,
                    fontSize: 28, bold: true, color: '000000'
                });

                var yPos = 2.5;
                presentationData.tableOfContents.forEach(function(item, index) {
                    slide2.addText((index + 1) + '. ' + item, {
                        x: 1.5, y: yPos, w: 7, h: 0.6,
                        fontSize: 18, color: '333333'
                    });
                    yPos += 0.8;
                });
            }

            if (presentationData.sections && presentationData.sections.length > 0) {
                presentationData.sections.forEach(function(section) {
                    section.slides.forEach(function(slideData) {
                        var slide = pres.addSlide();
                        slide.addText(slideData.title, {
                            x: 1, y: 1, w: 8, h: 0.8,
                            fontSize: 24, bold: true, color: '000000'
                        });

                        var yPos = 2;
                        slideData.points.forEach(function(point) {
                            slide.addText('• ' + point, {
                                x: 1.2, y: yPos, w: 7.6, h: 0.5,
                                fontSize: 16, color: '333333'
                            });
                            yPos += 0.6;
                        });
                    });
                });
            }

            if (presentationData.summary) {
                var slideN = pres.addSlide();
                slideN.addText('总结', {
                    x: 1, y: 1.5, w: 8, h: 1,
                    fontSize: 28, bold: true, color: '000000'
                });

                var yPos = 2.5;
                presentationData.summary.forEach(function(point, index) {
                    slideN.addText((index + 1) + '. ' + point, {
                        x: 1.5, y: yPos, w: 7, h: 0.6,
                        fontSize: 18, color: '333333'
                    });
                    yPos += 0.8;
                });
            }

            var slideQA = pres.addSlide();
            slideQA.addText('Q&A', {
                x: 1, y: 3, w: 8, h: 1.5,
                fontSize: 36, bold: true, color: '000000',
                align: 'center'
            });
            slideQA.addText('感谢您的聆听！', {
                x: 1, y: 5, w: 8, h: 0.8,
                fontSize: 20, color: '666666',
                align: 'center'
            });

            var fileName = (presentationData.title || 'presentation') + '.pptx';
            pres.writeFile({ fileName: fileName }).then(function() {
                showToast('PPT生成成功！', 'success');
            }).catch(function(err) {
                console.error('PPT生成失败:', err);
                showToast('PPT生成失败: ' + err.message, 'error');
            });
        } catch (err) {
            console.error('PPT生成异常:', err);
            showToast('PPT生成异常: ' + err.message, 'error');
        }
    }

    window.__generatePPT = function() {
        var chatArea = $('#chat-area');
        var lastMessage = chatArea.querySelector('.message.assistant:last-child .message-content');
        if (!lastMessage) {
            showToast('请先生成PPT大纲', 'error');
            return;
        }

        var content = lastMessage.textContent || lastMessage.innerText;

        var presentationData = parsePPTOutline(content);
        if (presentationData) {
            generatePPT(presentationData);
        } else {
            showToast('无法解析PPT大纲，请确保内容格式正确', 'error');
        }
    };

    function parsePPTOutline(content) {
        var lines = content.split('\n');
        var data = {
            title: '',
            cover: {},
            tableOfContents: [],
            sections: [],
            summary: []
        };

        var currentSection = null;
        var currentSlide = null;
        var inSection = false;

        lines.forEach(function(line) {
            line = line.trim();

            if (line.startsWith('## 📊')) {
                data.title = line.replace('## 📊', '').trim();
            } else if (line.startsWith('### 1. 封面页')) {
                inSection = 'cover';
            } else if (line.startsWith('**标题**:')) {
                data.cover.title = line.replace('**标题**:', '').trim();
            } else if (line.startsWith('**副标题**:')) {
                data.cover.subtitle = line.replace('**副标题**:', '').trim();
            } else if (line.startsWith('**演讲者**:')) {
                data.cover.speaker = line.replace('**演讲者**:', '').trim();
            } else if (line.startsWith('### 2. 目录页')) {
                inSection = 'toc';
            } else if (line.startsWith('- ') && inSection === 'toc') {
                data.tableOfContents.push(line.replace('- ', '').trim());
            } else if (line.startsWith('### 3. 内容页')) {
                inSection = 'content';
            } else if (line.startsWith('#### 章节')) {
                currentSection = { title: line.replace('#### 章节', '').trim(), slides: [] };
                data.sections.push(currentSection);
            } else if (line.startsWith('**幻灯片')) {
                if (currentSection) {
                    var slideTitle = line.replace(/\*\*幻灯片.*?:\*\*/, '').trim();
                    currentSlide = { title: slideTitle, points: [] };
                    currentSection.slides.push(currentSlide);
                }
            } else if (line.startsWith('- ') && currentSlide) {
                currentSlide.points.push(line.replace('- ', '').trim());
            } else if (line.startsWith('### 4. 总结页')) {
                inSection = 'summary';
            } else if (line.startsWith('- ') && inSection === 'summary') {
                data.summary.push(line.replace('- ', '').trim());
            }
        });

        return data.title || data.cover.title ? data : null;
    }

    // ==================== Speech Recognition ====================
    var recognition = null;
    var isListening = false;

    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('浏览器不支持语音识别功能');
            return false;
        }

        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'zh-CN';
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            isListening = true;
            var voiceBtn = $('#voice-btn');
            var voiceIndicator = $('#voice-indicator');
            if (voiceBtn) {
                voiceBtn.classList.add('recording');
                voiceBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
            }
            if (voiceIndicator) {
                voiceIndicator.classList.remove('hidden');
            }
        };

        recognition.onresult = function(event) {
            var transcript = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            var inputBox = $('#input-box');
            if (inputBox) {
                inputBox.value = transcript;
                autoResizeTextarea();
                updateSendButton();
            }

            var voiceStatusText = $('#voice-status-text');
            if (voiceStatusText) {
                voiceStatusText.textContent = '正在聆听... ' + transcript;
            }
        };

        recognition.onerror = function(event) {
            console.error('语音识别错误:', event.error);
            var errorMsg = '';

            switch(event.error) {
                case 'no-speech':
                    errorMsg = '没有检测到语音';
                    break;
                case 'audio-capture':
                    errorMsg = '无法访问麦克风';
                    break;
                case 'not-allowed':
                    errorMsg = '麦克风权限被拒绝';
                    break;
                case 'network':
                    errorMsg = '网络连接错误';
                    break;
                case 'service-not-allowed':
                    errorMsg = '语音识别服务不可用';
                    break;
                default:
                    errorMsg = '识别错误: ' + event.error;
            }

            showToast(errorMsg, 'error');
            stopListening();
        };

        recognition.onend = function() {
            isListening = false;
            var voiceBtn = $('#voice-btn');
            var voiceIndicator = $('#voice-indicator');
            if (voiceBtn) {
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            }
            if (voiceIndicator) {
                voiceIndicator.classList.add('hidden');
            }
        };

        return true;
    }

    function toggleVoiceInput() {
        if (!recognition) {
            var supported = initSpeechRecognition();
            if (!supported) {
                showToast('您的浏览器不支持语音识别功能，请使用Chrome或Edge浏览器', 'error');
                return;
            }
        }

        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }

    function startListening() {
        if (isListening) return;

        try {
            recognition.start();
            showToast('开始聆听，请说话...', 'info');
        } catch (error) {
            console.error('启动语音识别失败:', error);
            showToast('启动语音识别失败，请检查麦克风权限', 'error');
        }
    }

    function stopListening() {
        if (!isListening) return;

        try {
            recognition.stop();
        } catch (error) {
            console.error('停止语音识别失败:', error);
        }
    }

    // ==================== Quick Actions ====================
    window.__quickAction = function(actionType) {
        var inputBox = $('#input-box');
        if (!inputBox) return;

        var prompts = {
            'chart': '帮我创建一个图表，数据如下：\n- 一月: 120\n- 二月: 180\n- 三月: 240\n- 四月: 190\n- 五月: 310',
            'ppt': '帮我生成一个关于人工智能的PPT大纲，包括封面、目录和3个主要章节',
            'flowchart': '帮我画一个流程图：开始→输入→处理→判断→输出→结束'
        };

        if (prompts[actionType]) {
            inputBox.value = prompts[actionType];
            showToast('已自动填充提示词', 'info');
        }
    };

    // ==================== Init ====================
    function init() {
        initMarked();
        loadTheme();
        loadConversations();

        var keys = Object.keys(conversations);
        if (keys.length > 0) {
            currentConvId = keys[keys.length - 1];
        }

        renderConversationList();
        renderChatArea();
        initAutoScroll();
        initScrollToBottomBtn();
        initStopButton();
        initSidebar();
        initInputSystem();
        initDrawers();
        initModelSelector();
        initWelcomeSuggestions();
        initKeyboardShortcuts();
        initLogsPanel();

        connectWS();
        loadSettings();
        initLibraries();

        initLearningSystem();
        initErrorHandling();
        initMemorySystem();
        initSpeechSynthesis();

        addLog('应用初始化完成', 'system');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
