const TianJiUI = {
    init() {
        this.initLoading();
        this.initToast();
        this.initScrollTop();
        this.initModal();
    },

    initLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">加载中...</div>
        `;
        document.body.appendChild(loadingOverlay);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 500);
        });
        
        this.loading = loadingOverlay;
    },

    showLoading() {
        if (this.loading) {
            this.loading.classList.remove('hidden');
        }
    },

    hideLoading() {
        if (this.loading) {
            this.loading.classList.add('hidden');
        }
    },

    initToast() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        this.toastContainer = container;
    },

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    initScrollTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', '返回顶部');
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        this.scrollTopBtn = btn;
    },

    initModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });
        
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        this.modal = modalOverlay;
    },

    openModal(title, content) {
        if (this.modal) {
            this.modal.querySelector('.modal-title').textContent = title;
            this.modal.querySelector('.modal-body').innerHTML = content;
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    createSkeleton(type = 'text', count = 1) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `<div class="skeleton skeleton-${type}"></div>`;
        }
        return html;
    },

    addRippleEffect(element) {
        element.classList.add('ripple');
    },

    addTooltip(element, text) {
        element.classList.add('tooltip');
        element.setAttribute('data-tooltip', text);
    },

    lazyLoadImages(selector = 'img[data-src]') {
        const images = document.querySelectorAll(selector);
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });
            
            images.forEach(img => observer.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    },

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('已复制到剪贴板', 'success');
            }).catch(() => {
                this.showToast('复制失败', 'error');
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.showToast('已复制到剪贴板', 'success');
            } catch {
                this.showToast('复制失败', 'error');
            }
            document.body.removeChild(textarea);
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
    }
};

window.TianJiUI = TianJiUI;

document.addEventListener('DOMContentLoaded', () => {
    TianJiUI.init();
});
