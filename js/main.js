// main.js — VORIX core interactions

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Sticky header shadow on scroll ---- */
    const header = document.getElementById('site-header') || document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ---- Mobile menu toggle ---- */
    const mobileBtn = document.getElementById('mobile-menu-btn') || document.querySelector('.mobile-menu-btn');
    const navLinks  = document.getElementById('nav-links')    || document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const open = navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }

    /* ---- Cart count ---- */
    updateCartCount();

    /* ---- Back to top ---- */
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'var(--accent-color)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: '997',
        boxShadow: 'var(--shadow-md)',
    });
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        const show = window.scrollY > 500;
        backToTop.style.opacity = show ? '1' : '0';
        backToTop.style.pointerEvents = show ? 'auto' : 'none';
        backToTop.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});

/* ---- Global cart count updater ---- */
window.updateCartCount = () => {
    const cart  = JSON.parse(localStorage.getItem('vorix-cart')) || [];
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
        el.style.display = total > 0 ? 'flex' : 'none';
    });
};
