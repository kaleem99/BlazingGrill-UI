import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/config";
import { auth } from "../../database/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import MenuItemsSection from "../data/menuSections";
function Register({ setState }) {
  const [formData, setFormData] = useState({
    store: "",
    adminUsername: "",
    password: "",
    isLoggedIn: false,
  });
  const [credentials, setCredentials] = useState("");
  const [address, setAddress] = useState("");
  const Register = async (e) => {
    e.preventDefault();
    if (
      formData.store === "" ||
      formData.adminUsername === "None" ||
      formData.password === "" ||
      formData.credentials === ""
    ) {
      return alert("Please enter all valid details.");
    }
    if (credentials !== "EnterSuper****User@2000+") {
      return alert("Incorrect admin credentials");
    }
    // try {
    formData["address"] = address;
    //   const docRef = await addDoc(collection(db, formData.store), formData);
    const docRef2 = await addDoc(collection(db, "BlazingStores"), {
      formData,
    });

    //   console.log("Document written with ID: ", docRef.id);
    //   alert("store has been created successfully");
    // } catch (e) {
    //   console.error("Error adding store: ", e);
    // }
    await createUserWithEmailAndPassword(
      auth,
      formData.adminUsername,
      formData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("Successful");
        // navigate("/login");
        setState("Login");
        // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange2 = (event) => {
    if (event.target.name === "credentials") {
      setCredentials(event.target.value);
    } else {
      setAddress(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server
  };
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Register a store.</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="store"
          value={formData.store}
          placeholder="store name"
          onChange={handleChange}
        />
        <br></br>
        {/* <label>name:</label> */}
        <br></br>
        <input
          type="email"
          name="adminUsername"
          value={formData.adminUsername}
          placeholder="store email"
          onChange={handleChange}
        />
        <br />
        {/* <label>Price:</label> */}
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="store password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br></br>
        <input
          type="password"
          name="credentials"
          placeholder="admin credentials"
          value={credentials}
          onChange={handleChange2}
        />
        <br />
        <br></br>
        <input
          type="search"
          name="address"
          placeholder="Store address"
          value={address}
          onChange={handleChange2}
        />
        <br />
        <br></br>
        <button onClick={(e) => Register(e)}>Register</button>
      </form>
      <p style={{ color: "white" }}>
        Dont Have a store yet Please contact your admin to register.
      </p>
      <h2
        onClick={() => setState("")}
        style={{
          // width: "180px",
          // height: "40px",
          color: "#f7941d",
          borderRadius: "7px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Login
      </h2>
    </div>
  );
}

export default Register;
