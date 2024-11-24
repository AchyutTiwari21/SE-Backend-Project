const User = require('../models/users.model.js');

exports.getUserData = async (req, res) => {
    const userid = req.userid;
    
    try {
        const user = await User.findById(userid).select("-password");
        if(user) {
            res.status(200).json({
                success: true,
                user
            });
            return;
        } else {
            res.status(403).json({
               success: false,
               message: "Invalid Username and/or Password!"
            });
            return;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching the data."
        });
        return;
    }
}