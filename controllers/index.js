const {checkUsername} = require('./checkUsername.js');
const {getUserData} = require('./getUserData.js');
const {sendOTP} = require('./otpControllers.js');
const {signIn} = require('./signIn.js');
const {signOut} = require('./signOut.js');
const {signUp} = require('./signUp.js');

module.exports = {
    checkUsername,
    getUserData,
    sendOTP,
    signIn,
    signOut,
    signUp
}