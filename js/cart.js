// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotalEl = document.getElementById('cart-subtotal');
    if (!cartContainer) return;

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('vorix-cart')) || [];
        if (cart.length === 0) {
            cartContainer.innerHTML = '<div style="text-align:center; padding: 50px 0;"><p>Your cart is empty.</p><a href="shop.html" class="btn btn-primary" style="margin-top:20px;">Continue Shopping</a></div>';
            if(cartTotalEl) cartTotalEl.textContent = '0 EGP';
            document.getElementById('checkout-btn').style.display = 'none';
            return;
        } else {
            document.getElementById('checkout-btn').style.display = 'block';
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            html += `
                <div class="cart-item animate-fade-in" style="display:flex; gap:20px; border-bottom:1px solid var(--border-color); padding: 20px 0; align-items: center; animation-delay: ${index * 0.1}s">
                    <a href="product.html?id=${item.productId}">
                        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm);">
                    </a>
                    <div style="flex:1;">
                        <a href="product.html?id=${item.productId}"><h4 style="margin-bottom:5px;">${item.name}</h4></a>
                        <p style="color:var(--secondary-text); font-size:0.9rem; margin-bottom:10px;">Size: ${item.size} | Color: ${item.color}</p>
                        <div style="font-weight:700; color:var(--accent-color);">${formatPrice(item.price)}</div>
                    </div>
                    <div style="display:flex; border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: var(--primary-text);">
                        <button class="qty-btn minus" data-index="${index}" style="padding: 5px 10px; background:none; border:none; cursor:pointer; color: var(--primary-text);">-</button>
                        <input type="text" value="${item.quantity}" style="width:40px; text-align:center; border:none; background:none; font-family:var(--font-main); color: var(--primary-text);" readonly>
                        <button class="qty-btn plus" data-index="${index}" style="padding: 5px 10px; background:none; border:none; cursor:pointer; color: var(--primary-text);">+</button>
                    </div>
                    <div style="font-weight:700; min-width: 100px; text-align: right;">${formatPrice(itemTotal)}</div>
                    <button class="remove-btn icon-btn" data-index="${index}" style="color: var(--error-color);"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });

        cartContainer.innerHTML = html;
        if(cartTotalEl) cartTotalEl.textContent = formatPrice(total);

        // Attach events
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                const isPlus = e.currentTarget.classList.contains('plus');
                let c = JSON.parse(localStorage.getItem('vorix-cart')) || [];
                if (isPlus) {
                    c[idx].quantity++;
                } else {
                    if (c[idx].quantity > 1) c[idx].quantity--;
                }
                localStorage.setItem('vorix-cart', JSON.stringify(c));
                window.updateCartCount();
                renderCart();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                let c = JSON.parse(localStorage.getItem('vorix-cart')) || [];
                c.splice(idx, 1);
                localStorage.setItem('vorix-cart', JSON.stringify(c));
                window.updateCartCount();
                renderCart();
                if (window.showToast) window.showToast("Item removed from cart");
            });
        });
    }

    renderCart();
});
