const TianJiUtils = {
    STORAGE_PREFIX: 'tianji_',
    
    storage: {
        get(key) {
            try {
                const data = localStorage.getItem(TianJiUtils.STORAGE_PREFIX + key);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.warn('Storage get error:', e);
                return null;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(TianJiUtils.STORAGE_PREFIX + key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('Storage set error:', e);
                return false;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(TianJiUtils.STORAGE_PREFIX + key);
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    
    animations: {
        initFadeIn(options = {}) {
            const { threshold = 0.1, delayMultiplier = 200 } = options;
            const fadeElements = document.querySelectorAll('.fade-in');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const delay = entry.target.style.getPropertyValue('--delay') || '0';
                            setTimeout(() => {
                                entry.target.classList.add('visible');
                            }, parseFloat(delay) * delayMultiplier);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold });
                
                fadeElements.forEach(el => observer.observe(el));
            } else {
                fadeElements.forEach(el => el.classList.add('visible'));
            }
        },
        
        addHoverEffect(selector, options = {}) {
            const { scale = 1.02, shadow = '0 10px 30px rgba(201, 162, 39, 0.3)' } = options;
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    el.style.transform = `translateY(-5px) scale(${scale})`;
                    el.style.boxShadow = shadow;
                });
                
                el.addEventListener('mouseleave', () => {
                    el.style.transform = '';
                    el.style.boxShadow = '';
                });
            });
        }
    },
    
    dom: {
        $(selector) {
            return document.querySelector(selector);
        },
        
        $$(selector) {
            return document.querySelectorAll(selector);
        },
        
        create(tag, options = {}) {
            const el = document.createElement(tag);
            if (options.className) el.className = options.className;
            if (options.id) el.id = options.id;
            if (options.innerHTML) el.innerHTML = options.innerHTML;
            if (options.textContent) el.textContent = options.textContent;
            if (options.style) Object.assign(el.style, options.style);
            if (options.attributes) {
                Object.entries(options.attributes).forEach(([key, value]) => {
                    el.setAttribute(key, value);
                });
            }
            return el;
        },
        
        scrollToElement(element, options = {}) {
            const { behavior = 'smooth', block = 'nearest' } = options;
            if (element) {
                element.scrollIntoView({ behavior, block });
            }
        }
    },
    
    events: {
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
        }
    },
    
    format: {
        date(date, format = 'YYYY-MM-DD') {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            
            return format
                .replace('YYYY', year)
                .replace('MM', month)
                .replace('DD', day);
        },
        
        number(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },
    
    validation: {
        isValidDate(dateStr) {
            const date = new Date(dateStr);
            return date instanceof Date && !isNaN(date);
        },
        
        isEmpty(value) {
            return value === null || value === undefined || value === '';
        }
    },
    
    cards: {
        setupClickFeedback(cards, detailContainer, dataMap, options = {}) {
            const { 
                borderColor = 'var(--primary-gold)',
                defaultBorderColor = 'rgba(201, 162, 39, 0.2)',
                scrollIntoView = true
            } = options;
            
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const key = card.dataset.key || card.dataset.festival || card.dataset.meridian || 
                                card.dataset.element || card.dataset.custom || card.dataset.beast ||
                                card.dataset.theory || card.dataset.point;
                    const detail = dataMap[key];
                    
                    if (detailContainer && detail) {
                        detailContainer.innerHTML = typeof detail === 'string' 
                            ? detail 
                            : TianJiUtils.cards.renderDetail(detail);
                        
                        cards.forEach(c => c.style.borderColor = defaultBorderColor);
                        card.style.borderColor = borderColor;
                        
                        if (scrollIntoView) {
                            TianJiUtils.dom.scrollToElement(detailContainer);
                        }
                    }
                });
            });
        },
        
        renderDetail(data) {
            if (typeof data === 'string') return data;
            
            let html = '';
            if (data.title) {
                html += `<h4 style="color: var(--primary-gold); margin-bottom: 15px; font-size: 1.3rem;">${data.title}</h4>`;
            }
            if (data.content) {
                html += `<p style="color: var(--text-light); line-height: 1.8; margin-bottom: 15px; font-size: 0.95rem;">${data.content}</p>`;
            }
            if (data.customs && Array.isArray(data.customs)) {
                html += `<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">`;
                data.customs.forEach(c => {
                    html += `<span style="padding: 4px 10px; background: rgba(201, 162, 39, 0.1); border-radius: 12px; font-size: 0.8rem; color: var(--text-light);">${c}</span>`;
                });
                html += `</div>`;
            }
            if (data.food) {
                html += `<div><strong style="color: var(--primary-gold);">特色美食：</strong><span style="color: var(--text-muted); font-size: 0.9rem;">${data.food}</span></div>`;
            }
            return html;
        }
    },
    
    categories: {
        setup(buttons, contentRenderer, options = {}) {
            const { activeClass = 'active' } = options;
            
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.dataset.category;
                    
                    buttons.forEach(b => b.classList.remove(activeClass));
                    btn.classList.add(activeClass);
                    
                    if (typeof contentRenderer === 'function') {
                        contentRenderer(category);
                    }
                });
            });
        }
    }
};

window.TianJiUtils = TianJiUtils;

document.addEventListener('DOMContentLoaded', () => {
    TianJiUtils.animations.initFadeIn();
});
