/**
 * DATA-AI 技能库页面
 * 功能：技能的创建、编辑、删除、使用
 */

(function() {
    'use strict';

    // ==================== 状态管理 ====================
    var state = {
        skills: [],
        filteredSkills: [],
        currentCategory: 'all',
        searchQuery: '',
        editingSkillId: null,
        isModalOpen: false
    };

    // ==================== 默认技能 ====================
    var defaultSkills = [
        {
            id: 'code-review',
            name: '代码审查',
            icon: '🔍',
            category: 'coding',
            description: '对代码进行全面审查，发现潜在问题并提供改进建议',
            prompt: '你是一个专业的代码审查专家。请对以下代码进行全面审查：\n\n{{input}}\n\n请从以下方面进行分析：\n1. 代码质量和可读性\n2. 潜在的bug和安全问题\n3. 性能优化建议\n4. 最佳实践建议',
            temperature: 0.3,
            maxTokens: 4096,
            tags: ['代码', '审查', '优化'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 'doc-generator',
            name: '文档生成',
            icon: '📄',
            category: 'writing',
            description: '根据代码或需求自动生成技术文档',
            prompt: '你是一个技术文档写作专家。请根据以下内容生成详细的技术文档：\n\n{{input}}\n\n请包含：\n1. 概述\n2. 功能说明\n3. 使用方法\n4. 参数说明\n5. 示例',
            temperature: 0.5,
            maxTokens: 4096,
            tags: ['文档', '写作', '技术'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 'data-analyst',
            name: '数据分析',
            icon: '📊',
            category: 'analysis',
            description: '对数据进行深度分析，生成洞察报告',
            prompt: '你是一个数据分析专家。请对以下数据进行深入分析：\n\n{{input}}\n\n请提供：\n1. 数据概览\n2. 关键指标分析\n3. 趋势识别\n4. 异常检测\n5. 可行建议',
            temperature: 0.4,
            maxTokens: 4096,
            tags: ['数据', '分析', '报告'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 'creative-writer',
            name: '创意写作',
            icon: '✍️',
            category: 'creative',
            description: '帮助进行创意写作，包括故事、文案、诗歌等',
            prompt: '你是一个创意写作专家。请根据以下主题或要求进行创意写作：\n\n{{input}}\n\n请发挥创意，写出引人入胜的内容。',
            temperature: 0.9,
            maxTokens: 4096,
            tags: ['创意', '写作', '文案'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 'translator',
            name: '多语言翻译',
            icon: '🌐',
            category: 'tools',
            description: '支持多种语言之间的专业翻译',
            prompt: '你是一个专业的翻译专家。请翻译以下内容：\n\n{{input}}\n\n请确保翻译准确、自然、符合目标语言的表达习惯。',
            temperature: 0.3,
            maxTokens: 4096,
            tags: ['翻译', '语言', '多语言'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: 'api-designer',
            name: 'API设计',
            icon: '🔌',
            category: 'coding',
            description: '帮助设计和文档化RESTful API',
            prompt: '你是一个API设计专家。请根据以下需求设计RESTful API：\n\n{{input}}\n\n请提供：\n1. API端点设计\n2. 请求/响应格式\n3. 状态码说明\n4. 认证方式\n5. 示例请求',
            temperature: 0.4,
            maxTokens: 4096,
            tags: ['API', '设计', 'REST'],
            usageCount: 0,
            createdAt: new Date().toISOString()
        }
    ];

    // ==================== DOM 元素 ====================
    var elements = {};

    // ==================== 初始化 ====================
    function init() {
        cacheElements();
        bindEvents();
        loadSkills();
    }

    function cacheElements() {
        elements.skillGrid = document.getElementById('skill-grid');
        elements.skillModal = document.getElementById('skill-modal');
        elements.skillModalOverlay = document.getElementById('skill-modal-overlay');
        elements.skillForm = document.getElementById('skill-form');
        elements.createSkillBtn = document.getElementById('create-skill-btn');
        elements.closeModalBtn = document.getElementById('skill-modal-close');
        elements.cancelBtn = document.getElementById('skill-cancel-btn');
        elements.saveBtn = document.getElementById('skill-save-btn');
        elements.searchInput = document.getElementById('skill-search');
        elements.categoryTabs = document.querySelectorAll('.category-tab');
        elements.temperatureInput = document.getElementById('skill-temperature');
        elements.temperatureValue = document.getElementById('skill-temp-value');

        // 详情弹窗元素
        elements.skillDetailOverlay = document.getElementById('skill-detail-overlay');
        elements.skillDetailClose = document.getElementById('skill-detail-close');
        elements.skillDetailContent = document.getElementById('skill-detail-content');
        elements.skillDetailEditBtn = document.getElementById('skill-detail-edit-btn');
        elements.skillDetailUseBtn = document.getElementById('skill-detail-use-btn');
    }

    function bindEvents() {
        // 创建技能
        if (elements.createSkillBtn) {
            elements.createSkillBtn.addEventListener('click', openCreateModal);
        }

        // 关闭模态框
        if (elements.closeModalBtn) {
            elements.closeModalBtn.addEventListener('click', closeModal);
        }
        if (elements.cancelBtn) {
            elements.cancelBtn.addEventListener('click', closeModal);
        }
        if (elements.skillModalOverlay) {
            elements.skillModalOverlay.addEventListener('click', function(e) {
                if (e.target === elements.skillModalOverlay) {
                    closeModal();
                }
            });
        }

        // 保存技能
        if (elements.saveBtn) {
            elements.saveBtn.addEventListener('click', saveSkill);
        }

        // 搜索
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(function() {
                state.searchQuery = this.value.toLowerCase();
                filterSkills();
            }, 300));
        }

        // 分类切换
        if (elements.categoryTabs) {
            elements.categoryTabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    elements.categoryTabs.forEach(function(t) { t.classList.remove('active'); });
                    this.classList.add('active');
                    state.currentCategory = this.getAttribute('data-category');
                    filterSkills();
                });
            });
        }

        // 温度滑块
        if (elements.temperatureInput && elements.temperatureValue) {
            elements.temperatureInput.addEventListener('input', function() {
                elements.temperatureValue.textContent = this.value;
            });
        }

        // ESC 关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && state.isModalOpen) {
                closeModal();
            }
            if (e.key === 'Escape' && state.isDetailOpen) {
                closeDetailModal();
            }
        });

        // 详情弹窗事件
        if (elements.skillDetailClose) {
            elements.skillDetailClose.addEventListener('click', closeDetailModal);
        }
        if (elements.skillDetailOverlay) {
            elements.skillDetailOverlay.addEventListener('click', function(e) {
                if (e.target === elements.skillDetailOverlay) {
                    closeDetailModal();
                }
            });
        }
        if (elements.skillDetailEditBtn) {
            elements.skillDetailEditBtn.addEventListener('click', function() {
                var skillId = elements.skillDetailOverlay.getAttribute('data-current-skill');
                closeDetailModal();
                openEditModal(skillId);
            });
        }
        if (elements.skillDetailUseBtn) {
            elements.skillDetailUseBtn.addEventListener('click', function() {
                var skillId = elements.skillDetailOverlay.getAttribute('data-current-skill');
                closeDetailModal();
                useSkill(skillId);
            });
        }
    }

    // ==================== 数据加载 ====================
    function loadSkills() {
        var saved = localStorage.getItem('data-ai-skills');
        if (saved) {
            try {
                state.skills = JSON.parse(saved);
            } catch (e) {
                state.skills = defaultSkills;
            }
        } else {
            state.skills = defaultSkills;
        }
        filterSkills();
    }

    function saveSkills() {
        localStorage.setItem('data-ai-skills', JSON.stringify(state.skills));
    }

    function filterSkills() {
        state.filteredSkills = state.skills.filter(function(skill) {
            var matchCategory = state.currentCategory === 'all' || skill.category === state.currentCategory;
            var matchSearch = !state.searchQuery || 
                skill.name.toLowerCase().includes(state.searchQuery) ||
                (skill.description && skill.description.toLowerCase().includes(state.searchQuery)) ||
                (skill.tags && skill.tags.some(function(tag) { return tag.toLowerCase().includes(state.searchQuery); }));
            return matchCategory && matchSearch;
        });
        renderSkills();
    }

    // ==================== 渲染 ====================
    function renderSkills() {
        if (!elements.skillGrid) return;

        if (state.filteredSkills.length === 0) {
            elements.skillGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">' +
                '<i class="fa-solid fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>' +
                '<p>没有找到匹配的技能</p>' +
            '</div>';
            return;
        }

        var html = '';
        state.filteredSkills.forEach(function(skill) {
            html += '<div class="skill-card" data-skill-id="' + skill.id + '">' +
                '<div class="skill-card-header">' +
                    '<div class="skill-icon">' + escapeHtml(skill.icon) + '</div>' +
                    '<div class="skill-info">' +
                        '<h3 class="skill-name">' + escapeHtml(skill.name) + '</h3>' +
                        '<span class="skill-category">' + getCategoryName(skill.category) + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="skill-desc">' + escapeHtml(skill.description || '') + '</p>' +
                '<div class="skill-footer">' +
                    '<div class="skill-meta">' +
                        '<span><i class="fa-solid fa-play"></i> ' + (skill.usageCount || 0) + '次使用</span>' +
                    '</div>' +
                    '<button class="use-skill-btn" data-action="use">使用</button>' +
                '</div>' +
            '</div>';
        });

        elements.skillGrid.innerHTML = html;

        // 绑定卡片事件
        elements.skillGrid.querySelectorAll('.skill-card').forEach(function(card) {
            card.addEventListener('click', function(e) {
                var skillId = this.getAttribute('data-skill-id');
                if (e.target.classList.contains('use-skill-btn') || e.target.closest('.use-skill-btn')) {
                    useSkill(skillId);
                } else {
                    openDetailModal(skillId);
                }
            });
        });
    }

    // ==================== 详情弹窗 ====================
    function openDetailModal(skillId) {
        var skill = getSkillById(skillId);
        if (!skill) return;

        state.isDetailOpen = true;
        elements.skillDetailOverlay.setAttribute('data-current-skill', skillId);

        var html = '<div class="skill-detail-header">' +
            '<div class="skill-detail-icon">' + escapeHtml(skill.icon) + '</div>' +
            '<div class="skill-detail-info">' +
                '<h3 class="skill-detail-name">' + escapeHtml(skill.name) + '</h3>' +
                '<div class="skill-detail-meta">' +
                    '<span class="skill-detail-category">' + getCategoryName(skill.category) + '</span>' +
                    '<div class="skill-detail-tags">' +
                        (skill.tags || []).map(function(tag) {
                            return '<span class="skill-detail-tag">' + escapeHtml(tag) + '</span>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="skill-detail-section">' +
            '<div class="skill-detail-section-title"><i class="fa-solid fa-align-left"></i> 描述</div>' +
            '<p class="skill-detail-desc">' + escapeHtml(skill.description || '暂无描述') + '</p>' +
        '</div>' +
        '<div class="skill-detail-section">' +
            '<div class="skill-detail-section-title"><i class="fa-solid fa-code"></i> 提示词模板</div>' +
            '<div class="skill-detail-prompt">' + escapeHtml(skill.prompt || '') + '</div>' +
        '</div>' +
        '<div class="skill-detail-section">' +
            '<div class="skill-detail-section-title"><i class="fa-solid fa-sliders"></i> 参数配置</div>' +
            '<div class="skill-detail-params">' +
                '<div class="skill-detail-param">' +
                    '<div class="skill-detail-param-label">温度</div>' +
                    '<div class="skill-detail-param-value">' + (skill.temperature || 0.7) + '</div>' +
                '</div>' +
                '<div class="skill-detail-param">' +
                    '<div class="skill-detail-param-label">最大Token</div>' +
                    '<div class="skill-detail-param-value">' + (skill.maxTokens || 2048) + '</div>' +
                '</div>' +
                '<div class="skill-detail-param">' +
                    '<div class="skill-detail-param-label">使用次数</div>' +
                    '<div class="skill-detail-param-value">' + (skill.usageCount || 0) + '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="skill-detail-stats">' +
            '<div class="skill-detail-stat"><i class="fa-solid fa-calendar"></i> 创建于 ' + formatDate(skill.createdAt) + '</div>' +
        '</div>';

        elements.skillDetailContent.innerHTML = html;
        elements.skillDetailOverlay.classList.remove('hidden');
    }

    function closeDetailModal() {
        state.isDetailOpen = false;
        elements.skillDetailOverlay.classList.add('hidden');
        elements.skillDetailOverlay.removeAttribute('data-current-skill');
    }

    function formatDate(dateStr) {
        if (!dateStr) return '未知';
        var date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN');
    }

    // ==================== 模态框操作 ====================
    function openCreateModal() {
        state.editingSkillId = null;
        document.getElementById('skill-modal-title').textContent = '创建技能';
        resetForm();
        openModal();
    }

    function openEditModal(skillId) {
        var skill = getSkillById(skillId);
        if (!skill) return;

        state.editingSkillId = skillId;
        document.getElementById('skill-modal-title').textContent = '编辑技能';

        // 填充表单
        document.getElementById('skill-name').value = skill.name || '';
        document.getElementById('skill-icon-input').value = skill.icon || '⚡';
        document.getElementById('skill-category-select').value = skill.category || 'coding';
        document.getElementById('skill-description').value = skill.description || '';
        document.getElementById('skill-prompt').value = skill.prompt || '';
        document.getElementById('skill-tags').value = (skill.tags || []).join(', ');
        document.getElementById('skill-temperature').value = skill.temperature || 0.7;
        document.getElementById('skill-temp-value').textContent = skill.temperature || 0.7;
        document.getElementById('skill-max-tokens').value = skill.maxTokens || 2048;

        openModal();
    }

    function openModal() {
        state.isModalOpen = true;
        elements.skillModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        state.isModalOpen = false;
        elements.skillModalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        resetForm();
    }

    function resetForm() {
        if (elements.skillForm) {
            elements.skillForm.reset();
        }
        if (elements.temperatureValue) {
            elements.temperatureValue.textContent = '0.7';
        }
    }

    // ==================== CRUD 操作 ====================
    function saveSkill() {
        var name = document.getElementById('skill-name').value.trim();
        var prompt = document.getElementById('skill-prompt').value.trim();

        if (!name) {
            showToast('请输入技能名称', 'error');
            return;
        }
        if (!prompt) {
            showToast('请输入技能提示词', 'error');
            return;
        }

        var skillData = {
            id: state.editingSkillId || 'skill-' + Date.now(),
            name: name,
            icon: document.getElementById('skill-icon-input').value || '⚡',
            category: document.getElementById('skill-category-select').value,
            description: document.getElementById('skill-description').value.trim(),
            prompt: prompt,
            tags: document.getElementById('skill-tags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean),
            temperature: parseFloat(document.getElementById('skill-temperature').value),
            maxTokens: parseInt(document.getElementById('skill-max-tokens').value),
            usageCount: 0,
            createdAt: new Date().toISOString()
        };

        if (state.editingSkillId) {
            var index = state.skills.findIndex(function(s) { return s.id === state.editingSkillId; });
            if (index !== -1) {
                skillData.usageCount = state.skills[index].usageCount;
                state.skills[index] = skillData;
            }
            showToast('技能已更新', 'success');
        } else {
            state.skills.push(skillData);
            showToast('技能已创建', 'success');
        }

        saveSkills();
        filterSkills();
        closeModal();
    }

    function useSkill(skillId) {
        var skill = getSkillById(skillId);
        if (!skill) return;

        // 更新使用次数
        skill.usageCount = (skill.usageCount || 0) + 1;
        saveSkills();
        filterSkills();

        // 跳转到对话页面并激活技能
        localStorage.setItem('data-ai-active-skill', JSON.stringify(skill));
        showToast('已激活技能：' + skill.name, 'success');

        // 可以跳转到主页
        // window.location.href = '/';
    }

    function getSkillById(skillId) {
        return state.skills.find(function(s) { return s.id === skillId; });
    }

    // ==================== 工具函数 ====================
    function getCategoryName(category) {
        var names = {
            'writing': '写作',
            'coding': '编程',
            'analysis': '分析',
            'creative': '创意',
            'tools': '工具'
        };
        return names[category] || category;
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    function showToast(message, type) {
        var existing = document.querySelector('.toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'info');
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;background:' +
            (type === 'success' ? '#34d399' : type === 'error' ? '#f87171' : '#60a5fa') +
            ';color:#000;font-size:14px;z-index:10000;';
        document.body.appendChild(toast);

        setTimeout(function() { toast.remove(); }, 2000);
    }

    // ==================== 启动 ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
