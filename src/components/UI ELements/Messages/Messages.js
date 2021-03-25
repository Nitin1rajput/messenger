import React from "react";
import "./Messages.css";
const Messages = ({ conv, auth }) => {
  return (
    <div
      className="message"
      style={{
        display: conv.user_1 !== auth.uid ? "flex" : "",
      }}
    >
      {conv.user_1 !== auth.uid && (
        <div className="displayPic">
          <img
            src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
            alt=""
          />
        </div>
      )}

      <div
        style={{
          textAlign: conv.user_1 === auth.uid ? "right" : "left",
        }}
      >
        <p className="messageStyle">{conv.msg}</p>
      </div>
    </div>
  );
};

export default Messages;
