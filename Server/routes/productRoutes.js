const express = require('express');
const router = express.Router();
const {getProducts,singleProduct} = require('../controllers/productController');

router.get('/',getProducts);
router.get('/:id',singleProduct);

module.exports = router;