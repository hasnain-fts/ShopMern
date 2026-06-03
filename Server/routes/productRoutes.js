const express = require('express');
const router = express.Router();
const {getProducts,singleProduct,createProduct,updateProduct,deleted_product} = require('../controllers/productController');

router.get('/',getProducts);
router.get('/:id',singleProduct);
//For admin level
router.post('/admin/create',upload.array('images'),createProduct);
router.put('/admin/update/:id',upload.array('images'),updateProduct);
router.delete('/admin/delete/:id',deleted_product);

module.exports = router;