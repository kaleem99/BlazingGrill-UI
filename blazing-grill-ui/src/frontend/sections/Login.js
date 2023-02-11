import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../database/config";
import MenuItemsSection from "../data/menuSections";
import { auth } from "../../database/config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ setState, store, setStoreDetails, storeDetails }) {
  const [formData, setFormData] = useState({
    store: "",
    adminUsername: "",
    password: "",
  });
  const [items, setItems] = useState([]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server
  };
  const Login = async (e) => {
    if (
      formData.store === "" ||
      formData.store === "None" ||
      formData.adminUsername === "" ||
      formData.password === ""
    ) {
      return alert("Please enter all valid details.");
    }
    signInWithEmailAndPassword(auth, formData.adminUsername, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setState("Logout");
        alert("Welcome ")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div className="AddMenu">
     
      <h1 style={{ color: "white" }}>
        Login to your store daily to recieve orders.
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <br></br>
        <select name="store" id="store" onChange={handleChange}>
          <option value="None">store Name</option>
          {storeDetails.length > 0 &&
            storeDetails.map((item, i) => (
              <option key={i} value={item["formData"].store}>
                {item["formData"].store}
              </option>
            ))}
        </select>
        <br></br>
        {/* <label>name:</label> */}
        <br></br>
        <input
          type="text"
          name="adminUsername"
          value={formData.adminUsername}
          placeholder="admin Username"
          onChange={handleChange}
        />
        <br />
        {/* <label>Price:</label> */}
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br></br>
        <button onClick={(e) => Login(e)}>Login</button>
      </form>
      <div
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      >
        <p style={{ color: "white" }}>
          Dont Have a store yet. Please contact your admin to Register.
        </p>
        <h2
          onClick={() => setState("Register")}
          style={{
            // width: "180px",
            // height: "40px",
            color: "#f7941d",
            borderRadius: "7px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Register a store
        </h2>
      </div>
    </div>
  );
}

export default Login;
