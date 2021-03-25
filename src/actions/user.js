import { userConstant } from "./constans";
import firebase from "firebase";
export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstant.GET_USERS}_REQUEST` });

    const db = firebase.firestore();
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      dispatch({
        type: `${userConstant.GET_USERS}_SUCCESS`,
        payload: { users },
      });
    });
    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
        // dispatch({ type: `${userConstant.GET_MESSAGES}`})
      })
      .catch((err) => console.log(err));
  };
};
export const getMessages = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .where("user_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_1 === user.uid_1 &&
              doc.data().user_2 === user.uid_2) ||
            (doc.data().user_1 === user.uid_2 &&
              doc.data().user_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
            if (conversations.length > 0) {
              dispatch({
                type: userConstant.GET_MESSAGES,
                payload: { conversations },
              });
            }
          } else {
            dispatch({
              type: `${userConstant.GET_MESSAGES}_FAILURE`,
              payload: { conversations },
            });
          }
        });
      });
  };
};
