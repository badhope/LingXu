/**
 * DATA-AI 智能体管理页面
 * 功能：智能体的创建、编辑、删除、切换
 */

(function() {
    'use strict';

    // ==================== 状态管理 ====================
    var state = {
        agents: [],
        currentAgentId: 'default',
        editingAgentId: null,
        isModalOpen: false
    };

    // ==================== DOM 元素 ====================
    var elements = {
        agentGrid: null,
        agentModal: null,
        agentModalOverlay: null,
        agentForm: null,
        createAgentBtn: null,
        addAgentCard: null,
        closeModalBtn: null,
        cancelBtn: null,
        saveBtn: null,
        temperatureInput: null,
        temperatureValue: null,
        iconOptions: null
    };

    // ==================== 初始化 ====================
    function init() {
        cacheElements();
        bindEvents();
        loadAgents();
    }

    function cacheElements() {
        elements.agentGrid = document.getElementById('agent-grid');
        elements.agentModal = document.getElementById('agent-modal');
        elements.agentModalOverlay = document.getElementById('agent-modal-overlay');
        elements.agentForm = document.getElementById('agent-form');
        elements.createAgentBtn = document.getElementById('create-agent-btn');
        elements.addAgentCard = document.getElementById('add-agent-card');
        elements.closeModalBtn = document.getElementById('agent-modal-close');
        elements.cancelBtn = document.getElementById('agent-cancel-btn');
        elements.saveBtn = document.getElementById('agent-save-btn');
        elements.temperatureInput = document.getElementById('agent-temperature');
        elements.temperatureValue = document.getElementById('temperature-value');
        elements.iconOptions = document.querySelectorAll('.icon-option');
    }

    function bindEvents() {
        // 创建智能体按钮
        if (elements.createAgentBtn) {
            elements.createAgentBtn.addEventListener('click', openCreateModal);
        }

        // 添加卡片
        if (elements.addAgentCard) {
            elements.addAgentCard.addEventListener('click', openCreateModal);
        }

        // 关闭模态框
        if (elements.closeModalBtn) {
            elements.closeModalBtn.addEventListener('click', closeModal);
        }
        if (elements.cancelBtn) {
            elements.cancelBtn.addEventListener('click', closeModal);
        }
        if (elements.agentModalOverlay) {
            elements.agentModalOverlay.addEventListener('click', function(e) {
                if (e.target === elements.agentModalOverlay) {
                    closeModal();
                }
            });
        }

        // 保存智能体
        if (elements.saveBtn) {
            elements.saveBtn.addEventListener('click', saveAgent);
        }

        // 温度滑块
        if (elements.temperatureInput && elements.temperatureValue) {
            elements.temperatureInput.addEventListener('input', function() {
                elements.temperatureValue.textContent = this.value;
            });
        }

        // 图标选择
        if (elements.iconOptions) {
            elements.iconOptions.forEach(function(option) {
                option.addEventListener('click', function() {
                    var icon = this.getAttribute('data-icon');
                    document.getElementById('agent-icon').value = icon;
                    elements.iconOptions.forEach(function(opt) {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
        }

        // 智能体卡片点击
        if (elements.agentGrid) {
            elements.agentGrid.addEventListener('click', handleAgentCardClick);
        }

        // ESC 关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && state.isModalOpen) {
                closeModal();
            }
        });
    }

    // ==================== 数据加载 ====================
    function loadAgents() {
        // 从 localStorage 加载
        var saved = localStorage.getItem('data-ai-agents');
        if (saved) {
            try {
                state.agents = JSON.parse(saved);
            } catch (e) {
                state.agents = getDefaultAgents();
            }
        } else {
            state.agents = getDefaultAgents();
        }

        // 加载当前选中的智能体
        state.currentAgentId = localStorage.getItem('data-ai-current-agent') || 'default';

        renderAgents();
    }

    function getDefaultAgents() {
        return [
            {
                id: 'default',
                name: '智能助手',
                icon: '🤖',
                description: '默认智能助手，支持通用对话和代码执行',
                provider: 'aliyun',
                model: 'qwen-plus-latest',
                temperature: 0.7,
                maxTokens: 4096,
                systemPrompt: '你是一个乐于助人的AI助手。请用友好、专业的语言回答用户问题。',
                capabilities: ['code_execution', 'knowledge_base'],
                skills: [],
                tags: ['通用', '代码'],
                createdAt: new Date().toISOString()
            },
            {
                id: 'coder',
                name: '代码专家',
                icon: '💻',
                description: '专注于代码编写、调试和优化',
                provider: 'openai',
                model: 'gpt-4',
                temperature: 0.3,
                maxTokens: 8192,
                systemPrompt: '你是一个专业的编程助手。请提供高质量的代码解决方案，包括详细的解释和最佳实践建议。',
                capabilities: ['code_execution', 'file_analysis'],
                skills: ['代码审查'],
                tags: ['编程', '调试'],
                createdAt: new Date().toISOString()
            },
            {
                id: 'writer',
                name: '文档助手',
                icon: '📝',
                description: '帮助撰写、编辑和优化各类文档',
                provider: 'anthropic',
                model: 'claude-3-opus',
                temperature: 0.8,
                maxTokens: 4096,
                systemPrompt: '你是一个专业的写作助手。请帮助用户撰写、编辑和优化各类文档，包括报告、文章、邮件等。',
                capabilities: ['knowledge_base', 'file_analysis'],
                skills: ['文档生成'],
                tags: ['写作', '文档'],
                createdAt: new Date().toISOString()
            }
        ];
    }

    function saveAgents() {
        localStorage.setItem('data-ai-agents', JSON.stringify(state.agents));
    }

    // ==================== 渲染 ====================
    function renderAgents() {
        if (!elements.agentGrid) return;

        var html = '';

        state.agents.forEach(function(agent) {
            var isActive = agent.id === state.currentAgentId;
            var avatarClass = agent.id === 'coder' ? 'coder' : agent.id === 'writer' ? 'writer' : '';
            var iconType = agent.icon === '🤖' ? '<i class="fa-solid fa-robot"></i>' :
                          agent.icon === '💻' ? '<i class="fa-solid fa-code"></i>' :
                          agent.icon === '📝' ? '<i class="fa-solid fa-file-lines"></i>' :
                          agent.icon;

            html += '<div class="agent-card ' + (isActive ? 'active' : '') + '" data-agent-id="' + agent.id + '">' +
                '<div class="agent-card-header">' +
                    '<div class="agent-avatar ' + avatarClass + '">' + iconType + '</div>' +
                    '<div class="agent-status online"></div>' +
                '</div>' +
                '<div class="agent-card-body">' +
                    '<h3 class="agent-name">' + escapeHtml(agent.name) + '</h3>' +
                    '<p class="agent-desc">' + escapeHtml(agent.description || '') + '</p>' +
                    '<div class="agent-tags">' +
                        (agent.tags || []).map(function(tag) {
                            return '<span class="tag">' + escapeHtml(tag) + '</span>';
                        }).join('') +
                    '</div>' +
                '</div>' +
                '<div class="agent-card-footer">' +
                    '<span class="agent-model">' +
                        '<i class="fa-solid fa-microchip"></i>' +
                        agent.model +
                    '</span>' +
                    '<div class="agent-actions">' +
                        '<button class="action-btn edit-btn" title="编辑" data-action="edit">' +
                            '<i class="fa-solid fa-pen"></i>' +
                        '</button>' +
                        '<button class="action-btn copy-btn" title="复制" data-action="copy">' +
                            '<i class="fa-solid fa-copy"></i>' +
                        '</button>' +
                        '<button class="action-btn danger delete-btn" title="删除" data-action="delete">' +
                            '<i class="fa-solid fa-trash"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });

        // 添加卡片
        html += '<div class="agent-card add-card" id="add-agent-card">' +
            '<div class="add-card-content">' +
                '<i class="fa-solid fa-plus"></i>' +
                '<span>创建新智能体</span>' +
            '</div>' +
        '</div>';

        elements.agentGrid.innerHTML = html;

        // 重新绑定添加卡片事件
        var newAddCard = document.getElementById('add-agent-card');
        if (newAddCard) {
            newAddCard.addEventListener('click', openCreateModal);
        }
    }

    // ==================== 事件处理 ====================
    function handleAgentCardClick(e) {
        var card = e.target.closest('.agent-card');
        if (!card || card.classList.contains('add-card')) return;

        var agentId = card.getAttribute('data-agent-id');
        var action = e.target.closest('.action-btn');

        if (action) {
            var actionType = action.getAttribute('data-action');
            switch (actionType) {
                case 'edit':
                    openEditModal(agentId);
                    break;
                case 'copy':
                    copyAgent(agentId);
                    break;
                case 'delete':
                    deleteAgent(agentId);
                    break;
            }
        } else {
            // 选择智能体
            selectAgent(agentId);
        }
    }

    function selectAgent(agentId) {
        state.currentAgentId = agentId;
        localStorage.setItem('data-ai-current-agent', agentId);
        renderAgents();
        showToast('已切换到 ' + (getAgentById(agentId)?.name || '智能体'), 'success');
    }

    function openCreateModal() {
        state.editingAgentId = null;
        document.getElementById('agent-modal-title').textContent = '创建智能体';
        resetForm();
        openModal();
    }

    function openEditModal(agentId) {
        var agent = getAgentById(agentId);
        if (!agent) return;

        state.editingAgentId = agentId;
        document.getElementById('agent-modal-title').textContent = '编辑智能体';

        // 填充表单
        document.getElementById('agent-name').value = agent.name || '';
        document.getElementById('agent-icon').value = agent.icon || '🤖';
        document.getElementById('agent-description').value = agent.description || '';
        document.getElementById('agent-provider').value = agent.provider || 'aliyun';
        document.getElementById('agent-model').value = agent.model || 'qwen-plus-latest';
        document.getElementById('agent-temperature').value = agent.temperature || 0.7;
        document.getElementById('temperature-value').textContent = agent.temperature || 0.7;
        document.getElementById('agent-max-tokens').value = agent.maxTokens || 4096;
        document.getElementById('agent-system-prompt').value = agent.systemPrompt || '';

        // 设置能力
        var capabilities = agent.capabilities || [];
        document.querySelectorAll('input[name="capabilities"]').forEach(function(checkbox) {
            checkbox.checked = capabilities.includes(checkbox.value);
        });

        // 设置图标
        elements.iconOptions.forEach(function(opt) {
            opt.classList.toggle('active', opt.getAttribute('data-icon') === agent.icon);
        });

        openModal();
    }

    function openModal() {
        state.isModalOpen = true;
        elements.agentModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        state.isModalOpen = false;
        elements.agentModalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        resetForm();
    }

    function resetForm() {
        if (elements.agentForm) {
            elements.agentForm.reset();
        }
        if (elements.temperatureValue) {
            elements.temperatureValue.textContent = '0.7';
        }
        if (elements.iconOptions) {
            elements.iconOptions.forEach(function(opt, index) {
                opt.classList.toggle('active', index === 0);
            });
        }
        document.getElementById('agent-icon').value = '🤖';
    }

    function saveAgent() {
        var name = document.getElementById('agent-name').value.trim();
        if (!name) {
            showToast('请输入智能体名称', 'error');
            return;
        }

        var systemPrompt = document.getElementById('agent-system-prompt').value.trim();
        if (!systemPrompt) {
            showToast('请输入系统提示词', 'error');
            return;
        }

        // 收集能力
        var capabilities = [];
        document.querySelectorAll('input[name="capabilities"]:checked').forEach(function(checkbox) {
            capabilities.push(checkbox.value);
        });

        var agentData = {
            id: state.editingAgentId || 'agent-' + Date.now(),
            name: name,
            icon: document.getElementById('agent-icon').value,
            description: document.getElementById('agent-description').value.trim(),
            provider: document.getElementById('agent-provider').value,
            model: document.getElementById('agent-model').value,
            temperature: parseFloat(document.getElementById('agent-temperature').value),
            maxTokens: parseInt(document.getElementById('agent-max-tokens').value),
            systemPrompt: systemPrompt,
            capabilities: capabilities,
            skills: [],
            tags: [],
            createdAt: new Date().toISOString()
        };

        if (state.editingAgentId) {
            // 更新
            var index = state.agents.findIndex(function(a) { return a.id === state.editingAgentId; });
            if (index !== -1) {
                state.agents[index] = agentData;
            }
            showToast('智能体已更新', 'success');
        } else {
            // 创建
            state.agents.push(agentData);
            showToast('智能体已创建', 'success');
        }

        saveAgents();
        renderAgents();
        closeModal();
    }

    function copyAgent(agentId) {
        var agent = getAgentById(agentId);
        if (!agent) return;

        var newAgent = Object.assign({}, agent, {
            id: 'agent-' + Date.now(),
            name: agent.name + ' (副本)',
            createdAt: new Date().toISOString()
        });

        state.agents.push(newAgent);
        saveAgents();
        renderAgents();
        showToast('智能体已复制', 'success');
    }

    function deleteAgent(agentId) {
        if (agentId === 'default') {
            showToast('默认智能体不能删除', 'error');
            return;
        }

        if (!confirm('确定要删除这个智能体吗？')) return;

        var index = state.agents.findIndex(function(a) { return a.id === agentId; });
        if (index !== -1) {
            state.agents.splice(index, 1);
            saveAgents();

            if (state.currentAgentId === agentId) {
                state.currentAgentId = 'default';
                localStorage.setItem('data-ai-current-agent', 'default');
            }

            renderAgents();
            showToast('智能体已删除', 'success');
        }
    }

    // ==================== 工具函数 ====================
    function getAgentById(agentId) {
        return state.agents.find(function(a) { return a.id === agentId; });
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showToast(message, type) {
        // 简单的 toast 实现
        var existing = document.querySelector('.toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'info');
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;background:' +
            (type === 'success' ? '#34d399' : type === 'error' ? '#f87171' : '#60a5fa') +
            ';color:#000;font-size:14px;z-index:10000;animation:fadeIn 0.3s ease';
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2000);
    }

    // ==================== 启动 ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
