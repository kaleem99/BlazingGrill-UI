import { auth } from "../../database/config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
function AccountDetails({ storeDetails }) {
  const [email, setEmail] = useState("");
  onAuthStateChanged(auth, (user) => {
    setEmail(user.email);
  });
  const Logout = async (e) => {
    if (window.confirm("Are you sure you want to logout!")) {
    } else {
      return false;
    }
    signOut(auth)
      .then(() => {
        // Signed in
        console.log("signed Out successfully");
        // setState("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Store Account Details</h1>
      {storeDetails.map((stores, i) => {
        if (stores[Object.keys(storeDetails[i])[0]].adminUsername === email) {
          let data = stores[Object.keys(storeDetails[i])[0]];
          return (
            <form className="form">
              <input value={data.store} />
              <input value={data.adminUsername} />
              <input value={data.address} />
            </form>
          );
        }
      })}
      <div
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      ></div>
      <button
        onClick={() => Logout()}
        style={{
          width: "180px",
          height: "40px",
          backgroundColor: "#f7941d",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
        }}
      >
        Logout of store
      </button>
    </div>
  );
}

export default AccountDetails;
