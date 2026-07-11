// products.js
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('shop-products-grid');
    if (!productGrid) return;

    let currentCategory = new URLSearchParams(window.location.search).get('category') || 'all';
    
    // Sort logic
    const sortSelect = document.getElementById('sort-by');
    
    function renderProducts(category, sortType) {
        let filtered = products;
        if (category !== 'all') {
            filtered = products.filter(p => p.category === category);
        }

        if (sortType === 'price-low') {
            filtered.sort((a, b) => (a.price - a.discount) - (b.price - b.discount));
        } else if (sortType === 'price-high') {
            filtered.sort((a, b) => (b.price - b.discount) - (a.price - a.discount));
        }

        let html = '';
        if (filtered.length === 0) {
            html = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px;"><p>No products found.</p></div>';
        } else {
            filtered.forEach((p, index) => {
                const finalPrice = p.price - p.discount;
                const priceHTML = p.discount > 0 
                    ? `<span class="product-card-price discounted">${formatPrice(p.price)}</span><span class="product-card-price">${formatPrice(finalPrice)}</span>`
                    : `<span class="product-card-price">${formatPrice(p.price)}</span>`;
                    
                html += `
                    <a href="product.html?id=${p.id}" class="product-card animate-fade-in" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s">
                        ${p.badge ? `<span class="badge ${p.badge.toLowerCase() === 'sale' ? 'sale' : ''}">${p.badge}</span>` : ''}
                        <div class="img-wrapper">
                            <img src="${p.images[0]}" alt="${p.name}">
                        </div>
                        <div class="product-card-info">
                            <h3 class="product-card-title">${p.name}</h3>
                            <div>${priceHTML}</div>
                        </div>
                    </a>
                `;
            });
        }
        productGrid.innerHTML = html;
    }

    renderProducts(currentCategory, sortSelect ? sortSelect.value : 'default');

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.dataset.category === currentCategory) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            
            // Update URL without reload
            const url = new URL(window.location);
            if (currentCategory === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', currentCategory);
            }
            window.history.pushState({}, '', url);

            renderProducts(currentCategory, sortSelect ? sortSelect.value : 'default');
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            renderProducts(currentCategory, e.target.value);
        });
    }
});
