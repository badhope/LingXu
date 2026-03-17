(function() {
    const utils = {
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}年${month}月${day}日`;
        },
        
        formatLunarDate(date) {
            const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', 
                                '七月', '八月', '九月', '十月', '冬月', '腊月'];
            const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                             '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                             '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
            const d = new Date(date);
            const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
            const month = lunarMonths[Math.floor((dayOfYear - 1) / 30) % 12];
            const day = lunarDays[(dayOfYear - 1) % 30];
            return `${month}${day}`;
        },
        
        getZodiac(year) {
            const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
            return zodiacs[(year - 1900) % 12];
        },
        
        calculateBazi(year, month, day, hour) {
            const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
            const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
            
            const yearStem = heavenlyStems[(year - 4) % 10];
            const yearBranch = earthlyBranches[(year - 4) % 12];
            const monthStem = heavenlyStems[(year * 12 + month + 2) % 10];
            const monthBranch = earthlyBranches[(month + 1) % 12];
            const dayStem = heavenlyStems[(Math.floor(Date.UTC(year, month - 1, day) / 86400000) + 4) % 10];
            const dayBranch = earthlyBranches[(Math.floor(Date.UTC(year, month - 1, day) / 86400000) + 2) % 12];
            const hourBranch = earthlyBranches[Math.floor((hour + 1) / 2) % 12];
            const hourStem = heavenlyStems[(dayStemIndex(dayStem) * 2 + Math.floor((hour + 1) / 2)) % 10];
            
            return {
                year: yearStem + yearBranch,
                month: monthStem + monthBranch,
                day: dayStem + dayBranch,
                hour: hourStem + hourBranch
            };
        },
        
        getElement(stem) {
            const elements = {
                '甲': '木', '乙': '木',
                '丙': '火', '丁': '火',
                '戊': '土', '己': '土',
                '庚': '金', '辛': '金',
                '壬': '水', '癸': '水'
            };
            return elements[stem] || '未知';
        },
        
        saveToStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) {
                console.warn('Storage quota exceeded');
                return false;
            }
        },
        
        getFromStorage(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },
        
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        },
        
        fadeIn(element, duration = 300) {
            element.style.opacity = 0;
            element.style.display = 'block';
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                element.style.opacity = progress;
                if (progress < 1) {
                    window.requestAnimationFrame(animate);
                }
            };
            window.requestAnimationFrame(animate);
        },
        
        fadeOut(element, duration = 300) {
            const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                element.style.opacity = startOpacity * (1 - progress);
                if (progress < 1) {
                    window.requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                }
            };
            window.requestAnimationFrame(animate);
        },
        
        lazyLoad(options = {}) {
            const defaultOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px 50px 0px'
            };
            const config = { ...defaultOptions, ...options };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, config);
            
            return observer;
        }
    };
    
    function dayStemIndex(stem) {
        const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        return stems.indexOf(stem);
    }
    
    if (typeof window !== 'undefined') {
        window.TianJiUtils = utils;
    }
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = utils;
    }
})();
