(function() {
    const beastsData = [
        { icon: '🐉', name: '青龙', desc: '东方之神兽，青色鳞甲', detail: '青龙是中国古代神话中的神兽，位于东方，代表春季，属木。主宰着东方的山川河流，是四象之首。' },
        { icon: '🦁', name: '白虎', desc: '西方之神兽，白色毛皮', detail: '白虎是中国古代神话中的神兽，位于西方，代表秋季，属金。主杀伐，有辟邪降魔之能。' },
        { icon: '🦅', name: '朱雀', desc: '南方之神兽，红色羽毛', detail: '朱雀是中国古代神话中的神兽，位于南方，代表夏季，属火。象征祥瑞与美好。' },
        { icon: '🐢', name: '玄武', desc: '北方之神兽，黑色龟甲', detail: '玄武是中国古代神话中的神兽，位于北方，代表冬季，属水。象征长寿与稳重。' },
        { icon: '🦄', name: '麒麟', desc: '仁兽，鹿角牛尾', detail: '麒麟是古代传说中的仁兽，不履生虫，不折生草，象征祥瑞。出现则天下太平。' },
        { icon: '🦌', name: '白泽', desc: '瑞兽，通万物之情', detail: '白泽是古代神话中的瑞兽，能言语，通万物之情。乃神兽之最，知鬼神之事。' },
        { icon: '🦅', name: '凤凰', desc: '百鸟之王，火之精灵', detail: '凤凰是中国古代神话中的百鸟之王，雄为凤，雌为凰。象征吉祥如意，见则天下太平。' },
        { icon: '🦁', name: '狻猊', desc: '龙子，喜烟好坐', detail: '狻猊是龙的第九子，喜烟好坐，常出现在香炉上。形象如狮子，威武庄严。' },
        { icon: '🦎', name: '螭龙', desc: '无角之龙，水之精', detail: '螭龙是无角的龙，传说能飞越江湖。性好险，勇猛无畏。' },
        { icon: '🐺', name: '饕餮', desc: '贪食之兽，羊身人面', detail: '饕餮是古代神话中的贪食之兽，羊身人面，目在腋下。象征贪婪与欲望。' },
        { icon: '🦅', name: '狴犴', desc: '龙子，善讼', detail: '狴犴是龙的第七子，形象如虎，有威力。性好讼，常用于镇守监狱之门。' },
        { icon: '🐟', name: '鲲鹏', desc: '北冥之鱼，化而为鸟', detail: '鲲鹏是古代神话中的巨大生物，化为鹏鸟，翼若垂天之云。象征远大志向。' }
    ];

    const mountainsData = [
        { icon: '🏔️', name: '昆仑山', desc: '万山之祖，神仙居所', detail: '昆仑山是中国古代神话中的神山，为万山之祖。上有建木、珠树、玉树等神物，是神仙居所。' },
        { icon: '⛰️', name: '不周山', desc: '天柱倾倒之地', detail: '不周山是古代神话中的神山，共工触撞而导致天柱倾倒，引发洪水。' },
        { icon: '🏝️', name: '蓬莱山', desc: '海上仙山，仙人居', detail: '蓬莱是古代神话中的海上三仙山之一，方丈、瀛洲、蓬莱，皆有仙人居之。' },
        { icon: '🏔️', name: '方丈山', desc: '海中仙山', detail: '方丈山是东海上的仙山，上有金玉琉璃之宫，仙人所居。' },
        { icon: '🏝️', name: '瀛洲山', desc: '神芝仙草', detail: '瀛洲是古代神话中的仙山，生有神芝仙草，饮之可长生。' },
        { icon: '⛰️', name: '崇山', desc: '刑天葬首之处', detail: '崇山是古代神话中的高山，刑天与帝争神，帝断其首，葬于此山。' },
        { icon: '🏔️', name: '夸父山', desc: '夸父追日', detail: '夸父山是夸父追日时所经之地，传说其杖化为邓林于此。' },
        { icon: '⛰️', name: '首阳山', desc: '伯夷叔齐归隐', detail: '首阳山是伯夷叔齐归隐之处，耻食周粟，采薇而食。' }
    ];

    const herbsData = [
        { icon: '🌿', name: '灵芝', desc: '仙草，能起死回生', detail: '灵芝是古代神话中的仙草，服之能延年益寿，起死回生。极为珍贵。' },
        { icon: '🍄', name: '瑶草', desc: '不死之草', detail: '瑶草是古代神话中的仙草，又名不死草，服之可长生不死。' },
        { icon: '🌸', name: '珠树', desc: '生玉之树', detail: '珠树是昆仑山上的神树，生于玉泉之上，其果实如珠。' },
        { icon: '🌿', name: '建木', desc: '通天神树', detail: '建木是古代神话中的神树，位于昆仑之西，沟通天地。' },
        { icon: '🌱', name: '屈轶', desc: '指佞草', detail: '屈轶是古代神话中的神草，佞人入则屈指，故名指佞草。' },
        { icon: '🍀', name: '三珠树', desc: '赤玉为叶', detail: '三珠树是古代神话中的神树，叶子都是玉，颜色赤如火。' },
        { icon: '🌿', name: '琅玕', desc: '凤鸟所食', detail: '琅玕是古代神话中的仙树，其果实是凤鸟的食物。' },
        { icon: '🌾', name: '不死树', desc: '郭璞注：言饮之不死', detail: '不死树是古代神话中的神树，饮其汁液可长生不死。' }
    ];

    function init() {
        renderBeasts();
        renderMountains();
        renderHerbs();
        setupEventListeners();
    }

    function renderBeasts() {
        const grid = document.getElementById('beastsGrid');
        grid.innerHTML = beastsData.map((b, i) => `
            <div class="beast-card" data-index="${i}" data-type="beast">
                <span class="beast-icon">${b.icon}</span>
                <div class="beast-name">${b.name}</div>
                <div class="beast-desc">${b.desc}</div>
            </div>
        `).join('');
    }

    function renderMountains() {
        const grid = document.getElementById('mountainsGrid');
        grid.innerHTML = mountainsData.map((m, i) => `
            <div class="mountain-card" data-index="${i}" data-type="mountain">
                <span class="mountain-icon">${m.icon}</span>
                <div class="mountain-name">${m.name}</div>
                <div class="mountain-desc">${m.desc}</div>
            </div>
        `).join('');
    }

    function renderHerbs() {
        const grid = document.getElementById('herbsGrid');
        grid.innerHTML = herbsData.map((h, i) => `
            <div class="herb-card" data-index="${i}" data-type="herb">
                <span class="herb-icon">${h.icon}</span>
                <div class="herb-name">${h.name}</div>
                <div class="herb-desc">${h.desc}</div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.getElementById('beastsGrid').addEventListener('click', handleCardClick);
        document.getElementById('mountainsGrid').addEventListener('click', handleCardClick);
        document.getElementById('herbsGrid').addEventListener('click', handleCardClick);

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('detailModal');

        if (modalClose) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    }

    function handleCardClick(e) {
        const card = e.target.closest('[data-index]');
        if (!card) return;

        const index = parseInt(card.dataset.index);
        const type = card.dataset.type;
        showDetail(index, type);
    }

    function showDetail(index, type) {
        let data, title;
        if (type === 'beast') {
            data = beastsData[index];
            title = '神兽';
        } else if (type === 'mountain') {
            data = mountainsData[index];
            title = '奇山';
        } else {
            data = herbsData[index];
            title = '仙草';
        }

        const modal = document.getElementById('detailModal');
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <span class="detail-icon">${data.icon}</span>
            <h2>${data.name}</h2>
            
            <h3>基本介绍</h3>
            <p>${data.desc}</p>
            
            <h3>详细解读</h3>
            <p>${data.detail}</p>
            
            <h3>文化意义</h3>
            <p>${data.name}在中国古代文化中具有重要地位，${generateCulturalMeaning(data.name)}</p>
            
            <div class="source">
                <p>📚 资料来源：《山海经》</p>
                <p>《山海经》是中国古代一部记述山川地理、物产形态、神话传说的奇书。</p>
            </div>
        `;

        modal.classList.add('active');

        if (window.addToHistory) {
            window.addToHistory(`山海经-${data.name}`, '🌊', 'shanhai.html');
        }
    }

    function generateCulturalMeaning(name) {
        const meanings = {
            '青龙': '代表着东方与春季，象征着生发与成长，是四象之首。',
            '白虎': '代表着西方与秋季，象征着肃杀与正义，有辟邪之能。',
            '朱雀': '代表着南方与夏季，象征着祥瑞与美好，是百鸟之王。',
            '玄武': '代表着北方与冬季，象征着稳重与长寿，是龟蛇合体。',
            '麒麟': '是仁德之兽，象征着天下太平，圣人出而麒麟现。',
            '白泽': '是瑞兽之最，通万物之情，知鬼神之事，可辟除一切邪佞。',
            '凤凰': '象征着吉祥如意，国泰民安，是百鸟朝凤之王。',
            '狻猊': '喜烟好坐，常用于香炉装饰，象征威严与庄重。',
            '螭龙': '无角而能飞，象征着自由与勇猛。',
            '饕餮': '象征着贪婪与欲望，也代表着贵族的权威。',
            '狴犴': '性好讼，有威力，常用于镇守司法之门。',
            '鲲鹏': '象征着远大志向，扶摇直上九万里。'
        };
        return meanings[name] || '在中国古代文化中具有独特的地位与意义。';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
