(function() {
    const beastDetails = {
        qingniao: {
            title: '青鸟',
            content: '青鸟是古代神话中的神鸟，为西王母的使者。《山海经》记载："又西二百里曰的三危之山，三青鸟居之。"青鸟羽毛呈青色，能传递信息，是连接人间与仙界的使者。'
        },
        qilin: {
            title: '麒麟',
            content: '麒麟是中国古代神话中的瑞兽，形态鹿身牛尾，头生一角。麒麟出没之处，必有祥瑞。《礼记》记载："麟、凤、龟、龙，谓之四灵。"麒麟象征仁德与吉祥。'
        },
        fenghuang: {
            title: '凤凰',
            content: '凤凰是中国古代神话中的百鸟之王，雄为凤，雌为凰。凤凰起舞，百鸟来朝。《山海经》记载："又东五百里曰丹穴之山，其上多金玉，丹鸟出焉。"象征吉祥如意，天下太平。'
        },
        zhuque: {
            title: '朱雀',
            content: '朱雀是中国古代四象之一，位于南方，代表夏季，属火。朱雀形似凤凰，羽毛赤红，象征祥瑞与美好。主南方火灾，但亦能给人带来好运。'
        },
        xuanwu: {
            title: '玄武',
            content: '玄武是中国古代四象之一，位于北方，代表冬季，属水。玄武形似龟蛇合体，象征长寿与稳重。古代常用玄武图案于盾牌、旗帜之上，以示防御。'
        },
        baihu: {
            title: '白虎',
            content: '白虎是中国古代四象之一，位于西方，代表秋季，属金。白虎形似猛虎，毛色如雪，象征杀伐与正义。古代认为白虎能辟邪降魔，是保护神兽。'
        },
        qinglong: {
            title: '青龙',
            content: '青龙是中国古代四象之首，位于东方，代表春季，属木。青龙形似巨龙，鳞甲青翠，主宰东方山川。青龙象征权势与尊贵，是四象中最受敬仰的神兽。'
        },
        taotie: {
            title: '饕餮',
            content: '饕餮是中国古代神话中的凶兽，羊身人面，目在腋下。饕餮最大的特点是贪吃，象征贪婪与欲望。《山海经》记载："钩吾之山有兽焉，其状如羊身人面，其目在腋下。"'
        },
        qiongqi: {
            title: '穷奇',
            content: '穷奇是中国古代神话中的凶兽，形态像牛，长着刺猬的毛。穷奇性格凶恶，喜欢吃人。《山海经》记载："邽山有兽焉，其状如牛，蝟毛，名曰穷奇。"'
        },
        taowu: {
            title: '梼杌',
            content: '梼杌是中国古代神话中的凶兽，又称傲狠。其状如虎而犬毛，长唇巨口。梼杌象征顽固不化，倔强难训。《山海经》记载："北部荒中有兽焉，其状如虎而毛长。"'
        },
        hundun: {
            title: '混沌',
            content: '混沌是中国古代神话中的凶兽，形状像一个圆形的球，没有七窍。混沌象征蒙昧与无序。《山海经》记载："南海之外有混沌之国。"'
        },
        bazhi: {
            title: '巴蛇',
            content: '巴蛇是中国古代神话中的巨蛇，能吞食大象。《山海经》记载："巴蛇食象，三岁而出其骨。"巴蛇形体巨大，是南方之地的危险生物。'
        }
    };

    const mountainDetails = {
        kunlun: {
            title: '昆仑山',
            content: '昆仑山是中国古代神话中的神山，为万山之祖。上有建木、珠树、玉树等神物，是西王母的居所。《山海经》记载："海内昆仑之虚，在西北，帝之下都。"昆仑山是连接天地的重要通道。'
        },
        penglai: {
            title: '蓬莱山',
            content: '蓬莱山是古代神话中的海上三仙山之一，与方丈、瀛洲并称。上有金玉之宫，仙人所居。《史记》记载："蓬莱、方丈、瀛洲，此三神山者，其传在勃海中。"是求仙问道的理想之地。'
        },
        fanghu: {
            title: '方壶山',
            content: '方壶山是海上五神山之一，又名方丈。山上有金玉之宫，仙人所居，盛产仙丹玉液。《列子》记载："方壶者，形如壶，方之以为名。"是道教神话中的重要仙境。'
        },
        yingzhou: {
            title: '瀛洲山',
            content: '瀛洲山是古代神话中的东海神山，景致优美，物产丰富。山上有醴泉，味如甘酒；生有青莲，千年一开。《拾遗记》记载："瀛洲金峦之观，珠树之林。"'
        },
        yaogong: {
            title: '尧光山',
            content: '尧光山位于南方，山中有玉石、金精等矿物。传说此山是南斗星君的居所，山上有奇异的光辉。《山海经》记载："尧光之山，其阳多玉，其阴多金。"'
        },
        songting: {
            title: '松果山',
            content: '松果山位于西方，山上赤水流出，怪石遍布，古松参天。此山奇花异草丰富，是修炼佳地。《山海经》记载："松果之山，灌水出焉，而西流注于赤水。"'
        }
    };

    const herbDetails = {
        feicang: {
            title: '非肠草',
            content: '非肠草是《山海经》中记载的神草，生长于石脆之山。其汁液如脂，服之可使人记忆超群，过目不忘。《山海经》记载："石脆之山，其草有焉，名曰非肠，食之不忘。"'
        },
        lingzhi: {
            title: '灵芝',
            content: '灵芝是古代神话中的仙草，被视为吉祥之物。服之能延年益寿，起死回生。灵芝多生于深山古木之上，极为珍贵。是中医名贵药材，也是道教追求长生不死的仙药。'
        },
        taohua: {
            title: '桃花',
            content: '桃花在中国传统文化中象征爱情与姻缘。桃花盛开于春季，粉色花瓣如云似霞。《诗经》有"桃之夭夭，灼灼其华"之句。桃花还可酿酒、制茶，有美容养颜之效。'
        },
        zhongzhi: {
            title: '众志草',
            content: '众志草是《山海经》中记载的金创良药，生长于救之山。其叶如榆叶，汁液可治刀伤。《山海经》记载："救之山，其草多众志。"是古代战争中的重要草药。'
        },
        yuzhou: {
            title: '禹余粮',
            content: '禹余粮是古代神话中的神奇谷物，据说是大禹治水时余下的粮食。食之可充饥止渴，长食不饥。《本草纲目》记载："禹余粮乃大禹治水时弃余于山间者。"'
        },
        qixing: {
            title: '七星草',
            content: '七星草是古代神话中的神草，叶如星状排列，故名。传说是北斗星君所植，有驱邪避灾之效。《道藏》记载："七星草，产于名山，食之可通灵。"'
        }
    };

    function init() {
        setupBeastCards();
        setupMountainCards();
        setupHerbCards();
        setupCategoryButtons();
    }

    function setupBeastCards() {
        const beastCards = document.querySelectorAll('.beast-card');
        const detailContainer = document.getElementById('beastDetail');
        
        beastCards.forEach(card => {
            card.addEventListener('click', () => {
                const beast = card.dataset.beast;
                const detail = beastDetails[beast];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    beastCards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    function setupMountainCards() {
        const mountainCards = document.querySelectorAll('.mountain-card');
        const detailContainer = document.getElementById('mountainDetail');
        
        mountainCards.forEach(card => {
            card.addEventListener('click', () => {
                const mountain = card.dataset.mountain;
                const detail = mountainDetails[mountain];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    mountainCards.forEach(c => c.style.borderColor = 'rgba(139, 0, 0, 0.2)');
                    card.style.borderColor = 'var(--primary-red)';
                }
            });
        });
    }

    function setupHerbCards() {
        const herbCards = document.querySelectorAll('.herb-card');
        const detailContainer = document.getElementById('herbDetail');
        
        herbCards.forEach(card => {
            card.addEventListener('click', () => {
                const herb = card.dataset.herb;
                const detail = herbDetails[herb];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    herbCards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    function setupCategoryButtons() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const beastCards = document.querySelectorAll('.beast-card');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                beastCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        const beast = card.dataset.beast;
                        const categoryMap = {
                            'ruishou': ['qilin', 'qingniao'],
                            'xiongshou': ['taotie', 'qiongqi', 'taowu', 'hundun'],
                            'shenniao': ['fenghuang', 'zhuque'],
                            'lingshou': ['qinglong', 'baihu', 'xuanwu', 'bazhi']
                        };
                        
                        if (categoryMap[category] && categoryMap[category].includes(beast)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
