const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const cores = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cores());

//Routes

const productRoutes = require('./routes/productRoutes');
app.use('/api/products',productRoutes); 

//Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
.then(
    () => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT , () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
).catch((error) => {
    console.log('Error connecting to MongoDB',error);
})