import React from "react";
import "./Message.css";
import { format } from "timeago.js"

const Message = ({ own, message }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageText">
          {message.text}
        </div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
