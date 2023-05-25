const router = require('express').Router();

// middlewares
const { singleUpload } = require('../middlewares/multer');
const { registerUser, loginUser, logoutUser } = require('../controller/authController');

router.post('/register', singleUpload, registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

module.exports = router;