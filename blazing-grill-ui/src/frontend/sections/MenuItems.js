import { useState } from "react";
import MenuItemsSection from "../data/menuSections";
import { db } from "../../database/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
function MenuItems() {
  const [itemSection, setItemSection] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState("");
  const itemsSectionComp = (name) => {
    // fetchPost();
    return (
      <div className="ItemsSections">
        <h1 className="ItemName">{name}</h1>
        <div>
          {items.map((food, i) => {
            return (
              <div className="HomeFoodItemName">
                <input
                  id="input0"
                  className={food.id}
                  name={"name"}
                  defaultValue={food.name}
                />
                <input
                  className="input0"
                  id={food.id}
                  defaultValue={"R" + food.price}
                />
                <button
                  className="FuncButtons"
                  id={food.id}
                  onClick={(e) => updateData(e, name)}
                >
                  Update
                </button>
                <button
                  id={food.id}
                  onClick={(e) => handleDelete(e, name)}
                  className="FuncButtons"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const goBack = () => {
    setItemSection("");
    setItems([]);
  };
  const itemClick = (name) => {
    fetchPost(name);
    setItemSection(name);
    let nameImage = "";
    for (let i = 0; i < MenuItemsSection.length; i++) {
      if (MenuItemsSection[i].name === name) {
        nameImage = MenuItemsSection[i].img;
        break;
      }
    }
    setImage(nameImage);
  };
  const fetchPost = async (name) => {
    await getDocs(collection(db, name)).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(newData);
      console.log(newData);
    });
  };
  const updateData = async (e, name) => {
    e.preventDefault();
    let tableRow = document.querySelector(`.${e.target.id}`);
    let tableRowPrice = document.querySelector(`#${e.target.id}`);
    const taskDocRef = await doc(db, name, e.target.id);
    if (tableRow.value === "" || tableRowPrice.value === "") {
      tableRow.value = tableRow.defaultValue;
      tableRowPrice.value = tableRowPrice.defaultValue;
      alert("Please ensure not leave the input empty");
      return false;
    }
    if (tableRowPrice.value[0] === "R") {
      tableRowPrice.value = tableRowPrice.value.slice(
        1,
        tableRowPrice.value.length
      );
    }
    try {
      await updateDoc(taskDocRef, {
        name: tableRow.value,
        price: tableRowPrice.value,
      });
      alert("Table row has been succesfully updated.");
      fetchPost(name);
    } catch (err) {
      alert(err);
    }
  };
  const handleDelete = async (e, name) => {
    const taskDocRef = doc(db, name, e.target.id);
    let result = window.confirm("Are you sure to delete?");
    console.log(result);
    if (!result) {
      return false;
    }
    try {
      await deleteDoc(taskDocRef);
      alert("Menu item has been deleted successfully.");
      fetchPost(name);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="Home">
      {itemSection === "" ? (
        <div className="Menu">
          {/* <h1>Menu Items</h1ˆ> */}
          <div className="items">
            {MenuItemsSection.map((item) => {
              return (
                <div
                  className="menuNameImage"
                  onClick={() => itemClick(item.name)}
                >
                  <img className="MenuImage" src={item.img}></img>
                  <h1 className="itemName">{item.name}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <img className="sectionImage" src={image}></img>
          <h1 className="BackItemsMenu" onClick={() => goBack()}>
            Back
          </h1>
          {itemsSectionComp(itemSection)}
        </>
      )}
    </div>
  );
}

export default MenuItems;
