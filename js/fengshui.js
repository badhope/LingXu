(function() {
    const toolsData = [
        { icon: '🧭', name: '罗盘定向', desc: '测定方位吉凶', action: '使用罗盘测定房屋朝向' },
        { icon: '📐', name: '八卦定位', desc: '分析八宫吉位', action: '按八卦方位分析气场分布' },
        { icon: '🏠', name: '户型分析', desc: '评估房屋格局', action: '分析户型优劣与化解方法' },
        { icon: '🌲', name: '环境勘察', desc: '考察周边环境', action: '勘察山水道路对住宅的影响' },
        { icon: '🔮', name: '能量检测', desc: '测量气场强弱', action: '使用仪器或感知气场' },
        { icon: '✨', name: '开运布局', desc: '调整吉祥摆设', action: '提供风水调整建议' }
    ];

    const knowledgeData = [
        {
            title: '选址原则',
            content: '风水学讲究"藏风聚气"，选址时应选择背山面水、左青龙右白虎的格局。山环水抱之处最易聚气，是建造居所的理想之地。'
        },
        {
            title: '大门朝向',
            content: '大门是住宅的气口，朝向直接影响家宅运势。坐北朝南的门向最为吉利，可吸纳阳气与财气。避免正对厕所、厨房或楼梯。'
        },
        {
            title: '客厅布局',
            content: '客厅宜宽敞明亮，沙发应靠墙摆放，忌背后空旷。客厅中央忌有横梁压顶，可通过装修化解。植物摆放宜选择阔叶类。'
        },
        {
            title: '卧室风水',
            content: '床头宜靠墙，不宜正对门或窗户。床下不宜堆放杂物，以免影响气场流通。镜子不宜正对床铺，容易导致失眠。'
        },
        {
            title: '厨房忌讳',
            content: '厨房忌与卫生间相邻或相对。炉灶不宜正对水槽，水火相克。厨房门不宜正对大门或卧室门，以免油烟直冲。'
        },
        {
            title: '办公室风水',
            content: '办公桌宜背后有靠，前方开阔。座位不宜正对大门或走廊。电脑宜摆放在文昌位，有助于提升事业运势。'
        }
    ];

    function init() {
        renderTools();
        renderKnowledge();
    }

    function renderTools() {
        const grid = document.getElementById('toolsGrid');
        grid.innerHTML = toolsData.map(t => `
            <div class="tool-card">
                <div class="tool-icon">${t.icon}</div>
                <h3>${t.name}</h3>
                <p>${t.desc}</p>
            </div>
        `).join('');
    }

    function renderKnowledge() {
        const cards = document.getElementById('knowledgeCards');
        cards.innerHTML = knowledgeData.map(k => `
            <div class="knowledge-card">
                <h4>${k.title}</h4>
                <p>${k.content}</p>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
