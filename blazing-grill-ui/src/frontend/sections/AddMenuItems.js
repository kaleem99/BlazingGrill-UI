import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../database/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import MenuItemsSection from "../data/menuSections";
function AddMenuItems() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    Information: "",
    fileURL: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange2 = async (e) => {
    e.preventDefault();
  
    const file = e.target.files[0];
    if (!file) return null;
    const storageRef = ref(storage, `files/${formData.name || "image"}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        if (downloadURL) {
          alert("image has been uploaded successfully");
        }
        setFormData({
          ...formData,
          [e.target.name]: downloadURL,
        });
      });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const addTodo = async (e) => {
    e.preventDefault();
    if (formData.category === "" || formData.category === "None") {
      return alert("Please select a valid category");
    }
    if (
      formData.name === "" ||
      formData.price === "" ||
      formData.Information === "" 
      // || formData.fileURL === ""
    ) {
      return alert("Please enter input");
    }

    try {
      const docRef = await addDoc(collection(db, formData.category), formData);
      alert("Food Item has been added successfully.");
    } catch (e) {
    }
  };
  return (
    <div className="AddMenu">
      {/* <img
        className="BlazingImage"
        src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
      ></img> */}
      <form onSubmit={handleSubmit} className="form">
        <br></br>
        <select name="category" id="category" onChange={handleChange}>
          <option value="None">Category</option>
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
          type="name"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <br />
        {/* <label>Price:</label> */}
        <br></br>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <br />
        <br></br>
        <input
          type="text"
          name="Information"
          placeholder="Information"
          value={formData.Information}
          onChange={handleChange}
        />
        <br />
        <br></br>
        <input
          type="file"
          name="fileURL"
          placeholder="upload image"
          onChange={handleChange2}
        />
        <br />
        <br></br>
        <button onClick={(e) => addTodo(e)}>Add Menu Item</button>
      </form>
    </div>
  );
}

export default AddMenuItems;
