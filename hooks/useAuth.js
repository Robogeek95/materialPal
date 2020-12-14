import { resolveHref } from "next/dist/next-server/lib/router/router";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
// Provider hook that creates an auth object and handles it's state

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props) {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const handleAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getUserAdditionalData(user);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  //   add user details to firebase after user has been created
  const createUser = async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(user)
      .then(function () {})
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  //   creates a user using the firebase "createUserWithEmailAndPassword" function
  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({
          uid: response.user.uid,
          email,
          fname: fname.value,
          lname: lname.value,
        });
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        getUserAdditionalData(user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };

  const getUserAdditionalData = (user) => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(function (user) {
        if (user.exists) {
          setUser(user.data());
        } else {
          // user.data() will be undefined in this case
          console.log("No such user!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  };
};
