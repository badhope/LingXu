(function() {
    const festivalDetails = {
        chunjie: {
            title: '春节',
            content: '春节是中国最重要的传统节日，又称"过年"。春节象征着辞旧迎新、团圆喜庆。主要习俗包括贴春联、放鞭炮、拜年、发红包、吃年夜饭等。除夕夜全家人围坐一起吃年夜饭，初一开始走亲访友互相拜年。',
            customs: ['贴春联 - 表达美好祝愿', '放鞭炮 - 驱邪避难', '拜年 - 表达敬意', '发红包 - 祝福平安', '吃年夜饭 - 团圆美满'],
            food: '年夜饭、饺子、鱼、年糕'
        },
        yuanxiao: {
            title: '元宵节',
            content: '元宵节在正月十五，是春节后的第一个重要节日。主要活动有赏花灯、猜灯谜、吃元宵、舞龙舞狮等。"元宵"谐音"圆宵"，象征团圆美满。花灯种类繁多，是夜晚一道靓丽的风景线。',
            customs: ['赏花灯 - 夜晚观赏', '猜灯谜 - 启迪智慧', '吃元宵 - 团圆美满', '舞龙舞狮 - 热闹喜庆'],
            food: '元宵、汤圆'
        },
        qingming: {
            title: '清明节',
            content: '清明节在每年4月4日至6日之间，是中国传统的祭祖节日。主要活动有扫墓祭祖、踏青游玩、插柳枝、放风筝等。清明时节春暖花开，万物复苏，也是亲近大自然的好时节。',
            customs: ['扫墓祭祖 - 缅怀先人', '踏青 - 亲近自然', '插柳 - 驱邪避疫', '放风筝 - 消灾祈福'],
            food: '青团、清明粿'
        },
        duanwu: {
            title: '端午节',
            content: '端午节在五月初五，是为了纪念爱国诗人屈原。主要习俗有赛龙舟、包粽子、挂艾草、佩香囊等。端午节正值仲夏，蚊虫增多，所以有挂艾草、佩香囊驱邪避疫的习俗。',
            customs: ['赛龙舟 - 纪念屈原', '包粽子 - 投江喂鱼', '挂艾草 - 驱邪避疫', '佩香囊 - 芳香开窍'],
            food: '粽子、咸鸭蛋'
        },
        qixi: {
            title: '七夕节',
            content: '七夕节在七月初七，又称"中国情人节"。源于牛郎织女的美丽传说。这一天，年轻的姑娘们会乞巧、穿针引线，祈求自己心灵手巧。夜晚仰望星空，传说牛郎织女会在鹊桥相会。',
            customs: ['乞巧 - 祈求心灵手巧', '穿针引线 - 展示技艺', '拜织女 - 祈求姻缘', '晒书晒衣 - 防虫防潮'],
            food: '巧果、花瓜'
        },
        midautumn: {
            title: '中秋节',
            content: '中秋节在八月十五，是中国传统的团圆节日。这一天月亮最圆，象征团圆。主要活动有赏月、吃月饼、赏桂花、猜灯谜等。中秋月饼圆如满月，寓意团圆美满。',
            customs: ['赏月 - 团圆美满', '吃月饼 - 寓意团圆', '赏桂花 - 金秋飘香', '猜灯谜 - 增添情趣'],
            food: '月饼、桂花糕、柚子'
        }
    };

    const taboosData = {
        life: [
            { title: '筷子不插在饭中', desc: '筷子插在饭中像香炉插香，是祭拜死人的做法，非常不吉利' },
            { title: '室内不撑伞', desc: '伞谐音"散"，在室内撑伞寓意分散、离散' },
            { title: '不拍别人肩膀', desc: '人身上有三把火，头顶和两肩，拍肩膀会拍灭好运' },
            { title: '药渣倒路上', desc: '药渣倒在路上让人踩等于把病气传给别人' },
            { title: '打破镜子', desc: '打破镜子预示着破财或遭遇厄运' }
        ],
        festival: [
            { title: '正月初一不扫地', desc: '初一扫地把财气扫出门，会导致一年破财' },
            { title: '元宵节不洗头', desc: '洗头会把财运洗掉，一年都穷' },
            { title: '端午日不说', desc: '端午节说不吉利的话会带来厄运' },
            { title: '中秋节不婚嫁', desc: '中秋是团圆节婚嫁会冲撞神灵' },
            { title: '除夕夜不关灯', desc: '除夕夜开灯到天明，照亮新年运势' }
        ],
        wedding: [
            { title: '忌属相相冲', desc: '结婚双方属相不能相冲相克' },
            { title: '迎亲不走回头路', desc: '回头路寓意婚姻有去无回' },
            { title: '孕妇不参加婚礼', desc: '孕妇参加婚礼会"冲喜"，对双方都不好' },
            { title: '寡妇不送亲', desc: '寡妇送亲寓意不吉利' }
        ],
        funeral: [
            { title: '守丧不拜年', desc: '守丧期间不能去别人家拜年' },
            { title: '不穿红戴绿', desc: '丧期应穿素色衣服' },
            { title: '不办喜事', desc: '丧期一年内不能办喜事' },
            { title: '不入他人宅', desc: '丧期未满不能进别人家' }
        ]
    };

    const customDetails = {
        greeting: {
            title: '见面礼仪',
            content: '中国传统见面礼仪丰富多彩，包括作揖、抱拳、鞠躬等。作揖是汉族传统礼节，双手合十胸前，弯腰致敬。抱拳是武林礼节，左手抱右手意为"左撇右拿"，表示尊重。鞠躬则是现代常用的礼仪。'
        },
        dining: {
            title: '餐桌礼仪',
            content: '中国餐桌礼仪讲究座次排序、敬酒布菜。主位面向大门或背靠墙面，长辈先入座。敬酒时晚辈要双手端杯，杯沿低于长辈。布菜用公筷，不要用自己的筷子给人夹菜。'
        },
        gift: {
            title: '送礼礼仪',
            content: '送礼讲究"好事成双"，礼物要成双成对。避免送"钟"（送终）、"梨"（离）等谐音不吉利的物品。礼物要包装精美，但不必过于贵重。重阳节送菊花象征祝福，但清明节送菊花则不吉利。'
        },
        worship: {
            title: '祭祀礼仪',
            content: '祭祀是中国传统文化的重要组成部分。祭祀前要沐浴更衣，保持整洁。祭拜时心怀诚敬，姿势端正。祭品摆放有固定位置和顺序。上香时用左手，因为右手从事劳动。'
        }
    };

    const proverbsData = [
        { proverb: '瑞雪兆丰年', meaning: '冬天的大雪预示来年丰收' },
        { proverb: '清明前后，种瓜点豆', meaning: '清明时节是播种的好时机' },
        { proverb: '冬至饺子夏至面', meaning: '冬至吃饺子，夏至吃面条' },
        { proverb: '二月二，龙抬头', meaning: '农历二月初二，春耕开始' },
        { proverb: '腊月二十三，灶君上天', meaning: '小年送灶王爷上天述职' },
        { proverb: '七不出门，八不归家', meaning: '逢七不出远门，逢八不回家' }
    ];

    function init() {
        setupFestivalCards();
        setupTaboosCategories();
        setupCustomCards();
        setupProverbs();
        initAnimations();
    }

    function setupFestivalCards() {
        const cards = document.querySelectorAll('.festival-card');
        const detailContainer = document.getElementById('festivalDetail');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const festival = card.dataset.festival;
                const detail = festivalDetails[festival];
                
                if (detailContainer && detail) {
                    detailContainer.innerHTML = `
                        <div class="detail-content">
                            <h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${detail.title}</h4>
                            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 15px; font-size: 0.95rem;">${detail.content}</p>
                            <div style="margin-bottom: 10px;">
                                <strong style="color: var(--primary-gold);">传统习俗：</strong>
                            </div>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
                                ${detail.customs.map(c => `<span style="padding: 4px 10px; background: rgba(139, 0, 0, 0.2); border-radius: 12px; font-size: 0.8rem; color: var(--text-light);">${c}</span>`).join('')}
                            </div>
                            <div>
                                <strong style="color: var(--primary-gold);">特色美食：</strong>
                                <span style="color: var(--text-muted); font-size: 0.9rem;">${detail.food}</span>
                            </div>
                        </div>
                    `;
                    
                    cards.forEach(c => c.style.borderColor = 'rgba(139, 0, 0, 0.3)');
                    card.style.borderColor = 'var(--primary-gold)';
                    
                    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }

    function setupTaboosCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        renderTaboos('life');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                renderTaboos(category);
            });
        });
    }

    function renderTaboos(category) {
        const grid = document.getElementById('taboosGrid');
        if (!grid) return;
        
        const data = taboosData[category];
        grid.innerHTML = data.map(taboo => `
            <div class="taboo-card">
                <div class="taboo-icon">⚠️</div>
                <div class="taboo-content">
                    <h4>${taboo.title}</h4>
                    <p>${taboo.desc}</p>
                </div>
            </div>
        `).join('');
    }

    function setupCustomCards() {
        const cards = document.querySelectorAll('.custom-card');
        const detailContainer = document.getElementById('customDetail');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const custom = card.dataset.custom;
                const detail = customDetails[custom];
                
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

    function setupProverbs() {
        const container = document.getElementById('proverbsList');
        if (!container) return;
        
        container.innerHTML = proverbsData.map(item => `
            <div class="proverb-item">
                <div class="proverb-text">${item.proverb}</div>
                <div class="proverb-meaning">${item.meaning}</div>
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
