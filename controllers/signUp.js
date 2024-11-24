const User = require('../models/users.model.js');
const OTP = require('../models/otp.model.js');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    console.log('Request reached!  ', req.body);
    const { name, username, email, password, companyName, typeOfWebsite, otp }  = req.body;

    // Check if all details are provided
    if (!name || !email || !username|| !companyName || !typeOfWebsite || !password || !otp) {
        return res.status(403).json({
          success: false,
          message: 'All fields are required',
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
      await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        companyName: companyName,
        typeOfWebsite: typeOfWebsite
      });
      
      res.status(200).json({
        success: true,
        message: "You are signed up!"
      });
      return;
    } catch(e) {
      res.status(500).json({
        success: false,
        message: "Error while signing up!"
      });
      return;
    }
}