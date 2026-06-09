const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,  
            required: true,
            trim: true
        },
        lastName: {
            type: String,  
            required: true,
            trim: true
        },
        email: {
            type: String,  
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
        },
        phoneNumber: {
            type: String,  
            required: true,
            trim: true
        },
        password: {
            type: String,  
            required: true,
            minlength: 6
        }
    
    }, 
    { timestamps: true } 
);

module.exports = mongoose.model('User', userSchema);