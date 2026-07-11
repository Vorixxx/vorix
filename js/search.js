// search.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof products === 'undefined') return;

    // Inject search modal
    const modalHTML = `
        <div id="search-modal" style="display:none; position:fixed; inset:0; background:rgba(var(--primary-bg-rgb), 0.9); z-index:2000; align-items:flex-start; justify-content:center; padding-top: 100px;">
            <div style="background:var(--primary-bg); width:90%; max-width:600px; padding:30px; border-radius:var(--radius-md); box-shadow: var(--shadow-lg); position:relative; border: 1px solid var(--border-color);">
                <button id="close-search" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:1.5rem; color:var(--primary-text); cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                <h3 style="margin-bottom:20px;">Search Products</h3>
                <div class="input-group" style="display:flex; gap:10px; margin-bottom: 0;">
                    <input type="text" id="search-input" class="input-control" placeholder="Search for compression, shorts..." style="margin-bottom:0;" autocomplete="off">
                </div>
                <div id="search-results" style="margin-top:20px; max-height:400px; overflow-y:auto;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const searchIcons = document.querySelectorAll('a[aria-label="Search"]');
    const modal = document.getElementById('search-modal');
    const closeBtn = document.getElementById('close-search');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => input.focus(), 100);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        input.value = '';
        resultsContainer.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        
        if (filtered.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align:center; color:var(--secondary-text); padding: 20px;">No products found.</p>';
        } else {
            let html = '';
            filtered.forEach(p => {
                html += `
                    <a href="product.html?id=${p.id}" style="display:flex; gap:15px; align-items:center; padding:15px; border-bottom:1px solid var(--border-color); transition: background-color var(--transition-fast);">
                        <img src="${p.images[0]}" style="width:60px; height:60px; object-fit:cover; border-radius:var(--radius-sm);">
                        <div>
                            <div style="font-weight:600; color: var(--primary-text);">${p.name}</div>
                            <div style="color:var(--accent-color); font-size:0.9rem; font-weight: 700;">${formatPrice(p.price - p.discount)}</div>
                        </div>
                    </a>
                `;
            });
            resultsContainer.innerHTML = html;
        }
    });
});
