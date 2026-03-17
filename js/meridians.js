(function() {
    const meridiansData = [
        { 
            name: '任脉', 
            chinese: 'Ren Mai', 
            desc: '阴脉之海，总司人体阴经',
            detail: '任脉起于胞中，下出会阴，沿腹部正中线上行至咽喉。统领全身阴经，调节气血，与女子妊娠、月经等密切相关。'
        },
        { 
            name: '督脉', 
            chinese: 'Du Mai', 
            desc: '阳脉之海，总司人体阳经',
            detail: '督脉起于胞中，沿背部正中线上行至巅顶。统领全身阳经，调节大脑、脊髓等神经系统功能。'
        },
        { 
            name: '冲脉', 
            chinese: 'Chong Mai', 
            desc: '血海之脉，十二经之海',
            detail: '冲脉起于胞中，与任督二脉同出会阴后分三支。调节气血，与月经、生殖密切相关。'
        },
        { 
            name: '带脉', 
            chinese: 'Dai Mai', 
            desc: '约束诸经，调养带下',
            detail: '带脉起于季肋，环腰一周。约束纵行诸经，防止气血散溢，对妇科疾病有重要调节作用。'
        },
        { 
            name: '阴跷脉', 
            chinese: 'Yin Qiao Mai', 
            desc: '主司下肢运动与睡眠',
            detail: '阴跷脉起于足跟内侧，沿下肢内侧上行至目内眦。调节下肢运动，与睡眠、情绪相关。'
        },
        { 
            name: '阳跷脉', 
            chinese: 'Yang Qiao Mai', 
            desc: '主司下肢运动与清醒',
            detail: '阳跷脉起于足跟外侧，沿下肢外侧上行至目内眦。调节清醒状态，与失眠、嗜睡相关。'
        },
        { 
            name: '阴维脉', 
            chinese: 'Yin Wei Mai', 
            desc: '维系阴经，调节心胸',
            detail: '阴维脉起于小腿内侧，沿胸腹部上行。维系调节各阴经，与心胸部位疾病相关。'
        },
        { 
            name: '阳维脉', 
            chinese: 'Yang Wei Mai', 
            desc: '维系阳经，调节表证',
            detail: '阳维脉起于小腿外侧，沿颈项部上行。维系调节各阳经，与外感表证、发热相关。'
        }
    ];

    const acupointsData = [
        { name: '关元', location: '脐下3寸', effect: '补肾固本', icon: '⭕' },
        { name: '气海', location: '脐下1.5寸', effect: '调气养气', icon: '⭕' },
        { name: '神阙', location: '脐中央', effect: '回阳救逆', icon: '⭕' },
        { name: '中脘', location: '脐上4寸', effect: '调理脾胃', icon: '⭕' },
        { name: '命门', location: '第二腰椎下', effect: '补肾壮阳', icon: '⭕' },
        { name: '百会', location: '头顶正中', effect: '醒脑开窍', icon: '⭕' },
        { name: '涌泉', location: '足底前1/3', effect: '滋阴降火', icon: '⭕' },
        { name: '足三里', location: '小腿外侧', effect: '调理肠胃', icon: '⭕' }
    ];

    const practiceData = [
        {
            title: '静坐调息',
            steps: [
                '选择一个安静的环境',
                '盘坐或端坐均可',
                '舌抵上腭，意守丹田',
                '呼吸均匀绵长',
                '每次15-30分钟'
            ]
        },
        {
            title: '导引术',
            steps: [
                '晨起面向东方',
                '双手叠放于丹田',
                '顺时针揉腹36圈',
                '逆时针揉腹36圈',
                '配合呼吸节奏'
            ]
        },
        {
            title: '站桩功',
            steps: [
                '双脚与肩同宽',
                '膝盖微屈',
                '双手抱球于胸前',
                '松肩沉肘',
                '保持30分钟'
            ]
        }
    ];

    function init() {
        renderMeridians();
        renderAcupoints();
        renderPractice();
        setupEventListeners();
    }

    function renderMeridians() {
        const grid = document.getElementById('meridiansGrid');
        grid.innerHTML = meridiansData.map((m, i) => `
            <div class="meridian-card" data-index="${i}">
                <div class="meridian-name">${m.name}</div>
                <div class="meridian-chinese">${m.chinese}</div>
                <div class="meridian-desc">${m.desc}</div>
            </div>
        `).join('');
    }

    function renderAcupoints() {
        const list = document.getElementById('acupointsList');
        list.innerHTML = acupointsData.map(a => `
            <div class="acupoint-item">
                <span class="acupoint-icon">${a.icon}</span>
                <div class="acupoint-info">
                    <h4>${a.name}</h4>
                    <p>${a.location} · ${a.effect}</p>
                </div>
            </div>
        `).join('');
    }

    function renderPractice() {
        const cards = document.getElementById('practiceCards');
        cards.innerHTML = practiceData.map(p => `
            <div class="practice-card">
                <h4>${p.title}</h4>
                <ul>
                    ${p.steps.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.getElementById('meridiansGrid').addEventListener('click', handleMeridianClick);

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('meridianModal');

        if (modalClose) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    }

    function handleMeridianClick(e) {
        const card = e.target.closest('.meridian-card');
        if (!card) return;

        const index = parseInt(card.dataset.index);
        showMeridianDetail(index);
    }

    function showMeridianDetail(index) {
        const meridian = meridiansData[index];
        const modal = document.getElementById('meridianModal');
        const modalBody = document.getElementById('modalBody');

        const locations = {
            '任脉': '会阴 → 阴部 → 腹部正中 → 咽喉 → 承浆穴',
            '督脉': '长强 → 背部正中 → 头顶 → 前额 → 龈交穴',
            '冲脉': '胞中 → 会阴 → 腹部 → 胸部 → 咽喉',
            '带脉': '季肋 → 腰部 → 带脉穴 → 归来穴',
            '阴跷脉': '足跟 → 内踝 → 腿部内侧 → 腹部 → 目内眦',
            '阳跷脉': '足跟 → 外踝 → 腿部外侧 → 颈部 → 目内眦',
            '阴维脉': '足跟 → 小腿内侧 → 腹部 → 胸部 → 颈侧',
            '阳维脉': '足跟 → 小腿外侧 → 臀部 → 颈部 → 头顶'
        };

        modalBody.innerHTML = `
            <h2>${meridian.name}</h2>
            <p class="subtitle">${meridian.chinese}</p>
            
            <h3>经脉循行</h3>
            <p>${locations[meridian.name]}</p>
            
            <h3>功能主治</h3>
            <p>${meridian.detail}</p>
            
            <h3>养生建议</h3>
            <p>${generateSuggestion(meridian.name)}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">以上内容仅供了解参考，具体养生治病请咨询专业医师。</p>
            </div>
        `;

        modal.classList.add('active');

        if (window.addToHistory) {
            window.addToHistory(`奇经八脉-${meridian.name}`, '🔆', 'meridians.html');
        }
    }

    function generateSuggestion(name) {
        const suggestions = {
            '任脉': '宜练习静坐调息，每日子时盘坐30分钟，可调节任脉气血。',
            '督脉': '宜早起晒背，每次15分钟，可振奋督脉阳气。',
            '冲脉': '宜保持情绪稳定，避免过度激动，可按摩腹部调理。',
            '带脉': '宜系腰带或束腰，可轻轻敲击带脉穴。',
            '阴跷脉': '宜右侧卧睡眠，可轻轻按摩足底。',
            '阳跷脉': '宜左侧卧睡眠，避免睡前过度兴奋。',
            '阴维脉': '宜练习缓慢深长的呼吸，可调节阴维脉气机。',
            '阳维脉': '宜在清晨活动，可调节阳维脉功能。'
        };
        return suggestions[name] || '保持良好的生活习惯，适当运动调理。';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
