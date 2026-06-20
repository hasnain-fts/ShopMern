const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name:      { type: String, required: true },
    price:     { type: Number, required: true },
    imageURL:  { type: String },
    category:  { type: String },
});

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items:  [wishlistItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);