// reviews.js
document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('product-reviews');
    if (!reviewsContainer) return;

    const mockReviews = [
        { name: "Ahmed K.", rating: 5, date: "Oct 12, 2026", text: "Amazing quality! The compression is perfect. Will definitely buy again.", location: "Cairo, Egypt", verified: true },
        { name: "Omar S.", rating: 4, date: "Sep 28, 2026", text: "Very comfortable but delivery took 3 days.", location: "Giza, Egypt", verified: true },
        { name: "Youssef M.", rating: 5, date: "Sep 15, 2026", text: "Premium feel. Worth every pound. Better than international brands I used to buy.", location: "Alexandria, Egypt", verified: true }
    ];

    let html = '';
    mockReviews.forEach(r => {
        let stars = '';
        for(let i=1; i<=5; i++) {
            stars += `<i class="fa-solid fa-star" style="color: ${i <= r.rating ? '#FFD700' : '#E0E0E0'}"></i>`;
        }

        html += `
            <div class="review-card animate-slide-up" style="padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 20px; background-color: var(--primary-bg);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div>
                        <strong style="font-size: 1.1rem;">${r.name}</strong> 
                        ${r.verified ? '<span style="color: var(--success-color); font-size: 0.8rem; margin-left: 10px;"><i class="fa-solid fa-circle-check"></i> Verified Buyer</span>' : ''}
                    </div>
                    <div style="color: var(--secondary-text); font-size: 0.9rem;">${r.date}</div>
                </div>
                <div style="margin-bottom: 10px;">${stars}</div>
                <p style="margin-bottom: 10px; color: var(--primary-text);">${r.text}</p>
                <div style="font-size: 0.85rem; color: var(--secondary-text);"><i class="fa-solid fa-location-dot"></i> ${r.location}</div>
            </div>
        `;
    });

    reviewsContainer.innerHTML = html;
});
