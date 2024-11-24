const User = require('../models/users.model.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const bcrypt = require('bcrypt');

exports.signIn = async (req, res) => {
    const { username, password, email } = req.body;

    if(!username || !password || !email) {
        return res.status(403).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        const user = await User.findOne({
            username: username,
            email: email
        });

        let passwordMatch = null;
        if(user) {
            passwordMatch = await bcrypt.compare(password, user.password);
        }

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        };
        

        if(user && passwordMatch) {
            const token = jwt.sign({
                userid: user._id
            }, config.JWT_SECRET);

            res
            .status(200)
            .cookie("token", token, options)
            .json({
                success: true,
                token,
            });
            return;
        } else {
            res.status(403).send({
                success: false,
                message: "Invalid username or/and password!"
            });
            return;
        }
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Error while signing in!"
        });
        return;
    }
}