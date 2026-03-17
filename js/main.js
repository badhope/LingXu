(function() {
    const userPanel = document.getElementById('userPanel');
    const userToggle = document.getElementById('userToggle');
    const historyList = document.getElementById('historyList');
    const favoritesList = document.getElementById('favoritesList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    const STORAGE_KEYS = {
        history: 'tianji_history',
        favorites: 'tianji_favorites'
    };

    function init() {
        loadUserData();
        setupEventListeners();
        initAnimations();
    }

    function loadUserData() {
        const history = getFromStorage(STORAGE_KEYS.history) || [];
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        renderHistory(history);
        renderFavorites(favorites);
    }

    function getFromStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }

    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Storage quota exceeded');
        }
    }

    function renderHistory(history) {
        if (!history || history.length === 0) {
            historyList.innerHTML = '<p class="empty-tip">暂无历史记录</p>';
            return;
        }

        historyList.innerHTML = history.slice(0, 10).map(item => `
            <div class="history-item" data-url="${item.url}">
                <span class="item-icon">${item.icon}</span>
                <span class="item-title">${item.title}</span>
                <span class="item-time">${formatTime(item.time)}</span>
            </div>
        `).join('');

        historyList.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    }

    function renderFavorites(favorites) {
        if (!favorites || favorites.length === 0) {
            favoritesList.innerHTML = '<p class="empty-tip">暂无收藏</p>';
            return;
        }

        favoritesList.innerHTML = favorites.slice(0, 10).map(item => `
            <div class="favorite-item" data-url="${item.url}">
                <span class="item-icon">${item.icon}</span>
                <span class="item-title">${item.title}</span>
                <button class="remove-btn" data-url="${item.url}">×</button>
            </div>
        `).join('');

        favoritesList.querySelectorAll('.favorite-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-btn')) {
                    window.location.href = item.dataset.url;
                }
            });
        });

        favoritesList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFavorite(btn.dataset.url);
            });
        });
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        return date.toLocaleDateString('zh-CN');
    }

    function removeFavorite(url) {
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        const newFavorites = favorites.filter(f => f.url !== url);
        saveToStorage(STORAGE_KEYS.favorites, newFavorites);
        renderFavorites(newFavorites);
    }

    function setupEventListeners() {
        userToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            userPanel.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userPanel.contains(e.target)) {
                userPanel.classList.remove('active');
            }
        });

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        document.querySelectorAll('.title-char').forEach(char => {
            char.addEventListener('click', () => {
                const section = char.dataset.section;
                scrollToSection(section);
            });
        });
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            alert('搜索功能开发中: ' + query);
        }
    }

    function scrollToSection(section) {
        const element = document.querySelector(`.element-card[data-section="${section}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.animation = 'none';
            element.offsetHeight;
            element.style.animation = 'card-highlight 0.5s ease';
        }
    }

    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.element-card, .classic-card').forEach(el => {
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes card-highlight {
                0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
                50% { box-shadow: 0 0 40px var(--glow-gold); }
            }
            
            .element-card, .classic-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .element-card.visible, .classic-card.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    window.addToHistory = function(title, icon, url) {
        const history = getFromStorage(STORAGE_KEYS.history) || [];
        const existingIndex = history.findIndex(h => h.url === url);
        
        if (existingIndex > -1) {
            history.splice(existingIndex, 1);
        }
        
        history.unshift({
            title,
            icon,
            url,
            time: Date.now()
        });
        
        const trimmedHistory = history.slice(0, 50);
        saveToStorage(STORAGE_KEYS.history, trimmedHistory);
        renderHistory(trimmedHistory);
    };

    window.addToFavorites = function(title, icon, url) {
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        
        if (favorites.some(f => f.url === url)) {
            return false;
        }
        
        favorites.unshift({
            title,
            icon,
            url,
            time: Date.now()
        });
        
        saveToStorage(STORAGE_KEYS.favorites, favorites);
        renderFavorites(favorites);
        return true;
    };

    window.removeFromFavorites = removeFavorite;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
