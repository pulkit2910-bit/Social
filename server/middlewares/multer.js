const multer = require('multer'); 

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("profile_pic");

const postUpload = multer({storage}).single("post");

const profile_update_upload = multer({storage}).any();

module.exports = { singleUpload, postUpload, profile_update_upload };