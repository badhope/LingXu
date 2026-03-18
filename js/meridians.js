(function() {
    const meridiansData = [
        { 
            name: '任脉', 
            chinese: 'Ren Mai', 
            desc: '阴脉之海，总司人体阴经',
            detail: '任脉起于胞中，下出会阴，沿腹部正中线上行至咽喉。统领全身阴经，调节气血，与女子妊娠、月经等密切相关。任脉上的重要穴位包括关元、气海、神阙等，常按摩可补肾固本、调养气血。',
            route: '会阴 → 阴部 → 腹部正中 → 咽喉 → 承浆穴',
            suggestion: '宜练习静坐调息，每日子时盘坐30分钟，可调节任脉气血。',
            time: '子时（23:00-01:00）'
        },
        { 
            name: '督脉', 
            chinese: 'Du Mai', 
            desc: '阳脉之海，总司人体阳经',
            detail: '督脉起于胞中，沿背部正中线上行至巅顶。统领全身阳经，调节大脑、脊髓等神经系统功能。督脉上的大椎穴是清热解表的要穴，百会穴则可醒脑开窍。',
            route: '长强 → 背部正中 → 头顶 → 前额 → 龈交穴',
            suggestion: '宜早起晒背，每次15分钟，可振奋督脉阳气。',
            time: '午时（11:00-13:00）'
        },
        { 
            name: '冲脉', 
            chinese: 'Chong Mai', 
            desc: '血海之脉，十二经之海',
            detail: '冲脉起于胞中，与任督二脉同出会阴后分三支。调节气血，与月经、生殖密切相关。冲脉又称为"血海"，是气血汇聚之处，对妇科疾病有重要调节作用。',
            route: '胞中 → 会阴 → 腹部 → 胸部 → 咽喉',
            suggestion: '宜保持情绪稳定，避免过度激动，可按摩腹部调理。',
            time: '卯时（05:00-07:00）'
        },
        { 
            name: '带脉', 
            chinese: 'Dai Mai', 
            desc: '约束诸经，调养带下',
            detail: '带脉起于季肋，环腰一周。约束纵行诸经，防止气血散溢，对妇科疾病有重要调节作用。带脉虚弱会导致腰腹松弛、妇科问题。',
            route: '季肋 → 腰部 → 带脉穴 → 归来穴',
            suggestion: '宜系腰带或束腰，可轻轻敲击带脉穴。',
            time: '辰时（07:00-09:00）'
        },
        { 
            name: '阴维脉', 
            chinese: 'Yin Wei Mai', 
            desc: '维系阴经，调节心胸',
            detail: '阴维脉起于小腿内侧，沿胸腹部上行。维系调节各阴经，与心胸部位疾病相关。阴维脉主司内侧与胸腹的联络。',
            route: '足跟 → 小腿内侧 → 腹部 → 胸部 → 颈侧',
            suggestion: '宜练习缓慢深长的呼吸，可调节阴维脉气机。',
            time: '酉时（17:00-19:00）'
        },
        { 
            name: '阳维脉', 
            chinese: 'Yang Wei Mai', 
            desc: '维系阳经，调节表证',
            detail: '阳维脉起于小腿外侧，沿颈项部上行。维系调节各阳经，与外感表证、发热相关。阳维脉主司外侧与头颈的联络。',
            route: '足跟 → 小腿外侧 → 臀部 → 颈部 → 头顶',
            suggestion: '宜在清晨活动，可调节阳维脉功能。',
            time: '巳时（09:00-11:00）'
        },
        { 
            name: '阴跷脉', 
            chinese: 'Yin Qiao Mai', 
            desc: '主司下肢运动与睡眠',
            detail: '阴跷脉起于足跟内侧，沿下肢内侧上行至目内眦。调节下肢运动，与睡眠、情绪相关。阴跷脉主静，与嗜睡、失眠相关。',
            route: '足跟 → 内踝 → 腿部内侧 → 腹部 → 目内眦',
            suggestion: '宜右侧卧睡眠，可轻轻按摩足底。',
            time: '亥时（21:00-23:00）'
        },
        { 
            name: '阳跷脉', 
            chinese: 'Yang Qiao Mai', 
            desc: '主司下肢运动与清醒',
            detail: '阳跷脉起于足跟外侧，沿下肢外侧上行至目内眦。调节清醒状态，与失眠、嗜睡相关。阳跷脉主动，与失眠、嗜睡相关。',
            route: '足跟 → 外踝 → 腿部外侧 → 颈部 → 目内眦',
            suggestion: '宜左侧卧睡眠，避免睡前过度兴奋。',
            time: '申时（15:00-17:00）'
        }
    ];

    const acupointsData = [
        { 
            name: '关元穴', 
            location: '脐下3寸', 
            effect: '补肾培元，回阳救逆',
            meridian: '任脉',
            usage: '主治元气虚衰、中风脱证、月经不调等。',
            method: '艾灸或按揉，每次10-15分钟'
        },
        { 
            name: '气海穴', 
            location: '脐下1.5寸', 
            effect: '调气补虚，益气固本',
            meridian: '任脉',
            usage: '主治气虚乏力、腹痛泄泻、月经不调等。',
            method: '艾灸或按揉，每次10-15分钟'
        },
        { 
            name: '命门穴', 
            location: '第二腰椎下', 
            effect: '温肾壮阳，强腰固本',
            meridian: '督脉',
            usage: '主治肾阳虚衰、腰膝酸软、阳痿遗精等。',
            method: '艾灸或按揉，每次10-15分钟'
        },
        { 
            name: '大椎穴', 
            location: '第七颈椎下', 
            effect: '清热解表，醒脑开窍',
            meridian: '督脉',
            usage: '主治外感发热、颈项强痛、癫痫等。',
            method: '针刺或按揉，每次5-10分钟'
        },
        { 
            name: '天枢穴', 
            location: '脐旁2寸', 
            effect: '调理肠胃，行气止痛',
            meridian: '足阳明胃经',
            usage: '主治肠胃疾病、腹痛泄泻、月经不调等。',
            method: '按揉或艾灸，每次10-15分钟'
        },
        { 
            name: '阴陵泉', 
            location: '胫骨内侧髁下', 
            effect: '健脾祛湿，化痰止咳',
            meridian: '足太阴脾经',
            usage: '主治脾虚湿盛、水肿痰饮、膝痛等。',
            method: '按揉或针刺，每次5-10分钟'
        }
    ];

    const practiceMethods = [
        {
            name: '打坐冥想',
            icon: '🧘',
            desc: '通过静坐调息，疏通经络，调和气血',
            steps: ['选择安静环境', '盘腿而坐', '闭目调息', '意守丹田', '循序渐进']
        },
        {
            name: '导引术',
            icon: '🤸',
            desc: '结合呼吸与动作，活动筋骨，疏通经络',
            steps: ['八段锦', '五禽戏', '易筋经', '太极拳', '六字诀']
        },
        {
            name: '穴位按摩',
            icon: '💆',
            desc: '按摩特定穴位，疏通经络，调理脏腑',
            steps: ['找准穴位', '按揉力度适中', '每个穴位3-5分钟', '每日坚持', '配合呼吸']
        },
        {
            name: '中药调理',
            icon: '🌿',
            desc: '服用中药，调和气血，疏通经络',
            steps: ['辨证施治', '遵医嘱用药', '注意禁忌', '定期复诊', '调理饮食']
        }
    ];

    const benefitsData = [
        { icon: '💪', title: '强身健体', desc: '疏通经络可增强体质，提高免疫力' },
        { icon: '🧠', title: '益智安神', desc: '调节神经系统，改善睡眠质量' },
        { icon: '❤️', title: '养心护脉', desc: '促进血液循环，保护心血管健康' },
        { icon: '🌿', title: '延年益寿', desc: '调和阴阳，延缓衰老，延年益寿' }
    ];

    function init() {
        setupMeridianCards();
        setupAcupointCards();
        renderPracticeMethods();
        renderBenefits();
        initAnimations();
    }

    function setupMeridianCards() {
        const cards = document.querySelectorAll('.meridian-card');
        const detailContainer = document.getElementById('meridianDetail');
        
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const meridian = meridiansData[index];
                
                if (detailContainer && meridian) {
                    detailContainer.innerHTML = `
                        <div class="detail-content">
                            <h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${meridian.name}</h4>
                            <p style="color: var(--primary-gold); margin-bottom: 10px; font-size: 0.9rem;">${meridian.desc}</p>
                            <div style="margin: 15px 0; padding: 12px; background: rgba(155, 89, 182, 0.1); border-radius: 10px;">
                                <strong style="color: var(--text-light);">循行路线：</strong>
                                <span style="color: var(--text-muted); font-size: 0.9rem;">${meridian.route}</span>
                            </div>
                            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 15px; font-size: 0.95rem;">${meridian.detail}</p>
                            <div style="padding: 12px; background: rgba(201, 162, 39, 0.1); border-radius: 10px; border-left: 3px solid var(--primary-gold);">
                                <strong style="color: var(--primary-gold);">养生建议：</strong>
                                <span style="color: var(--text-muted); font-size: 0.9rem;">${meridian.suggestion}</span>
                                <div style="margin-top: 8px;">
                                    <strong style="color: var(--primary-gold);">最佳时辰：</strong>
                                    <span style="color: var(--text-muted); font-size: 0.9rem;">${meridian.time}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    cards.forEach(c => {
                        c.style.borderColor = 'rgba(155, 89, 182, 0.3)';
                        c.style.transform = 'scale(1)';
                    });
                    card.style.borderColor = 'var(--primary-gold)';
                    card.style.transform = 'scale(1.02)';
                    
                    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }

    function setupAcupointCards() {
        const cards = document.querySelectorAll('.acupoint-card');
        const detailContainer = document.getElementById('acupointDetail');
        
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const point = acupointsData[index];
                
                if (detailContainer && point) {
                    detailContainer.innerHTML = `
                        <div class="detail-content">
                            <h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${point.name}</h4>
                            <div style="display: flex; gap: 20px; margin-bottom: 15px; flex-wrap: wrap;">
                                <span style="padding: 5px 12px; background: rgba(201, 162, 39, 0.1); border-radius: 15px; font-size: 0.85rem; color: var(--primary-gold);">${point.meridian}</span>
                                <span style="padding: 5px 12px; background: rgba(155, 89, 182, 0.1); border-radius: 15px; font-size: 0.85rem; color: var(--text-light);">${point.location}</span>
                            </div>
                            <p style="color: var(--primary-gold); margin-bottom: 10px;"><strong>功效：</strong>${point.effect}</p>
                            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 15px; font-size: 0.95rem;">${point.usage}</p>
                            <div style="padding: 10px; background: rgba(34, 139, 34, 0.1); border-radius: 10px;">
                                <strong style="color: var(--primary-gold);">操作方法：</strong>
                                <span style="color: var(--text-muted); font-size: 0.9rem;">${point.method}</span>
                            </div>
                        </div>
                    `;
                    
                    cards.forEach(c => {
                        c.style.borderColor = 'rgba(201, 162, 39, 0.2)';
                        c.style.transform = 'scale(1)';
                    });
                    card.style.borderColor = 'var(--primary-gold)';
                    card.style.transform = 'scale(1.02)';
                    
                    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }

    function renderPracticeMethods() {
        const container = document.getElementById('practiceMethods');
        if (!container) return;
        
        container.innerHTML = practiceMethods.map(method => `
            <div class="practice-card">
                <div class="practice-icon">${method.icon}</div>
                <h4 class="practice-name">${method.name}</h4>
                <p class="practice-desc">${method.desc}</p>
                <div class="practice-steps">
                    ${method.steps.map((step, i) => `<span class="step">${i + 1}. ${step}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderBenefits() {
        const container = document.getElementById('benefitsList');
        if (!container) return;
        
        container.innerHTML = benefitsData.map(benefit => `
            <div class="benefit-item">
                <div class="benefit-icon">${benefit.icon}</div>
                <div class="benefit-content">
                    <h4>${benefit.title}</h4>
                    <p>${benefit.desc}</p>
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
