/**
 * 规则引擎页面逻辑
 * @description 规则的增删改查、条件配置、动作执行
 */

(function() {
    'use strict';

    // ==================== 状态管理 ====================
    const state = {
        rules: [],
        editingId: null,
        conditionLogic: 'or'
    };

    // 默认规则
    const defaultRules = [
        {
            id: 'rule-greeting',
            name: '自动问候',
            description: '用户发送问候语时自动回复',
            triggerType: 'keyword',
            priority: 'high',
            enabled: true,
            conditions: {
                logic: 'or',
                items: [
                    { type: 'contains', value: '你好' },
                    { type: 'contains', value: 'hello' },
                    { type: 'contains', value: 'hi' }
                ]
            },
            action: {
                type: 'reply',
                content: '你好！我是DATA-AI智能助手，有什么可以帮助你的吗？'
            },
            cooldown: 5,
            maxTrigger: 0,
            stopProcessing: false,
            triggerCount: 156,
            createdAt: Date.now() - 86400000 * 5
        },
        {
            id: 'rule-code-help',
            name: '代码帮助',
            description: '检测到代码相关问题时切换到代码专家',
            triggerType: 'keyword',
            priority: 'medium',
            enabled: true,
            conditions: {
                logic: 'or',
                items: [
                    { type: 'contains', value: '代码' },
                    { type: 'contains', value: '编程' },
                    { type: 'contains', value: 'bug' },
                    { type: 'contains', value: '调试' }
                ]
            },
            action: {
                type: 'agent',
                content: 'code-expert'
            },
            cooldown: 0,
            maxTrigger: 0,
            stopProcessing: false,
            triggerCount: 89,
            createdAt: Date.now() - 86400000 * 3
        },
        {
            id: 'rule-complaint',
            name: '投诉处理',
            description: '检测到用户投诉时触发安抚流程',
            triggerType: 'intent',
            priority: 'high',
            enabled: true,
            conditions: {
                intentType: 'complaint',
                confidence: 75
            },
            action: {
                type: 'reply',
                content: '非常抱歉给您带来不好的体验，我们会尽快处理您的问题。请问具体是什么情况呢？'
            },
            cooldown: 0,
            maxTrigger: 0,
            stopProcessing: true,
            triggerCount: 12,
            createdAt: Date.now() - 86400000 * 2
        },
        {
            id: 'rule-morning-greeting',
            name: '早安问候',
            description: '每天早上自动发送问候',
            triggerType: 'schedule',
            priority: 'low',
            enabled: false,
            conditions: {
                time: '09:00',
                repeat: 'daily'
            },
            action: {
                type: 'reply',
                content: '早上好！新的一天开始了，有什么我可以帮助你的吗？'
            },
            cooldown: 0,
            maxTrigger: 0,
            stopProcessing: false,
            triggerCount: 0,
            createdAt: Date.now() - 86400000
        }
    ];

    // ==================== 初始化 ====================
    function init() {
        loadState();
        bindEvents();
        renderRules();
        updateStats();
    }

    function loadState() {
        const saved = localStorage.getItem('rules_data');
        state.rules = saved ? JSON.parse(saved) : defaultRules;
    }

    function saveState() {
        localStorage.setItem('rules_data', JSON.stringify(state.rules));
    }

    // ==================== 事件绑定 ====================
    function bindEvents() {
        // 添加规则
        $('#add-rule-btn')?.addEventListener('click', () => openModal());
        $('#create-first-rule')?.addEventListener('click', () => openModal());

        // 导入规则
        $('#import-rules-btn')?.addEventListener('click', importRules);

        // 搜索和筛选
        $('#search-rules')?.addEventListener('input', debounce(filterRules, 300));
        $('#trigger-filter')?.addEventListener('change', filterRules);
        $('#status-filter')?.addEventListener('change', filterRules);

        // 弹窗事件
        $('#modal-close')?.addEventListener('click', closeModal);
        $('#cancel-btn')?.addEventListener('click', closeModal);
        $('#save-btn')?.addEventListener('click', saveRule);

        // 触发类型切换
        $('#rule-trigger-type')?.addEventListener('change', toggleTriggerConfig);

        // 动作类型切换
        $('#action-type')?.addEventListener('change', toggleActionDetail);

        // 条件逻辑切换
        document.querySelectorAll('.logic-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.logic-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.conditionLogic = btn.dataset.logic;
            });
        });

        // 添加条件
        $('#add-keyword')?.addEventListener('click', addConditionRow);

        // 高级设置折叠
        $('#advanced-toggle')?.addEventListener('click', toggleAdvanced);

        // 置信度滑块
        $('#confidence-threshold')?.addEventListener('input', function() {
            $('#confidence-value').textContent = this.value + '%';
        });

        // 点击遮罩关闭
        $('#rule-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'rule-modal-overlay') closeModal();
        });
    }

    // ==================== 渲染规则列表 ====================
    function renderRules(rules = null) {
        const grid = $('#rules-grid');
        const empty = $('#rules-empty');
        const list = rules || state.rules;

        if (!grid) return;

        if (list.length === 0) {
            grid.innerHTML = '';
            empty?.classList.remove('hidden');
            return;
        }

        empty?.classList.add('hidden');
        grid.innerHTML = list.map(rule => createRuleCard(rule)).join('');

        // 绑定卡片事件
        grid.querySelectorAll('.rule-card').forEach(card => {
            const id = card.dataset.id;
            
            card.querySelector('.toggle-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleRule(id);
            });
            
            card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                editRule(id);
            });
            
            card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteRule(id);
            });

            card.querySelector('.duplicate-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                duplicateRule(id);
            });
        });
    }

    function createRuleCard(rule) {
        const triggerTypeNames = {
            'keyword': '关键词匹配',
            'regex': '正则表达式',
            'intent': '意图识别',
            'schedule': '定时触发'
        };

        const priorityColors = {
            'high': '#f87171',
            'medium': '#fbbf24',
            'low': '#34d399'
        };

        const conditionTags = generateConditionTags(rule);

        return `
            <div class="rule-card ${rule.enabled ? '' : 'disabled'}" data-id="${rule.id}">
                <div class="rule-header">
                    <div class="rule-title-row">
                        <div class="rule-icon" style="color: ${priorityColors[rule.priority]}">
                            <i class="fas fa-${getTriggerIcon(rule.triggerType)}"></i>
                        </div>
                        <div>
                            <h3 class="rule-name">${escapeHtml(rule.name)}</h3>
                            <span class="rule-trigger">${triggerTypeNames[rule.triggerType]}</span>
                        </div>
                    </div>
                    <label class="switch">
                        <input type="checkbox" ${rule.enabled ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                <p class="rule-description">${escapeHtml(rule.description || '暂无描述')}</p>
                <div class="rule-conditions">
                    <p class="condition-title">触发条件</p>
                    <div class="condition-list">
                        ${conditionTags}
                    </div>
                </div>
                <div class="rule-footer">
                    <div class="rule-meta">
                        <span><i class="fas fa-fire"></i> ${rule.triggerCount || 0}次触发</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(rule.createdAt)}</span>
                    </div>
                    <div class="rule-actions">
                        <button class="btn btn-sm btn-secondary toggle-btn">
                            <i class="fas fa-${rule.enabled ? 'pause' : 'play'}"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary duplicate-btn">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function generateConditionTags(rule) {
        if (rule.triggerType === 'keyword' && rule.conditions.items) {
            return rule.conditions.items.slice(0, 4).map(item => 
                `<span class="condition-tag match-keyword">${escapeHtml(item.value)}</span>`
            ).join('') + (rule.conditions.items.length > 4 ? `<span class="condition-tag">+${rule.conditions.items.length - 4}</span>` : '');
        }
        
        if (rule.triggerType === 'regex') {
            return `<span class="condition-tag match-regex">${escapeHtml(rule.conditions.pattern || '正则')}</span>`;
        }
        
        if (rule.triggerType === 'intent') {
            const intentNames = {
                'greeting': '问候', 'question': '提问', 'request': '请求',
                'complaint': '投诉', 'feedback': '反馈', 'booking': '预约', 'inquiry': '咨询'
            };
            return `<span class="condition-tag match-intent">${intentNames[rule.conditions.intentType] || rule.conditions.intentType}</span>`;
        }
        
        if (rule.triggerType === 'schedule') {
            return `<span class="condition-tag"><i class="fas fa-clock"></i> ${rule.conditions.time}</span>`;
        }
        
        return '<span class="condition-tag">未配置</span>';
    }

    function getTriggerIcon(type) {
        const icons = {
            'keyword': 'key',
            'regex': 'code',
            'intent': 'brain',
            'schedule': 'clock'
        };
        return icons[type] || 'bolt';
    }

    // ==================== 弹窗操作 ====================
    function openModal(rule = null) {
        state.editingId = rule?.id || null;

        $('#modal-title').textContent = rule ? '编辑规则' : '新建规则';
        
        // 重置表单
        $('#rule-form')?.reset();
        resetConditionBuilder();
        
        // 填充数据
        if (rule) {
            $('#rule-id').value = rule.id;
            $('#rule-name').value = rule.name;
            $('#rule-description').value = rule.description || '';
            $('#rule-trigger-type').value = rule.triggerType;
            $('#rule-priority').value = rule.priority;
            $('#rule-cooldown').value = rule.cooldown || 0;
            $('#rule-max-trigger').value = rule.maxTrigger || 0;
            $('#rule-stop-processing').checked = rule.stopProcessing || false;

            // 填充条件
            if (rule.triggerType === 'keyword' && rule.conditions.items) {
                state.conditionLogic = rule.conditions.logic || 'or';
                updateLogicButtons();
                renderConditionRows(rule.conditions.items);
            } else if (rule.triggerType === 'regex') {
                $('#regex-pattern').value = rule.conditions.pattern || '';
                $('#regex-case-insensitive').checked = rule.conditions.caseInsensitive || false;
            } else if (rule.triggerType === 'intent') {
                $('#intent-type').value = rule.conditions.intentType || 'greeting';
                $('#confidence-threshold').value = rule.conditions.confidence || 70;
                $('#confidence-value').textContent = (rule.conditions.confidence || 70) + '%';
            } else if (rule.triggerType === 'schedule') {
                $('#schedule-time').value = rule.conditions.time || '09:00';
                $('#schedule-repeat').value = rule.conditions.repeat || 'daily';
            }

            // 填充动作
            $('#action-type').value = rule.action.type;
            $('#action-content').value = rule.action.content || '';
        }

        toggleTriggerConfig();
        toggleActionDetail();
        $('#rule-modal-overlay').classList.remove('hidden');
    }

    function closeModal() {
        $('#rule-modal-overlay').classList.add('hidden');
        state.editingId = null;
    }

    function editRule(id) {
        const rule = state.rules.find(r => r.id === id);
        if (rule) openModal(rule);
    }

    // ==================== 保存规则 ====================
    function saveRule() {
        const name = $('#rule-name').value.trim();
        if (!name) {
            showToast('请填写规则名称', 'error');
            return;
        }

        const triggerType = $('#rule-trigger-type').value;
        const actionType = $('#action-type').value;

        // 构建条件
        let conditions = {};
        if (triggerType === 'keyword') {
            conditions = {
                logic: state.conditionLogic,
                items: getConditionItems()
            };
            if (conditions.items.length === 0) {
                showToast('请添加至少一个触发条件', 'error');
                return;
            }
        } else if (triggerType === 'regex') {
            conditions = {
                pattern: $('#regex-pattern').value.trim(),
                caseInsensitive: $('#regex-case-insensitive').checked
            };
            if (!conditions.pattern) {
                showToast('请填写正则表达式', 'error');
                return;
            }
        } else if (triggerType === 'intent') {
            conditions = {
                intentType: $('#intent-type').value,
                confidence: parseInt($('#confidence-threshold').value)
            };
        } else if (triggerType === 'schedule') {
            conditions = {
                time: $('#schedule-time').value,
                repeat: $('#schedule-repeat').value
            };
        }

        const rule = {
            id: state.editingId || `rule-${Date.now()}`,
            name: name,
            description: $('#rule-description').value.trim(),
            triggerType: triggerType,
            priority: $('#rule-priority').value,
            enabled: state.editingId ? state.rules.find(r => r.id === state.editingId)?.enabled ?? true : true,
            conditions: conditions,
            action: {
                type: actionType,
                content: $('#action-content').value.trim()
            },
            cooldown: parseInt($('#rule-cooldown').value) || 0,
            maxTrigger: parseInt($('#rule-max-trigger').value) || 0,
            stopProcessing: $('#rule-stop-processing').checked,
            triggerCount: state.editingId ? state.rules.find(r => r.id === state.editingId)?.triggerCount || 0 : 0,
            createdAt: state.editingId 
                ? state.rules.find(r => r.id === state.editingId)?.createdAt || Date.now()
                : Date.now()
        };

        if (state.editingId) {
            const index = state.rules.findIndex(r => r.id === state.editingId);
            if (index > -1) {
                state.rules[index] = rule;
            }
        } else {
            state.rules.push(rule);
        }

        saveState();
        closeModal();
        renderRules();
        updateStats();
        
        showToast(state.editingId ? '规则更新成功' : '规则创建成功', 'success');
    }

    // ==================== 删除规则 ====================
    function deleteRule(id) {
        if (!confirm('确定要删除这条规则吗？')) return;

        state.rules = state.rules.filter(r => r.id !== id);
        saveState();
        renderRules();
        updateStats();
        
        showToast('规则已删除', 'success');
    }

    // ==================== 复制规则 ====================
    function duplicateRule(id) {
        const rule = state.rules.find(r => r.id === id);
        if (!rule) return;

        const newRule = {
            ...JSON.parse(JSON.stringify(rule)),
            id: `rule-${Date.now()}`,
            name: rule.name + ' (副本)',
            enabled: false,
            triggerCount: 0,
            createdAt: Date.now()
        };

        state.rules.push(newRule);
        saveState();
        renderRules();
        updateStats();
        
        showToast('规则已复制', 'success');
    }

    // ==================== 启用/禁用规则 ====================
    function toggleRule(id) {
        const rule = state.rules.find(r => r.id === id);
        if (!rule) return;

        rule.enabled = !rule.enabled;
        saveState();
        renderRules();
        updateStats();
        
        showToast(rule.enabled ? '规则已启用' : '规则已禁用', 'info');
    }

    // ==================== 条件构建器 ====================
    function resetConditionBuilder() {
        const builder = $('#keyword-builder');
        if (builder) {
            builder.innerHTML = `
                <div class="condition-row">
                    <select class="condition-type">
                        <option value="contains">包含</option>
                        <option value="equals">等于</option>
                        <option value="starts">开头为</option>
                        <option value="ends">结尾为</option>
                    </select>
                    <input type="text" class="condition-value" placeholder="输入关键词">
                    <button type="button" class="btn btn-sm btn-secondary remove-condition">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            bindConditionRowEvents();
        }
    }

    function renderConditionRows(items) {
        const builder = $('#keyword-builder');
        if (!builder) return;

        builder.innerHTML = items.map(item => `
            <div class="condition-row">
                <select class="condition-type">
                    <option value="contains" ${item.type === 'contains' ? 'selected' : ''}>包含</option>
                    <option value="equals" ${item.type === 'equals' ? 'selected' : ''}>等于</option>
                    <option value="starts" ${item.type === 'starts' ? 'selected' : ''}>开头为</option>
                    <option value="ends" ${item.type === 'ends' ? 'selected' : ''}>结尾为</option>
                </select>
                <input type="text" class="condition-value" value="${escapeHtml(item.value)}" placeholder="输入关键词">
                <button type="button" class="btn btn-sm btn-secondary remove-condition">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        bindConditionRowEvents();
    }

    function bindConditionRowEvents() {
        document.querySelectorAll('.remove-condition').forEach(btn => {
            btn.addEventListener('click', function() {
                const rows = document.querySelectorAll('.condition-row');
                if (rows.length > 1) {
                    this.closest('.condition-row').remove();
                } else {
                    showToast('至少保留一个条件', 'warning');
                }
            });
        });
    }

    function addConditionRow() {
        const builder = $('#keyword-builder');
        if (!builder) return;

        const row = document.createElement('div');
        row.className = 'condition-row';
        row.innerHTML = `
            <select class="condition-type">
                <option value="contains">包含</option>
                <option value="equals">等于</option>
                <option value="starts">开头为</option>
                <option value="ends">结尾为</option>
            </select>
            <input type="text" class="condition-value" placeholder="输入关键词">
            <button type="button" class="btn btn-sm btn-secondary remove-condition">
                <i class="fas fa-times"></i>
            </button>
        `;
        builder.appendChild(row);
        bindConditionRowEvents();
    }

    function getConditionItems() {
        const items = [];
        document.querySelectorAll('.condition-row').forEach(row => {
            const type = row.querySelector('.condition-type').value;
            const value = row.querySelector('.condition-value').value.trim();
            if (value) {
                items.push({ type, value });
            }
        });
        return items;
    }

    function updateLogicButtons() {
        document.querySelectorAll('.logic-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.logic === state.conditionLogic);
        });
    }

    // ==================== 配置切换 ====================
    function toggleTriggerConfig() {
        const type = $('#rule-trigger-type').value;
        
        document.querySelectorAll('.condition-config').forEach(el => el.classList.add('hidden'));
        
        const configMap = {
            'keyword': 'keyword-config',
            'regex': 'regex-config',
            'intent': 'intent-config',
            'schedule': 'schedule-config'
        };
        
        const config = $('#' + configMap[type]);
        if (config) config.classList.remove('hidden');
    }

    function toggleActionDetail() {
        const type = $('#action-type').value;
        
        document.querySelectorAll('.action-detail').forEach(el => el.classList.add('hidden'));
        
        const detailMap = {
            'reply': 'reply-detail',
            'skill': 'skill-detail',
            'agent': 'agent-detail'
        };
        
        const detail = $('#' + detailMap[type]);
        if (detail) detail.classList.remove('hidden');
    }

    function toggleAdvanced() {
        const content = $('#advanced-content');
        const icon = $('#advanced-toggle .toggle-icon');
        
        content?.classList.toggle('collapsed');
        icon?.classList.toggle('fa-chevron-down');
        icon?.classList.toggle('fa-chevron-up');
    }

    // ==================== 筛选 ====================
    function filterRules() {
        const search = $('#search-rules').value.toLowerCase();
        const triggerType = $('#trigger-filter').value;
        const status = $('#status-filter').value;

        let filtered = state.rules;

        if (search) {
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(search) ||
                (r.description || '').toLowerCase().includes(search)
            );
        }

        if (triggerType !== 'all') {
            filtered = filtered.filter(r => r.triggerType === triggerType);
        }

        if (status !== 'all') {
            filtered = filtered.filter(r => 
                (status === 'enabled' && r.enabled) || 
                (status === 'disabled' && !r.enabled)
            );
        }

        renderRules(filtered);
    }

    // ==================== 导入规则 ====================
    function importRules() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (Array.isArray(data)) {
                        data.forEach(rule => {
                            rule.id = `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                            state.rules.push(rule);
                        });
                        saveState();
                        renderRules();
                        updateStats();
                        showToast(`成功导入 ${data.length} 条规则`, 'success');
                    }
                } catch (err) {
                    showToast('导入失败：文件格式错误', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    // ==================== 统计更新 ====================
    function updateStats() {
        const total = state.rules.length;
        const enabled = state.rules.filter(r => r.enabled).length;
        const triggers = state.rules.reduce((sum, r) => sum + (r.triggerCount || 0), 0);

        $('#total-rules').textContent = total;
        $('#enabled-rules').textContent = enabled;
        $('#trigger-count').textContent = triggers;
    }

    // ==================== 辅助函数 ====================
    function formatDate(timestamp) {
        if (!timestamp) return '未知';
        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function $(selector) {
        return document.querySelector(selector);
    }

    function showToast(message, type = 'info') {
        const container = $('#toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${escapeHtml(message)}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', init);
})();
