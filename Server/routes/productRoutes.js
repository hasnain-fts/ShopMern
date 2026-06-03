const express = require('express');
const router = express.Router();
const {getProducts,singleProduct,createProduct,updateProduct,deleted_product} = require('../controllers/productController');

router.get('/',getProducts);
router.get('/:id',singleProduct);
//For admin level
router.post('/admin/create',isAdmin,createProduct);
router.put('/admin/update/:id',isAdmin,updateProduct);
router.delete('/admin/delete/:id',isAdmin,deleted_product);

module.exports = router;