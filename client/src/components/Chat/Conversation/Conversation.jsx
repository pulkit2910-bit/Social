import React, { useEffect, useState } from "react";
import "./Conversation.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import img1 from "../../../img/img1.png"
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const friendID = conversation.members.find((m) => m !== currentUser._id);
    const fetchUser = async () => {
      const res = await axios.get(`/users?userID=${friendID}`);
      setUser(res.data);
      setLoading(false);
      // console.log(res.data);
    };
    fetchUser();
  }, [conversation, currentUser._id]);

  if (loading) {
    return (
      <SkeletonTheme
        baseColor="rgba(251, 251, 251, 0.33)"
        highlightColor="rgba(83, 84, 84, 0.33)"
      >
        <div>
          <Skeleton height={100} />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="Conversation">
      <div className="conversationWrapper">
        <img src={user.avatar.url} alt="" className="conversationImg" />
        <div className="conversationName">
          <span>{user.name}</span>
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
