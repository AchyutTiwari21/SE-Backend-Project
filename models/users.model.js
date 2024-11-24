const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true
        },
        typeOfWebsite: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema); 
module.exports = User;