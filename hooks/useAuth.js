import { resolveHref } from "next/dist/next-server/lib/router/router";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, facebookProvider, googleProvider } from "../config/firebase";
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
      .then(function () {
        console.log("saved user details in db");
      })
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

  const googleSignIn = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.AIzaSyCZvFDrr9T8i90RgdXIU01wVVktUVVyoO0
        // let user = result.user;

        let name = result.user.displayName.split(" ");

        let details = {
          uid: result.user.uid,
          email: result.user.email,
          fname: name[0],
          lname: name[1],
        };

        return details;
      })
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  };

  const facebookSignIn = () => {
    return auth
      .signInWithPopup(facebookProvider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        console.log(result);
        let token = result.credential.accessToken;
        // console.log("name");

        let name = result.user.displayName.split(" ");

        let details = {
          uid: result.user.uid,
          email: result.user.email,
          fname: name[0],
          lname: name[1],
        };

        console.log(details);

        return details;
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  };

  const signInWithGoogle = async () => {
    await googleSignIn().then((res) => {
      setUser(res);
      getUserAdditionalData(user);
    });
  };

  const signInWithFacebook = async () => {
    await facebookSignIn().then((res) => {
      setUser(res);
      getUserAdditionalData(user);
    });
  };

  const signUpWithGoogle = async () => {
    await googleSignIn().then((res) => {
      return createUser(res);
    });
  };

  const signUpWithFacebook = async () => {
    await facebookSignIn().then((res) => {
      return createUser(res);
    });
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    signInWithGoogle,
    signInWithFacebook,
    signUpWithGoogle,
    signUpWithFacebook,
  };
};
