const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

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

        // ============================================================
        // FETCH PRODUCT DETAILS FROM DATABASE
        // ============================================================
        const enrichedItems = [];
        
        for (const item of items) {
            const productId = item.productId._id || item.productId;
    console.log("LOOKING UP PRODUCT ID:", productId, "TYPE:", typeof productId);
    
    const product = await Product.findById(productId);
    console.log("FOUND PRODUCT:", product ? product.name : "NULL - NOT FOUND");
            
            if (!product) {
                console.error(`❌ Product not found: ${productId}`);
                enrichedItems.push({
                    productId: productId,
                    name: 'Product Not Found',
                    price: 0,
                    quantity: item.quantity || 1,
                    selectedAttributes: item.selectedAttributes || {},
                    imageURL: ''
                });
                continue;
            }

            // Get image URL (handle both string and array)
            let imageURL = '';
            if (Array.isArray(product.imageURL) && product.imageURL.length > 0) {
                imageURL = product.imageURL[0];
            } else if (typeof product.imageURL === 'string') {
                imageURL = product.imageURL;
            }

            enrichedItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity || 1,
                selectedAttributes: item.selectedAttributes || {},
                imageURL: imageURL
            });
        }

        // Create order with enriched items
        const order = new Order({
            userId,
            items: enrichedItems,
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

        // Save the order
        const savedOrder = await order.save();

        // Send email
        try {
            await sendOrderConfirmationEmail(savedOrder);
            console.log('✅ Order confirmation email sent');
        } catch (emailError) {
            console.error('❌ Email error:', emailError.message);
        }

        // Clear user's cart
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({
            success: true,
            order: savedOrder,
            message: 'Order placed successfully!'
        });

    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get user's orders - REMOVED .populate()
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single order by ID - REMOVED .populate()
// const getOrderById = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const order = await Order.findById(orderId);
        
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }
        
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        
        // ADD THIS
        console.log("FULL ORDER ITEMS:", JSON.stringify(order.items, null, 2));
        
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