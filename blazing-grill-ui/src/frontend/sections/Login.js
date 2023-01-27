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
function Login({ setState, store }) {
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
    const q = query(
      collection(db, formData.store),
      where("adminUsername", "==", formData.adminUsername)
    );

    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
    });
    const user = doc(db, formData.store, docID);
    await updateDoc(user, {
      isLoggedIn: true,
    });
    e.preventDefault();
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
          {store.map((item, i) => (
            <option key={i} value={item.storeName}>
              {item.storeName}
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
