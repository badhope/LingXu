(function() {
    const lunarData = {
        years: ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸丑', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'],
        months: ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'],
        days: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'],
        zodiacs: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
        hours: ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时']
    };

    const yiList = ['祭祀', '祈福', '开光', '开市', '交易', '立券', '动土', '起基', '修造', '订盟', '纳采', '嫁娶', '安床', '移徙', '入宅', '安香', '出火', '挂匾', '开厕', '修门', '赴任', '会亲友', '求嗣', '上梁', '栽种', '纳畜', '牧养', '开生坟', '入殓', '移柩', '破土', '安葬', '启攒', '求医', '疗病', '针灸', '服药', '驱虫', '扫舍'];
    const jiList = ['嫁娶', '纳采', '订盟', '开市', '交易', '立券', '出货财', '置产', '动土', '起基', '定磉', '开池', '开厕', '破土', '启攒', '修造', '造屋', '竖柱', '上梁', '安门', '作灶', '修饰垣墙', '平治道涂', '馀事勿取'];
    const hourStatus = ['吉', '吉', '凶', '吉', '凶', '凶', '吉', '凶', '凶', '吉', '凶', '吉'];

    function init() {
        const dateInput = document.getElementById('dateInput');
        const queryBtn = document.getElementById('queryBtn');
        const todayBtn = document.getElementById('todayBtn');
        
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        
        queryBtn.addEventListener('click', () => queryCalendar(dateInput.value));
        todayBtn.addEventListener('click', () => {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            queryCalendar(today);
        });
        
        queryCalendar(today);
    }

    function queryCalendar(dateStr) {
        const loadingSection = document.getElementById('loadingSection');
        const calendarResult = document.getElementById('calendarResult');
        
        loadingSection.classList.add('active');
        calendarResult.classList.remove('active');
        
        setTimeout(() => {
            const date = new Date(dateStr);
            const result = calculateCalendar(date);
            displayResult(result);
            
            loadingSection.classList.remove('active');
            calendarResult.classList.add('active');
            
            if (window.addToHistory) {
                window.addToHistory('黄历查询', '📅', 'calendar.html');
            }
        }, 1200);
    }

    function calculateCalendar(date) {
        const timestamp = date.getTime();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        const yearIndex = (year - 1984 + 60) % 60;
        const yearGanZhi = lunarData.years[yearIndex];
        
        const startYear = 1900;
        const startTimestamp = new Date(startYear, 0, 31).getTime();
        const days = Math.floor((timestamp - startTimestamp) / (24 * 60 * 60 * 1000));
        
        const leapMonth = (days - days % 10000) / 10000;
        const monthDays = days % 10000;
        const monthIndex = Math.floor(monthDays / 30) % 12;
        const dayIndex = monthDays % 30;
        
        const lunarYear = year;
        const lunarMonth = lunarData.months[monthIndex];
        const lunarDay = lunarData.days[dayIndex];
        
        const hash = hashCode(`${year}-${month}-${day}`);
        
        const yiCount = 8 + Math.abs(hash) % 10;
        const jiCount = 6 + Math.abs(hash) % 8;
        
        const shuffledYi = shuffleArray([...yiList]);
        const shuffledJi = shuffleArray([...jiList]);
        
        const selectedYi = shuffledYi.slice(0, yiCount);
        const selectedJi = shuffledJi.slice(0, jiCount);
        
        const pengzu = generatePengzu(year, month, day);
        const shensha = generateShensha(hash);
        const jishen = generateJishen(hash);
        const xiongshen = generateXiongshen(hash);
        
        const hours = generateHours(hash);
        
        const zodiacFortunes = generateZodiacFortunes(year, month, day);
        
        return {
            solarDate: `${year}年${month}${day}`,
            lunarDate: `${lunarYear}年${lunarMonth}${lunarDay}`,
            yearGanZhi,
            yi: selectedYi,
            ji: selectedJi,
            pengzu,
            shensha,
            jishen,
            xiongshen,
            hours,
            zodiacFortunes
        };
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function generatePengzu(year, month, day) {
        const ganzhi = lunarData.years[(year - 1984 + 60) % 60];
        const dayZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][day % 12];
        
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        const dayTianGan = tianGan[(day + 1) % 10];
        const dayDiZhi = diZhi[day % 12];
        
        return `${dayTianGan}不${dayDiZhi}针`;
    }

    function generateShensha(hash) {
        const directions = ['东方', '南方', '西方', '北方', '东南方', '西南方', '东北方', '西北方'];
        return directions[Math.abs(hash) % directions.length];
    }

    function generateJishen(hash) {
        const jishens = ['天德', '月德', '天德合', '月德合', '天恩', '天喜', '母仓', '三合', '圣心'];
        return jishens[Math.abs(hash) % jishens.length] + '、' + jishens[(Math.abs(hash) + 3) % jishens.length];
    }

    function generateXiongshen(hash) {
        const xiongshens = ['天贼', '地贼', '血忌', '天牢', '月破', '大耗', '勾陈', '白虎', '朱雀'];
        return xiongshens[Math.abs(hash) % xiongshens.length] + '、' + xiongshens[(Math.abs(hash) + 2) % xiongshens.length];
    }

    function generateHours(hash) {
        return lunarData.hours.map((hour, index) => {
            const zodiac = lunarData.zodiacs[index % 12];
            const status = hourStatus[(index + Math.abs(hash)) % 12];
            return { hour, zodiac, status };
        });
    }

    function generateZodiacFortunes(year, month, day) {
        const hash = hashCode(`${year}-${month}-${day}`);
        
        return lunarData.zodiacs.map((zodiac, index) => {
            const score = 60 + ((hash + index * 7) % 35);
            let status;
            if (score >= 80) status = '大吉';
            else if (score >= 70) status = '吉';
            else if (score >= 55) status = '平';
            else status = '需注意';
            
            return { zodiac, score, status };
        });
    }

    function displayResult(result) {
        document.getElementById('resultDate').textContent = result.solarDate;
        document.getElementById('resultLunar').textContent = `农历${result.lunarDate} · ${result.yearGanZhi}年`;
        
        const yiListEl = document.getElementById('yiList');
        const jiListEl = document.getElementById('jiList');
        
        yiListEl.innerHTML = result.yi.map(item => `<span class="yi-ji-tag">${item}</span>`).join('');
        jiListEl.innerHTML = result.ji.map(item => `<span class="yi-ji-tag">${item}</span>`).join('');
        
        document.getElementById('pengzu').textContent = result.pengzu;
        document.getElementById('shensha').textContent = result.shensha;
        document.getElementById('jishen').textContent = result.jishen;
        document.getElementById('xiongshen').textContent = result.xiongshen;
        
        const hoursGrid = document.getElementById('hoursGrid');
        hoursGrid.innerHTML = result.hours.map(h => `
            <div class="hour-item ${h.status === '吉' ? 'good' : 'bad'}">
                <div class="hour-time">${h.hour}</div>
                <div class="hour-zodiac">${h.zodiac}</div>
                <div class="hour-status">${h.status}</div>
            </div>
        `).join('');
        
        const zodiacRow = document.getElementById('zodiacRow');
        const zodiacIcons = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
        
        zodiacRow.innerHTML = result.zodiacFortunes.map((z, i) => `
            <div class="zodiac-chip">
                <span class="zodiac-chip-icon">${zodiacIcons[i]}</span>
                <span class="zodiac-chip-name">${z.zodiac}</span>
                <span class="zodiac-chip-status ${z.score >= 70 ? 'good' : z.score >= 55 ? 'normal' : 'bad'}">${z.status}</span>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
