const router = require('express').Router();

// middlewares
const { deleteUser, updateUser, getUser, followUser, unfollowUser, searchUsers, updatePassword } = require('../controller/userController');
const { verifyUser } = require("../middlewares/authMiddleware");
const { profile_update_upload } = require('../middlewares/multer');

// search users
router.get('/search', verifyUser, searchUsers);

// update user info
router.put('/update', verifyUser, profile_update_upload, updateUser);

// update user password
router.put('/update/password', verifyUser, updatePassword);

// delete user
router.delete('/:userID', verifyUser, deleteUser);

// get user
router.get('/', verifyUser, getUser);

// follow user
router.put('/follow/:userID', verifyUser, followUser);

// unfollow user
router.put('/unfollow/:userID', verifyUser, unfollowUser);

module.exports = router;