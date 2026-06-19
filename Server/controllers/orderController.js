const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create new order
const createOrder = async (req, res) => {
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
            paymentStatus,
            shippingMethod,
            customerInfo
        } = req.body;

        // Validate required fields
        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required fields or empty cart' });
        }

        // Format items with product details
        const formattedItems = items.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    selectedAttributes: item.selectedAttributes || {},
    imageURL: item.imageURL || ''
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
            ...(paymentStatus ? { paymentStatus } : {}),
            shippingMethod: shippingMethod || 'standard',
            customerInfo
        });

        await order.save();

        // Clear user's cart after successful order
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({
            success: true,
            order,
            message: 'Order placed successfully!'
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('items.productId');
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.productId');
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus, paymentStatus } = req.body;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;
        
        await order.save();
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel order
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        if (order.orderStatus !== 'pending') {
            return res.status(400).json({ error: 'Only pending orders can be cancelled' });
        }
        
        order.orderStatus = 'cancelled';
        await order.save();
        
        res.json({ success: true, message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
};