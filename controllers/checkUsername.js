const User = require('../models/users.model.js');

exports.checkUsername = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ 
            success: false,
            message: "Username is required" 
        });
    }

    try {
        const user = await User.findOne({ username }); // Query the database
        if (user) {
            return res.status(200).json({ 
                success: true,
                unique: false, 
                message: "Username is already taken"
            });
        }
        return res.status(200).json({ 
            success: true,
            unique: true, 
            message: "Username is available" 
        });
    } catch (error) {
        console.error("Error checking username:", error);
        return res.status(500).json({ 
            success: false,
            message: "Server error" 
        });
    }
}