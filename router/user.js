const { Router } = require('express');
const auth = require('../auth.js');
const {
    sendOTP,
    checkUsername,
    signUp,
    signIn,
    signOut,
    getUserData
} = require('../controllers/index.js');

const userRouter = Router();

userRouter.get("/check-username", checkUsername);
userRouter.post('/send-otp', sendOTP);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

//Authenticated Route
userRouter.post("/logout", auth, signOut);
userRouter.get("/userData", auth, getUserData);

module.exports = userRouter;