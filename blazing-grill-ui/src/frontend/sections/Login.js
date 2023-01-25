import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/config";
import MenuItemsSection from "../data/menuSections";
function Login({ setState }) {
  const [formData, setFormData] = useState({
    store: "",
    adminUsername: "",
    password: "",
  });

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
  const addTodo = async (e) => {
    e.preventDefault();
    if (
      formData.store === "" ||
      formData.adminUsername === "None" ||
      formData.password === ""
    ) {
      return alert("Please enter all valid details.");
    }
    try {
      const docRef = await addDoc(collection(db, formData.store), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Food Item has been added successfully.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="AddMenu">
      <img
        className="BlazingImage"
        src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
      ></img>
      <h1 style={{ color: "white" }}>
        Login to your store daily to recieve orders.
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <br></br>
        <select name="store" id="store" onChange={handleChange}>
          <option value="None">store Name</option>
          {MenuItemsSection.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
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
        <button onClick={(e) => addTodo(e)}>Login</button>
      </form>
      <p style={{ color: "white" }}>
        Dont Have a store yet Please contact your admin to register.
      </p>
      <button
        onClick={() => setState("Register")}
        style={{
          width: "180px",
          height: "40px",
          backgroundColor: "#f7941d",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
        }}
      >
        Register a store
      </button>
    </div>
  );
}

export default Login;
