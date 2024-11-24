const {Router} = require('express');
const auth = require('../auth.js');
const Web = require("../models/devWeb.js");
const User = require("../models/users.model.js");
const mailSender = require("../utils/mailSender.js");

const webRouter = Router();

webRouter.post("/register", auth, async (req, res) => {
    const {webName, price} = req.body;

    if(!webName || !price) {
        return res.status(403).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        const user = await User.findById(req.userid);

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered!'
            });
        }

        await Web.create({
            webName: webName,
            price: price,
            owner: user._id
        });

        res.status(200).json({
            success: true,
            message: "User's website has been registered!"
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while registering the website!"
        });
        return;
    }
});

webRouter.get("/send-mail", auth, async (req, res) => {
    const userId = req.userid;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered!'
            });
        }

        const web = await Web.findOne({owner: user._id});

        const sendMail = await mailSender(user.email, "Website Registered", `Your ${web.webName} website request for the developing of project has been registered!<br> Price: ${web.price}`);

        res.status(200).json({
            success: true,
            message: "Email sent successfuly!",
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while sending the email!"
        });
        return;
    }
});

module.exports = webRouter;