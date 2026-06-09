const express = require('express');
const router = express.Router();
const {getProducts,singleProduct,createProduct,updateProduct,deleted_product} = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/',getProducts);
router.get('/:id',singleProduct);
//For admin level
router.post('/admin/create',upload.array('images'),createProduct);
router.put('/admin/update/:id',upload.array('images'),updateProduct);
router.delete('/admin/delete/:id',deleted_product);


module.exports = router;