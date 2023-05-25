const mongoose = require('mongoose');
const jwt  = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
            min: 4,
            max: 20
        },
        avatar: {
            public_id: {
              type: String,
            },
            url: {
              type: String,
              default: "https://res.cloudinary.com/dcz9grvnh/image/upload/v1678971457/profile-unfilled_mseeo9.png"
            }
        },
        username : {
            type : String,
            required : true,
            min: 4,
            max: 20,
            unique: true
        },
        email : {
            type : String,
            required : true,
            max: 50
        },
        password : {
            type : String,
            required : true,
            min : 6,
            max: 20
        },
        coverPicture : {
            public_id: {
                type: String,
            },
            url: {
                type: String,
                default: ""
            }
        },
        bio : {
            type : String,
            default : ""
        },
        followers : {
            type: Array,
            default: []
        },
        following : {
            type: Array,
            default: []
        },
        isAdmin : {
            type : Boolean,
            default: false
        }
    }, 
    {timestamps : true}
)

// coverPicture - url = "https://res.cloudinary.com/dcz9grvnh/image/upload/v1678971457/profile-unfilled_mseeo9.png"

// userSchema.methods.getJWTtoken = () => {
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 30);

//     // console.log(this._id);

//     return jwt.sign(
//         { userID: `${this._id}`, isAdmin: `${this.isAdmin}` }, 
//         process.env.JWT_ACCESS_KEY,
//         { expiresIn: parseInt(exp.getTime() / 1000) } 
//     );
// }

module.exports = mongoose.model('User', userSchema);