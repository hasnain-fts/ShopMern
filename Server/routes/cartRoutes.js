const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/:userId', getCart);
router.delete('/remove', removeFromCart);
router.put('/update', updateQuantity);
router.delete('/clear/:userId', clearCart);

module.exports = router;