import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import LoadingGif from "../../../img/Loading.gif"
import Emoji from "../../../img/emoji.png"
import Message from "../Message/Message";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const ChatBox = ({ currentUser, currConversation }) => {
  const { socket } = useContext(AuthContext);
  const [friend, setFriend] = useState({});  
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        senderID : data.senderID,
        text : data.text,
        createdAt : Date.now()
      })
      console.log(data);
    })
  }, [socket]);

  useEffect(() => {
    arrivalMessage && currConversation?.members.includes(arrivalMessage.senderID) &&
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currConversation]);

  // fetch current conversation messages
  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      const res = await axios.get(`/messages?convoID=${currConversation._id}`);
      setMessages(res.data);
    }
    if (currConversation) fetchMessages();

  }, [currConversation]);

  // fetch conversation friend
  useEffect(() => {
    const friendID = currConversation?.members?.find((m) => m !== currentUser._id);
    const fetchUser = async () => {
      const res = friendID!=="" ? await axios.get(`/users?userID=${friendID}`): {};
      setFriend(res.data);
      setLoading(false);
    };
    if (currConversation) fetchUser();
  }, [currConversation, currentUser._id]);

  useEffect(() => { 
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages, currConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text==="") return;
    setSending(true);
    const newMsg = {
      conversationID : currConversation._id,
      senderID : currentUser._id,
      text : text
    }

    const receiverID = currConversation.members.find(member => member !== currentUser._id)

    // realtime sending message
    socket.emit("sendMessage", {
      senderID : currentUser._id,
      receiverID : receiverID,
      text : text
    })

    try {
      const res = await axios.post("/messages/", newMsg);
      setMessages([...messages, res.data]);
      setText("");
      setSending(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (loading && currConversation) {
    return (
      <div className="ChatBox">
        <img src={LoadingGif} alt="" className="chatLoading" />
      </div>
    )
  }

  return (
    <div className="ChatBox">
      {currConversation ? 
        <>
          <div className="chatboxheader">
            <div>
              <img src={friend.avatar.url} alt="" className="friendImg" />
              <div className="friendName">
                <span>{friend.name}</span>
                <span>Online</span>
              </div>
            </div>
            <hr />
          </div>

          <div className="chatboxmiddle" ref={scrollRef}>
            {
              messages.map((m, k) => {
                return (<div>
                  <Message own={m.senderID === currentUser._id} message={m} key={k} />
                </div>)
              })
            }
          </div>

          <div className="chatboxfooter">
            <form className="sendmessage" onSubmit={handleSubmit}>
              <img src={Emoji} alt="" className="emoji" />
              <input value={text} type="text" placeholder="Type a message" onChange={(e) => setText(e.target.value)} required />
              <button type="submit" className="button" disabled={sending}>
                {sending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </>  : 
        <div className="noConversation">
          Open a Conversation to start a chat
        </div>
      }
    </div>
  );
};

export default ChatBox;
