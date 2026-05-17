/**
 * 提示词管理页面逻辑
 * @description 提示词模板的CRUD、变量替换、测试预览、导入导出
 */

(function() {
    'use strict';

    // ==================== 状态管理 ====================
    const state = {
        prompts: [],
        currentTab: 'templates',
        editingId: null,
        sortBy: 'updated'
    };

    // 默认提示词模板
    const defaultPrompts = [
        {
            id: 'prompt-1',
            name: '通用AI助手',
            icon: '🤖',
            category: 'agent',
            description: '通用的AI助手系统提示词，适用于大多数对话场景',
            tags: ['通用', '助手', '对话'],
            content: '你是一个乐于助人的AI助手。请遵循以下原则：\n\n1. 准确理解用户意图，提供有价值的回答\n2. 回答简洁明了，避免冗余\n3. 不确定的信息要明确说明\n4. 尊重用户，保持友好专业的态度\n\n当前用户：{{user}}\n当前时间：{{datetime}}\n用户语言：{{language}}',
            favorite: true,
            usageCount: 128,
            createdAt: Date.now() - 86400000 * 30,
            updatedAt: Date.now() - 86400000 * 2
        },
        {
            id: 'prompt-2',
            name: '代码审查专家',
            icon: '🔍',
            category: 'code',
            description: '专业的代码审查提示词，关注代码质量、安全性和最佳实践',
            tags: ['代码', '审查', '质量', '安全'],
            content: '你是一位资深代码审查专家。请对以下代码进行全面审查：\n\n## 审查维度\n1. **代码质量**：命名规范、代码结构、可读性\n2. **潜在Bug**：边界条件、空指针、类型安全\n3. **性能问题**：时间复杂度、内存泄漏、不必要的计算\n4. **安全漏洞**：注入攻击、敏感信息泄露、权限问题\n5. **最佳实践**：设计模式、SOLID原则、DRY原则\n\n## 输出格式\n- 🔴 严重问题（必须修复）\n- 🟡 建议改进（推荐修复）\n- 🟢 优秀实践（值得保留）\n\n待审查代码：\n```\n{{input}}\n```',
            favorite: true,
            usageCount: 86,
            createdAt: Date.now() - 86400000 * 25,
            updatedAt: Date.now() - 86400000 * 5
        },
        {
            id: 'prompt-3',
            name: '数据分析报告',
            icon: '📊',
            category: 'analysis',
            description: '生成结构化的数据分析报告，包含关键指标和可视化建议',
            tags: ['数据', '分析', '报告', '可视化'],
            content: '你是一位专业的数据分析师。请基于以下数据生成分析报告：\n\n## 报告结构\n1. **数据概览**：数据规模、时间范围、关键字段\n2. **关键指标**：核心KPI数值及变化趋势\n3. **趋势分析**：主要变化趋势和异常点\n4. **洞察发现**：3-5个关键业务洞察\n5. **行动建议**：基于数据的具体改进建议\n\n## 要求\n- 使用数据说话，避免主观臆断\n- 数值保留合理精度\n- 建议具体可执行\n\n数据内容：\n{{input}}',
            favorite: false,
            usageCount: 64,
            createdAt: Date.now() - 86400000 * 20,
            updatedAt: Date.now() - 86400000 * 3
        },
        {
            id: 'prompt-4',
            name: '创意写作助手',
            icon: '✍️',
            category: 'creative',
            description: '辅助各类创意写作，包括文案、故事、诗歌等',
            tags: ['创意', '写作', '文案', '故事'],
            content: '你是一位才华横溢的创意写作助手。\n\n## 写作原则\n- 语言生动有力，避免陈词滥调\n- 注重节奏感和画面感\n- 情感真挚，引发读者共鸣\n- 结构清晰，层次分明\n\n## 当前任务\n写作类型：{{input}}\n\n请根据以上要求进行创作，确保内容原创且有感染力。',
            favorite: false,
            usageCount: 52,
            createdAt: Date.now() - 86400000 * 15,
            updatedAt: Date.now() - 86400000 * 7
        },
        {
            id: 'prompt-5',
            name: 'API文档生成',
            icon: '📋',
            category: 'code',
            description: '根据代码或描述自动生成规范的API文档',
            tags: ['API', '文档', '接口', '开发'],
            content: '你是一位技术文档专家。请根据以下信息生成规范的API文档：\n\n## 文档格式\n### 接口名称\n- **URL**: \n- **方法**: GET/POST/PUT/DELETE\n- **描述**: \n\n#### 请求参数\n| 参数名 | 类型 | 必填 | 描述 |\n|--------|------|------|------|\n\n#### 请求示例\n```json\n\n```\n\n#### 响应参数\n| 参数名 | 类型 | 描述 |\n|--------|------|------|\n\n#### 响应示例\n```json\n\n```\n\n#### 错误码\n| 错误码 | 描述 |\n|--------|------|\n\n输入信息：\n{{input}}',
            favorite: true,
            usageCount: 45,
            createdAt: Date.now() - 86400000 * 10,
            updatedAt: Date.now() - 86400000 * 1
        },
        {
            id: 'prompt-6',
            name: '会议纪要生成',
            icon: '📝',
            category: 'system',
            description: '将会议记录整理为结构化的会议纪要',
            tags: ['会议', '纪要', '总结', '行动项'],
            content: '你是一位专业的会议记录员。请将以下会议内容整理为结构化纪要：\n\n## 纪要格式\n### 会议基本信息\n- 日期：{{date}}\n- 参会人：（从内容中提取）\n\n### 会议摘要\n（2-3句话概括会议核心内容）\n\n### 关键讨论\n1. \n2. \n3. \n\n### 决策事项\n- [ ] \n\n### 行动项\n| 负责人 | 任务 | 截止日期 |\n|--------|------|----------|\n\n### 下次会议\n- 时间：\n- 议题：\n\n会议内容：\n{{input}}',
            favorite: false,
            usageCount: 38,
            createdAt: Date.now() - 86400000 * 8,
            updatedAt: Date.now() - 86400000 * 4
        }
    ];

    // ==================== 初始化 ====================
    function init() {
        loadState();
        bindEvents();
        renderTemplates();
        renderFavorites();
        updateCounts();
    }

    function loadState() {
        const saved = localStorage.getItem('prompt_templates');
        state.prompts = saved ? JSON.parse(saved) : defaultPrompts;
    }

    function saveState() {
        localStorage.setItem('prompt_templates', JSON.stringify(state.prompts));
    }

    // ==================== 事件绑定 ====================
    function bindEvents() {
        // 标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        // 创建按钮
        $('#create-prompt-btn')?.addEventListener('click', () => openModal());

        // 搜索和筛选
        $('#search-prompts')?.addEventListener('input', debounce(filterTemplates, 300));
        $('#category-filter')?.addEventListener('change', filterTemplates);
        $('#sort-filter')?.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderTemplates();
        });

        // 弹窗事件
        $('#modal-close')?.addEventListener('click', closeModal);
        $('#cancel-btn')?.addEventListener('click', closeModal);
        $('#save-btn')?.addEventListener('click', savePrompt);

        // 编辑器工具栏
        document.querySelectorAll('.toolbar-btn[data-insert]').forEach(btn => {
            btn.addEventListener('click', () => insertVariable(btn.dataset.insert));
        });
        $('#insert-role-btn')?.addEventListener('click', insertRoleTemplate);
        $('#insert-format-btn')?.addEventListener('click', insertFormatTemplate);
        $('#insert-example-btn')?.addEventListener('click', insertExampleTemplate);

        // 字符计数
        $('#prompt-content')?.addEventListener('input', updateEditorStats);

        // 测试预览
        $('#test-toggle')?.addEventListener('click', toggleTestSection);
        $('#preview-btn')?.addEventListener('click', generatePreview);
        $('#copy-preview-btn')?.addEventListener('click', copyPreview);

        // 导入导出
        $('#import-btn')?.addEventListener('click', () => {
            $('#import-modal-overlay').classList.remove('hidden');
        });
        $('#export-btn')?.addEventListener('click', exportPrompts);
        $('#import-modal-close')?.addEventListener('click', () => {
            $('#import-modal-overlay').classList.add('hidden');
        });
        $('#import-cancel-btn')?.addEventListener('click', () => {
            $('#import-modal-overlay').classList.add('hidden');
        });
        $('#import-confirm-btn')?.addEventListener('click', importPrompts);

        // 点击遮罩关闭
        $('#prompt-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'prompt-modal-overlay') closeModal();
        });
        $('#import-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'import-modal-overlay') {
                $('#import-modal-overlay').classList.add('hidden');
            }
        });
    }

    // ==================== 标签切换 ====================
    function switchTab(tab) {
        state.currentTab = tab;
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tab}-panel`);
        });
    }

    // ==================== 渲染模板列表 ====================
    function renderTemplates(list = null) {
        const grid = $('#prompt-grid');
        const empty = $('#prompts-empty');
        let prompts = list || getSortedPrompts();

        if (!grid) return;

        if (prompts.length === 0) {
            grid.innerHTML = '';
            empty?.classList.remove('hidden');
            return;
        }

        empty?.classList.add('hidden');
        grid.innerHTML = prompts.map(p => createPromptCard(p)).join('');

        // 绑定卡片事件
        grid.querySelectorAll('.prompt-card').forEach(card => {
            const id = card.dataset.id;
            card.querySelector('.fav-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(id);
            });
            card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                editPrompt(id);
            });
            card.querySelector('.duplicate-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                duplicatePrompt(id);
            });
            card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                deletePrompt(id);
            });
            card.querySelector('.use-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                usePrompt(id);
            });
        });
    }

    function renderFavorites() {
        const grid = $('#fav-grid');
        const empty = $('#fav-empty');
        const favs = state.prompts.filter(p => p.favorite);

        if (!grid) return;

        if (favs.length === 0) {
            grid.innerHTML = '';
            empty?.classList.remove('hidden');
            return;
        }

        empty?.classList.add('hidden');
        grid.innerHTML = favs.map(p => createPromptCard(p)).join('');

        // 绑定事件（同上）
        grid.querySelectorAll('.prompt-card').forEach(card => {
            const id = card.dataset.id;
            card.querySelector('.fav-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(id);
            });
            card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                editPrompt(id);
            });
            card.querySelector('.duplicate-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                duplicatePrompt(id);
            });
            card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                deletePrompt(id);
            });
            card.querySelector('.use-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                usePrompt(id);
            });
        });
    }

    function createPromptCard(prompt) {
        const categoryNames = {
            'agent': '智能体', 'skill': '技能', 'rule': '规则',
            'system': '系统', 'creative': '创意写作', 'code': '代码开发', 'analysis': '数据分析'
        };
        const varCount = (prompt.content.match(/\{\{[^}]+\}\}/g) || []).length;
        const preview = prompt.content.substring(0, 120).replace(/\n/g, ' ') + (prompt.content.length > 120 ? '...' : '');

        return `
            <div class="prompt-card" data-id="${prompt.id}">
                <div class="prompt-card-header">
                    <span class="prompt-icon">${escapeHtml(prompt.icon || '📝')}</span>
                    <div class="prompt-card-info">
                        <h3 class="prompt-card-name">${escapeHtml(prompt.name)}</h3>
                        <div class="prompt-card-meta">
                            <span class="prompt-category-tag">${categoryNames[prompt.category] || prompt.category}</span>
                            <span class="prompt-var-count">${varCount} 个变量</span>
                        </div>
                    </div>
                    <button class="btn-icon fav-btn ${prompt.favorite ? 'active' : ''}" title="${prompt.favorite ? '取消收藏' : '收藏'}">
                        <i class="fa${prompt.favorite ? 's' : 'r'} fa-star"></i>
                    </button>
                </div>
                <p class="prompt-card-preview">${escapeHtml(preview)}</p>
                ${prompt.tags && prompt.tags.length ? `
                <div class="prompt-tags">
                    ${prompt.tags.slice(0, 4).map(t => `<span class="prompt-tag">${escapeHtml(t)}</span>`).join('')}
                </div>` : ''}
                <div class="prompt-card-footer">
                    <div class="prompt-stats">
                        <span><i class="fas fa-copy"></i> ${prompt.usageCount || 0} 次使用</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(prompt.updatedAt)}</span>
                    </div>
                    <div class="prompt-card-actions">
                        <button class="btn btn-sm btn-primary use-btn">使用</button>
                        <button class="btn-icon edit-btn" title="编辑"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon duplicate-btn" title="复制"><i class="fas fa-copy"></i></button>
                        <button class="btn-icon delete-btn" title="删除"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    // ==================== 排序和筛选 ====================
    function getSortedPrompts() {
        const sorted = [...state.prompts];
        switch (state.sortBy) {
            case 'updated': sorted.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)); break;
            case 'created': sorted.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); break;
            case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name, 'zh')); break;
            case 'usage': sorted.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)); break;
        }
        return sorted;
    }

    function filterTemplates() {
        const search = ($('#search-prompts')?.value || '').toLowerCase();
        const category = $('#category-filter')?.value || 'all';

        let filtered = getSortedPrompts();

        if (search) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(search) ||
                (p.description || '').toLowerCase().includes(search) ||
                (p.content || '').toLowerCase().includes(search) ||
                (p.tags || []).some(t => t.toLowerCase().includes(search))
            );
        }

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        renderTemplates(filtered);
    }

    // ==================== 弹窗操作 ====================
    function openModal(prompt = null) {
        state.editingId = prompt?.id || null;
        $('#modal-title').textContent = prompt ? '编辑提示词' : '新建提示词';
        $('#prompt-form')?.reset();

        if (prompt) {
            $('#prompt-id').value = prompt.id;
            $('#prompt-name').value = prompt.name;
            $('#prompt-category').value = prompt.category || 'agent';
            $('#prompt-icon').value = prompt.icon || '📝';
            $('#prompt-description').value = prompt.description || '';
            $('#prompt-tags').value = (prompt.tags || []).join(', ');
            $('#prompt-content').value = prompt.content || '';
        } else {
            $('#prompt-icon').value = '📝';
        }

        updateEditorStats();
        $('#prompt-modal-overlay').classList.remove('hidden');
    }

    function closeModal() {
        $('#prompt-modal-overlay').classList.add('hidden');
        state.editingId = null;
    }

    function editPrompt(id) {
        const prompt = state.prompts.find(p => p.id === id);
        if (prompt) openModal(prompt);
    }

    // ==================== CRUD ====================
    function savePrompt() {
        const name = $('#prompt-name').value.trim();
        const content = $('#prompt-content').value.trim();

        if (!name || !content) {
            showToast('请填写名称和提示词内容', 'error');
            return;
        }

        const prompt = {
            id: state.editingId || `prompt-${Date.now()}`,
            name: name,
            icon: $('#prompt-icon').value || '📝',
            category: $('#prompt-category').value,
            description: $('#prompt-description').value.trim(),
            tags: $('#prompt-tags').value.split(',').map(t => t.trim()).filter(Boolean),
            content: content,
            favorite: state.editingId
                ? state.prompts.find(p => p.id === state.editingId)?.favorite || false
                : false,
            usageCount: state.editingId
                ? state.prompts.find(p => p.id === state.editingId)?.usageCount || 0
                : 0,
            createdAt: state.editingId
                ? state.prompts.find(p => p.id === state.editingId)?.createdAt || Date.now()
                : Date.now(),
            updatedAt: Date.now()
        };

        if (state.editingId) {
            const index = state.prompts.findIndex(p => p.id === state.editingId);
            if (index > -1) state.prompts[index] = prompt;
        } else {
            state.prompts.push(prompt);
        }

        saveState();
        closeModal();
        renderTemplates();
        renderFavorites();
        updateCounts();
        showToast(state.editingId ? '提示词已更新' : '提示词已创建', 'success');
    }

    function deletePrompt(id) {
        if (!confirm('确定要删除这个提示词模板吗？')) return;
        state.prompts = state.prompts.filter(p => p.id !== id);
        saveState();
        renderTemplates();
        renderFavorites();
        updateCounts();
        showToast('提示词已删除', 'success');
    }

    function duplicatePrompt(id) {
        const original = state.prompts.find(p => p.id === id);
        if (!original) return;

        const copy = {
            ...original,
            id: `prompt-${Date.now()}`,
            name: original.name + ' (副本)',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            usageCount: 0
        };

        state.prompts.push(copy);
        saveState();
        renderTemplates();
        updateCounts();
        showToast('提示词已复制', 'success');
    }

    function toggleFavorite(id) {
        const prompt = state.prompts.find(p => p.id === id);
        if (!prompt) return;
        prompt.favorite = !prompt.favorite;
        saveState();
        renderTemplates();
        renderFavorites();
        updateCounts();
    }

    function usePrompt(id) {
        const prompt = state.prompts.find(p => p.id === id);
        if (!prompt) return;

        // 增加使用次数
        prompt.usageCount = (prompt.usageCount || 0) + 1;
        prompt.updatedAt = Date.now();
        saveState();

        // 复制到剪贴板
        navigator.clipboard?.writeText(prompt.content).then(() => {
            showToast(`"${prompt.name}" 已复制到剪贴板`, 'success');
        }).catch(() => {
            // 降级方案
            const ta = document.createElement('textarea');
            ta.value = prompt.content;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast(`"${prompt.name}" 已复制到剪贴板`, 'success');
        });

        renderTemplates();
    }

    // ==================== 编辑器功能 ====================
    function insertVariable(variable) {
        const textarea = $('#prompt-content');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        textarea.value = text.substring(0, start) + variable + text.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + variable.length;
        textarea.focus();
        updateEditorStats();
    }

    function insertRoleTemplate() {
        const template = '\n你是一个{{role}}，拥有以下专长：\n- \n- \n- \n\n请基于你的专业知识，{{task}}。\n';
        insertAtCursor(template);
    }

    function insertFormatTemplate() {
        const template = '\n## 输出格式\n请按以下格式输出：\n\n1. **标题**\n   - 内容\n\n2. **标题**\n   - 内容\n\n';
        insertAtCursor(template);
    }

    function insertExampleTemplate() {
        const template = '\n## 示例\n\n**输入**：\n```\n示例输入内容\n```\n\n**输出**：\n```\n示例输出内容\n```\n\n';
        insertAtCursor(template);
    }

    function insertAtCursor(text) {
        const textarea = $('#prompt-content');
        if (!textarea) return;
        const start = textarea.selectionStart;
        const value = textarea.value;
        textarea.value = value.substring(0, start) + text + value.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
        updateEditorStats();
    }

    function updateEditorStats() {
        const content = $('#prompt-content')?.value || '';
        const charCount = $('#char-count');
        const varCount = $('#var-count');
        const vars = content.match(/\{\{[^}]+\}\}/g) || [];

        if (charCount) charCount.textContent = `${content.length} 字符`;
        if (varCount) varCount.textContent = `${vars.length} 个变量`;
    }

    // ==================== 测试预览 ====================
    function toggleTestSection() {
        const content = $('#test-content');
        const icon = $('#test-toggle .toggle-icon');
        content?.classList.toggle('collapsed');
        icon?.classList.toggle('fa-chevron-down');
        icon?.classList.toggle('fa-chevron-up');
    }

    function generatePreview() {
        const content = $('#prompt-content')?.value || '';
        const testInput = $('#test-input')?.value || '这是一条测试消息';
        const previewBox = $('#preview-box');
        const previewContent = $('#preview-content');

        if (!content) {
            showToast('请先编写提示词内容', 'error');
            return;
        }

        let result = content
            .replace(/\{\{input\}\}/g, testInput)
            .replace(/\{\{context\}\}/g, '[对话上下文]')
            .replace(/\{\{date\}\}/g, new Date().toISOString().split('T')[0])
            .replace(/\{\{time\}\}/g, new Date().toTimeString().substring(0, 5))
            .replace(/\{\{datetime\}\}/g, new Date().toLocaleString('zh-CN'))
            .replace(/\{\{user\}\}/g, '测试用户')
            .replace(/\{\{agent\}\}/g, '当前智能体')
            .replace(/\{\{language\}\}/g, '中文')
            .replace(/\{\{role\}\}/g, '[角色名称]')
            .replace(/\{\{task\}\}/g, '[任务描述]');

        if (previewContent) previewContent.textContent = result;
        previewBox?.classList.remove('hidden');
    }

    function copyPreview() {
        const content = $('#preview-content')?.textContent || '';
        navigator.clipboard?.writeText(content).then(() => {
            showToast('预览内容已复制', 'success');
        });
    }

    // ==================== 导入导出 ====================
    function exportPrompts() {
        const data = JSON.stringify(state.prompts, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data-ai-prompts-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`已导出 ${state.prompts.length} 个提示词`, 'success');
    }

    function importPrompts() {
        const raw = $('#import-data')?.value?.trim();
        if (!raw) {
            showToast('请粘贴JSON数据', 'error');
            return;
        }

        try {
            const data = JSON.parse(raw);
            const items = Array.isArray(data) ? data : [data];
            let imported = 0;

            items.forEach(item => {
                if (!item.name || !item.content) return;
                state.prompts.push({
                    id: `prompt-${Date.now()}-${imported}`,
                    name: item.name,
                    icon: item.icon || '📝',
                    category: item.category || 'system',
                    description: item.description || '',
                    tags: item.tags || [],
                    content: item.content,
                    favorite: false,
                    usageCount: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                imported++;
            });

            saveState();
            renderTemplates();
            renderFavorites();
            updateCounts();
            $('#import-modal-overlay').classList.add('hidden');
            $('#import-data').value = '';
            showToast(`成功导入 ${imported} 个提示词`, 'success');
        } catch (e) {
            showToast('JSON格式错误，请检查数据', 'error');
        }
    }

    // ==================== 辅助函数 ====================
    function updateCounts() {
        const total = $('#total-count');
        const fav = $('#fav-count');
        if (total) total.textContent = state.prompts.length;
        if (fav) fav.textContent = state.prompts.filter(p => p.favorite).length;
    }

    function formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
        if (diff < 86400000 * 7) return `${Math.floor(diff / 86400000)}天前`;
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
