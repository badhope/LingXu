(function() {
    const toolDetails = {
        bazi: {
            title: '八宅风水',
            content: '八宅风水以房屋坐向为主，分为东四宅和西四宅。根据坐向确定吉位与凶位，主张大门、卧室、厨房等重要位置应吉星方位。核心在于坐山朝向与宫位关系的配合。'
        },
        xuanlong: {
            title: '玄空飞星',
            content: '玄空飞星风水结合时间与空间，运用三元九运盘来分析每一年的吉凶方位。以当运之星为最旺，退运之星为衰，配合山水形势判断吉凶，是目前应用最广的风水流派。'
        },
        lisanshui: {
            title: '理气风水',
            content: '理气风水强调气的流动与聚集，研究八卦五行之气在空间中的分布。代表流派包括三元理气、八宅理气等，注重时间因素对风水的影响，强调"气"在不同时间的旺衰变化。'
        },
        form: {
            title: '形家风水',
            content: '形家风水又称峦头风水，注重观察地形地势的形状与态势。以龙、穴、砂、水为四大要素，追求"山环水抱"、藏风聚气的理想格局。是风水学的基础与根本。'
        }
    };

    const baguaDetails = {
        '☰': { name: '乾卦', attr: '金', meaning: '代表天、父亲、刚健、领导力。位于西北方，主贵人与运势。' },
        '☱': { name: '兑卦', attr: '金', meaning: '代表泽、喜悦、口才、少女。位于西方，主财运与社交。' },
        '☲': { name: '离卦', attr: '火', meaning: '代表火、中女、文化、美丽。位于南方，主事业与功名。' },
        '☳': { name: '震卦', attr: '木', meaning: '代表雷、长男、行动、威严。位于东方，主事业与发展。' },
        '☴': { name: '巽卦', attr: '木', meaning: '代表风、长女、柔顺、智慧。位于东南，主学业与财运。' },
        '☵': { name: '坎卦', attr: '水', meaning: '代表水、中男、智慧、险阻。位于北方，主事业与桃花。' },
        '☶': { name: '艮卦', attr: '土', meaning: '代表山、少男、稳重、收藏。位于东北，主财运与子女。' },
        '☷': { name: '坤卦', attr: '土', meaning: '代表地、母亲、包容、财富。位于西南方，主家庭与健康。' }
    };

    const roomDetails = {
        men: {
            title: '大门风水',
            content: '大门是住宅的气口，是进入宅院的通道，也是气流进出的主要位置。风水学认为大门朝向与开设位置直接关系到家宅的运势。理想的大门应该：1) 宽度适中，不过大或过小；2) 光线充足，明亮通透；3) 整洁有序，无杂物堆积；4) 不与厨房、卫生间门相对；5) 不宜正对电梯门或楼梯。大门的颜色宜根据住户五行选择，木命人宜绿色，水命人宜蓝色，金命人宜白色或金色。'
        },
        '客厅': {
            title: '客厅风水',
            content: '客厅是住宅的核心区域，是家人活动与接待宾客的主要场所。客厅风水要点：1) 位置宜在房屋前方，靠近大门；2) 形状宜方正，忌异形或缺角；3) 采光通风要好，避免昏暗；4) 沙发宜摆放在客厅吉位，背靠实墙；5) 客厅中央忌有横梁压顶，可通过装修化解；6) 茶几宜选用木质或石质，忌用金属或玻璃；7) 电视背景墙宜选择柔和的颜色，避免过于鲜艳。'
        },
        '厨房': {
            title: '厨房风水',
            content: '厨房主管饮食，与家人健康息息相关。厨房风水禁忌：1) 忌与卫生间相邻或相对，水火相克；2) 炉灶不宜正对水槽或冰箱；3) 厨房门不宜正对大门或卧室门；4) 炉灶背后宜有实墙依靠，忌背后空旷；5) 厨房地面宜低于客厅地面，形成高低差；6) 抽油烟机宜选择性能良好的，保持厨房清洁；7) 厨房颜色宜选择浅色系，避免过于昏暗。'
        },
        '卧室': {
            title: '卧室风水',
            content: '卧室是休息睡眠的场所，良好的卧室风水有助于提升睡眠质量与夫妻感情。卧室布局要点：1) 床头宜靠墙，不宜悬空；2) 床头不宜正对门或窗户；3) 床下不宜堆放杂物，保持整洁；4) 镜子不宜正对床铺，容易导致失眠；5) 卧室面积宜适中，过大或过小都不宜；6) 颜色宜选择柔和温暖的色调；7) 窗户宜使用厚窗帘，保证私密性；8) 空调或风扇不宜直接对着床吹。'
        },
        '卫生间': {
            title: '卫生间风水',
            content: '卫生间是排污之地，容易积聚阴湿之气。卫生间风水要点：1) 位置宜隐蔽，不宜居于住宅中央；2) 门不宜正对大门、厨房门或卧室门；3) 保持干燥通风，避免潮湿；4) 马桶盖宜随时关闭；5) 镜子不宜正对窗户；6) 颜色宜选择白色或淡蓝色等明亮色调；7) 可放置绿色植物化解阴气；8) 下水道宜保持畅通，避免堵塞。'
        },
        '书房': {
            title: '书房风水',
            content: '书房是学习工作的场所，风水影响学业与事业。书房布局要点：1) 位置宜选择文昌位，有助学业进步；2) 书桌宜背靠实墙或靠窗但有靠背；3) 座位前方宜开阔，忌背后空旷；4) 书桌不宜正对门或窗户；5) 电脑宜摆放在文昌位；6) 书架宜摆放在书桌左后方，代表青龙位；7) 灯光宜柔和均匀，避免刺眼；8) 保持书房整洁有序。'
        }
    };

    const colorDetails = {
        '木': {
            title: '木属性颜色',
            content: '木属性颜色包括青色、绿色等。木对应肝胆，主生发、生长。喜木之人宜多使用绿色系，可摆放绿植、木质家具。绿色有助于提升活力、促进事业发展。但木过旺则宜用金色白色来平衡。'
        },
        '火': {
            title: '火属性颜色',
            content: '火属性颜色包括红色、紫色、橙色等。火对应心血管，主热情、活力。喜火之人宜使用红色系，可装饰红色窗帘、沙发垫等。红色有助于提升气场、增强社交运势。但火过旺则宜用水属性颜色来平衡。'
        },
        '土': {
            title: '土属性颜色',
            content: '土属性颜色包括黄色、棕色、土色等。土对应脾胃，主稳定、承载。喜土之人宜使用黄色系，可使用黄色墙面、棕色家具。黄色有助于提升财运、增加贵人运。但土过旺则宜用木属性颜色来平衡。'
        },
        '金': {
            title: '金属性颜色',
            content: '金属性颜色包括白色、金色、银色等。金对应肺与大肠，主刚健、决断。喜金之人宜使用白色或金色系，可装饰金属装饰品、金色摆件。白色有助于提升事业运势，金色有助于招财。但金过旺则宜用火属性颜色来平衡。'
        },
        '水': {
            title: '水属性颜色',
            content: '水属性颜色包括蓝色、黑色等。水对应肾与膀胱，主智慧、流动。喜水之人宜使用蓝色或黑色系，可摆放鱼缸、水培植物。蓝色有助于提升智慧与事业运势，黑色有助于稳定情绪。但水过旺则宜用土属性颜色来平衡。'
        }
    };

    function init() {
        setupToolCards();
        setupBaguaCards();
        setupRoomCards();
        setupColorCards();
    }

    function setupToolCards() {
        const toolCards = document.querySelectorAll('.tool-card');
        const detailContainer = document.getElementById('toolDetail');
        
        toolCards.forEach(card => {
            card.addEventListener('click', () => {
                const tool = card.dataset.tool;
                const detail = toolDetails[tool];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    toolCards.forEach(c => c.style.borderColor = 'rgba(46, 125, 50, 0.3)');
                    card.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    function setupBaguaCards() {
        const baguaItems = document.querySelectorAll('.bagua-item');
        const infoContainer = document.getElementById('baguaInfo');
        
        baguaItems.forEach(item => {
            item.addEventListener('click', () => {
                const element = item.dataset.element;
                const detail = baguaDetails[element];
                
                if (detail && infoContainer) {
                    infoContainer.innerHTML = `
                        <div style="text-align: center;">
                            <h4 style="color: var(--primary-gold); font-size: 1.4rem; margin-bottom: 8px;">${detail.name} - ${detail.attr}</h4>
                            <p style="color: var(--text-light); line-height: 1.8;">${detail.meaning}</p>
                        </div>
                    `;
                    
                    baguaItems.forEach(i => i.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    item.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    function setupRoomCards() {
        const roomCards = document.querySelectorAll('.room-card');
        const detailContainer = document.getElementById('roomDetail');
        
        roomCards.forEach(card => {
            card.addEventListener('click', () => {
                const room = card.dataset.room;
                const detail = roomDetails[room];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    roomCards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    function setupColorCards() {
        const colorCards = document.querySelectorAll('.color-card');
        const detailContainer = document.getElementById('colorDetail');
        
        colorCards.forEach(card => {
            card.addEventListener('click', () => {
                const color = card.dataset.color;
                const detail = colorDetails[color];
                
                if (detail && detailContainer) {
                    detailContainer.innerHTML = `
                        <h4 style="color: var(--primary-gold); margin-bottom: 10px;">${detail.title}</h4>
                        <p style="color: var(--text-light); line-height: 1.8;">${detail.content}</p>
                    `;
                    
                    colorCards.forEach(c => c.style.borderColor = 'rgba(201, 162, 39, 0.2)');
                    card.style.borderColor = 'var(--primary-gold)';
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
