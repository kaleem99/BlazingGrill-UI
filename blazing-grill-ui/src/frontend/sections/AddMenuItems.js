import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/config";
import MenuItemsSection from "../data/menuSections";
function AddMenuItems() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
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
    if (formData.category === "" || formData.category === "None") {
      return alert("Please select a valid category");
    }
    if (formData.name === "" || formData.price === "") {
      return alert("Please enter input");
    }
    try {
      const docRef = await addDoc(collection(db, formData.category), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Food Item has been added successfully.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="AddMenu">
    <img className="BlazingImage" src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"></img>
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
        <button onClick={(e) => addTodo(e)}>Add Menu Item</button>
      </form>
    </div>
  );
}

export default AddMenuItems;
