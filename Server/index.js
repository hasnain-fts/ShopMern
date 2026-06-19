const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/UserRoutes'); 
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');  // ← ADDED order routes
const paymentRoutes = require('./routes/payment');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);  // ← ADDED orders endpoint
app.use('/api/payment', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});