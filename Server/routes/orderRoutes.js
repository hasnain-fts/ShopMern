const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

// Create Order with Email
router.post('/create', async (req, res) => {
    try {
        const {
            userId,
            items,
            subtotal,
            shipping,
            tax,
            discount,
            total,
            paymentMethod,
            shippingMethod,
            customerInfo
        } = req.body;

        // Validate required fields
        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required fields or empty cart' });
        }

        // Format items with product details
        const formattedItems = items.map(item => ({
            productId: item.productId._id || item.productId,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            selectedAttributes: item.selectedAttributes || {},
            imageURL: item.productId.imageURL?.[0] || ''
        }));

        // Create order
        const order = new Order({
            userId,
            items: formattedItems,
            subtotal,
            shipping,
            tax,
            discount,
            total,
            paymentMethod,
            shippingMethod: shippingMethod || 'standard',
            customerInfo
        });

        // Save order
        const savedOrder = await order.save();

        // ✅ Send confirmation email (don't await — don't block the response)
        sendOrderConfirmationEmail(savedOrder).catch(err => 
            console.error('Email failed:', err)
        );

        // Clear user's cart after successful order
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({
            success: true,
            order: savedOrder,
            message: 'Order placed successfully!'
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get user's orders
router.get('/user/:userId', getUserOrders);

// Get single order by ID
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update order status (admin)
router.put('/:orderId/status', updateOrderStatus);

// Cancel order
router.put('/:orderId/cancel', cancelOrder);

module.exports = router;