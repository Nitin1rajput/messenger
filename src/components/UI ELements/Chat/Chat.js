import React, { useRef } from "react";
import FormInput from "../FormInput/FormInput";
import "./Chat.css";
import add from "./add.png";
import Messages from "../Messages/Messages";
const Chat = ({
  chatStarted,
  chatUser,
  submitMsg,
  msg,
  user,
  auth,
  handleChange,
  openDrawerHandler,
}) => {
  const msgRef = useRef();
  // setInterval(() => {
  //   var element = msgRef.current;
  //   element.scrollTop = element.scrollHeight;
  // }, [1000]);
  return (
    <React.Fragment>
      <div className="chatHeader">
        {chatStarted && (
          <div className="displayPic">
            <img
              src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
              alt=""
            />
          </div>
        )}

        {chatUser}
      </div>
      <div ref={msgRef} className="messageSections">
        {chatStarted &&
          user.conversations.map((conv) => {
            return <Messages conv={conv} auth={auth} />;
          })}
      </div>
      <div style={{ height: "10px" }}></div>
      {chatStarted && chatUser && (
        <div className="chatControls">
          <div className="add-user" onClick={openDrawerHandler}>
            <img src={add} alt="address" />
            {/* <i class="fas fa-address-book"></i> */}
          </div>

          <FormInput
            label="Type your text here"
            msg={msg}
            type="text"
            handleChange={handleChange}
            required
          />

          <div className="send-btn" onClick={submitMsg}>
            <i className="fas fa-paper-plane "></i>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Chat;
