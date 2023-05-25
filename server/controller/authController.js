const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendToken } = require('../utils/sendToken');
const { getDataUri } = require('../utils/dataUri');
const cloudinary = require('cloudinary');

const registerUser = async (req, res) => {
    const file = req.file;
    
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        var newUser;
        if (file) {
            const fileUri = getDataUri(file);
            const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
            // console.log(cloud);
            newUser = await new User({
                name : req.body.name,
                username : req.body.username,
                email: req.body.email,
                password : hashPassword,
                isAdmin: req.body.isAdmin,
                avatar : {
                    public_id : cloud.public_id,
                    url : cloud.secure_url
                }
            });
        } else {
            newUser = await new User({
                name : req.body.name,
                username : req.body.username,
                email: req.body.email,
                password : hashPassword,
                isAdmin: req.body.isAdmin
            });
        }
        const user = await newUser.save();
        res.status(200).json(user);   
    } catch(err) {
        res.status(500).json(err);
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find user in MongoDB
        const user = await User.findOne({email : email});
        !user && res.status(404).json({
            message : 'User not Found !',
            status : 404
        });

        // Validate Password
        const validatePassword = await bcrypt.compare(password, user.password);
        !validatePassword && res.status(400).json({
            message : "Incorrect password",
            status : 400
        });
        
        sendToken(user, 200, res);

    } catch(err) {
        console.log(err)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json('User has been logged out !');
}

module.exports = { registerUser, loginUser, logoutUser };