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
      <form onSubmit={handleSubmit} className="form">
        <label>category:</label>
        <br></br>
        <select name="category" id="category" onChange={handleChange}>
          <option value="None">None</option>
          {MenuItemsSection.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <br></br>
        <label>name:</label>
        <br></br>
        <input
          type="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label>Price:</label>
        <br></br>
        <input
          type="number"
          name="price"
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
