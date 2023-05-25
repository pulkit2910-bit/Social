const Message = require("../models/Message");

const newMessage = async (req, res) => {
    const newMsg = new Message(req.body);

    try {
        const data = await newMsg.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(data);
    }
}

const getMessage = async (req, res) => {
    try {
        const data = await Message.find({
            conversationID : req.query.convoID
        })
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { newMessage, getMessage }