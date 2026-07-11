// js/checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const govSelect = document.getElementById('governorate');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const form = document.getElementById('checkout-form');
    const itemsList = document.getElementById('checkout-items-list');

    let cart = JSON.parse(localStorage.getItem('vorix-cart')) || [];
    if (cart.length === 0 && form) {
        window.location.href = 'shop.html';
        return;
    }

    let subtotal = 0;
    let shipping = 0;

    // Render items summary
    if (itemsList) {
        let html = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                    <div style="display:flex; gap: 10px; align-items:center;">
                        <img src="${item.image}" alt="" style="width:50px; height:50px; object-fit:cover; border-radius:var(--radius-sm); background:#fff;">
                        <span>${item.quantity}x ${item.name} <br> <small style="color:var(--secondary-text);">${item.size}، ${item.color}</small></span>
                    </div>
                    <span style="font-weight:600;">${formatPrice(itemTotal)}</span>
                </div>
            `;
        });
        itemsList.innerHTML = html;
        if(subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    }

    // Populate governorates
    if (govSelect && typeof governorates !== 'undefined') {
        governorates.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.name;
            opt.textContent = g.name;
            govSelect.appendChild(opt);
        });

        govSelect.addEventListener('change', (e) => {
            const selected = governorates.find(g => g.name === e.target.value);
            if (selected) {
                shipping = selected.shipping;
                shippingEl.textContent = formatPrice(shipping);
                totalEl.textContent = formatPrice(subtotal + shipping);
            } else {
                shipping = 0;
                shippingEl.textContent = 'اختر المحافظة';
                totalEl.textContent = formatPrice(subtotal);
            }
        });
    }

    // Update initial total
    if (totalEl) totalEl.textContent = formatPrice(subtotal);

    // Form Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect data
            const name = document.getElementById('fullname').value;
            const phone = document.getElementById('phone').value;
            const gov = document.getElementById('governorate').value;
            const address = document.getElementById('address').value;
            const payment = document.querySelector('input[name="payment"]:checked').value;
            
            // Format WhatsApp Message
            let msg = `*طلب جديد - VORIX*%0A`;
            msg += `الاسم: ${name}%0A`;
            msg += `رقم الهاتف: ${phone}%0A`;
            msg += `المحافظة: ${gov}%0A`;
            msg += `العنوان: ${address}%0A`;
            msg += `الدفع: ${payment}%0A%0A`;
            msg += `*المنتجات:*%0A`;
            
            cart.forEach(item => {
                msg += `- ${item.quantity}x ${item.name} (${item.size}، ${item.color}) - ${item.price} جنيه%0A`;
            });
            
            msg += `%0A*المجموع الفرعي:* ${subtotal} جنيه`;
            msg += `%0A*الشحن:* ${shipping} جنيه`;
            msg += `%0A*الإجمالي:* ${subtotal + shipping} جنيه`;

            // Clear cart
            localStorage.removeItem('vorix-cart');
            
            // Redirect to WA
            window.location.href = `https://wa.me/201060018512?text=${msg}`;
        });
    }
});
