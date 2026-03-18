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

    let currentBazi = null;
    let currentGender = null;
    
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
        
        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }
        
        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
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
            currentBazi = bazi;
            currentGender = gender;
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
        const panInfo = document.getElementById('panInfo');
        const stems = [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan];
        const branches = [bazi.year.zhi, bazi.month.zhi, bazi.day.zhi, bazi.hour.zhi];
        
        const labels = ['年柱', '月柱', '日柱', '时柱'];
        
        baziPan.innerHTML = stems.map((stem, i) => `
            <div class="pan-column">
                <span class="pan-label">${labels[i]}</span>
                <span class="pan-gan">${stem}</span>
                <span class="pan-zhi">${branches[i]}</span>
            </div>
        `).join('');
        
        panInfo.innerHTML = `<p>公历 ${new Date().getFullYear()}年 · 农历 ${bazi.year.zhi}${bazi.month.zhi}月 ${bazi.day.zhi}日</p>`;

        const wuxingCounts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
        [...stems, ...branches].forEach(char => {
            if (wuxing[char]) wuxingCounts[wuxing[char]]++;
        });

        const wuxingChart = document.getElementById('wuxingChart');
        const maxCount = Math.max(...Object.values(wuxingCounts), 1);
        
        const wuxingIcons = { 木: '🌲', 火: '🔥', 土: '🏔️', 金: '⚔️', 水: '🌊' };
        
        wuxingChart.innerHTML = Object.entries(wuxingCounts).map(([wx, count]) => `
            <div class="wuxing-item">
                <div class="wuxing-icon">${wuxingIcons[wx]}</div>
                <div class="wuxing-name">${wx}</div>
                <div class="wuxing-count">${count}个</div>
            </div>
        `).join('');

        const wuxingAnalysis = document.getElementById('wuxingAnalysis');
        const dominant = Object.entries(wuxingCounts).sort((a, b) => b[1] - a[1])[0];
        const weak = Object.entries(wuxingCounts).sort((a, b) => a[1] - b[1])[0];
        wuxingAnalysis.innerHTML = `<p>您的八字中${dominant[0]}气最旺(${dominant[1]}个)，${weak[0]}气较弱(${weak[1]}个)。${getWuxingBalanceAdvice(dominant[0], weak[0])}</p>`;

        const dayMasterEl = document.getElementById('dayMaster');
        const totalCount = Object.values(wuxingCounts).reduce((a, b) => a + b, 0);
        const dayWx = wuxing[bazi.dayZhu];
        const dayCount = wuxingCounts[dayWx];
        const strength = Math.round((dayCount / totalCount) * 100);
        
        let strengthText = '偏弱';
        let strengthClass = 'weak';
        if (strength >= 35) { strengthText = '身强'; strengthClass = 'strong'; }
        else if (strength >= 25) { strengthText = '中和'; strengthClass = 'balanced'; }
        
        dayMasterEl.innerHTML = `
            <div class="day-master-strength ${strengthClass}">${bazi.dayZhu}${dayWx}日主 · ${strengthText}</div>
            <p class="day-master-desc">${getDayMasterDetail(bazi.dayZhu, dayWx, strength)}</p>
        `;

        const hash = hashCode(`${bazi.year.gan}${bazi.month.gan}${bazi.day.gan}${bazi.hour.gan}`);
        
        const careerScore = 60 + (hash % 35);
        const wealthScore = 55 + ((hash * 2) % 40);
        const loveScore = 50 + ((hash * 3) % 45);
        const healthScore = 65 + ((hash * 4) % 30);
        
        document.getElementById('careerScore').innerHTML = `<span class="score-value">${careerScore}</span><span class="score-unit">分</span>`;
        document.getElementById('wealthScore').innerHTML = `<span class="score-value">${wealthScore}</span><span class="score-unit">分</span>`;
        document.getElementById('loveScore').innerHTML = `<span class="score-value">${loveScore}</span><span class="score-unit">分</span>`;
        document.getElementById('healthScore').innerHTML = `<span class="score-value">${healthScore}</span><span class="score-unit">分</span>`;
        
        document.getElementById('careerAnalysis').textContent = generateCareer(hash, wuxingCounts);
        document.getElementById('wealthAnalysis').textContent = generateWealth(hash, wuxingCounts);
        document.getElementById('loveAnalysis').textContent = generateLove(hash, wuxingCounts, gender);
        document.getElementById('healthAnalysis').textContent = generateHealth(hash, wuxingCounts);
        
        const personalityTags = document.getElementById('personalityTags');
        personalityTags.innerHTML = generatePersonalityTags(bazi, hash).map(tag => 
            `<span class="personality-tag">${tag}</span>`
        ).join('');
    }

    function getWuxingBalanceAdvice(dominant, weak) {
        const advice = {
            '木': '木旺之人性格仁慈，但需注意肝胆健康。宜从事与木相关的行业。',
            '火': '火旺之人热情开朗，但需注意心脏健康。宜从事与火相关的行业。',
            '土': '土旺之人稳重踏实，但需注意脾胃健康。宜从事与土相关的行业。',
            '金': '金旺之人果断刚毅，但需注意肺部健康。宜从事与金相关的行业。',
            '水': '水旺之人聪慧灵活，但需注意肾脏健康。宜从事与水相关的行业。'
        };
        return advice[dominant] || '';
    }

    function getDayMasterDetail(gan, wx, strength) {
        const details = {
            '甲': '甲木为阳木，如参天大树。您性格正直，有领导才能，适合发展事业。',
            '乙': '乙木为阴木，如花草藤蔓。您性格温和，富有艺术气质，适合创意行业。',
            '丙': '丙火为阳火，如太阳之光。您性格热情开朗，适合需要表达的工作。',
            '丁': '丁火为阴火，如灯烛之光。您性格细腻，善于洞察人心，适合分析类工作。',
            '戊': '戊土为阳土，如高山厚土。您性格稳重踏实，适合管理类工作。',
            '己': '己土为阴土，如田园沃土。您性格包容，适合协调类工作。',
            '庚': '庚金为阳金，如刀剑锋金。您性格刚毅果断，适合金融或法律工作。',
            '辛': '辛金为阴金，如珠玉首饰。您性格细腻，适合艺术或设计工作。',
            '壬': '壬水为阳水，如江河奔流。您性格豁达，适合需要创新思维的工作。',
            '癸': '癸水为阴水，如雨露温泉。您性格柔和，适合服务类工作。'
        };
        return details[gan] || '八字命理，奥妙无穷。';
    }

    function generatePersonalityTags(bazi, hash) {
        const tags = [];
        const personalities = [
            '稳重踏实', '热情开朗', '聪慧机敏', '温柔细腻', '果断坚毅',
            '乐观积极', '内向含蓄', '艺术气质', '领导才能', '分析能力',
            '创意丰富', '执行力强', '善于沟通', '独立自主', '责任感强'
        ];
        
        const tagCount = 5 + (hash % 4);
        const usedIndices = new Set();
        
        for (let i = 0; i < tagCount; i++) {
            let idx = (hash + i * 7) % personalities.length;
            while (usedIndices.has(idx)) {
                idx = (idx + 1) % personalities.length;
            }
            usedIndices.add(idx);
            tags.push(personalities[idx]);
        }
        
        return tags;
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

    function showExpandedDetails() {
        if (!currentBazi) return;
        
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        const bazi = currentBazi;
        const gender = currentGender;
        
        const dayGan = bazi.day.gan;
        const dayZhi = bazi.day.zhi;
        const wuxingDay = wuxing[dayGan];
        
        const stems = [bazi.year.gan, bazi.month.gan, bazi.day.gan, bazi.hour.gan];
        const branches = [bazi.year.zhi, bazi.month.zhi, bazi.day.zhi, bazi.hour.zhi];
        
        const wuxingCounts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
        [...stems, ...branches].forEach(char => {
            if (wuxing[char]) wuxingCounts[wuxing[char]]++;
        });

        const dayMasterStrength = calculateDayMasterStrength(wuxingCounts, wuxingDay);
        const dayMasterDesc = getDayMasterDescription(dayGan, dayMasterStrength);
        const careerAnalysis = getDetailedCareerAnalysis(dayGan, dayMasterStrength, wuxingCounts);
        const wealthAnalysis = getDetailedWealthAnalysis(dayGan, dayMasterStrength, wuxingCounts);
        const loveAnalysis = getDetailedLoveAnalysis(dayGan, dayMasterStrength, gender);
        const healthAnalysis = getDetailedHealthAnalysis(dayGan, wuxingCounts);
        const lifeStages = getLifeStageAnalysis(bazi, gender);
        const warnings = getBaziWarnings(bazi, dayMasterStrength);

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🎯 命盘核心解读</h3>
                <div class="analysis-block">
                    <p><span class="highlight">日主：</span>${dayGan}（${wuxingDay}性）</p>
                    <p>您的八字为：${bazi.year.gan}${bazi.year.zhi} ${bazi.month.gan}${bazi.month.zhi} ${bazi.day.gan}${bazi.day.zhi} ${bazi.hour.gan}${bazi.hour.zhi}</p>
                    <p class="section-title">日主强弱分析</p>
                    <p>${dayMasterDesc}</p>
                    <p class="section-title">五行分布</p>
                    <p>木：${wuxingCounts['木']}个 | 火：${wuxingCounts['火']}个 | 土：${wuxingCounts['土']}个 | 金：${wuxingCounts['金']}个 | 水：${wuxingCounts['水']}个</p>
                    <p>${getWuxingBalanceAnalysis(wuxingCounts)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>💼 事业财富深度分析</h3>
                <div class="analysis-block">
                    ${careerAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>💰 财运详细解读</h3>
                <div class="analysis-block">
                    ${wealthAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>❤️ 感情婚姻全面分析</h3>
                <div class="analysis-block">
                    ${loveAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>🏥 健康养生专业指导</h3>
                <div class="analysis-block">
                    ${healthAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>📈 人生各阶段运势</h3>
                <div class="analysis-block">
                    ${lifeStages}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 命理注意事项</h3>
                <div class="analysis-block">
                    ${warnings}
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 改运建议</h3>
                <div class="analysis-block">
                    <p class="section-title">颜色调运</p>
                    <p>${getColorAdvice(wuxingCounts)}</p>
                    <p class="section-title">数字调运</p>
                    <p>${getNumberAdvice(dayGan)}</p>
                    <p class="section-title">方位调运</p>
                    <p>${getDirectionAdvice(dayGan, wuxingCounts)}</p>
                    <p class="section-title">职业建议</p>
                    <p>${getCareerSuggestion(dayGan, wuxingCounts)}</p>
                </div>
            </div>
        `;
        
        expandedDetails.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            if (expandedDetails) {
                expandedDetails.animate([
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
            }
        }, 10);
    }

    function hideExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        if (!expandedDetails) return;
        
        expandedDetails.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(30px)' }
        ], {
            duration: 400,
            easing: 'ease-in'
        }).onfinish = () => {
            expandedDetails.style.display = 'none';
            document.body.style.overflow = '';
        };
    }

    function calculateDayMasterStrength(wuxingCounts, wuxingDay) {
        let strength = 50;
        
        const dayWuxing = wuxingDay;
        strength += wuxingCounts[dayWuxing] * 10;
        
        const generating = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const controlling = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };
        
        strength += wuxingCounts[generating[dayWuxing]] * 5;
        strength -= wuxingCounts[controlling[dayWuxing]] * 5;
        
        return Math.max(0, Math.min(100, strength));
    }

    function getDayMasterDescription(gan, strength) {
        const descriptions = {
            '甲': strength > 60 ? '甲木参天，脱胎要火。春不容金，秋不容土。' : '甲木为阳木，代表参天大树，性格刚直不阿。',
            '乙': strength > 60 ? '乙木生旺，柔中带刚。' : '乙木为阴木，如藤蔓花草，性格柔和。',
            '丙': strength > 60 ? '丙火猛烈，欺霜侮雪。能煅庚金，逢辛反怯。' : '丙火为阳火，如太阳般热情外向。',
            '丁': strength > 60 ? '丁火柔中，烛照万物。无甲得以养身。' : '丁火为阴火，如灯火般温和内敛。',
            '戊': strength > 60 ? '戊土固重，既中且正。静翕动辟，万物司命。' : '戊土为阳土，如高山大地稳重。',
            '己': strength > 60 ? '己土卑湿，中正蓄藏。不愁木盛，不畏水狂。' : '己土为阴土，如田园沃土包容。',
            '庚': strength > 60 ? '庚金顽钝，锻炼oling。' : '庚金为阳金，如刀斧般刚健。',
            '辛': strength > 60 ? '辛金软弱，清润可观。' : '辛金为阴金，如珠玉般精美。',
            '壬': strength > 60 ? '壬水通河，能泄金气。' : '壬水为阳水，如江河般奔流。',
            '癸': strength > 60 ? '癸水至弱，润物无声。' : '癸水为阴水，如雨露般滋润。'
        };
        return descriptions[gan] || '';
    }

    function getWuxingBalanceAnalysis(counts) {
        const total = counts['木'] + counts['火'] + counts['土'] + counts['金'] + counts['水'];
        const imbalances = [];
        
        const avg = total / 5;
        
        for (const [wx, count] of Object.entries(counts)) {
            if (count > avg + 1) imbalances.push(`${wx}过旺`);
            if (count < avg - 1) imbalances.push(`${wx}偏弱`);
        }
        
        if (imbalances.length === 0) return '五行分布较为均衡，格局不错。';
        return `五行${imbalances.join('、')}，需要注意调养。`;
    }

    function getDetailedCareerAnalysis(gan, strength, counts) {
        let analysis = `<p><span class="highlight">日主强度：</span>${strength}%</p>`;
        
        const careerWuxing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        
        const careerElement = careerWuxing[gan];
        const careerScore = counts[careerElement] * 15 + (strength > 50 ? 20 : 0);
        
        analysis += `<p>您的八字中${careerElement}属性较强，<span class="${careerScore >= 70 ? 'positive' : 'negative'}">${careerScore >= 70 ? '适合' : '较适合'}</span>从事与${careerElement}相关的行业。</p>`;
        
        const suitable = {
            '甲': '木业、家具、纺织、教育、文化出版',
            '乙': '园艺、花卉、艺术、设计、服务业',
            '丙': '能源、电力、电子、互联网、传媒',
            '丁': '餐饮、服务、照明、电子、演艺',
            '戊': '房地产、建筑、农业、矿产、陶瓷',
            '己': '农业、房地产、仓储、护理、服务',
            '庚': '金属、机械、交通、金融、法律',
            '辛': '金融、珠宝、装饰、医疗、审计',
            '壬': '物流、运输、水利、航海、旅游',
            '癸': '水利、农业、饮料、卫生、演艺'
        };
        
        analysis += `<p class="section-title">适合职业</p>`;
        analysis += `<p>${suitable[gan]}</p>`;
        
        return analysis;
    }

    function getDetailedWealthAnalysis(gan, strength, counts) {
        let analysis = '';
        
        const wealthElements = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        
        const wealthEl = wealthElements[gan];
        const wealthScore = Math.min(100, counts[wealthEl] * 12 + (strength > 50 ? 15 : 0) + 30);
        
        analysis += `<p><span class="highlight">财富指数：</span>${wealthScore}分</p>`;
        
        if (wealthScore >= 75) {
            analysis += `<p>您的先天财运极佳，具备富命潜质。善于理财，投资眼光独到。但需注意财不外露，避免小人算计。</p>`;
        } else if (wealthScore >= 55) {
            analysis += `<p>您的财运属于中等水平，需要通过努力工作获得财富。理财方面宜稳健，不宜投机取巧。</p>`;
        } else {
            analysis += `<p>先天财运较弱，需要靠后天努力积累财富。建议稳扎稳打，不宜进行高风险投资。守成为主。</p>`;
        }
        
        analysis += `<p class="section-title">求财方向</p>`;
        const directions = {
            '甲': '东方、东南', '乙': '东方、东南', '丙': '南方',
            '丁': '南方', '戊': '西南、东北', '己': '西南、东北',
            '庚': '西方、西北', '辛': '西方、西北', '壬': '北方',
            '癸': '北方'
        };
        analysis += `<p>${directions[gan]}</p>`;
        
        return analysis;
    }

    function getDetailedLoveAnalysis(gan, strength, gender) {
        let analysis = '';
        
        const loveStars = {
            '甲': '红鸾星',
            '乙': '天喜星',
            '丙': '桃花星',
            '丁': '咸池星',
            '戊': '天德星',
            '己': '月德星',
            '庚': '天禧星',
            '辛': '红艳星',
            '壬': '天姚星',
            '癸': '玉女星'
        };
        
        const loveScore = strength > 50 ? 70 + (strength - 50) / 2 : strength + 20;
        
        analysis += `<p><span class="highlight">感情指数：</span>${Math.min(100, Math.floor(loveScore))}分</p>`;
        analysis += `<p>您命带<span class="highlight">${loveStars[gan]}</span>，${gender === 'male' ? '对感情主动积极' : '感情丰富细腻'}。</p>`;
        
        if (gender === 'male') {
            analysis += `<p class="section-title">理想伴侣</p>`;
            analysis += `<p>${getMaleIdealPartner(gan)}</p>`;
        } else {
            analysis += `<p class="section-title">理想伴侣</p>`;
            analysis += `<p>${getFemaleIdealPartner(gan)}</p>`;
        }
        
        return analysis;
    }

    function getMaleIdealPartner(gan) {
        const partners = {
            '甲': '宜找属鼠、属牛、属蛇、属鸡的女性。',
            '乙': '宜找属鼠、属蛇、属马、属狗的女性。',
            '丙': '宜找属虎、属兔、属羊、属猪的女性。',
            '丁': '宜找属牛、属龙、属蛇、属鸡的女性。',
            '戊': '宜找属鼠、属牛、属蛇、属猴的女性。',
            '己': '宜找属鼠、属牛、属虎、属兔、属鸡的男性。',
            '庚': '宜找属鼠、属虎、属兔、属羊、属猪的女性。',
            '辛': '宜找属鼠、属虎、属兔、龙、属狗的女性。',
            '壬': '宜找属牛、属兔、属蛇、属羊、属狗的女性。',
            '癸': '宜找属虎、属兔、属蛇、属马、属狗的女性。'
        };
        return partners[gan] || '';
    }

    function getFemaleIdealPartner(gan) {
        const partners = {
            '甲': '宜找属牛、属龙、属蛇、属狗的男性。',
            '乙': '宜找属鼠、属虎、属蛇、属马的男性。',
            '丙': '宜找属鼠、属牛、属虎、属猪的男性。',
            '丁': '宜找属虎、属兔、属马、属狗的男性。',
            '戊': '宜找属鼠、属牛、属虎、属蛇、属鸡的男性。',
            '己': '宜找属鼠、牛、属虎、属兔、属鸡的男性。',
            '庚': '宜找属鼠、属牛、属龙、属蛇、属羊的男性。',
            '辛': '宜找属鼠、牛、属龙、属蛇、属狗的男性。',
            '壬': '宜找属兔、属蛇、属羊、属鸡的男性。',
            '癸': '宜找属虎、属兔、属马、属鸡的男性。'
        };
        return partners[gan] || '';
    }

    function getDetailedHealthAnalysis(gan, counts) {
        let analysis = '';
        
        const bodyParts = {
            '甲': '肝胆、头部、神经系统',
            '乙': '肝胆、颈部、手足',
            '丙': '心脏、眼睛、血液系统',
            '丁': '心脏、血液、眼睛',
            '戊': '脾胃、消化系统、皮肤',
            '己': '脾胃、免疫系统',
            '庚': '大肠、骨骼、呼吸系统',
            '辛': '肺、呼吸系统、牙齿',
            '壬': '膀胱、泌尿系统、血液',
            '癸': '肾、泌尿系统、耳朵'
        };
        
        analysis += `<p><span class="highlight">先天较弱部位：</span>${bodyParts[gan]}</p>`;
        
        const weakElements = [];
        const minCount = Math.min(...Object.values(counts));
        for (const [wx, count] of Object.entries(counts)) {
            if (count === minCount) weakElements.push(wx);
        }
        
        analysis += `<p class="section-title">需要调养的五行</p>`;
        analysis += `<p>${weakElements.join('、')}偏弱，建议通过饮食或运动进行调养。</p>`;
        
        analysis += `<p class="section-title">养生建议</p>`;
        const养生 = {
            '甲': '保持情绪稳定，适当运动有助于肝气疏通。',
            '乙': '注意休息，保护肝脏，少饮酒。',
            '丙': '午时（11-13点）适当休息，保护心脏。',
            '丁': '避免情绪激动，保持充足睡眠。',
            '戊': '注意饮食规律，少食生冷。',
            '己': '注意脾胃保养，饮食有节。',
            '庚': '秋季注意呼吸系统保养。',
            '辛': '秋季养肺，少吸烟。',
            '壬': '冬季注意保暖，多喝水。',
            '癸': '冬季养肾，避免过度劳累。'
        };
        analysis += `<p>${养生[gan]}</p>`;
        
        return analysis;
    }

    function getLifeStageAnalysis(bazi, gender) {
        let analysis = '';
        
        const yearZhi = bazi.year.zhi;
        const monthZhi = bazi.month.zhi;
        
        analysis += `<p class="section-title">早年运（1-20岁）</p>`;
        analysis += `<p>${getEarlyLifeAnalysis(yearZhi)}</p>`;
        
        analysis += `<p class="section-title">青年运（21-40岁）</p>`;
        analysis += `<p>${getYoungLifeAnalysis(monthZhi)}</p>`;
        
        analysis += `<p class="section-title">中年运（41-60岁）</p>`;
        analysis += `<p>${getMidLifeAnalysis(bazi.day.zhi)}</p>`;
        
        analysis += `<p class="section-title">晚年运（61岁以后）</p>`;
        analysis += `<p>${getLateLifeAnalysis(bazi.hour.zhi)}</p>`;
        
        return analysis;
    }

    function getEarlyLifeAnalysis(zhi) {
        const analyses = {
            '子': '早年聪明伶俐，但可能与父母缘分较浅，需长辈呵护培养。',
            '丑': '早年生活较为艰辛，但能磨练意志，终有出头之日。',
            '寅': '早年活泼好动，聪明过人，但需注意安全。',
            '卯': '早年体质较弱，但聪明可爱，深得长辈喜爱。',
            '辰': '早年生活平稳福气，适合在稳定环境中成长。',
            '巳': '早年聪慧过人，学习能力强，但可能较为顽皮。',
            '午': '早年精力旺盛，活泼好动，需要正确引导。',
            '未': '早年性格温和，人缘不错，适合群体生活。',
            '申': '早年聪明好动，适合学习新事物，接受新观念。',
            '酉': '早年气质出众，但可能过于追求完美。',
            '戌': '早年忠厚老实，人缘不错，但需防小人。',
            '亥': '早年聪明善良，但体质较弱，需多加照顾。'
        };
        return analyses[zhi] || '早年运势平稳。';
    }

    function getYoungLifeAnalysis(zhi) {
        const analyses = {
            '子': '青年时期运势上升期，利于学业和事业发展。',
            '丑': '青年时期需要稳扎稳打，不宜冒进。',
            '寅': '青年时期事业心强，有望成就一番事业。',
            '卯': '青年时期人际关系佳，利于合作发展。',
            '辰': '青年时期福气深厚，生活较为顺利。',
            '巳': '青年时期思维活跃，适合创新发展。',
            '午': '青年时期热情洋溢，行动力强。',
            '未': '青年时期注重积累，为未来打下基础。',
            '申': '青年时期适应力强，适合外出发展。',
            '酉': '青年时期注重品质，追求卓越。',
            '戌': '青年时期为人正直，人缘不错。',
            '亥': '青年时期思想深邃，适合学术研究。'
        };
        return analyses[zhi] || '青年时期运势平稳。';
    }

    function getMidLifeAnalysis(zhi) {
        const analyses = {
            '子': '中年时期事业有成，财运亨通。',
            '丑': '中年时期需要保守经营，稳步前进。',
            '寅': '中年时期领导能力突出，有升职机会。',
            '卯': '中年时期人脉广泛，利于合作。',
            '辰': '中年时期财运稳定，生活富足。',
            '巳': '中年时期思维成熟，适合做重大决策。',
            '午': '中年时期运势旺盛，适合开拓创新。',
            '未': '中年时期注重积累，财富稳步增长。',
            '申': '中年时期适合转型或创业。',
            '酉': '中年时期事业达到高峰，名利双收。',
            '戌': '中年时期人际关系成熟稳定。',
            '亥': '中年时期智慧圆融，名望提升。'
        };
        return analyses[zhi] || '中年时期运势平稳。';
    }

    function getLateLifeAnalysis(zhi) {
        const analyses = {
            '子': '晚年福气深厚，子女孝顺。',
            '丑': '晚年生活安稳，儿孙满堂。',
            '寅': '晚年仍可发挥余热，指导后辈。',
            '卯': '晚年生活悠闲，享受天伦之乐。',
            '辰': '晚年财运稳定，生活富足。',
            '巳': '晚年智慧深邃，受人敬仰。',
            '午': '晚年仍保持活力，心态年轻。',
            '未': '晚年家庭和睦，生活幸福。',
            '申': '晚年可周游四方，体验生活。',
            '酉': '晚年注重精神修养，生活充实。',
            '戌': '晚年德高望重，受人尊重。',
            '亥': '晚年福报深厚，安享晚年。'
        };
        return analyses[zhi] || '晚年时期运势平稳。';
    }

    function getBaziWarnings(bazi, strength) {
        let warnings = '';
        
        if (strength < 40) {
            warnings += `<div class="warning-box"><p>⚠️ 日主偏弱，需要注意保养身体，避免过度劳累。</p></div>`;
        }
        
        const yearZhi = bazi.year.zhi;
        const zodiacWarnings = {
            '子': '<p>属鼠者需注意头部健康，避免用脑过度。</p>',
            '丑': '<p>属牛者需注意脾胃健康，饮食规律。</p>',
            '寅': '<p>属虎者需注意肝胆健康，保持情绪稳定。</p>',
            '卯': '<p>属兔者需注意呼吸系统健康。</p>',
            '辰': '<p>属龙者需注意心脏健康，避免激动。</p>',
            '巳': '<p>属蛇者需注意消化系统，饮食有节。</p>',
            '午': '<p>属马者需注意心血管健康。</p>',
            '未': '<p>属羊者需注意皮肤健康。</p>',
            '申': '<p>属猴者需注意神经系统的调养。</p>',
            '酉': '<p>属鸡者需注意呼吸系统，早晚保暖。</p>',
            '戌': '<p>属狗者需注意关节健康，避免受凉。</p>',
            '亥': '<p>属猪者需注意泌尿系统健康。</p>'
        };
        
        warnings += zodiacWarnings[yearZhi] || '';
        
        if (!warnings) {
            warnings = '<p>八字命理无特殊忌讳，保持良好生活习惯即可。</p>';
        }
        
        return warnings;
    }

    function getColorAdvice(counts) {
        const minWuxing = Object.entries(counts).sort((a, b) => a[1] - b[1])[0][0];
        const colorMap = {
            '木': '绿色、青色',
            '火': '红色、紫色',
            '土': '黄色、棕色',
            '金': '白色、金色',
            '水': '黑色、蓝色'
        };
        return `宜穿戴${colorMap[minWuxing]}颜色的衣物，可起到平衡五行、提升运势的作用。`;
    }

    function getNumberAdvice(gan) {
        const numbers = {
            '甲': '3、8',
            '乙': '2、7',
            '丙': '1、6',
            '丁': '1、6',
            '戊': '5、10',
            '己': '5、10',
            '庚': '4、9',
            '辛': '4、9',
            '壬': '1、6',
            '癸': '1、6'
        };
        return `您的幸运数字为${numbers[gan]}，日常生活中可多使用这些数字。`;
    }

    function getDirectionAdvice(gan, counts) {
        const directions = {
            '甲': '东方、东南',
            '乙': '东方、东南',
            '丙': '南方',
            '丁': '南方',
            '戊': '西南、东北',
            '己': '西南、东北',
            '庚': '西方、西北',
            '辛': '西方、西北',
            '壬': '北方',
            '癸': '北方'
        };
        
        let advice = `最有利的发展方向为${directions[gan]}。`;
        
        const minWuxing = Object.entries(counts).sort((a, b) => a[1] - b[1])[0][0];
        const dirMap = { '木': '东', '火': '南', '土': '西南', '金': '西', '水': '北' };
        
        advice += `由于${minWuxing}偏弱，也应注意${dirMap[minWuxing]}方向的发展。`;
        
        return advice;
    }

    function getCareerSuggestion(gan, counts) {
        const careers = {
            '甲': '适合从事教育、文化、木业、服装、纺织等行业。',
            '乙': '适合从事艺术、设计、服务业、花卉园林等行业。',
            '丙': '适合从事能源、电子、互联网、传媒、餐饮等行业。',
            '丁': '适合从事服务行业、演艺事业、餐饮、照明等行业。',
            '戊': '适合从事房地产、建筑、农业、矿产、陶瓷等行业。',
            '己': '适合从事农业、服务业、护理、房地产等行业。',
            '庚': '适合从事金属、机械、交通、金融、法律等行业。',
            '辛': '适合从事金融、珠宝、医疗、审计、设计等行业。',
            '壬': '适合从事物流、运输、水利、旅游、贸易等行业。',
            '癸': '适合从事水利、农业、饮料、卫生、教育等行业。'
        };
        return careers[gan] || '';
    }
})();
