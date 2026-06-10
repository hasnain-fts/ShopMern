const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids', 'unisex']
    },
    category: {
        type: String,
        required: true,
        enum: ['shirts', 'pants', 'watches', 'shoes', 'accessories']
    },
    stock: {
        type: Number,
        required: true
    },
    imageURL: [{
        type: String
    }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;