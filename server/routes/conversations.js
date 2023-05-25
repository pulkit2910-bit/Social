const router = require("express").Router();
const { newConversation, getConversation } = require("../controller/conversationController");
const { verifyUser } = require("../middlewares/authMiddleware");

// new conversation
router.post("/", verifyUser, newConversation);

// get conversation
router.get("/", verifyUser, getConversation); // query = userID

module.exports = router;