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
           if (!S-product)
           {
               return res.status(404).json({message : 'Product not found'});
           }
           res.json(S_product);
     }catch(error) {
        res.status(500).json({message : 'Server Error'});
    }
}
module.exports = {getProducts,singleProduct};