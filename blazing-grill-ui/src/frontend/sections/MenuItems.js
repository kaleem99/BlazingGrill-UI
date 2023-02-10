import { useState } from "react";
import MenuItemsSection from "../data/menuSections";
import { db, storage } from "../../database/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
function MenuItems() {
  const [itemSection, setItemSection] = useState("");
  const [items, setItems] = useState([]);
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const itemsFields = ["name", "price", "Information", "Update Image"];

  const itemsSectionComp = (name) => {
    // fetchPost();
    console.log(items, name);
    return (
      <div className="ItemsSections">
        {itemName === "" ? (
          <div>
            {items.map((food, i) => {
              return (
                <div className="HomeFoodItemName">
                  <div className="inputDetails">
                    <div
                      id="input0"
                      className={food.id}
                      name={"name"}
                      onClick={() => setItemName(food)}
                      // defaultValue={food.name}
                    >
                      {food.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {itemsFields.map((item, i) => {
              return (
                <div
                  style={{ display: "grid", gridTemplateColumns: "15% auto" }}
                >
                  {i < itemsFields.length - 1 ? (
                    <label>{item}:</label>
                  ) : (
                    <label>Update Image:</label>
                  )}
                  {i < itemsFields.length - 1 ? (
                    <input
                      id={itemName.id}
                      className="input01"
                      value={itemName[item]}
                    />
                  ) : (
                    <input
                      type="file"
                      name="fileURL"
                      className="input01"
                      placeholder="upload image"
                      onChange={UploadImage}
                    />
                  )}
                </div>
              );
            })}
            <img
              style={{
                width: "300px",
                height: "300px",
                marginLeft: "0px",
                marginRight: "auto",
              }}
              src={itemName.fileURL}
            ></img>
            <div
              style={{
                width: "400px",
                margin: "auto",
                display: "grid",
                gridTemplateColumns: "auto auto",
              }}
            >
              <button
                className="FuncButtons"
                id={itemName.id}
                onClick={(e) => updateData(e, name)}
              >
                Update
              </button>
              <button
                className="FuncButtons"
                id={itemName.id}
                onClick={(e) => handleDelete(e, name)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  const goBack = () => {
    setItemSection("");
    setItems([]);
    setItemName("");
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
    let data = document.querySelectorAll(`.input01`);
    let tableRow = data[0];
    let tableRowPrice = data[1];
    let tableRowInformation = data[2];
    // return false;
    const taskDocRef = await doc(db, name, e.target.id);
    console.log(taskDocRef, name);
    if (
      tableRow.value === "" ||
      tableRowPrice.value === "" ||
      tableRowInformation.value === ""
    ) {
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
        Information: tableRowInformation.value,
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
  const UploadImage = async (e) => {
    e.preventDefault();
    const taskDocRef = await doc(db, itemName.category, itemName.id);
    console.log(taskDocRef);
    const file = e.target.files[0];
    if (!file) return null;
    const storageRef = ref(storage, `files/${itemName.name || "image"}`);
    console.log(storageRef, "+++");
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        if (downloadURL) {
          alert("image has been uploaded successfully");
        }
        try {
          updateDoc(taskDocRef, {
            fileURL: downloadURL,
          });
          alert("Table row has been succesfully updated.");
          fetchPost(itemSection);
          setItemName(itemName);
          itemsSectionComp(itemSection);
        } catch (err) {
          alert(err);
        }
        // setFormData({
        //   ...formData,
        //   [e.target.name]: downloadURL,
        // });
      });
    });
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "20% auto 20%",
              margin: "auto",
              width: "80%",
            }}
          >
            <button className="FuncButtons" onClick={() => goBack()}>
              Back
            </button>
            <p
              className="ItemName"
              style={{
                fontSize: "40px",
                color: "white",
                // position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                margin: "10px auto",
                maxWidth: "300px",
              }}
            >
              {itemSection}
            </p>
          </div>
          {itemsSectionComp(itemSection)}
        </>
      )}
    </div>
  );
}

export default MenuItems;
