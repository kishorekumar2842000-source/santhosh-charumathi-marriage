document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 0. Guest Personalization
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('name') || urlParams.get('guest') || urlParams.get('to');
    const guestEl = document.getElementById('guest-name');
    const greetingContainer = document.getElementById('guest-greeting');

    if (guestName && guestEl) {
        guestEl.innerText = guestName;
        greetingContainer.style.display = 'block';
    }

    // Elements
    const preloader = document.getElementById('preloader');
    const introEnvelope = document.getElementById('intro-envelope');
    const envelopeTap = document.getElementById('envelope-tap');
    const mainContent = document.getElementById('main-content');
    const groomReveal = document.getElementById('groom-reveal');
    const brideReveal = document.getElementById('bride-reveal');
    const shareBtn = document.getElementById('share-joy');
    const saveBtn = document.getElementById('save-date');

    // 1. Loading Sequence
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1200);
    }, 1500);

    // 2. Open Envelope
    envelopeTap.addEventListener('click', () => {
        introEnvelope.classList.add('hidden');
        mainContent.classList.add('visible');
    });

    // 3. Reveal Portraits
    groomReveal.addEventListener('click', () => {
        groomReveal.classList.add('revealed');
    });
    brideReveal.addEventListener('click', () => {
        brideReveal.classList.add('revealed');
    });

    // 4. Countdown Timer
    const targetDate = new Date("May 28, 2026 07:35:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerText = d;
            if (hoursEl) hoursEl.innerText = h;
            if (minutesEl) minutesEl.innerText = m;
            if (secondsEl) secondsEl.innerText = s;
        } else {
            if (daysEl) daysEl.innerText = "0";
            if (hoursEl) hoursEl.innerText = "0";
            if (minutesEl) minutesEl.innerText = "0";
            if (secondsEl) secondsEl.innerText = "0";
        }
    }
    
    if (daysEl) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 5. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // 6. Background Effects (Stars & Florals)
    const bg = document.getElementById('celestial-bg');
    
    // Generate Florals
    for (let i = 0; i < 6; i++) {
        const floral = document.createElement('div');
        floral.className = 'floral-float';
        floral.style.top = `${Math.random() * 100}%`;
        floral.style.left = `${Math.random() * 100}%`;
        floral.style.setProperty('--d', `${20 + Math.random() * 20}s`);
        bg.appendChild(floral);
    }

    // Generate Stars & Gold Dust
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        const isStar = Math.random() > 0.5;
        p.className = isStar ? 'star' : 'gold-dust';
        
        p.style.top = `${Math.random() * 100}%`;
        p.style.left = `${Math.random() * 100}%`;
        
        const size = Math.random() * (isStar ? 3 : 2) + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        
        p.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
        bg.appendChild(p);
    }

    // Generate Floating Petals
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.setProperty('--duration', `${Math.random() * 10 + 10}s`);
        bg.appendChild(petal);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, 20000);
    }

    setInterval(createPetal, 3000);
    for (let i = 0; i < 5; i++) {
        setTimeout(createPetal, Math.random() * 5000);
    }

    // 7. Share & Save Functions
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ title: 'Santhosh & Charumathi Wedding', url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied! Spread the joy.');
        }
    });

    saveBtn.addEventListener('click', () => {
        window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=Santhosh+%26+Charumathi+Wedding&dates=20260528T073500Z/20260528T090000Z", "_blank");
    });

    // Cross-hover effect
    shareBtn.addEventListener('mouseenter', () => saveBtn.classList.add('cross-hover'));
    shareBtn.addEventListener('mouseleave', () => saveBtn.classList.remove('cross-hover'));
    
    saveBtn.addEventListener('mouseenter', () => shareBtn.classList.add('cross-hover'));
    saveBtn.addEventListener('mouseleave', () => shareBtn.classList.remove('cross-hover'));
});
