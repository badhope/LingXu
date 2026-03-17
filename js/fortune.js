(function() {
    const zodiacData = {
        rat: { icon: '🐀', name: '鼠', color: '#4a90a4' },
        ox: { icon: '🐂', name: '牛', color: '#8b6914' },
        tiger: { icon: '🐅', name: '虎', color: '#e67e22' },
        rabbit: { icon: '🐇', name: '兔', color: '#e91e63' },
        dragon: { icon: '🐉', name: '龙', color: '#9c27b0' },
        snake: { icon: '🐍', name: '蛇', color: '#673ab7' },
        horse: { icon: '🐎', name: '马', color: '#f44336' },
        goat: { icon: '🐐', name: '羊', color: '#795548' },
        monkey: { icon: '🐒', name: '猴', color: '#ff9800' },
        rooster: { icon: '🐓', name: '鸡', color: '#607d8b' },
        dog: { icon: '🐕', name: '狗', color: '#8d6e63' },
        pig: { icon: '🐖', name: '猪', color: '#f48fb1' }
    };

    const fortuneDescriptions = {
        excellent: [
            '今日运势极佳，各方面都将有出色的表现。事业上可能会有意外的惊喜和机遇，爱情方面也会有甜蜜的收获。财运亨通，适合进行投资理财。保持积极乐观的心态，好运将伴随您一整天。',
            '今天是收获满满的一天！您之前的努力将得到回报，无论是事业还是感情都会有好的进展。财运上如有神助，不妨把握机会。身体状态良好，适合外出活动。',
            '运势处于巅峰状态，各方面都能顺利发展。特别是人际关系方面，您将得到贵人的帮助和支持。工作中如有创意想法不妨大胆提出，很可能获得认可。'
        ],
        good: [
            '今日运势良好，保持平稳的心态即可。有小波折但都能顺利解决。事业上按部就班前进，感情上与伴侣相处融洽。财运方面保守为佳，不宜冒险。',
            '整体运势不错，工作和生活中都有好消息传来。与人合作要保持诚信，这将为您带来更多机遇。健康方面注意休息，保持充足的睡眠质量。',
            '今天是充实的一天，虽然可能会有些忙碌，但结果会让您满意。财运有小幅上升，可以考虑小额投资。感情上需要多花时间陪伴重要的人。'
        ],
        average: [
            '今日运势一般，建议保持低调。可能会遇到一些小挑战，但只要沉下心来都能克服。事业上没有太大进展，需要耐心等待时机。财运平稳，不宜有大的财务动作。',
            '运势趋于平稳，没有太多波澜。工作中可能会感到有些疲惫，建议适当休息。感情方面要多沟通，避免误会。健康需要注意饮食规律。',
            '今天是比较平常的一天，不需要有太大期待。做好本职工作，保持良好心态即可。财运没有明显变化，投资需谨慎。适合进行一些轻松的活动。'
        ],
        poor: [
            '今日运势较低迷，需要调整好心态。可能会遇到一些困难和挫折，但这些都是成长的机会。建议暂时放缓脚步，多反思总结。',
            '运势不佳，凡事三思而后行。工作上可能会遇到阻力，要保持耐心。感情上容易产生误会，需要多沟通。财运方面可能会有破财风险，务必谨慎。',
            '今天需要特别小心谨慎。可能会遇到一些意外情况，保持冷静最为重要。建议暂时不要做重大决定，多听取他人意见。健康方面注意防护。'
        ]
    };

    const luckyItems = {
        colors: ['红色', '金色', '蓝色', '绿色', '紫色', '白色', '黑色', '黄色'],
        numbers: ['3', '7', '8', '9', '12', '18', '24', '36'],
        directions: ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北']
    };

    let currentZodiac = null;
    let currentFortune = null;

    function init() {
        setupEventListeners();
        loadSavedFortune();
    }

    function setupEventListeners() {
        document.querySelectorAll('.zodiac-btn').forEach(btn => {
            btn.addEventListener('click', () => selectZodiac(btn.dataset.zodiac));
        });

        const saveBtn = document.getElementById('saveFortuneBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveFortune);
        }

        const shareBtn = document.getElementById('shareFortuneBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', shareFortune);
        }

        const detailBtn = document.getElementById('viewDetailBtn');
        if (detailBtn) {
            detailBtn.addEventListener('click', showDetailModal);
        }

        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        const modal = document.getElementById('detailModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    function selectZodiac(zodiac) {
        currentZodiac = zodiac;
        
        document.querySelectorAll('.zodiac-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.zodiac === zodiac) {
                btn.classList.add('active');
            }
        });

        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection && fortuneResult) {
            loadingSection.style.display = 'block';
            fortuneResult.style.display = 'none';
        }

        setTimeout(() => {
            generateFortune(zodiac);
        }, 1500);
    }

    function generateFortune(zodiac) {
        const hash = hashCode(zodiac + new Date().toDateString());
        const rand = (n) => Math.abs(hash) % n;
        
        const overall = Math.floor(rand(40) + 60);
        const career = Math.floor(rand(40) + 50);
        const love = Math.floor(rand(40) + 55);
        const wealth = Math.floor(rand(40) + 50);
        const health = Math.floor(rand(30) + 70);

        let fortuneLevel;
        if (overall >= 85) fortuneLevel = 'excellent';
        else if (overall >= 70) fortuneLevel = 'good';
        else if (overall >= 55) fortuneLevel = 'average';
        else fortuneLevel = 'poor';

        const descriptions = fortuneDescriptions[fortuneLevel];
        const description = descriptions[rand(descriptions.length)];

        currentFortune = {
            zodiac,
            date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
            overall,
            career,
            love,
            wealth,
            health,
            luckyColor: luckyItems.colors[rand(luckyItems.colors.length)],
            luckyNumber: luckyItems.numbers[rand(luckyItems.numbers.length)],
            luckyDirection: luckyItems.directions[rand(luckyItems.directions.length)],
            description,
            timestamp: Date.now()
        };

        displayFortune(currentFortune);
        
        if (window.addToHistory) {
            window.addToHistory('每日运势', '☀️', 'fortune.html');
        }
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    function displayFortune(fortune) {
        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection) loadingSection.style.display = 'none';
        if (fortuneResult) fortuneResult.style.display = 'block';

        const data = zodiacData[fortune.zodiac];
        
        const resultZodiac = document.getElementById('resultZodiac');
        if (resultZodiac) {
            resultZodiac.innerHTML = `
                <span class="result-zodiac-icon">${data.icon}</span>
                <span class="result-zodiac-name">${data.name}年</span>
            `;
        }

        const resultDate = document.getElementById('resultDate');
        if (resultDate) resultDate.textContent = fortune.date;

        animateScore('overall', fortune.overall);
        animateScore('career', fortune.career);
        animateScore('love', fortune.love);
        animateScore('wealth', fortune.wealth);
        animateScore('health', fortune.health);

        const luckyColor = document.getElementById('luckyColor');
        const luckyNumber = document.getElementById('luckyNumber');
        const luckyDirection = document.getElementById('luckyDirection');
        
        if (luckyColor) luckyColor.textContent = fortune.luckyColor;
        if (luckyNumber) luckyNumber.textContent = fortune.luckyNumber;
        if (luckyDirection) luckyDirection.textContent = fortune.luckyDirection;

        const fortuneDesc = document.getElementById('fortuneDesc');
        if (fortuneDesc) fortuneDesc.textContent = fortune.description;
    }

    function animateScore(type, value) {
        const fill = document.getElementById(`${type}Score`);
        const valueEl = document.getElementById(`${type}Value`);
        
        if (fill) {
            setTimeout(() => {
                fill.style.width = `${value}%`;
            }, 100);
        }
        
        if (valueEl) {
            let current = 0;
            const increment = value / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    current = value;
                    clearInterval(timer);
                }
                valueEl.textContent = Math.floor(current);
            }, 30);
        }
    }

    function saveFortune() {
        if (!currentFortune) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_fortunes') || '[]');
            saved.unshift(currentFortune);
            const trimmed = saved.slice(0, 30);
            localStorage.setItem('tianji_fortunes', JSON.stringify(trimmed));
            
            if (window.addToFavorites) {
                window.addToFavorites('运势结果', '☀️', 'fortune.html');
            }
            
            alert('运势结果已保存！');
        } catch (e) {
            alert('保存失败，请重试');
        }
    }

    function shareFortune() {
        if (!currentFortune || !currentFortune.zodiac) return;
        
        const data = zodiacData[currentFortune.zodiac];
        const text = `【${data.name}年今日运势】\n综合: ${currentFortune.overall}分\n事业: ${currentFortune.career}分\n爱情: ${currentFortune.love}分\n财运: ${currentFortune.wealth}分\n健康: ${currentFortune.health}分\n幸运颜色: ${currentFortune.luckyColor}\n幸运数字: ${currentFortune.luckyNumber}\n\n来源: 天机`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('运势已复制到剪贴板！');
            });
        } else {
            alert('您的浏览器不支持复制功能');
        }
    }

    function showDetailModal() {
        if (!currentFortune) return;
        
        const modal = document.getElementById('detailModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        const data = zodiacData[currentFortune.zodiac];
        
        let levelText = '';
        if (currentFortune.overall >= 85) levelText = '极佳';
        else if (currentFortune.overall >= 70) levelText = '良好';
        else if (currentFortune.overall >= 55) levelText = '一般';
        else levelText = '欠佳';

        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size: 3rem;">${data.icon}</span>
                <h3 style="color: var(--primary-gold); margin-top: 10px;">${data.name}年 · ${levelText}运势</h3>
                <p style="color: var(--text-muted);">${currentFortune.date}</p>
            </div>
            
            <h3>📊 各项运势详解</h3>
            <p><strong>综合运势：</strong>${currentFortune.overall}分 - ${levelText}</p>
            <p><strong>事业运势：</strong>${currentFortune.career}分 - ${currentFortune.career >= 70 ? '事业发展顺利' : '需要多加努力'}</p>
            <p><strong>爱情运势：</strong>${currentFortune.love}分 - ${currentFortune.love >= 70 ? '感情甜蜜' : '需要注意沟通'}</p>
            <p><strong>财运运势：</strong>${currentFortune.wealth}分 - ${currentFortune.wealth >= 70 ? '财运亨通' : '需谨慎理财'}</p>
            <p><strong>健康运势：</strong>${currentFortune.health}分 - ${currentFortune.health >= 70 ? '身体健康' : '注意休息'}</p>
            
            <h3>🍀 今日幸运元素</h3>
            <p>幸运颜色：<span style="color: var(--primary-gold);">${currentFortune.luckyColor}</span></p>
            <p>幸运数字：<span style="color: var(--primary-gold);">${currentFortune.luckyNumber}</span></p>
            <p>财神方位：<span style="color: var(--primary-gold);">${currentFortune.luckyDirection}</span></p>
            
            <h3>💡 运势建议</h3>
            <p>${currentFortune.description}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">本运势仅供娱乐参考，请勿过分迷信。人生掌握在自己手中，努力奋斗才是最重要的！</p>
            </div>
        `;
        
        modal.classList.add('active');
    }

    function closeModal() {
        const modal = document.getElementById('detailModal');
        if (modal) modal.classList.remove('active');
    }

    function loadSavedFortune() {
        try {
            const saved = localStorage.getItem('tianji_last_fortune');
            if (saved) {
                const fortune = JSON.parse(saved);
                const today = new Date().toDateString();
                if (new Date(fortune.timestamp).toDateString() === today) {
                    currentFortune = fortune;
                    currentZodiac = fortune.zodiac;
                    
                    document.querySelectorAll('.zodiac-btn').forEach(btn => {
                        if (btn.dataset.zodiac === fortune.zodiac) {
                            btn.classList.add('active');
                        }
                    });
                }
            }
        } catch (e) {}
    }

    function saveLastFortune() {
        if (currentFortune) {
            try {
                localStorage.setItem('tianji_last_fortune', JSON.stringify(currentFortune));
            } catch (e) {}
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
