(function() {
    const theoryDetails = {
        xingshi: {
            title: '姓氏',
            content: '姓氏代表先天因缘，是家族血脉的传承。中国姓氏历史悠久，大多世代相传，不可更改。姓氏承载着家族的基因信息和命运密码，对个人的命运有一定影响。不同姓氏的笔画数、五行属性也是姓名学分析的重要内容。'
        },
        mingzi: {
            title: '名字',
            content: '名字是父母赐予的礼物，是后天可以改变的因素。一个好名字可以弥补先天的不足，对命运产生积极影响。名字不仅是一个代号，更承载着父母的期望与祝福。好名字应该音韵优美、寓意深远、五行相补。'
        },
        zihua: {
            title: '字画',
            content: '每个汉字都有固定的笔画数，这些笔画数对应着不同的五行属性和数理吉凶。姓名学将81个数字分为大吉、平顺、凶数三种类型。好的名字应该选择大吉或平顺的数理，同时要根据八字五行来配置合适的笔画数。'
        }
    };

    const strokesData = {
        ji: [
            { number: 1, meaning: '宇宙起源，万物之始', name: '太极' },
            { number: 3, meaning: '三才配置，寓意进取', name: '进取' },
            { number: 5, meaning: '五福临门，运气极佳', name: '福运' },
            { number: 8, meaning: '八卦运筹，财源广进', name: '财富' },
            { number: 13, meaning: '天才得助，智能兼备', name: '英才' },
            { number: 15, meaning: '福寿圆满，涵养德行', name: '福寿' },
            { number: 16, meaning: '厚重载德，安富尊荣', name: '厚重' },
            { number: 21, meaning: '明月中天，权威显达', name: '权威' },
            { number: 23, meaning: '旭日东升，壮志凌云', name: '壮志' },
            { number: 25, meaning: '资性英敏，智勇双全', name: '英敏' }
        ],
        ping: [
            { number: 2, meaning: '混沌未开，阴阳相生', name: '中庸' },
            { number: 4, meaning: '四正稳固，基础牢固', name: '稳健' },
            { number: 6, meaning: '六六大顺，万事如意', name: '和顺' },
            { number: 7, meaning: '七星星耀，智慧超群', name: '智慧' },
            { number: 10, meaning: '十全十美，完美无缺', name: '完美' },
            { number: 12, meaning: '意志薄弱，突破困难', name: '突破' },
            { number: 14, meaning: '沦落天涯，愁困一生', name: '沦落' },
            { number: 17, meaning: '权威刚强，突破万难', name: '刚强' },
            { number: 18, meaning: '有志竟成，博得名利', name: '有志' },
            { number: 20, meaning: '智能超群，完善兴业', name: '兴业' }
        ],
        xiong: [
            { number: 9, meaning: '九九归一，成就非凡', name: '考验' },
            { number: 11, meaning: '旱苗逢雨，枯木逢春', name: '重生' },
            { number: 19, meaning: '多难荣达，疾患绵绵', name: '多难' },
            { number: 22, meaning: '秋草逢霜，薄弱无力', name: '薄弱' },
            { number: 24, meaning: '锦绣前程，智慧丰盈', name: '锦绣' },
            { number: 26, meaning: '变怪奇异，疑难杂症', name: '变怪' },
            { number: 27, meaning: '欲望无止，抑制自我', name: '欲望' },
            { number: 28, meaning: '遭难之数，骨肉离散', name: '遭难' },
            { number: 29, meaning: '智谋兼备，功名成就', name: '智谋' },
            { number: 30, meaning: '一成一败，浮沉不定', name: '浮沉' }
        ]
    };

    const elementDetails = {
        wood: {
            title: '木属性',
            content: '木代表生发、成长、仁慈。木性名字适合命理中木偏弱的人，可以带来生机与活力。木属性汉字多与植物、木材相关，如林、森、桐、柏等。',
            good: '东、南、东南方位',
            color: '绿色、青色'
        },
        fire: {
            title: '火属性',
            content: '火代表热烈、激情、礼仪。火性名字适合命理中火偏弱的人，可以带来热情与动力。火属性汉字多与火焰、光亮相关，如炎、灿、辉、耀等。',
            good: '南、东、东北方位',
            color: '红色、紫色'
        },
        earth: {
            title: '土属性',
            content: '土代表厚重、诚信、稳重。土性名字适合命理中土偏弱的人，可以带来稳定与信任。土属性汉字多与土地、山石相关，如山、峰、磊、垚等。',
            good: '东北、西南、西北方位',
            color: '黄色、棕色'
        },
        metal: {
            title: '金属性',
            content: '金代表刚健、决断、义气。金属名字适合命理中金偏弱的人，可以带来果断与正义。金属汉字多与金属、兵器相关，如金、钢、锋、铭等。',
            good: '西、东南方位',
            color: '白色、金色'
        },
        water: {
            title: '水属性',
            content: '水代表智慧、变通、流动性。水性名字适合命理中水偏弱的人，可以带来智慧与灵活。水属性汉字多与水、雨相关，如水、雨、涛、澜等。',
            good: '北、西北方位',
            color: '蓝色、黑色'
        }
    };

    const tipsData = [
        { number: '一', title: '音韵优美', content: '名字读音要朗朗上口，避免拗口或谐音不雅' },
        { number: '二', title: '寓意深远', content: '名字要寄托美好愿望，体现文化内涵' },
        { number: '三', title: '五行相补', content: '根据八字五行选择合适的字，补益命理' },
        { number: '四', title: '数理吉祥', content: '笔画数要选择大吉或平顺的数理' },
        { number: '五', title: '字形美观', content: '字形结构要匀称，书写方便' },
        { number: '六', title: '避免重名', content: '尽量避开常见名字，彰显个性' }
    ];

    function init() {
        setupTheoryCards();
        setupStrokesCategories();
        setupElementCards();
        renderTips();
        initAnimations();
    }

    function setupTheoryCards() {
        const cards = document.querySelectorAll('.theory-card');
        const detailContainer = document.getElementById('theoryDetail');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const theory = card.dataset.theory;
                const detail = theoryDetails[theory];
                
                if (detailContainer && detail) {
                    detailContainer.innerHTML = `
                        <div class="detail-content">
                            <h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${detail.title}</h4>
                            <p style="color: var(--text-light); line-height: 1.8; font-size: 0.95rem;">${detail.content}</p>
                        </div>
                    `;
                    
                    cards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                    
                    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }

    function setupStrokesCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        renderStrokes('ji');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                renderStrokes(category);
            });
        });
    }

    function renderStrokes(category) {
        const grid = document.getElementById('strokesGrid');
        if (!grid) return;
        
        const data = strokesData[category];
        grid.innerHTML = data.map(item => `
            <div class="stroke-card ${category}">
                <div class="stroke-number">${item.number}</div>
                <div class="stroke-name">${item.name}</div>
                <div class="stroke-meaning">${item.meaning}</div>
            </div>
        `).join('');
    }

    function setupElementCards() {
        const cards = document.querySelectorAll('.element-card');
        const detailContainer = document.getElementById('elementDetail');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const element = card.dataset.element;
                const detail = elementDetails[element];
                
                if (detailContainer && detail) {
                    detailContainer.innerHTML = `
                        <div class="detail-content">
                            <h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${detail.title}</h4>
                            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 15px; font-size: 0.95rem;">${detail.content}</p>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <span style="padding: 5px 12px; background: rgba(201, 162, 39, 0.1); border-radius: 15px; font-size: 0.85rem; color: var(--primary-gold);">吉祥方位：${detail.good}</span>
                                <span style="padding: 5px 12px; background: rgba(201, 162, 39, 0.1); border-radius: 15px; font-size: 0.85rem; color: var(--primary-gold);">吉祥色彩：${detail.color}</span>
                            </div>
                        </div>
                    `;
                    
                    cards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                    
                    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }

    function renderTips() {
        const container = document.getElementById('tipsList');
        if (!container) return;
        
        container.innerHTML = tipsData.map(tip => `
            <div class="tip-item">
                <div class="tip-number">${tip.number}</div>
                <div class="tip-content">
                    <h4>${tip.title}</h4>
                    <p>${tip.content}</p>
                </div>
            </div>
        `).join('');
    }

    function initAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.style.getPropertyValue('--delay') || '0';
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, parseFloat(delay) * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(el => observer.observe(el));
        } else {
            fadeElements.forEach(el => el.classList.add('visible'));
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
