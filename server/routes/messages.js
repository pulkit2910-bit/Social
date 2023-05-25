const router = require("express").Router();
const { newMessage, getMessage } = require("../controller/messageController");
const { verifyUser } = require("../middlewares/authMiddleware");


router.post("/", verifyUser, newMessage);

router.get("/", verifyUser, getMessage); // query = convoID

module.exports = router;