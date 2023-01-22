import { useState } from "react";
import MenuItemsSection from "../data/menuSections";
import { db } from "../../database/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
function MenuItems() {
  const [itemSection, setItemSection] = useState("");
  const [items, setItems] = useState([]);
  const itemsSectionComp = (name) => {
    // fetchPost();
    console.log(itemSection);
    return (
      <div className="ItemsSections">
        <h1 className="BackItemsMenu" onClick={() => setItemSection("")}>
          Back
        </h1>
        <h1>{name}</h1>
        <div>
          {items.map((food, i) => {
            return (
              <div>
                <h1>{food.name}</h1>
                <h1>{food.price}</h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const itemClick = (name) => {
    fetchPost(name);
    setItemSection(name);
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
  return (
    <div>
      {itemSection === "" ? (
        <div className="Menu">
          <h1>Menu Items</h1>
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
        itemsSectionComp(itemSection)
      )}
    </div>
  );
}

export default MenuItems;
