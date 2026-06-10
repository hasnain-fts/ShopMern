const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const Product = require('./models/Product');

const products = [
    { name: "Blue Denim Jacket", description: "Casual blue denim jacket", price: 3999, gender: "men", category: "shirts", stock: 25, imageURL: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500"] },
    { name: "White Slim Shirt", description: "Classic white slim fit shirt", price: 1999, gender: "men", category: "shirts", stock: 30, imageURL: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"] },
    { name: "Black Chinos", description: "Smart black chino pants", price: 2999, gender: "men", category: "pants", stock: 20, imageURL: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"] },
    { name: "Floral Summer Dress", description: "Light floral summer dress", price: 3499, gender: "women", category: "shirts", stock: 15, imageURL: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"] },
    { name: "Women Skinny Jeans", description: "Comfortable skinny jeans", price: 2799, gender: "women", category: "pants", stock: 18, imageURL: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"] },
    { name: "Kids Cartoon Tee", description: "Fun cartoon printed tee", price: 999, gender: "kids", category: "shirts", stock: 40, imageURL: ["https://images.unsplash.com/photo-1519278409-1f56ab241a91?w=500"] },
    { name: "Men Formal Watch", description: "Elegant formal watch", price: 8999, gender: "men", category: "watches", stock: 10, imageURL: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"] },
    { name: "Women Rose Watch", description: "Rose gold ladies watch", price: 7999, gender: "women", category: "watches", stock: 8, imageURL: ["https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500"] },
    { name: "Men Running Shoes", description: "Lightweight running shoes", price: 5999, gender: "men", category: "shoes", stock: 22, imageURL: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"] },
    { name: "Women Heels", description: "Classic black heels", price: 4999, gender: "women", category: "shoes", stock: 12, imageURL: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"] },
    { name: "Kids Sneakers", description: "Colorful kids sneakers", price: 2499, gender: "kids", category: "shoes", stock: 35, imageURL: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500"] },
    { name: "Men Leather Belt", description: "Genuine leather belt", price: 1499, gender: "men", category: "accessories", stock: 50, imageURL: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"] },
    { name: "Women Handbag", description: "Stylish leather handbag", price: 6999, gender: "women", category: "accessories", stock: 14, imageURL: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"] },
    { name: "Unisex Cap", description: "Casual unisex baseball cap", price: 799, gender: "unisex", category: "accessories", stock: 60, imageURL: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"] },
    { name: "Men Polo Shirt", description: "Classic polo shirt", price: 1799, gender: "men", category: "shirts", stock: 28, imageURL: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500"] },
    { name: "Women Blouse", description: "Elegant silk blouse", price: 2299, gender: "women", category: "shirts", stock: 20, imageURL: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500"] },
    { name: "Kids Joggers", description: "Comfortable kids joggers", price: 1299, gender: "kids", category: "pants", stock: 30, imageURL: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"] },
    { name: "Men Cargo Pants", description: "Utility cargo pants", price: 3299, gender: "men", category: "pants", stock: 16, imageURL: ["https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=500"] },
    { name: "Women Palazzo Pants", description: "Flowy palazzo pants", price: 2599, gender: "women", category: "pants", stock: 18, imageURL: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500"] },
    { name: "Unisex Hoodie", description: "Warm pullover hoodie", price: 3799, gender: "unisex", category: "shirts", stock: 25, imageURL: ["https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500"] },
    { name: "Men Sports Watch", description: "Digital sports watch", price: 5499, gender: "men", category: "watches", stock: 12, imageURL: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"] },
    { name: "Women Ankle Boots", description: "Stylish ankle boots", price: 5999, gender: "women", category: "shoes", stock: 10, imageURL: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"] },
    { name: "Kids School Bag", description: "Durable kids school bag", price: 1999, gender: "kids", category: "accessories", stock: 40, imageURL: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"] },
    { name: "Men Sunglasses", description: "UV protection sunglasses", price: 2999, gender: "men", category: "accessories", stock: 22, imageURL: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"] },
    { name: "Women Scarf", description: "Soft silk scarf", price: 1299, gender: "women", category: "accessories", stock: 35, imageURL: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500"] },
    { name: "Unisex Sweatpants", description: "Comfortable sweatpants", price: 2199, gender: "unisex", category: "pants", stock: 28, imageURL: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500"] },
    { name: "Men Dress Shoes", description: "Formal leather dress shoes", price: 7999, gender: "men", category: "shoes", stock: 8, imageURL: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500"] },
    { name: "Women Sports Shoes", description: "Lightweight sports shoes", price: 4499, gender: "women", category: "shoes", stock: 20, imageURL: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"] },
    { name: "Kids Watch", description: "Fun colorful kids watch", price: 1499, gender: "kids", category: "watches", stock: 25, imageURL: ["https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500"] },
    { name: "Unisex Backpack", description: "Spacious travel backpack", price: 4999, gender: "unisex", category: "accessories", stock: 18, imageURL: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"] },
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Product.deleteMany(); // clears existing products
        await Product.insertMany(products);
        console.log('30 products inserted successfully');
        process.exit();
    })
    .catch((error) => {
        console.log('Error:', error);
        process.exit(1);
    });