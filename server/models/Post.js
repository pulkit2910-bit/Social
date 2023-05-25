const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "",
      max: 500,
    },
    img: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userID: {
          type: String,
          required: true,
        },
        name : {
          type : String,
          required : true
        },
        avatar : {
          public_id: {
            type: String,
            default: "",
          },
          url: {
            type: String,
            default: "",
          },
        },
        content: {
          type: String,
          required: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
