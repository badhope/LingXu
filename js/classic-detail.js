(function() {
    const progressBar = document.querySelector('.progress-fill');
    const tocItems = document.querySelectorAll('.toc-item');
    
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
            progressBar.parentElement.nextElementSibling.textContent = progress + '%';
        }
    }
    
    function initScrollProgress() {
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
    
    function initTOC() {
        tocItems.forEach(item => {
            item.addEventListener('click', () => {
                const text = item.textContent.trim();
                const num = text.split('.')[0];
                const id = getHexagramId(num);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    function getHexagramId(num) {
        const map = {
            '01': 'qian', '02': 'kun', '03': 'zhun', '04': 'meng',
            '05': 'xu', '06': 'shi', '07': 'qian', '08': 'kun'
        };
        return map[num] || 'qian';
    }
    
    function init() {
        initScrollProgress();
        initTOC();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
