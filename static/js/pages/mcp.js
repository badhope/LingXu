/**
 * MCP工具管理页面逻辑
 * @description MCP工具的增删改查、市场浏览、连接测试
 */

(function() {
    'use strict';

    // ==================== 状态管理 ====================
    const state = {
        installed: [],
        market: [],
        currentTab: 'installed',
        editingId: null,
        selectedIcon: 'fas fa-plug'
    };

    // 可用图标列表
    const availableIcons = [
        'fas fa-plug', 'fas fa-database', 'fas fa-server', 'fas fa-cloud',
        'fas fa-code', 'fas fa-terminal', 'fas fa-search', 'fas fa-file',
        'fas fa-envelope', 'fas fa-bell', 'fas fa-cog', 'fas fa-tools',
        'fas fa-brain', 'fas fa-robot', 'fas fa-microchip', 'fas fa-network-wired',
        'fas fa-globe', 'fas fa-link', 'fas fa-exchange-alt', 'fas fa-sync',
        'fas fa-shield-alt', 'fas fa-lock', 'fas fa-key', 'fas fa-fingerprint',
        'fas fa-chart-line', 'fas fa-chart-bar', 'fas fa-table', 'fas fa-calculator',
        'fab fa-github', 'fab fa-gitlab', 'fab fa-docker', 'fab fa-aws',
        'fab fa-google', 'fab fa-microsoft', 'fab fa-slack', 'fab fa-discord'
    ];

    // 市场工具数据
    const marketTools = [
        {
            id: 'github-mcp',
            name: 'GitHub MCP',
            description: '访问GitHub仓库、Issues、Pull Requests等资源',
            icon: 'fab fa-github',
            category: 'development',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
            author: 'Anthropic',
            downloads: 15420,
            rating: 4.8,
            features: ['仓库管理', 'Issue追踪', 'PR处理', '代码搜索']
        },
        {
            id: 'postgres-mcp',
            name: 'PostgreSQL MCP',
            description: '连接PostgreSQL数据库，执行查询和数据分析',
            icon: 'fas fa-database',
            category: 'database',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
            author: 'Anthropic',
            downloads: 12350,
            rating: 4.7,
            features: ['SQL查询', '数据分析', '表管理', '事务支持']
        },
        {
            id: 'filesystem-mcp',
            name: '文件系统 MCP',
            description: '安全访问本地文件系统，读写文件和目录',
            icon: 'fas fa-folder-open',
            category: 'file',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
            author: 'Anthropic',
            downloads: 18920,
            rating: 4.9,
            features: ['文件读写', '目录遍历', '权限控制', '安全沙箱']
        },
        {
            id: 'brave-search-mcp',
            name: 'Brave搜索 MCP',
            description: '使用Brave搜索引擎进行网络搜索',
            icon: 'fas fa-search',
            category: 'search',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
            author: 'Anthropic',
            downloads: 9870,
            rating: 4.6,
            features: ['网页搜索', '新闻搜索', '图片搜索', '安全过滤']
        },
        {
            id: 'slack-mcp',
            name: 'Slack MCP',
            description: '与Slack工作区集成，发送消息和管理频道',
            icon: 'fab fa-slack',
            category: 'communication',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
            author: 'Anthropic',
            downloads: 7650,
            rating: 4.5,
            features: ['消息发送', '频道管理', '用户查询', '文件分享']
        },
        {
            id: 'puppeteer-mcp',
            name: 'Puppeteer MCP',
            description: '浏览器自动化，网页截图和数据抓取',
            icon: 'fas fa-globe',
            category: 'development',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
            author: 'Anthropic',
            downloads: 11230,
            rating: 4.7,
            features: ['网页截图', '数据抓取', '表单填写', 'PDF生成']
        },
        {
            id: 'sqlite-mcp',
            name: 'SQLite MCP',
            description: '轻量级SQLite数据库连接和查询',
            icon: 'fas fa-table',
            category: 'database',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
            author: 'Anthropic',
            downloads: 8540,
            rating: 4.6,
            features: ['SQL查询', '数据库创建', '数据导入导出', '内存模式']
        },
        {
            id: 'google-maps-mcp',
            name: 'Google Maps MCP',
            description: 'Google Maps API集成，地理编码和路线规划',
            icon: 'fas fa-map-marked-alt',
            category: 'api',
            url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps',
            author: 'Community',
            downloads: 5230,
            rating: 4.4,
            features: ['地理编码', '路线规划', '地点搜索', '距离计算']
        }
    ];

    // 默认已安装工具
    const defaultInstalled = [
        {
            id: 'local-filesystem',
            name: '本地文件系统',
            description: '访问本地文件和目录',
            icon: 'fas fa-folder-open',
            category: 'file',
            url: 'mcp://filesystem',
            transport: 'stdio',
            authType: 'none',
            status: 'connected',
            autoStart: true,
            createdAt: Date.now() - 86400000 * 7
        },
        {
            id: 'web-search',
            name: '网络搜索',
            description: '联网搜索实时信息',
            icon: 'fas fa-search',
            category: 'search',
            url: 'https://search.api/mcp',
            transport: 'http',
            authType: 'api_key',
            status: 'connected',
            autoStart: true,
            createdAt: Date.now() - 86400000 * 3
        }
    ];

    // ==================== 初始化 ====================
    function init() {
        loadState();
        bindEvents();
        renderInstalled();
        renderMarket();
        updateCounts();
    }

    function loadState() {
        const saved = localStorage.getItem('mcp_installed');
        state.installed = saved ? JSON.parse(saved) : defaultInstalled;
        state.market = marketTools;
    }

    function saveState() {
        localStorage.setItem('mcp_installed', JSON.stringify(state.installed));
    }

    // ==================== 事件绑定 ====================
    function bindEvents() {
        // 标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        // 添加按钮
        $('#add-mcp-btn')?.addEventListener('click', () => openModal());

        // 搜索
        $('#search-installed')?.addEventListener('input', debounce(filterInstalled, 300));
        $('#search-market')?.addEventListener('input', debounce(filterMarket, 300));
        $('#status-filter')?.addEventListener('change', filterInstalled);
        $('#category-filter')?.addEventListener('change', filterMarket);

        // 弹窗事件
        $('#modal-close')?.addEventListener('click', closeModal);
        $('#cancel-btn')?.addEventListener('click', closeModal);
        $('#save-btn')?.addEventListener('click', saveMcp);
        $('#test-connection-btn')?.addEventListener('click', testConnection);

        // 认证类型切换
        $('#mcp-auth-type')?.addEventListener('change', toggleAuthConfig);

        // 高级配置折叠
        $('#advanced-toggle')?.addEventListener('click', toggleAdvanced);

        // 图标选择
        $('#select-icon-btn')?.addEventListener('click', openIconModal);
        $('#icon-modal-close')?.addEventListener('click', closeIconModal);

        // 详情弹窗
        $('#detail-close')?.addEventListener('click', closeDetailModal);
        $('#detail-close-btn')?.addEventListener('click', closeDetailModal);
        $('#detail-install-btn')?.addEventListener('click', installFromMarket);

        // API Key显示切换
        $('#toggle-api-key')?.addEventListener('click', toggleApiKeyVisibility);

        // 配置详情弹窗事件
        $('#config-close')?.addEventListener('click', closeConfigModal);
        $('#config-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'config-modal-overlay') closeConfigModal();
        });
        $('#config-test-btn')?.addEventListener('click', () => {
            const id = state.viewingConfigId;
            if (id) testConnection(id);
        });
        $('#config-edit-btn')?.addEventListener('click', () => {
            const id = state.viewingConfigId;
            if (id) {
                closeConfigModal();
                editMcp(id);
            }
        });
        $('#config-delete-btn')?.addEventListener('click', () => {
            const id = state.viewingConfigId;
            if (id) {
                if (confirm('确定要删除这个MCP工具吗？')) {
                    deleteMcp(id);
                    closeConfigModal();
                }
            }
        });

        // 点击遮罩关闭
        $('#mcp-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'mcp-modal-overlay') closeModal();
        });
        $('#detail-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'detail-modal-overlay') closeDetailModal();
        });
        $('#icon-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'icon-modal-overlay') closeIconModal();
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

    // 暴露给全局
    window.switchTab = switchTab;

    // ==================== 已安装渲染 ====================
    function renderInstalled(tools = null) {
        const grid = $('#installed-grid');
        const empty = $('#installed-empty');
        const list = tools || state.installed;

        if (!grid) return;

        if (list.length === 0) {
            grid.innerHTML = '';
            empty?.classList.remove('hidden');
            return;
        }

        empty?.classList.add('hidden');
        grid.innerHTML = list.map(tool => createInstalledCard(tool)).join('');

        // 绑定卡片事件
        grid.querySelectorAll('.mcp-card').forEach(card => {
            const id = card.dataset.id;

            // 点击卡片查看配置详情
            card.addEventListener('click', (e) => {
                // 如果点击的是按钮，不触发卡片点击
                if (e.target.closest('.mcp-actions button')) return;
                showConfigDetail(id);
            });

            card.querySelector('.toggle-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTool(id);
            });

            card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                editTool(id);
            });

            card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTool(id);
            });

            card.querySelector('.test-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                testToolConnection(id);
            });
        });
    }

    // ==================== 配置详情弹窗 ====================
    function showConfigDetail(id) {
        const tool = state.installed.find(t => t.id === id);
        if (!tool) return;

        state.viewingConfigId = id;

        const statusClass = tool.status || 'disconnected';
        const statusText = {
            'connected': '已连接',
            'disconnected': '未连接',
            'error': '连接错误'
        }[tool.status] || '未知';

        const authTypeText = {
            'none': '无认证',
            'api_key': 'API Key',
            'bearer': 'Bearer Token',
            'basic': 'Basic Auth',
            'oauth': 'OAuth 2.0'
        }[tool.authType] || '无认证';

        const transportText = {
            'http': 'HTTP/SSE',
            'stdio': 'Stdio',
            'websocket': 'WebSocket'
        }[tool.transport] || 'HTTP/SSE';

        const html = `
            <div class="config-detail-header">
                <div class="config-detail-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="config-detail-info">
                    <h3 class="config-detail-name">${escapeHtml(tool.name)}</h3>
                    <span class="config-detail-status ${statusClass}">
                        <i class="fas fa-circle"></i> ${statusText}
                    </span>
                </div>
            </div>

            <div class="config-detail-section">
                <div class="config-detail-section-title">
                    <i class="fas fa-align-left"></i> 描述
                </div>
                <p class="config-detail-desc">${escapeHtml(tool.description || '暂无描述')}</p>
            </div>

            <div class="config-detail-section">
                <div class="config-detail-section-title">
                    <i class="fas fa-link"></i> 连接配置
                </div>
                <div class="config-detail-list">
                    <div class="config-detail-item">
                        <span class="config-detail-item-label"><i class="fas fa-server"></i> 服务地址</span>
                        <span class="config-detail-item-value">${escapeHtml(tool.url)}</span>
                    </div>
                    <div class="config-detail-item">
                        <span class="config-detail-item-label"><i class="fas fa-exchange-alt"></i> 传输协议</span>
                        <span class="config-detail-item-value">${transportText}</span>
                    </div>
                    <div class="config-detail-item">
                        <span class="config-detail-item-label"><i class="fas fa-shield-alt"></i> 认证方式</span>
                        <span class="config-detail-item-value">${authTypeText}</span>
                    </div>
                    ${tool.authType !== 'none' ? `
                    <div class="config-detail-item">
                        <span class="config-detail-item-label"><i class="fas fa-key"></i> 认证凭证</span>
                        <span class="config-detail-item-value masked">已配置</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="config-detail-section">
                <div class="config-detail-section-title">
                    <i class="fas fa-cog"></i> 高级配置
                </div>
                <div class="config-detail-params">
                    <div class="config-detail-param">
                        <div class="config-detail-param-label">超时时间</div>
                        <div class="config-detail-param-value">${tool.timeout || 30}s</div>
                    </div>
                    <div class="config-detail-param">
                        <div class="config-detail-param-label">重试次数</div>
                        <div class="config-detail-param-value">${tool.retry || 3}</div>
                    </div>
                    <div class="config-detail-param">
                        <div class="config-detail-param-label">自动启动</div>
                        <div class="config-detail-param-value">${tool.autoStart ? '是' : '否'}</div>
                    </div>
                </div>
            </div>

            <div class="config-detail-meta">
                <span><i class="fas fa-folder"></i> ${getCategoryName(tool.category)}</span>
                <span><i class="fas fa-clock"></i> 创建于 ${formatDate(tool.createdAt)}</span>
            </div>
        `;

        $('#config-title').textContent = '配置详情';
        $('#config-content').innerHTML = html;
        $('#config-modal-overlay').classList.remove('hidden');
    }

    function closeConfigModal() {
        $('#config-modal-overlay').classList.add('hidden');
        state.viewingConfigId = null;
    }

    function createInstalledCard(tool) {
        const statusClass = {
            'connected': 'status-connected',
            'disconnected': 'status-disconnected',
            'error': 'status-error'
        }[tool.status] || 'status-disconnected';

        const statusText = {
            'connected': '已连接',
            'disconnected': '未连接',
            'error': '连接错误'
        }[tool.status] || '未知';

        const isActive = tool.status === 'connected';

        return `
            <div class="mcp-card ${statusClass}" data-id="${tool.id}">
                <div class="mcp-card-header">
                    <div class="mcp-icon">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="mcp-info">
                        <h3 class="mcp-name">${escapeHtml(tool.name)}</h3>
                        <span class="mcp-category">${getCategoryName(tool.category)}</span>
                    </div>
                    <div class="mcp-status">
                        <span class="status-dot"></span>
                        <span class="status-text">${statusText}</span>
                    </div>
                </div>
                <p class="mcp-description">${escapeHtml(tool.description || '暂无描述')}</p>
                <div class="mcp-meta">
                    <span><i class="fas fa-link"></i> ${tool.transport || 'HTTP'}</span>
                    <span><i class="fas fa-clock"></i> ${formatDate(tool.createdAt)}</span>
                </div>
                <div class="mcp-actions">
                    <button class="btn btn-sm toggle-btn ${isActive ? 'btn-success' : 'btn-secondary'}">
                        <i class="fas fa-power-off"></i>
                        ${isActive ? '已启用' : '启用'}
                    </button>
                    <button class="btn btn-sm btn-secondary test-btn">
                        <i class="fas fa-plug"></i>
                        测试
                    </button>
                    <button class="btn btn-sm btn-secondary edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // ==================== 市场渲染 ====================
    function renderMarket(tools = null) {
        const grid = $('#market-grid');
        const list = tools || state.market;

        if (!grid) return;

        grid.innerHTML = list.map(tool => createMarketCard(tool)).join('');

        // 绑定卡片事件
        grid.querySelectorAll('.market-card').forEach(card => {
            card.addEventListener('click', () => showToolDetail(card.dataset.id));
        });
    }

    function createMarketCard(tool) {
        const isInstalled = state.installed.some(i => i.id === tool.id);
        const stars = '★'.repeat(Math.floor(tool.rating)) + '☆'.repeat(5 - Math.floor(tool.rating));

        return `
            <div class="market-card" data-id="${tool.id}">
                <div class="market-card-header">
                    <div class="market-icon">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="market-info">
                        <h3 class="market-name">${escapeHtml(tool.name)}</h3>
                        <div class="market-meta">
                            <span class="market-author">${escapeHtml(tool.author)}</span>
                            <span class="market-rating">${stars} ${tool.rating}</span>
                        </div>
                    </div>
                    ${isInstalled ? '<span class="installed-badge"><i class="fas fa-check"></i> 已安装</span>' : ''}
                </div>
                <p class="market-description">${escapeHtml(tool.description)}</p>
                <div class="market-features">
                    ${tool.features.slice(0, 3).map(f => `<span class="feature-tag">${escapeHtml(f)}</span>`).join('')}
                </div>
                <div class="market-footer">
                    <span class="downloads"><i class="fas fa-download"></i> ${formatNumber(tool.downloads)}</span>
                    <span class="category-tag">${getCategoryName(tool.category)}</span>
                </div>
            </div>
        `;
    }

    // ==================== 工具详情 ====================
    function showToolDetail(id) {
        const tool = state.market.find(t => t.id === id);
        if (!tool) return;

        state.editingId = id;

        const content = $('#detail-content');
        const isInstalled = state.installed.some(i => i.id === id);

        content.innerHTML = `
            <div class="tool-detail">
                <div class="detail-header">
                    <div class="detail-icon">
                        <i class="${tool.icon}"></i>
                    </div>
                    <div class="detail-info">
                        <h2>${escapeHtml(tool.name)}</h2>
                        <p class="detail-author">作者: ${escapeHtml(tool.author)}</p>
                    </div>
                </div>
                
                <div class="detail-stats">
                    <div class="stat">
                        <i class="fas fa-download"></i>
                        <span>${formatNumber(tool.downloads)}</span>
                        <label>下载量</label>
                    </div>
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${tool.rating}</span>
                        <label>评分</label>
                    </div>
                    <div class="stat">
                        <i class="fas fa-tag"></i>
                        <span>${getCategoryName(tool.category)}</span>
                        <label>分类</label>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>描述</h3>
                    <p>${escapeHtml(tool.description)}</p>
                </div>

                <div class="detail-section">
                    <h3>功能特性</h3>
                    <ul class="feature-list">
                        ${tool.features.map(f => `<li><i class="fas fa-check"></i> ${escapeHtml(f)}</li>`).join('')}
                    </ul>
                </div>

                <div class="detail-section">
                    <h3>安装地址</h3>
                    <code class="install-url">${escapeHtml(tool.url)}</code>
                </div>
            </div>
        `;

        $('#detail-title').textContent = tool.name;
        $('#detail-install-btn').innerHTML = isInstalled 
            ? '<i class="fas fa-check"></i> 已安装'
            : '<i class="fas fa-download"></i> 安装';
        $('#detail-install-btn').disabled = isInstalled;

        $('#detail-modal-overlay').classList.remove('hidden');
    }

    function closeDetailModal() {
        $('#detail-modal-overlay').classList.add('hidden');
        state.editingId = null;
    }

    function installFromMarket() {
        const tool = state.market.find(t => t.id === state.editingId);
        if (!tool) return;

        const newTool = {
            id: tool.id,
            name: tool.name,
            description: tool.description,
            icon: tool.icon,
            category: tool.category,
            url: tool.url,
            transport: 'http',
            authType: 'none',
            status: 'disconnected',
            autoStart: false,
            createdAt: Date.now()
        };

        state.installed.push(newTool);
        saveState();
        
        closeDetailModal();
        renderInstalled();
        renderMarket();
        updateCounts();
        
        showToast(`${tool.name} 安装成功`, 'success');
    }

    // ==================== 添加/编辑弹窗 ====================
    function openModal(tool = null) {
        state.editingId = tool?.id || null;

        $('#modal-title').textContent = tool ? '编辑MCP工具' : '添加MCP工具';
        
        // 重置表单
        $('#mcp-form')?.reset();
        
        // 填充数据
        if (tool) {
            $('#mcp-id').value = tool.id;
            $('#mcp-name').value = tool.name;
            $('#mcp-description').value = tool.description || '';
            $('#mcp-icon').value = tool.icon;
            $('#mcp-category').value = tool.category || 'api';
            $('#mcp-url').value = tool.url;
            $('#mcp-transport').value = tool.transport || 'http';
            $('#mcp-auth-type').value = tool.authType || 'none';
            $('#mcp-timeout').value = tool.timeout || 30;
            $('#mcp-retry').value = tool.retry || 3;
            $('#mcp-auto-start').checked = tool.autoStart !== false;
            
            state.selectedIcon = tool.icon;
            updateIconPreview();
            toggleAuthConfig();
        } else {
            state.selectedIcon = 'fas fa-plug';
            updateIconPreview();
        }

        $('#mcp-modal-overlay').classList.remove('hidden');
    }

    function closeModal() {
        $('#mcp-modal-overlay').classList.add('hidden');
        state.editingId = null;
    }

    function editTool(id) {
        const tool = state.installed.find(t => t.id === id);
        if (tool) openModal(tool);
    }

    // ==================== 保存 ====================
    function saveMcp() {
        const name = $('#mcp-name').value.trim();
        const url = $('#mcp-url').value.trim();

        if (!name || !url) {
            showToast('请填写必填字段', 'error');
            return;
        }

        const tool = {
            id: state.editingId || `mcp-${Date.now()}`,
            name: name,
            description: $('#mcp-description').value.trim(),
            icon: state.selectedIcon,
            category: $('#mcp-category').value,
            url: url,
            transport: $('#mcp-transport').value,
            authType: $('#mcp-auth-type').value,
            timeout: parseInt($('#mcp-timeout').value) || 30,
            retry: parseInt($('#mcp-retry').value) || 3,
            autoStart: $('#mcp-auto-start').checked,
            status: 'disconnected',
            createdAt: state.editingId 
                ? state.installed.find(t => t.id === state.editingId)?.createdAt || Date.now()
                : Date.now()
        };

        if (state.editingId) {
            const index = state.installed.findIndex(t => t.id === state.editingId);
            if (index > -1) {
                tool.status = state.installed[index].status;
                state.installed[index] = tool;
            }
        } else {
            state.installed.push(tool);
        }

        saveState();
        closeModal();
        renderInstalled();
        updateCounts();
        
        showToast(state.editingId ? '工具更新成功' : '工具添加成功', 'success');
    }

    // ==================== 删除 ====================
    function deleteTool(id) {
        if (!confirm('确定要删除这个MCP工具吗？')) return;

        state.installed = state.installed.filter(t => t.id !== id);
        saveState();
        renderInstalled();
        renderMarket();
        updateCounts();
        
        showToast('工具已删除', 'success');
    }

    // ==================== 启用/禁用 ====================
    function toggleTool(id) {
        const tool = state.installed.find(t => t.id === id);
        if (!tool) return;

        if (tool.status === 'connected') {
            tool.status = 'disconnected';
            showToast(`${tool.name} 已断开连接`, 'info');
        } else {
            // 模拟连接
            showToast(`正在连接 ${tool.name}...`, 'info');
            setTimeout(() => {
                tool.status = 'connected';
                saveState();
                renderInstalled();
                showToast(`${tool.name} 连接成功`, 'success');
            }, 1000);
        }

        saveState();
        renderInstalled();
    }

    // ==================== 连接测试 ====================
    function testConnection() {
        const url = $('#mcp-url').value.trim();
        if (!url) {
            showToast('请先填写服务地址', 'error');
            return;
        }

        const btn = $('#test-connection-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 测试中...';

        // 模拟测试
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-plug"></i> 测试连接';
            showToast('连接测试成功', 'success');
        }, 1500);
    }

    function testToolConnection(id) {
        const tool = state.installed.find(t => t.id === id);
        if (!tool) return;

        showToast(`正在测试 ${tool.name} 连接...`, 'info');

        setTimeout(() => {
            tool.status = 'connected';
            saveState();
            renderInstalled();
            showToast(`${tool.name} 连接正常`, 'success');
        }, 1000);
    }

    // ==================== 筛选 ====================
    function filterInstalled() {
        const search = $('#search-installed').value.toLowerCase();
        const status = $('#status-filter').value;

        let filtered = state.installed;

        if (search) {
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(search) ||
                (t.description || '').toLowerCase().includes(search)
            );
        }

        if (status !== 'all') {
            filtered = filtered.filter(t => t.status === status);
        }

        renderInstalled(filtered);
    }

    function filterMarket() {
        const search = $('#search-market').value.toLowerCase();
        const category = $('#category-filter').value;

        let filtered = state.market;

        if (search) {
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(search) ||
                t.description.toLowerCase().includes(search) ||
                t.features.some(f => f.toLowerCase().includes(search))
            );
        }

        if (category !== 'all') {
            filtered = filtered.filter(t => t.category === category);
        }

        renderMarket(filtered);
    }

    // ==================== 图标选择 ====================
    function openIconModal() {
        const grid = $('#icon-grid');
        grid.innerHTML = availableIcons.map(icon => `
            <div class="icon-item ${icon === state.selectedIcon ? 'selected' : ''}" data-icon="${icon}">
                <i class="${icon}"></i>
            </div>
        `).join('');

        grid.querySelectorAll('.icon-item').forEach(item => {
            item.addEventListener('click', () => {
                state.selectedIcon = item.dataset.icon;
                $('#mcp-icon').value = state.selectedIcon;
                updateIconPreview();
                closeIconModal();
            });
        });

        $('#icon-modal-overlay').classList.remove('hidden');
    }

    function closeIconModal() {
        $('#icon-modal-overlay').classList.add('hidden');
    }

    function updateIconPreview() {
        const preview = $('#icon-preview');
        if (preview) {
            preview.className = state.selectedIcon;
        }
    }

    // ==================== 辅助函数 ====================
    function toggleAuthConfig() {
        const type = $('#mcp-auth-type').value;
        
        document.querySelectorAll('.auth-config').forEach(el => el.classList.add('hidden'));
        
        if (type === 'api_key') {
            $('#api-key-config')?.classList.remove('hidden');
        } else if (type === 'bearer') {
            $('#bearer-config')?.classList.remove('hidden');
        } else if (type === 'basic') {
            $('#basic-config')?.classList.remove('hidden');
        }
    }

    function toggleAdvanced() {
        const content = $('#advanced-content');
        const icon = $('#advanced-toggle .toggle-icon');
        
        content?.classList.toggle('collapsed');
        icon?.classList.toggle('fa-chevron-down');
        icon?.classList.toggle('fa-chevron-up');
    }

    function toggleApiKeyVisibility() {
        const input = $('#mcp-api-key');
        const btn = $('#toggle-api-key i');
        
        if (input.type === 'password') {
            input.type = 'text';
            btn.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            btn.className = 'fas fa-eye';
        }
    }

    function updateCounts() {
        const count = $('#installed-count');
        if (count) {
            count.textContent = state.installed.length;
        }
    }

    function getCategoryName(category) {
        const names = {
            'database': '数据库',
            'api': 'API服务',
            'file': '文件处理',
            'search': '搜索工具',
            'communication': '通讯工具',
            'development': '开发工具'
        };
        return names[category] || category;
    }

    function formatDate(timestamp) {
        if (!timestamp) return '未知';
        const date = new Date(timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }

    function formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        return num.toLocaleString();
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
