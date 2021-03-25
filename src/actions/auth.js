import firebase from "firebase";
import { authConstant } from "./constans";
export const register = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currentUser = firebase.auth().currentUser;
        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                name: user.name,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                const loggedInUser = {
                  name: user.name,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User Logged In");
                dispatch({
                  type: `${authConstant.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                dispatch({
                  type: `${authConstant.USER_LOGIN}_FAILURE`,
                  payload: { error },
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const db = firebase.firestore();
        db.collection("users")
          .doc(data.user.uid)
          .update({ isOnline: true })
          .catch((error) => console.log(error));
        const name = data.user.displayName;
        const loggedInUser = {
          name: name,
          uid: data.user.uid,
          email: data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        dispatch({
          type: `${authConstant.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedInUser },
        });
      })
      .catch((error) => {
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE}`,
          payload: { error },
        });
      });
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstant.USER_LOGIN}_FAILURE}`,
        payload: { error: "Log In Again" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` });
      const db = firebase.firestore();
      db.collection("users")
        .doc(uid)
        .update({ isOnline: false })
        .then(() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              localStorage.clear();
              dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: `${authConstant.USER_LOGOUT}_FAILURE`,
                payload: { error },
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("User not exist");
    }
  };
};
