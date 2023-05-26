import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import ChatRight from "../../components/Chat/ChatRight/ChatRight";
import ChatBox from "../../components/Chat/ChatBox/ChatBox";
import LogoSearch from "../../components/home/LogoSearch/LogoSearch";
import Conversation from "../../components/Chat/Conversation/Conversation";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currConversation, setCurrConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get(`/conversations?userID=${user._id}`);
      // console.log(res);
      setConversations(res.data);
    };
    fetchConversations();
    setLoading(false);
  }, [user._id]);


  // console.log(currConversation);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Chat">
      <div className="ChatLeft">
        <LogoSearch />
        <div className="chatLeftWrapper">
          <div>
            <h1 style={{ margin: "0" }}>Chats</h1>
            <div className="conversations">
              {conversations.map((c, k) => {
                return (
                  <div key={k} onClick={() => { setCurrConversation(c); }} >
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ChatBox currentUser={user} currConversation={currConversation} />
      <ChatRight />
    </div>
  );
};

export default Chat;
