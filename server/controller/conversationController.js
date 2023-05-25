const Conversation = require('../models/Conversation');

const newConversation = async (req, res) => {
    const newConvo = new Conversation({
        members : [req.body.senderID, req.body.receiverID]
    });

    try {
        const data = await newConvo.save();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getConversation = async (req, res) => {
    try {
        const data = await Conversation.find({
            members : { $in : [req.query.userID] }
        })
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { newConversation, getConversation };