const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet'); // for securing response/request headers
const cors = require('cors');
const morgan = require('morgan'); // for logging requests
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

const app = express();
dotenv.config();

// cloudinary config
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

// MongoDB connect
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, (err) => {
        if (err) console.log(err);
        else console.log('Connected to MongoDB');
    }
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

// Users
app.use('/api/users', userRoute);

// Auth
app.use('/api/auth', authRoute);

// Posts
app.use('/api/posts', postRoute);

// Conversations
app.use('/api/conversations', conversationRoute);

// Messages
app.use('/api/messages', messageRoute);

app.listen(8000, () => {
    console.log('Server running at port 8000');
})