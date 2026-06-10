const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const singleProduct = async (req, res) => {
    try {
        const S_product = await Product.findById(req.params.id);
        if (!S_product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(S_product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const createProduct = async (req, res) => {
    try {
        // ✅ added gender and description
        const { name, description, price, category, stock, gender } = req.body;
        const imageURL = req.files ? req.files.map(file => file.path) : req.body.imageURL || [];

        const newProduct = new Product({ name, description, price, category, stock, gender, imageURL });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;
        product.gender = req.body.gender || product.gender;
        // ✅ fixed req.file.lenght → req.files.length
        product.imageURL = req.files && req.files.length > 0 ? req.files.map(file => file.path) : product.imageURL;

        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleted_product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getProducts, singleProduct, createProduct, updateProduct, deleted_product };