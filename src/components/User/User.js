import React from "react";

const User = ({ u, onClick }) => {
  return (
    <div onClick={() => onClick(u)} key={u.uid} className="displayName">
      <div className="displayPic">
        <img
          src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>{u.name}</span>
        <span
          className={u.isOnline ? "online-status" : "online-status off"}
        ></span>
      </div>
    </div>
  );
};

export default User;
