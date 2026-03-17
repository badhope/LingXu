(function() {
    const methodsData = [
        {
            icon: '🧘',
            name: '打坐静修',
            desc: '盘坐宁心，调息养气。每日30分钟，可静心养神。'
        },
        {
            icon: '🥋',
            name: '太极拳',
            desc: '柔和缓慢，以意导气。适合各年龄段锻炼。'
        },
        {
            icon: '🏃',
            name: '八段锦',
            desc: '导引养生，舒筋活络。八式动作，简单易学。'
        },
        {
            icon: '🖐️',
            name: '五禽戏',
            desc: '模仿虎鹿熊猿鸟，强身健体，延年益寿。'
        }
    ];

    const foodsData = [
        { icon: '🍎', name: '苹果', effect: '健脾养胃' },
        { icon: '🍌', name: '香蕉', effect: '润肠通便' },
        { icon: '🍊', name: '橙子', effect: '生津止渴' },
        { icon: '🍇', name: '葡萄', effect: '补血养颜' },
        { icon: '🥕', name: '胡萝卜', effect: '明目养肝' },
        { icon: '🥦', name: '西兰花', effect: '抗氧化' },
        { icon: '🍵', name: '绿茶', effect: '清热解毒' },
        { icon: '🫘', name: '红豆', effect: '利水消肿' },
        { icon: '🌾', name: '小米', effect: '养胃安神' },
        { icon: '🍄', name: '木耳', effect: '清肺活血' }
    ];

    function init() {
        renderMethods();
        renderFoods();
    }

    function renderMethods() {
        const grid = document.getElementById('methodsGrid');
        grid.innerHTML = methodsData.map(m => `
            <div class="method-card">
                <div class="method-icon">${m.icon}</div>
                <h3>${m.name}</h3>
                <p>${m.desc}</p>
            </div>
        `).join('');
    }

    function renderFoods() {
        const grid = document.getElementById('foodsGrid');
        grid.innerHTML = foodsData.map(f => `
            <div class="food-item">
                <div class="food-icon">${f.icon}</div>
                <h4>${f.name}</h4>
                <p>${f.effect}</p>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
