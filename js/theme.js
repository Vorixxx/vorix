// theme.js — Dark/Light mode toggle with localStorage + system preference

(function () {
    // Apply theme immediately before paint (no flash)
    const saved = localStorage.getItem('vorix-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initial);
})();

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const updateIcon = (theme) => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        btn.setAttribute('aria-label', theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي');
    };

    // Sync icon on load
    updateIcon(document.documentElement.getAttribute('data-theme') || 'light');

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('vorix-theme', next);
        updateIcon(next);
    });
});
