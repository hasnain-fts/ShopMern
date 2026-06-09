const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const cores = require('cors');
const productRoutes = require('./routes/productRoutes');
const app = express();
const userRoutes = require('./routes/UserRoutes'); 
dotenv.config();


app.use(express.json());
app.use(cores());

//Routes

app.use('/api/products',productRoutes); 
app.use('/api/users',userRoutes)
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