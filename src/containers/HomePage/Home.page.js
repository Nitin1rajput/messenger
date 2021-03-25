import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  getRealtimeUsers,
  updateMessage,
} from "../../actions/user";
import Layout from "../../components/Layout/Layout";
import User from "../../components/User/User";
import Chat from "../../components/UI ELements/Chat/Chat";

import "./HomePage.css";
import SideDrawer from "../../components/UI ELements/SideDrawer/SideDrawer";
import Backdrop from "../../components/UI ELements/Backdrop/Backdrop";

const HomePage = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [userUid, setUserUid] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 786);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  useEffect(() => {
    let unsubscribe;
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => console.log(error));
    return () => {
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, [auth.uid, dispatch]);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 786);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.name}`);
    setUserUid(user.uid);
    dispatch(getMessages({ uid_1: auth.uid, uid_2: user.uid }));
  };
  const submitMsg = () => {
    const msgObj = {
      user_1: auth.uid,
      user_2: userUid,
      msg,
    };

    if (msg !== "") {
      dispatch(updateMessage(msgObj)).then(() => setMsg(""));
      setMsg("");
    }
  };
  const handleChange = (e) => setMsg(e.target.value);
  return (
    <Layout>
      <section className="container">
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <div className="listOfUsers">
            {user.users.length > 0 &&
              user.users.map((u) => (
                <User onClick={initChat} key={u.uid} u={u} />
              ))}
          </div>
        </SideDrawer>
        {!chatStarted && (
          <div className="listOfUsers">
            {user.users.length > 0 &&
              user.users.map((u) => (
                <User onClick={initChat} key={u.uid} u={u} />
              ))}
          </div>
        )}
        {isDesktop && chatStarted && (
          <div className="listOfUsers" style={{ width: "30%" }}>
            {user.users.length > 0 &&
              user.users.map((u) => (
                <User onClick={initChat} key={u.uid} u={u} />
              ))}
          </div>
        )}
        <div className="chatArea">
          <Chat
            openDrawerHandler={openDrawerHandler}
            msg={msg}
            chatUser={chatUser}
            chatStarted={chatStarted}
            submitMsg={submitMsg}
            auth={auth}
            user={user}
            handleChange={handleChange}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
