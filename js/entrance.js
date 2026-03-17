(function() {
    const particlesContainer = document.getElementById('particles');
    const taijiContainer = document.getElementById('taiji');
    const title = document.getElementById('title');
    const enterHint = document.getElementById('enterHint');
    const entranceContainer = document.querySelector('.entrance-container');
    
    function createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            const colors = ['#c9a227', '#8b0000', '#f5f5f5'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    function createStars() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 2 + 1}px;
                height: ${Math.random() * 2 + 1}px;
                background: #fff;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            `;
            particlesContainer.appendChild(star);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: ${Math.random() * 0.5 + 0.3}; transform: scale(1); }
                50% { opacity: ${Math.random() * 0.3 + 0.1}; transform: scale(0.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function init() {
        createParticles();
        createStars();
        
        document.addEventListener('click', handleEnter);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleEnter();
            }
        });
    }
    
    function handleEnter(e) {
        if (e && e.target.closest('.taiji-container') === null && 
            e.target.closest('.enter-hint') === null &&
            e.key !== 'Enter') {
            return;
        }
        
        taijiContainer.classList.add('clicked');
        title.classList.add('explode');
        enterHint.style.opacity = '0';
        
        createExplosionEffects();
        
        setTimeout(() => {
            entranceContainer.classList.add('fade-out');
        }, 1000);
        
        setTimeout(() => {
            window.location.href = 'pages/main.html';
        }, 1800);
    }
    
    function createExplosionEffects() {
        const colors = ['#c9a227', '#8b0000', '#f5f5f5', '#FFD700', '#FF4500'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 100;
                animation: explode-particle ${Math.random() * 1 + 0.5}s ease-out forwards;
            `;
            
            const angle = (Math.PI * 2 / 30) * i;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes explode-particle {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            entranceContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
                style.remove();
            }, 1500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
