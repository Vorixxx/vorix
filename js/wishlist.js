// js/wishlist.js
document.addEventListener('DOMContentLoaded', () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) return;

    function renderWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('vorix-wishlist')) || [];
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = '<div style="text-align:center; padding: 50px 0;"><p>Your wishlist is empty.</p><a href="shop.html" class="btn btn-primary" style="margin-top:20px;">Explore Products</a></div>';
            return;
        }

        let html = '';
        wishlist.forEach((id, index) => {
            const product = products.find(p => p.id === id);
            if (!product) return;

            const finalPrice = product.price - product.discount;
            const priceHTML = product.discount > 0 
                ? `<span class="product-card-price discounted">${formatPrice(product.price)}</span><span class="product-card-price">${formatPrice(finalPrice)}</span>`
                : `<span class="product-card-price">${formatPrice(product.price)}</span>`;
                
            html += `
                <div class="product-card animate-fade-in" style="animation-delay: ${index * 0.1}s; position: relative;">
                    <button class="remove-wishlist icon-btn" data-id="${product.id}" style="position:absolute; top:10px; right:10px; z-index:10; background: var(--primary-bg); box-shadow: var(--shadow-sm); width: 30px; height: 30px;"><i class="fa-solid fa-xmark"></i></button>
                    <a href="product.html?id=${product.id}" style="display:block;">
                        <div class="img-wrapper">
                            <img src="${product.images[0]}" alt="${product.name}">
                        </div>
                        <div class="product-card-info">
                            <h3 class="product-card-title">${product.name}</h3>
                            <div>${priceHTML}</div>
                        </div>
                    </a>
                </div>
            `;
        });

        wishlistContainer.innerHTML = `<div class="products-grid">${html}</div>`;

        // Attach remove events
        document.querySelectorAll('.remove-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // prevent triggering the link
                const pid = e.currentTarget.dataset.id;
                let w = JSON.parse(localStorage.getItem('vorix-wishlist')) || [];
                w = w.filter(id => id !== pid);
                localStorage.setItem('vorix-wishlist', JSON.stringify(w));
                renderWishlist();
                if (window.showToast) window.showToast("Item removed from wishlist");
            });
        });
    }

    renderWishlist();
});
