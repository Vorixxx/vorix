// animations.js — VORIX scroll-based animations + interactions

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Scroll Reveal ---- */
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px 0px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Activate already-visible elements immediately
    setTimeout(() => {
        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    /* ---- Recent Purchase Toasts ---- */
    const showRecentPurchase = () => {
        const names = ['أحمد', 'محمد', 'عمر', 'يوسف', 'كريم', 'محمود', 'ياسين', 'علي'];
        const cities = ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا'];
        const items  = ['تيشيرت سبايدر مان', 'تيشيرت ايبكس', 'تيشيرت باتمان', 'كومبرشن طويل أسود'];
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        if (window.showToast) window.showToast(`${name} من ${city} اشترى ${item} للتو!`);
    };
    setTimeout(() => setInterval(showRecentPurchase, 45000), 30000);

    /* ---- Countdown Timer ---- */
    const timerContainers = document.querySelectorAll('.countdown-timer');
    if (timerContainers.length) {
        const update = () => {
            const now    = new Date();
            const target = new Date();
            target.setHours(23, 59, 59, 999);
            const diff = target - now;
            if (diff <= 0) return;
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            timerContainers.forEach(c => {
                const hEl = c.querySelector('.hours');
                const mEl = c.querySelector('.minutes');
                const sEl = c.querySelector('.seconds');
                if (hEl) hEl.textContent = String(h).padStart(2,'0');
                if (mEl) mEl.textContent = String(m).padStart(2,'0');
                if (sEl) sEl.textContent = String(s).padStart(2,'0');
            });
        };
        update();
        setInterval(update, 1000);
    }

});

/* ---- Global Toast ---- */
window.showToast = (message) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check"></i><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
};
