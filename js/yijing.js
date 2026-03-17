(function() {
    const hexagrams = [
        { symbol: '�乾', name: '乾为天', gua: '☰☰', keywords: '元亨利贞', desc: '象征天，创始、亨通、吉利、贞正。' },
        { symbol: '�坤', name: '坤为地', gua: '☷☷', keywords: '元亨', desc: '象征地，柔顺、包容、承载万物。' },
        { symbol: '�屯', name: '水雷屯', gua: '☵☳', keywords: '元亨利贞', desc: '象征事物初生时的艰难处境。' },
        { symbol: '�蒙', name: '山水蒙', gua: '☶☵', keywords: '亨', desc: '象征蒙昧，启发童蒙之意。' },
        { symbol: '�讼', name: '天水讼', gua: '☰☵', keywords: '有孚窒惕', desc: '象征争讼，诉讼之事。' },
        { symbol: '�否', name: '天地否', gua: '☷☰', keywords: '否之匪人', desc: '象征闭塞不通，小人当道。' },
        { symbol: '同人', name: '天火同人', gua: '☰☲', keywords: '同人于野', desc: '象征与人同心协力。' },
        { symbol: '大有', name: '火天大有', gua: '☲☰', keywords: '元亨', desc: '象征大获所有，丰收富足。' },
        { symbol: '谦', name: '地山谦', gua: '☷☶', keywords: '亨君子有终', desc: '象征谦虚，谦逊有益。' },
        { symbol: '豫', name: '雷地豫', gua: '☳☷', keywords: '利建侯行师', desc: '象征欢乐喜悦之事。' },
        { symbol: '随', name: '泽雷随', gua: '☴☳', keywords: '元亨利贞', desc: '象征随从、顺从之意。' },
        { symbol: '蛊', name: '山风蛊', gua: '☶☴', keywords: '元亨', desc: '象征除弊治乱之事。' },
        { symbol: '临', name: '地泽临', gua: '☷☴', keywords: '元亨利贞', desc: '象征君临天下，监临之意。' },
        { symbol: '观', name: '风地观', gua: '☴☷', keywords: '盥而不荐', desc: '象征观察、观摩之事。' },
        { symbol: '噬嗑', name: '火雷噬嗑', gua: '☲☳', keywords: '亨', desc: '象征刑罚、断案之事。' },
        { symbol: '贲', name: '山火贲', gua: '☶☲', keywords: '亨小利有攸往', desc: '象征文饰、装饰之美。' },
        { symbol: '剥', name: '山地剥', gua: '☶☷', keywords: '不利有攸往', desc: '象征剥落、衰落之事。' },
        { symbol: '复', name: '地雷复', gua: '☷☳', keywords: '亨', desc: '象征复归、回复之意。' },
        { symbol: '无妄', name: '天雷无妄', gua: '☰☳', keywords: '元亨利贞', desc: '象征不妄为，顺其自然。' },
        { symbol: '大畜', name: '山天大畜', gua: '☶☰', keywords: '利贞', desc: '象征大为蓄积之事。' },
        { symbol: '颐', name: '山雷颐', gua: '☶☳', keywords: '贞吉', desc: '象征颐养、休息之事。' },
        { symbol: '大过', name: '泽风大过', gua: '☴☴', keywords: '栋桡', desc: '象征过度、超越常规。' },
        { symbol: '坎', name: '坎为水', gua: '☵☵', keywords: '习坎孚', desc: '象征险陷、重重困难。' },
        { symbol: '离', name: '离为火', gua: '☲☲', keywords: '利贞亨', desc: '象征美丽、依附之意。' },
        { symbol: '咸', name: '泽山咸', gua: '☴☶', keywords: '亨利贞', desc: '象征感应、沟通之事。' },
        { symbol: '恒', name: '雷风恒', gua: '☳☴', keywords: '亨无咎', desc: '象征恒久、持久之意。' },
        { symbol: '遁', name: '天山遁', gua: '☰☶', keywords: '亨小利贞', desc: '象征退避、隐退之意。' },
        { symbol: '大壮', name: '雷天大壮', gua: '☳☰', keywords: '利贞', desc: '象征壮大、强盛之意。' },
        { symbol: '晋', name: '火地晋', gua: '☲☷', keywords: '康侯用锡马', desc: '象征晋升、前进之意。' },
        { symbol: '明夷', name: '地火明夷', gua: '☷☲', keywords: '利艰贞', desc: '象征光明受伤、君子处难。' },
        { symbol: '家人', name: '风火家人', gua: '☴☲', keywords: '利女贞', desc: '象征家庭、齐家之事。' },
        { symbol: '睽', name: '火泽睽', gua: '☲☴', keywords: '小事吉', desc: '象征乖离、违背之意。' },
        { symbol: '蹇', name: '水山蹇', gua: '☵☶', keywords: '利西南不利东北', desc: '象征行走艰难、困阻重重。' },
        { symbol: '解', name: '雷水解', gua: '☳☵', keywords: '利西南', desc: '象征解除困难、舒解险难。' },
        { symbol: '损', name: '山泽损', gua: '☶☴', keywords: '有孚元吉', desc: '象征减损、损失之意。' },
        { symbol: '益', name: '风雷益', gua: '☴☳', keywords: '利有攸往', desc: '象征增益、受益之事。' },
        { symbol: '夬', name: '泽天夬', gua: '☴☰', keywords: '扬于王庭', desc: '象征决断、裁决之事。' },
        { symbol: '姤', name: '天风姤', gua: '☰☴', keywords: '女壮勿取', desc: '象征相遇、邂逅之事。' },
        { symbol: '萃', name: '泽地萃', gua: '☴☷', keywords: '亨王假有庙', desc: '象征汇聚、聚集之事。' },
        { symbol: '升', name: '地风升', gua: '☷☴', keywords: '元亨', desc: '象征上升、晋升之意。' },
        { symbol: '困', name: '泽水困', gua: '☴☵', keywords: '亨贞大人吉', desc: '象征困穷、困境之时。' },
        { symbol: '井', name: '水风井', gua: '☵☴', keywords: '改邑不改井', desc: '象征井德，恒常不变。' },
        { symbol: '革', name: '泽火革', gua: '☴☲', keywords: '己日乃孚', desc: '象征变革、改革之事。' },
        { symbol: '鼎', name: '火风鼎', gua: '☲☴', keywords: '元吉亨', desc: '象征鼎新、创业之事。' },
        { symbol: '震', name: '震为雷', gua: '☳☳', keywords: '亨震来虩虩', desc: '象征震动、惊恐之事。' },
        { symbol: '艮', name: '艮为山', gua: '☶☶', keywords: '艮其背不获其身', desc: '象征静止、抑止之意。' },
        { symbol: '渐', name: '风山渐', gua: '☴☶', keywords: '女归吉利贞', desc: '象征渐进、循序渐进。' },
        { symbol: '归妹', name: '雷泽归妹', gua: '☳☴', keywords: '征凶无攸利', desc: '象征嫁女、归宁之事。' },
        { symbol: '丰', name: '雷火丰', gua: '☳☲', keywords: '亨王假之', desc: '象征丰盛、丰收之时。' },
        { symbol: '旅', name: '火山旅', gua: '☲☶', keywords: '小亨旅贞吉', desc: '象征旅行、旅居之事。' },
        { symbol: '巽', name: '巽为风', gua: '☴☴', keywords: '小亨有攸往', desc: '象征顺从、渗入之意。' },
        { symbol: '兑', name: '兑为泽', gua: '☴☴', keywords: '亨利贞', desc: '象征喜悦、和悦之意。' },
        { symbol: '涣', name: '风水涣', gua: '☵☴', keywords: '亨王假有庙', desc: '象征离散、涣散之事。' },
        { symbol: '节', name: '水泽节', gua: '☵☴', keywords: '亨苦节不可贞', desc: '象征节制、节约之意。' },
        { symbol: '中孚', name: '风泽中孚', gua: '☴☴', keywords: '豚鱼吉', desc: '象征诚信、中心可信。' },
        { symbol: '小过', name: '雷山小过', gua: '☳☶', keywords: '亨利贞', desc: '象征小有过越之事。' },
        { symbol: '既济', name: '水火既济', gua: '☵☲', keywords: '亨小利贞', desc: '象征成功、成就之事。' },
        { symbol: '未济', name: '火水未济', gua: '☲☵', keywords: '亨小狐汔济', desc: '象征未成、尚未成功。' }
    ];

    function init() {
        renderHexagrams();
        setupEventListeners();
    }

    function renderHexagrams() {
        const grid = document.getElementById('hexagramsGrid');
        
        grid.innerHTML = hexagrams.map((h, index) => `
            <div class="hexagram-card" data-index="${index}">
                <div class="hexagram-symbol">${h.gua}</div>
                <div class="hexagram-name">${h.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.hexagram-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showHexagramDetail(index);
            });
        });
    }

    function setupEventListeners() {
        const divinateBtn = document.getElementById('divinateBtn');
        const coins = document.querySelectorAll('.coin');
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('hexagramModal');

        divinateBtn.addEventListener('click', performDivination);

        coins.forEach(coin => {
            coin.addEventListener('click', () => {
                flipCoin(coin);
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }

    function flipCoin(coin) {
        coin.classList.add('flipping');
        
        const sides = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
        
        setTimeout(() => {
            const randomSide = sides[Math.floor(Math.random() * sides.length)];
            coin.textContent = randomSide;
            coin.classList.remove('flipping');
        }, 250);
    }

    function performDivination() {
        const coins = document.querySelectorAll('.coin');
        
        coins.forEach((coin, index) => {
            setTimeout(() => {
                flipCoin(coin);
            }, index * 300);
        });

        setTimeout(() => {
            const results = [];
            coins.forEach(coin => {
                results.push(coin.textContent);
            });

            const hash = hashCode(results.join(''));
            const hexagramIndex = hash % 64;
            
            showHexagramDetail(hexagramIndex);
            
            if (window.addToHistory) {
                window.addToHistory('易经起卦', '☯️', 'yijing.html');
            }
        }, 1500);
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function showHexagramDetail(index) {
        const hexagram = hexagrams[index];
        const modal = document.getElementById('hexagramModal');
        const modalBody = document.getElementById('modalBody');

        const yaoMeanings = [
            '初九：潜龙勿用 - 事物初创，宜积蓄力量',
            '九二：见龙在田，利见大人 - 崭露头角，得贵人相助',
            '九三：君子终日乾乾，夕惕若厉，无咎 - 勤勉谨慎，避免过失',
            '九四：或跃在渊，无咎 - 把握时机，一跃冲天',
            '九五：飞龙在天，利见大人 - 成就非凡，受人敬仰',
            '上九：亢龙有悔 - 盛极必衰，当知进退'
        ];

        modalBody.innerHTML = `
            <h2>${hexagram.gua} ${hexagram.name}</h2>
            <p style="text-align: center; color: var(--text-muted);">${hexagram.keywords}</p>
            
            <h3>卦象解读</h3>
            <p>${hexagram.desc}</p>
            
            <h3>六爻详解</h3>
            ${yaoMeanings.map(y => `<p>${y}</p>`).join('')}
            
            <h3>应用建议</h3>
            <p>此卦${hexagram.keywords}，${generateAdvice(hexagram)}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">易经占卜仅供娱乐参考，人生道路还需自己努力抉择。</p>
            </div>
        `;

        modal.classList.add('active');
    }

    function generateAdvice(hexagram) {
        const advices = [
            '此时正是行动的好时机，但需保持谨慎',
            '宜守成待机，不宜冒进',
            '应该广结善缘，多方求教',
            '当前形势有利，可以把握机会发展',
            '需要耐心等待，时机未到不可强求',
            '应当顺势而为，不可逆天而行'
        ];
        
        const hash = hashCode(hexagram.name);
        return advices[hash % advices.length];
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
