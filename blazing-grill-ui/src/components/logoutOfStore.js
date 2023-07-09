import { signOut } from "firebase/auth";
import { auth } from "../database/config";
const logout = async (setState) => {
  if (window.confirm("Are you sure you want to logout!")) {
    return signOut(auth)
      .then(() => {
        // Signed in
        console.log("signed Out successfully");
        setState("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  } else {
    return false;
  }
};

export default logout;
