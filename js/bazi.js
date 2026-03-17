(function() {
    const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const wuxing = {
        '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
        '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
        '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
        '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
        '戌': '土', '亥': '水'
    };
    const shichen = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

    function init() {
        populateSelects();
        setupEventListeners();
    }

    function populateSelects() {
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        const daySelect = document.getElementById('daySelect');
        const hourSelect = document.getElementById('hourSelect');
        const partnerYear = document.getElementById('partnerYear');
        const partnerMonth = document.getElementById('partnerMonth');
        const partnerDay = document.getElementById('partnerDay');
        const partnerHour = document.getElementById('partnerHour');

        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 80; y <= currentYear; y++) {
            yearSelect.add(new Option(y + '年', y));
            partnerYear.add(new Option(y + '年', y));
        }

        for (let m = 1; m <= 12; m++) {
            monthSelect.add(new Option(m + '月', m));
            partnerMonth.add(new Option(m + '月', m));
        }

        for (let d = 1; d <= 31; d++) {
            daySelect.add(new Option(d + '日', d));
            partnerDay.add(new Option(d + '日', d));
        }

        hourSelect.selectedIndex = Math.floor(Math.random() * 12);
    }

    function setupEventListeners() {
        document.getElementById('analyzeBtn').addEventListener('click', analyzeBazi);
        document.getElementById('matchBtn').addEventListener('click', matchBazi);
    }

    function analyzeBazi() {
        const year = parseInt(document.getElementById('yearSelect').value);
        const month = parseInt(document.getElementById('monthSelect').value);
        const day = parseInt(document.getElementById('daySelect').value);
        const hour = parseInt(document.getElementById('hourSelect').value);
        const gender = document.getElementById('genderSelect').value;

        const loadingSection = document.getElementById('loadingSection');
        const baziResult = document.getElementById('baziResult');
        
        loadingSection.classList.add('active');
        baziResult.style.display = 'none';

        setTimeout(() => {
            const bazi = calculateBazi(year, month, day, hour);
            displayBazi(bazi, gender);
            
            loadingSection.classList.remove('active');
            baziResult.style.display = 'block';
            
            if (window.addToHistory) {
                window.addToHistory('八字命理', '🎯', 'bazi.html');
            }
        }, 1500);
    }

    function calculateBazi(year, month, day, hour) {
        const yearGanIndex = (year - 1984 + 60) % 10;
        const yearZhiIndex = (year - 1984 + 60) % 12;
        
        const baseDate = new Date(1900, 0, 1);
        const birthDate = new Date(year, month - 1, day, hour + 23 - (hour + 1) % 2);
        const days = Math.floor((birthDate - baseDate) / (24 * 60 * 60 * 1000));
        
        const dayGanIndex = (days + 6) % 10;
        const dayZhiIndex = (days + 1) % 12;
        
        const monthZhiIndex = ((month + (year % 12) * 2 + 10) % 12);
        const monthGanIndex = ((dayGanIndex * 2 + month + 4) % 10);
        
        const hourZhiIndex = (hour + 1) % 12;
        const hourGanIndex = ((dayGanIndex * 2 + hour + 2) % 10);

        return {
            year: { gan: tiangan[yearGanIndex], zhi: dizhi[yearZhiIndex] },
            month: { gan: tiangan[monthGanIndex], zhi: dizhi[monthZhiIndex] },
            day: { gan: tiangan[dayGanIndex], zhi: dizhi[dayZhiIndex] },
            hour: { gan: tiangan[hourGanIndex], zhi: dizhi[hourZhiIndex] },
            dayZhu: tiangan[dayGanIndex]
        };
    }

    function displayBazi(bazi, gender) {
        const baziPan = document.getElementById('baziPan');
        const stems = [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan];
        const branches = [bazi.year.zhi, bazi.month.zhi, bazi.day.zhi, bazi.hour.zhi];
        
        const labels = ['年柱', '月柱', '日柱', '时柱'];
        
        baziPan.innerHTML = stems.map((stem, i) => `
            <div class="gan-zhi-box">
                <div class="stem">${stem}</div>
                <div class="branch">${branches[i]}</div>
            </div>
        `).join('');

        const wuxingCounts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
        [...stems, ...branches].forEach(char => {
            if (wuxing[char]) wuxingCounts[wuxing[char]]++;
        });

        const wuxingChart = document.getElementById('wuxingChart');
        const maxCount = Math.max(...Object.values(wuxingCounts), 1);
        
        wuxingChart.innerHTML = Object.entries(wuxingCounts).map(([wx, count]) => `
            <div class="wuxing-item">
                <div class="wuxing-bar">
                    <div class="wuxing-fill ${wx}" style="height: ${(count / maxCount) * 100}%"></div>
                </div>
                <span class="wuxing-name">${wx}</span>
            </div>
        `).join('');

        const dayMasterEl = document.getElementById('dayMaster');
        const totalCount = Object.values(wuxingCounts).reduce((a, b) => a + b, 0);
        const dayWx = wuxing[bazi.dayZhu];
        const dayCount = wuxingCounts[dayWx];
        const strength = Math.round((dayCount / totalCount) * 100);
        
        let strengthText = '偏弱';
        if (strength >= 35) strengthText = '身强';
        else if (strength >= 25) strengthText = '中和';
        
        dayMasterEl.innerHTML = `
            <div class="master-indicator">
                <div class="master-position" style="left: ${strength - 10}%"></div>
            </div>
            <div class="master-text">${bazi.dayZhu}${dayWx}日主 · ${strengthText}</div>
        `;

        const hash = hashCode(`${bazi.year.gan}${bazi.month.gan}${bazi.day.gan}${bazi.hour.gan}`);
        
        document.getElementById('careerAnalysis').textContent = generateCareer(hash, wuxingCounts);
        document.getElementById('wealthAnalysis').textContent = generateWealth(hash, wuxingCounts);
        document.getElementById('loveAnalysis').textContent = generateLove(hash, wuxingCounts, gender);
        document.getElementById('healthAnalysis').textContent = generateHealth(hash, wuxingCounts);
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function generateCareer(hash, wuxing) {
        const careers = [
            '您的事业运势较为平稳，适合在稳定的环境中发展。工作中会遇到赏识您的上司，要好好把握机会。',
            '今年事业上有突破的可能，建议主动承担更多责任。您的能力会得到认可，职位有望提升。',
            '事业运一般，需要付出更多努力才能获得回报。建议与同事保持良好关系，人脉很重要。',
            '创业或独立发展的好时机！您的创意和能力得到发挥，适合开拓新领域。',
            '事业面临一些挑战，但都是成长的机会。保持耐心，困难终将过去。'
        ];
        return careers[hash % careers.length];
    }

    function generateWealth(hash, wuxing) {
        const wealths = [
            '财运亨通，投资理财有望获得收益。但要注意风险，不宜过度投机。',
            '财运平稳，适度消费即可。会有意外的小收入，可以考虑储蓄。',
            '财运一般，需要控制开支。适合稳健型投资，避免高风险项目。',
            '正财稳定，偏财有望。可以尝试一些小额投资，但要及时止损。',
            '财运波动较大，建议保守理财。会有金钱方面的压力，要提前做好规划。'
        ];
        return wealths[hash % wealths.length];
    }

    function generateLove(hash, wuxing, gender) {
        const loves = [
            '爱情运不错，有望遇到理想的对象。单身者可以多参加社交活动。',
            '已有伴侣的关系更加稳定，双方互相信任。单身的您正在走运！',
            '感情方面有些波折，需要多沟通。误会及时解开就好，不必过于在意。',
            '浪漫的邂逅可能发生！本月适合约会，表白成功率较高。',
            '专注于自我提升会更有收获。爱情需要缘分，不必强求。'
        ];
        return loves[hash % loves.length];
    }

    function generateHealth(hash, wuxing) {
        const healths = [
            '身体状况良好，保持规律作息即可。适当运动增强体质。',
            '注意肝胆方面的保养，避免熬夜。饮食清淡为主。',
            '心血管需要关注，尤其是有家族病史的朋友。定期体检很重要。',
            '整体健康运势不错，但要注意肠胃问题。饮食要有规律。',
            '精力充沛，但也要注意休息。过度劳累可能影响状态。'
        ];
        return healths[hash % healths.length];
    }

    function matchBazi() {
        const year = parseInt(document.getElementById('partnerYear').value);
        const month = parseInt(document.getElementById('partnerMonth').value);
        const day = parseInt(document.getElementById('partnerDay').value);
        const hour = parseInt(document.getElementById('partnerHour').value);

        const myBazi = {
            year: document.getElementById('yearSelect').value,
            month: document.getElementById('monthSelect').value,
            day: document.getElementById('daySelect').value
        };

        const partnerBazi = calculateBazi(year, month, day, hour);
        
        const score = calculateMatchScore(myBazi, partnerBazi);
        
        const matchResult = document.getElementById('matchResult');
        matchResult.style.display = 'block';
        
        let desc = '';
        if (score >= 90) {
            desc = '天作之合！你们的八字非常匹配，是天生的一对。相处融洽，互相成就。';
        } else if (score >= 75) {
            desc = '良配！你们在一起会很幸福，虽然偶有小摩擦，但总体很和谐。';
        } else if (score >= 60) {
            desc = '中等缘分。需要双方共同努力包容，才能收获幸福。';
        } else if (score >= 45) {
            desc = '需要磨合。你们的性格有一定差异，需要时间适应。';
        } else {
            desc = '挑战较大。但爱情需要勇气，如果真心相爱也可以克服困难。';
        }
        
        matchResult.innerHTML = `
            <div class="match-score">${score}分</div>
            <p class="match-desc">${desc}</p>
        `;
    }

    function calculateMatchScore(myBazi, partnerBazi) {
        const myDay = myBazi.day;
        const partnerDay = partnerBazi.day.gan;
        
        const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const myIndex = tiangan.indexOf(partnerDay);
        
        const compatibility = [
            [90, 60, 80, 70, 85],
            [60, 90, 70, 80, 65],
            [80, 70, 90, 60, 75],
            [70, 80, 60, 90, 70],
            [85, 65, 75, 70, 90]
        ];
        
        const baseScore = compatibility[myIndex % 5][(myIndex + 3) % 5];
        const randomBonus = Math.floor(Math.random() * 15);
        
        return Math.min(100, baseScore + randomBonus);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
