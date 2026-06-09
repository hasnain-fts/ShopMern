const Product = require('../models/Product');

const getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);

    }catch(error) {
        res.status(500).json({message : 'Server Error'});
    }
}


const singleProduct = async  (req,res) => {
    try {
           const S_product = await Product.findById(req.params.id);
           if (!S_product)
           {
               return res.status(404).json({message : 'Product not found'});
           }
           res.json(S_product);
     }catch(error) {
        res.status(500).json({message : 'Server Error'});
    }
}
//POST APIS 

const createProduct = async (req,res) => {
    try {
        const {name,price,category,stock} = req.body;
        const imageURL = req.files ? req.files.map(file => file.path) : [];
        const newProduct = new Product ({name,price,category,stock,gender,category,imageURL});
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(400).json({ message : error.message})
    }
}
//Put apis
const updateProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({message : "Product not found"})
        }
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;
        product.gender = req.body.gender || product.gender;
        product.category = req.body.category || product.category;
        // product.imageURL = req.body.imageURL || product.imageURL;
        product.imageURL = req.file.lenght > 0 ? req.file.map(file => file.path) : product.imageURL;
        const savedProduct = await product.save();
        res.status(200).json({message : savedProduct})
    }catch(error) {
        res.status(400).json({message: error.message })
    }
}

//Deletion apis

const deleted_product = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({message : "Product not found"})
        }
        const deleted_product = await product.deleteOne();
        res.status(200).json ({message : deleted_product})

    }catch(error){
        res.status(400).json({message : error.message })
    }
}

module.exports = {getProducts,singleProduct,createProduct,updateProduct,deleted_product};