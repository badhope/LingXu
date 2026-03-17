(function() {
    const divinationTypes = {
        yijing: {
            name: '易经占卜',
            description: '六十四卦，阴阳变化',
            results: [
                { gua: '乾', name: '乾为天', desc: '元亨利贞', meaning: '大吉大利，万事亨通。此时正是成就大事的时机。' },
                { gua: '坤', name: '坤为地', desc: '元亨', meaning: '地势坤，君子以厚德载物。保持低调，稳步前进。' },
                { gua: '屯', name: '水雷屯', desc: '元亨利贞', meaning: '事物初生，需耐心等待时机。' },
                { gua: '蒙', name: '山水蒙', desc: '亨', meaning: '蒙昧渐开，学习上进的好时机。' },
                { gua: '讼', name: '天水讼', desc: '有孚窒惕', meaning: '有争议纠纷，宜保持谨慎。' },
                { gua: '否', name: '天地否', desc: '否之匪人', meaning: '运势不佳，宜守不宜攻。' }
            ]
        },
        qimen: {
            name: '奇门遁甲',
            description: '时空数理，趋吉避凶',
            results: [
                { gua: '休门', name: '休养生息', desc: '宜休息调整', meaning: '当前适合休养，不宜冒进。' },
                { gua: '生门', name: '生机勃勃', desc: '求财吉利', meaning: '财运亨通，适合投资创业。' },
                { gua: '伤门', name: '损伤之象', desc: '注意意外', meaning: '需谨慎行事，避免冲突。' },
                { gua: '杜门', name: '堵塞不通', desc: '宜防守', meaning: '运势受阻，宜静待时机。' },
                { gua: '景门', name: '光明显耀', desc: '文吉', meaning: '适合文化传媒，社交活动。' },
                { gua: '死门', name: '凶险之象', desc: '大凶', meaning: '需格外谨慎，避免冒险。' }
            ]
        },
        liuren: {
            name: '六壬神数',
            description: '五行生克，预测吉凶',
            results: [
                { gua: '大吉', name: '太岁当头', desc: '贵人相助', meaning: '有贵人扶持，逢凶化吉。' },
                { gua: '青龙', name: '喜事临门', desc: '吉庆有余', meaning: '喜庆盈门，好事连连。' },
                { gua: '白虎', name: '白虎煞星', desc: '注意健康', meaning: '需注意身体，避免是非。' },
                { gua: '朱雀', name: '口舌是非', desc: '谨言慎行', meaning: '注意言语，避免争端。' },
                { gua: '玄武', name: '暗中行事', desc: '防人之心', meaning: '需谨慎，防止受骗。' },
                { gua: '勾陈', name: '纠缠之事', desc: '麻烦不断', meaning: '琐事缠身，需耐心处理。' }
            ]
        },
        ziwei: {
            name: '紫微斗数',
            description: '星宿命运，详批一生',
            results: [
                { gua: '紫微星', name: '帝王之星', desc: '领导力强', meaning: '有领导才能，适合管理岗位。' },
                { gua: '天府星', name: '福禄之星', desc: '福气深厚', meaning: '一生福禄双全，生活优渥。' },
                { gua: '天机星', name: '智慧之星', desc: '头脑灵活', meaning: '聪明过人，适合创意工作。' },
                { gua: '太阳星', name: '光明之星', desc: '正直磊落', meaning: '为人正直，适合从政。' },
                { gua: '武曲星', name: '刚毅之星', desc: '执行力强', meaning: '适合金融、军警行业。' },
                { gua: '贪狼星', name: '欲望之星', desc: '多才多艺', meaning: '欲望强烈，需控制得当。' }
            ]
        }
    };

    let currentType = null;
    let currentResult = null;

    function init() {
        setupEventListeners();
    }

    function setupEventListeners() {
        document.querySelectorAll('.type-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                performDivination(type);
            });
        });

        document.getElementById('saveResultBtn')?.addEventListener('click', saveResult);
        document.getElementById('anotherBtn')?.addEventListener('click', () => {
            document.getElementById('divinationResult').style.display = 'none';
        });
    }

    function performDivination(type) {
        currentType = type;
        
        const typeData = divinationTypes[type];
        const results = typeData.results;
        
        const hash = hashCode(`${type}-${Date.now()}`);
        const resultIndex = hash % results.length;
        currentResult = results[resultIndex];

        displayResult(currentResult, typeData);

        if (window.addToHistory) {
            window.addToHistory(typeData.name, '🔮', 'divination.html');
        }
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function displayResult(result, typeData) {
        const resultDiv = document.getElementById('divinationResult');
        const title = document.getElementById('resultTitle');
        const time = document.getElementById('resultTime');
        const content = document.getElementById('resultContent');

        title.textContent = `${typeData.name} - ${result.name}`;
        time.textContent = new Date().toLocaleString('zh-CN');

        content.innerHTML = `
            <div class="result-symbol">${result.gua}</div>
            <div class="result-name">${result.name}</div>
            <div class="result-desc">${result.desc}</div>
            <div class="result-meaning">
                <h4>占卜解读</h4>
                <p>${result.meaning}</p>
            </div>
            <div class="result-advice">
                <h4>建议</h4>
                <p>${generateAdvice(result.name)}</p>
            </div>
        `;

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function generateAdvice(name) {
        const advices = [
            '保持积极心态，把握当下机会',
            '三思而后行，谨慎做出决定',
            '多与他人商量，集思广益',
            '顺势而为，不要逆天而行',
            '耐心等待，时机成熟再行动',
            '勇于尝试，但要注意风险'
        ];
        const hash = hashCode(name);
        return advices[hash % advices.length];
    }

    function saveResult() {
        if (!currentResult || !currentType) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_divinations') || '[]');
            saved.unshift({
                type: currentType,
                result: currentResult,
                time: Date.now()
            });
            const trimmed = saved.slice(0, 30);
            localStorage.setItem('tianji_divinations', JSON.stringify(trimmed));
            
            alert('占卜结果已保存！');
        } catch (e) {
            alert('保存失败');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
