const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
    {
        conversationID : {
            type : String
        },
        senderID : {
            type : String
        },
        text : {
            type : String 
        }
    },
    { timestamps : true }
)

module.exports = mongoose.model("Message", MessageSchema);