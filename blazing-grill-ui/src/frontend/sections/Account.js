import { auth } from "../../database/config";
import { signOut } from "firebase/auth";

function AccountDetails({storeDetails}) {
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
    console.log(storeDetails)
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>
        Store Account Details
      </h1>

      <div
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      > 
      </div>
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
