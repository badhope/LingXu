(function() {
    const zodiacData = {
        rat: { icon: '🐀', name: '鼠', color: '#4a90a4', wuxing: '水', compatible: ['龙', '猴', '牛'], avoid: ['马', '兔', '羊'] },
        ox: { icon: '🐂', name: '牛', color: '#8b6914', wuxing: '土', compatible: ['蛇', '鸡', '鼠'], avoid: ['龙', '羊', '狗'] },
        tiger: { icon: '🐅', name: '虎', color: '#e67e22', wuxing: '木', compatible: ['马', '狗', '猪'], avoid: ['蛇', '猴'] },
        rabbit: { icon: '🐇', name: '兔', color: '#e91e63', wuxing: '木', compatible: ['羊', '猪', '狗'], avoid: ['鸡', '龙', '鼠'] },
        dragon: { icon: '🐉', name: '龙', color: '#9c27b0', wuxing: '土', compatible: ['鸡', '猴', '鼠'], avoid: ['狗', '兔'] },
        snake: { icon: '🐍', name: '蛇', color: '#673ab7', wuxing: '火', compatible: ['鸡', '牛', '猴'], avoid: ['虎', '猪'] },
        horse: { icon: '🐎', name: '马', color: '#f44336', wuxing: '火', compatible: ['虎', '羊', '狗'], avoid: ['鼠', '牛'] },
        goat: { icon: '🐐', name: '羊', color: '#795548', wuxing: '土', compatible: ['兔', '猪', '马'], avoid: ['牛', '狗'] },
        monkey: { icon: '🐒', name: '猴', color: '#ff9800', wuxing: '金', compatible: ['龙', '蛇', '鼠'], avoid: ['虎', '猪'] },
        rooster: { icon: '🐓', name: '鸡', color: '#607d8b', wuxing: '金', compatible: ['龙', '蛇', '牛'], avoid: ['兔', '狗'] },
        dog: { icon: '🐕', name: '狗', color: '#8d6e63', wuxing: '土', compatible: ['虎', '兔', '马'], avoid: ['羊', '牛'] },
        pig: { icon: '🐖', name: '猪', color: '#f48fb1', wuxing: '水', compatible: ['兔', '羊', '虎'], avoid: ['蛇', '猴'] }
    };

    const wuxingElements = ['木', '火', '土', '金', '水'];
    const wuxingStatus = ['旺盛', '平和', '偏弱', '亏损'];

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

    const careerAdvices = {
        excellent: [
            '今日事业运极佳，适合开展新项目或提出创新想法。您的能力和努力将得到上级的认可，可能会有升职加薪的机会。',
            '工作中贵人运强，遇到困难时会有人主动相助。适合拓展人脉，与合作伙伴建立良好关系。',
            '创意灵感爆棚，适合从事创意类工作。抓住今日的灵感源泉，可能会有突破性的进展。'
        ],
        good: [
            '事业稳步发展，按计划推进即可。与同事协作顺利，团队氛围良好。',
            '适合处理细节工作，您的细心会得到赏识。注意与上级保持良好沟通。',
            '工作进展顺利，但需注意劳逸结合。适当放松能提高工作效率。'
        ],
        average: [
            '事业运平稳，没有太大起伏。做好本职工作即可，不宜有太大动作。',
            '可能会遇到一些小阻碍，保持耐心应对。与人为善可化解不必要的矛盾。',
            '今日适合学习和积累，为未来的发展打下基础。不宜急于求成。'
        ],
        poor: [
            '事业运低迷，宜静不宜动。避免做出重大决策，耐心等待时机。',
            '工作中可能遇到挫折或误会，保持低调谨慎。与同事沟通需注意方式方法。',
            '注意小人是非，避免锋芒过露。调整好心态，韬光养晦为上策。'
        ]
    };

    const loveAdvices = {
        excellent: [
            '今日爱情运极佳！单身者有望遇到理想对象，已有伴侣者感情甜蜜。',
            '浪漫氛围浓厚，适合约会或向心爱的人表达心意。成功率很高哦！',
            '与伴侣感情升温，彼此理解和支持。适合谈论未来规划。'
        ],
        good: [
            '感情运势不错，与另一半相处融洽。适当制造小惊喜能增进感情。',
            '人缘好，适合参加社交活动。单身者可能会遇到有缘人。',
            '与伴侣沟通顺畅，关系更加亲密。桃花运不错，值得期待。'
        ],
        average: [
            '感情运一般，保持现状即可。不宜有太大期待，顺其自然为佳。',
            '可能与伴侣有些小摩擦，及时沟通可以化解。单行者暂无明显桃花。',
            '适合独处思考，不宜急于追求或改变。给彼此一些空间会更好。'
        ],
        poor: [
            '感情运低迷，容易产生误会或矛盾。需要多沟通，避免冷战。',
            '单身者今日不宜表白，成功率较低。已有伴侣者需注意第三者介入。',
            '情绪容易波动，建议控制好脾气，避免伤害重要的人。'
        ]
    };

    const wealthAdvices = {
        excellent: [
            '财运极佳！可能有意外之财或投资回报。适合把握机会，但也要见好就收。',
            '今日收益丰厚，适合进行理财投资。但需注意风险控制，切勿贪心。',
            '财源滚滚来，可能收到红包或礼物。花钱也会有意外收获。'
        ],
        good: [
            '财运不错，正财稳定，偏财有望。可以适当进行投资理财。',
            '有赚钱机会，适合开展新业务或合作。保持积极心态即可。',
            '财务状况良好，适合储蓄或购买大件物品。'
        ],
        average: [
            '财运平稳，没有太大变化。维持现有理财策略即可。',
            '收入支出平衡，不宜进行大额投资。节约开支为佳。',
            '财运一般，可能有小额支出。保持理性消费。'
        ],
        poor: [
            '财运低迷，可能会有额外支出。务必控制消费，避免破财。',
            '投资需谨慎，容易亏损。不宜冒险，保存实力为上。',
            '可能有破财之兆，建议低调行事。避免借钱给他人。'
        ]
    };

    const healthAdvices = {
        excellent: [
            '今日健康状况极佳！精力充沛，适合运动锻炼。身体状态良好，容光焕发。',
            '免疫力强，不易生病。适合进行户外活动或体育运动。',
            '身心愉悦，睡眠质量好。继续保持健康生活习惯。'
        ],
        good: [
            '健康状况良好，保持适当运动即可。注意饮食均衡。',
            '精力充沛，但也要注意休息。不要过度劳累。',
            '适合养生调理，可以尝试新的健康方式。'
        ],
        average: [
            '健康运一般，注意劳逸结合。适当休息能提高状态。',
            '可能会有些疲惫感，建议早点休息。注意不要熬夜。',
            '身体无大碍，但需注意预防季节性疾病。'
        ],
        poor: [
            '健康运欠佳，容易疲劳。注意休息，避免过度劳累。',
            '身体可能出现小状况，建议及时就医或调理。',
            '注意保养，少吃生冷辛辣食物。保持良好作息。'
        ]
    };

    const luckyItems = {
        colors: ['红色', '金色', '蓝色', '绿色', '紫色', '白色', '黑色', '黄色'],
        numbers: ['3', '7', '8', '9', '12', '18', '24', '36'],
        directions: ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北'],
        times: ['子时(23-1)', '丑时(1-3)', '寅时(3-5)', '卯时(5-7)', '辰时(7-9)', '巳时(9-11)', '午时(11-13)', '未时(13-15)']
    };

    const monthlyFortunes = [
        '本月事业有望突破，适合制定新的发展计划。财运稳步上升，但需谨慎投资。感情方面，单身者有望遇到正缘，已有伴侣者关系更加稳定。健康需要注意休息，保持良好的作息习惯。',
        '本月整体运势平稳，各方面发展较为均衡。工作中可能会遇到一些挑战，但都能顺利解决。财运有所提升，偏财运也不错。健康状况良好，适合进行体育锻炼。',
        '本月运势先抑后扬，前期可能有些困难，后期会逐渐好转。事业上需要更加努力，财运会有所波动。感情方面需要多沟通，避免误会。健康方面注意预防感冒等季节性疾病。'
    ];

    let currentZodiac = null;
    let currentFortune = null;

    function init() {
        displayTodayDate();
        setupEventListeners();
        loadSavedFortune();
    }

    function displayTodayDate() {
        const now = new Date();
        const heroDate = document.getElementById('heroDate');
        const heroLunar = document.getElementById('heroLunar');
        
        if (heroDate) {
            heroDate.textContent = now.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            });
        }
        
        if (heroLunar) {
            const lunarDate = getLunarDate(now);
            heroLunar.textContent = `农历${lunarDate}`;
        }
    }

    function getLunarDate(date) {
        const lunarMonths = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
        const lunarDays = ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${lunarMonths[month > 2 ? month - 2 : month + 10]}月${lunarDays[Math.min(day, 30)]}`;
    }

    function setupEventListeners() {
        document.querySelectorAll('.zodiac-item').forEach(btn => {
            btn.addEventListener('click', () => selectZodiac(btn.dataset.zodiac));
        });

        const saveBtn = document.getElementById('saveFortuneBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveFortune);

        const detailBtn = document.getElementById('viewDetailBtn');
        if (detailBtn) detailBtn.addEventListener('click', showDetailModal);

        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) moreDetailsBtn.addEventListener('click', showExpandedDetails);

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) closeExpanded.addEventListener('click', hideExpandedDetails);

        const modalClose = document.getElementById('modalClose');
        if (modalClose) modalClose.addEventListener('click', closeModal);

        const modal = document.getElementById('detailModal');
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function selectZodiac(zodiac) {
        currentZodiac = zodiac;
        
        document.querySelectorAll('.zodiac-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.zodiac === zodiac) {
                btn.classList.add('active');
            }
        });

        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection) loadingSection.style.display = 'flex';
        if (fortuneResult) fortuneResult.style.display = 'none';

        setTimeout(() => {
            generateFortune(zodiac);
        }, 1500);
    }

    function generateFortune(zodiac) {
        const hash = hashCode(zodiac + new Date().toDateString());
        const rand = (n) => Math.abs(hash + Date.now()) % n;
        
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
        
        const careerAdvice = careerAdvices[fortuneLevel][rand(careerAdvices[fortuneLevel].length)];
        const loveAdvice = loveAdvices[fortuneLevel][rand(loveAdvices[fortuneLevel].length)];
        const wealthAdvice = wealthAdvices[fortuneLevel][rand(wealthAdvices[fortuneLevel].length)];
        const healthAdvice = healthAdvices[fortuneLevel][rand(healthAdvices[fortuneLevel].length)];

        const wuxingData = {};
        wuxingElements.forEach((el, i) => {
            const mainWuxing = zodiacData[zodiac].wuxing;
            if (el === mainWuxing) {
                wuxingData[el] = '旺盛';
            } else if ((mainWuxing === '木' && el === '水') || (mainWuxing === '火' && el === '木') || 
                       (mainWuxing === '土' && el === '火') || (mainWuxing === '金' && el === '土') ||
                       (mainWuxing === '水' && el === '金')) {
                wuxingData[el] = '平和';
            } else if ((mainWuxing === '木' && el === '金') || (mainWuxing === '火' && el === '水') || 
                       (mainWuxing === '土' && el === '木') || (mainWuxing === '金' && el === '火') ||
                       (mainWuxing === '水' && el === '土')) {
                wuxingData[el] = '偏弱';
            } else {
                wuxingData[el] = '亏损';
            }
        });

        const compatible = zodiacData[zodiac].compatible;
        const avoid = zodiacData[zodiac].avoid;

        const rand2 = (n) => Math.abs(hash + Date.now() + n) % n;

        currentFortune = {
            zodiac,
            date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
            lunar: getLunarDate(new Date()),
            overall,
            career,
            love,
            wealth,
            health,
            wuxing: wuxingData,
            luckyColor: luckyItems.colors[rand2(luckyItems.colors.length)],
            luckyNumber: luckyItems.numbers[rand2(luckyItems.numbers.length)],
            luckyDirection: luckyItems.directions[rand2(luckyItems.directions.length)],
            luckyTime: luckyItems.times[rand2(luckyItems.times.length)],
            description,
            careerAdvice,
            loveAdvice,
            wealthAdvice,
            healthAdvice,
            compatible,
            avoid,
            monthlyFortune: monthlyFortunes[rand2(monthlyFortunes.length)],
            rank: rand2(12) + 1,
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
        
        const resultZodiacIcon = document.getElementById('resultZodiacIcon');
        const resultZodiacName = document.getElementById('resultZodiacName');
        if (resultZodiacIcon) resultZodiacIcon.textContent = data.icon;
        if (resultZodiacName) resultZodiacName.textContent = `${data.name}年`;

        const resultDate = document.getElementById('resultDate');
        const resultLunar = document.getElementById('resultLunar');
        if (resultDate) resultDate.textContent = fortune.date;
        if (resultLunar) resultLunar.textContent = fortune.lunar;

        const rankValue = document.getElementById('rankValue');
        if (rankValue) rankValue.textContent = `第${fortune.rank}名`;

        animateScore('overall', fortune.overall);
        animateScore('career', fortune.career);
        animateScore('love', fortune.love);
        animateScore('wealth', fortune.wealth);
        animateScore('health', fortune.health);

        const overallLevel = document.getElementById('overallLevel');
        if (overallLevel) {
            const levels = { excellent: '极佳', good: '良好', average: '一般', poor: '低迷' };
            let level = '一般';
            if (fortune.overall >= 85) level = '极佳';
            else if (fortune.overall >= 70) level = '良好';
            else if (fortune.overall >= 55) level = '一般';
            else level = '低迷';
            overallLevel.textContent = level;
        }

        const luckyColor = document.getElementById('luckyColor');
        const luckyNumber = document.getElementById('luckyNumber');
        const luckyDirection = document.getElementById('luckyDirection');
        const luckyTime = document.getElementById('luckyTime');
        
        if (luckyColor) luckyColor.textContent = fortune.luckyColor;
        if (luckyNumber) luckyNumber.textContent = fortune.luckyNumber;
        if (luckyDirection) luckyDirection.textContent = fortune.luckyDirection;
        if (luckyTime) luckyTime.textContent = fortune.luckyTime;

        const fortuneDesc = document.getElementById('fortuneDesc');
        if (fortuneDesc) fortuneDesc.textContent = fortune.description;

        const careerAdvice = document.getElementById('careerAdvice');
        const loveAdvice = document.getElementById('loveAdvice');
        const wealthAdvice = document.getElementById('wealthAdvice');
        const healthAdvice = document.getElementById('healthAdvice');
        
        if (careerAdvice) careerAdvice.textContent = fortune.careerAdvice;
        if (loveAdvice) loveAdvice.textContent = fortune.loveAdvice;
        if (wealthAdvice) wealthAdvice.textContent = fortune.wealthAdvice;
        if (healthAdvice) healthAdvice.textContent = fortune.healthAdvice;

        const wuxingKeys = ['wood', 'fire', 'earth', 'metal', 'water'];
        const wuxingNames = ['木', '火', '土', '金', '水'];
        wuxingKeys.forEach((key, i) => {
            const el = document.getElementById(`element${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (el) el.textContent = fortune.wuxing[wuxingNames[i]];
        });

        const bestMatch = document.getElementById('bestMatch');
        const avoidMatch = document.getElementById('avoidMatch');
        
        if (bestMatch) {
            bestMatch.innerHTML = fortune.compatible.map(z => {
                const d = zodiacData[z.toLowerCase()];
                return `<span class="match-item">${d.icon}${z}</span>`;
            }).join('');
        }
        
        if (avoidMatch) {
            avoidMatch.innerHTML = fortune.avoid.map(z => {
                const d = zodiacData[z.toLowerCase()];
                return `<span class="match-item avoid">${d.icon}${z}</span>`;
            }).join('');
        }

        const monthlyFortune = document.getElementById('monthlyFortune');
        if (monthlyFortune) monthlyFortune.textContent = fortune.monthlyFortune;

        const overviewStars = document.getElementById('overviewStars');
        if (overviewStars) {
            let starCount = Math.floor(fortune.overall / 20);
            overviewStars.innerHTML = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
        }

        setTimeout(() => {
            fortuneResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function animateScore(type, value) {
        const scoreEl = document.getElementById(`${type}Score`);
        const valueEl = document.getElementById(`${type}Value`);
        
        if (!scoreEl || !valueEl) return;

        let current = 0;
        const duration = 1000;
        const increment = value / (duration / 16);
        
        const animate = () => {
            current += increment;
            if (current >= value) {
                current = value;
                if (type === 'overall') {
                    const circle = scoreEl;
                    const circumference = 2 * Math.PI * 45;
                    const offset = circumference - (current / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                } else {
                    scoreEl.style.width = `${current}%`;
                }
                valueEl.textContent = Math.round(current);
                return;
            }
            
            if (type === 'overall') {
                const circle = scoreEl;
                const circumference = 2 * Math.PI * 45;
                const offset = circumference - (current / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            } else {
                scoreEl.style.width = `${current}%`;
            }
            valueEl.textContent = Math.round(current);
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    function saveFortune() {
        if (!currentFortune) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_fortunes') || '[]');
            saved.unshift(currentFortune);
            const trimmed = saved.slice(0, 20);
            localStorage.setItem('tianji_fortunes', JSON.stringify(trimmed));
            alert('运势已保存！');
        } catch (e) {
            console.warn('Storage quota exceeded');
        }
    }

    function showDetailModal() {
        if (!currentFortune) return;
        
        const modal = document.getElementById('detailModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        const data = zodiacData[currentFortune.zodiac];
        
        modalBody.innerHTML = `
            <div class="modal-fortune-detail">
                <div class="modal-zodiac">
                    <span class="large-icon">${data.icon}</span>
                    <span>${data.name}年运势详解</span>
                </div>
                <div class="modal-scores">
                    <div class="modal-score-item">
                        <span>综合运势</span>
                        <strong>${currentFortune.overall}分</strong>
                    </div>
                    <div class="modal-score-item">
                        <span>事业运势</span>
                        <strong>${currentFortune.career}分</strong>
                    </div>
                    <div class="modal-score-item">
                        <span>爱情运势</span>
                        <strong>${currentFortune.love}分</strong>
                    </div>
                    <div class="modal-score-item">
                        <span>财运运势</span>
                        <strong>${currentFortune.wealth}分</strong>
                    </div>
                    <div class="modal-score-item">
                        <span>健康运势</span>
                        <strong>${currentFortune.health}分</strong>
                    </div>
                </div>
                <div class="modal-desc">
                    <h4>📖 运势解读</h4>
                    <p>${currentFortune.description}</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }

    function closeModal() {
        const modal = document.getElementById('detailModal');
        if (modal) modal.style.display = 'none';
    }

    function showExpandedDetails() {
        const expanded = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expanded || !expandedContent || !currentFortune) return;

        const data = zodiacData[currentFortune.zodiac];

        expandedContent.innerHTML = `
            <div class="expanded-section fade-in">
                <h3>🌟 完整运势分析</h3>
                <p>${currentFortune.description}</p>
            </div>
            
            <div class="expanded-section fade-in" style="--delay: 1">
                <h3>💼 事业发展</h3>
                <p>${currentFortune.careerAdvice}</p>
            </div>
            
            <div class="expanded-section fade-in" style="--delay: 2">
                <h3>💕 感情运势</h3>
                <p>${currentFortune.loveAdvice}</p>
            </div>
            
            <div class="expanded-section fade-in" style="--delay: 3">
                <h3>💰 财富运势</h3>
                <p>${currentFortune.wealthAdvice}</p>
            </div>
            
            <div class="expanded-section fade-in" style="--delay: 4">
                <h3>🏥 健康养生</h3>
                <p>${currentFortune.healthAdvice}</p>
            </div>
            
            <div class="expanded-section fade-in" style="--delay: 5">
                <h3>📅 本月展望</h3>
                <p>${currentFortune.monthlyFortune}</p>
            </div>
        `;
        
        expanded.style.display = 'block';
        expanded.scrollIntoView({ behavior: 'smooth' });
    }

    function hideExpandedDetails() {
        const expanded = document.getElementById('expandedDetails');
        if (expanded) expanded.style.display = 'none';
    }

    function loadSavedFortune() {
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_last_fortune'));
            if (saved) {
                const savedDate = new Date(saved.timestamp);
                const today = new Date();
                if (savedDate.toDateString() === today.toDateString()) {
                    currentFortune = saved;
                    displayFortune(saved);
                }
            }
        } catch (e) {}
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
