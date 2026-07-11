// data.js

const products = [
    {
        id: "spiderman-black",
        name: "تيشيرت سبايدر مان",
        price: 1400,
        discount: 200,
        images: [
            "images/spiderman-black.jpg"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["أسود"],
        category: "compression",
        description: "تيشيرت ضغط (كومبرشن) بتصميم سبايدر مان الأسود الأيقوني. مصمم لدعم العضلات وإبراز البنية الجسدية بأعلى جودة.",
        features: ["قماش فائق الجودة", "دعم كامل للعضلات", "تحكم ممتاز في التعرق"],
        rating: 4.9,
        reviews: 312,
        stock: 100,
        badge: "الأكثر مبيعاً"
    },
    {
        id: "longsleeveblack",
        name: "تيشيرت كومبرشن طويل - أسود",
        price: 1650,
        discount: 150,
        images: [
            "images/longsleeveblack.jpg"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["أسود"],
        category: "compression",
        description: "تيشيرت كومبرشن بأكمام طويلة للتغطية الكاملة. مصمم لأقصى دعم عضلي مع خامة فاخرة تمنحك مظهراً احترافياً.",
        features: ["بدون خياطة مزعجة", "تنظيم حرارة الجسم", "مظهر مطفي فاخر"],
        rating: 4.8,
        reviews: 245,
        stock: 50,
        badge: "جديد"
    },
    {
        id: "apex-white",
        name: "تيشيرت ايبكس - أبيض",
        price: 1250,
        discount: 0,
        images: [
            "images/apex-white.jpg"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["أبيض"],
        category: "compression",
        description: "تيشيرت كومبرشن ايبكس باللون الأبيض مصمم لتوفير راحة تامة أثناء الحركة وتصميم عصري يبرز عضلات الجسم.",
        features: ["تمدد في 4 اتجاهات", "مضاد للروائح", "خفيف الوزن"],
        rating: 4.7,
        reviews: 189,
        stock: 75,
        badge: ""
    },
    {
        id: "batman-white",
        name: "تيشيرت باتمان - أبيض",
        price: 1800,
        discount: 300,
        images: [
            "images/batman-white.jpg"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["أبيض"],
        category: "compression",
        description: "إصدار باتمان الفاخر باللون الأبيض. يمنحك دعماً فائقاً للعضلات مع تصميم درامي أيقوني لا مثيل له.",
        features: ["دعم احترافي للعضلات", "تصميم حصري", "إصدار محدود"],
        rating: 5.0,
        reviews: 412,
        stock: 20,
        badge: "إصدار محدود"
    }
];

const governorates = [
    { name: "القاهرة", shipping: 50 },
    { name: "الجيزة", shipping: 50 },
    { name: "الإسكندرية", shipping: 60 },
    { name: "القليوبية", shipping: 60 },
    { name: "بورسعيد", shipping: 70 },
    { name: "السويس", shipping: 70 },
    { name: "الدقهلية", shipping: 70 },
    { name: "البحر الأحمر", shipping: 100 },
    { name: "أسوان", shipping: 120 },
    { name: "الأقصر", shipping: 110 }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-EG').format(price) + ' جنيه';
};
