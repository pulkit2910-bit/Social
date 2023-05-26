import React from "react";
import "./Message.css";
import TimeAgo from 'react-timeago'

const Message = ({ own, message }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageText">
          {message.text}
        </div>
      </div>
      <div className="messageBottom">{<TimeAgo date={message.createdAt} />}</div>
    </div>
  );
};

export default Message;
