const io = require("socket.io")(9000, {
    cors : {
        origin : "http://localhost:3000",
    },
})

var users = [];
const addUser = (userID, socketID) => {
    !users.some((user) => user.userID === userID) && users.push({userID, socketID});
}

const removeUser = (socketID) => {
    users = users.filter((user) => user.socketID !== socketID);
}

const getUser = (userID) => {
    return users.find((user) => user.userID === userID);
}

io.on("connection", (socket) => {
    // when connect
    console.log("user connected")
    socket.on("addUser", (userID) => {
        addUser(userID, socket.id);
        io.emit("getUsers", users);
    })

    // send and receive messages
    socket.on("sendMessage", ({ senderID, receiverID, text }) => {
        // console.log(users);
        const user = getUser(receiverID);
        // console.log(user)
        io.to(user?.socketID).emit("getMessage", { senderID, text });
    })

    // when disconnect
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
    
})

// SERVER SIDE
// socket.on -> take event from client
// io.emit -> send event to every client