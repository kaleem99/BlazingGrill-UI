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
  where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
function MenuItems({ adminUserEmail, setState }) {
  const [itemSection, setItemSection] = useState("");
  const [items, setItems] = useState([]);
  const [inputPrice, setInputPrice] = useState(0);
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const itemsFields = ["name", "price", "Information", "Update Image"];
  const [operator, setOperator] = useState("Add");
  const [extrasDropDown, setExtrasDropDown] = useState({
    extras: false,
    flavours: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    Information: "",
  });
  const [extras, setExtras] = useState([
    {
      name: "",
      price: "",
    },
    {
      name: "",
      price: "",
    },
    {
      name: "",
      price: "",
    },
    {
      name: "",
      price: "",
    },
    {
      name: "",
      price: "",
    },
  ]);
  const [flavours, setFlavours] = useState([
    {
      name: "",
    },
    {
      name: "",
    },
    {
      name: "",
    },
    {
      name: "",
    },
  ]);
  const handleExtrasChange = (event, index) => {
    const { name, value } = event.target;
    setExtras((prevExtras) => {
      const newExtras = [...prevExtras];
      newExtras[index] = { ...newExtras[index], [name]: value };
      return newExtras;
    });
  };
  const handleFlavourChange = (event, index) => {
    const { name, value } = event.target;
    setFlavours((prevExtras) => {
      const newExtras = [...prevExtras];
      newExtras[index] = { ...newExtras[index], [name]: value };
      return newExtras;
    });
  };
  const setItemsData = (food) => {
    let updatedExtras = extras;
    let updatedFlavours = flavours;
    setItemName(food);
    setFormData({
      ...formData,
      name: food.name,
      price: food.price,
      Information: food.Information,
    });
    if (food.extras !== undefined) {
      updatedExtras = extras.map((extra, index) => {
        if (index < food.extras.length) {
          return {
            name: food.extras[index].name,
            price: food.extras[index].price,
          };
        }
        return extra;
      });
    }
    if (food.flavours !== undefined) {
      updatedFlavours = flavours.map((extra, index) => {
        if (index < food.flavours.length) {
          return {
            name: food.flavours[index].name,
          };
        }
        return extra;
      });
    }
    setFlavours(updatedFlavours);
    setExtras(updatedExtras);
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const updateMultipleItemsPrices = async () => {
    const result = window.confirm(
      "Are you sure you would like to update all " + itemSection
    );
    if (!result) {
      return false;
    }
    try {
      const querySnapshot = await getDocs(collection(db, "Burgers"));
      // Example data with updated prices
      const updatedData = [
        // ... your updated data objects here ...
      ];
      // await getDocs(collection(db, name)).then((querySnapshot) => {
      //   const newData = querySnapshot.docs.map((doc) => ({
      //     ...doc.data(),
      //     id: doc.id,
      //   }));
      //   setItems(newData);
      // });
      items.map(async (data, i) => {
        if (items) {
          const docRef = doc(db, "Burgers", data.id);
          let newPrice = 0;
          if (operator === "Add") {
            newPrice = parseFloat(data.price) + parseFloat(inputPrice);
          } else {
            newPrice = parseFloat(data.price) - parseFloat(inputPrice);
          }
          data.price = newPrice.toFixed(2);
          await updateDoc(docRef, data);
        }
      });
      alert(`All ${itemSection} prices was updates successfully`);
    } catch (error) {
      alert("Error updating documents:", error);
    }
  };
  const itemsSectionComp = (name) => {
    // fetchPost();
    if (itemName === "") {
      return (
        <div className="ItemsSections">
          <div
            style={{
              width: "96%",
              margin: "auto",
              display: "flex",
              height: "80px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid white",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "300px" }}>
              <label>Operation: Add or Subtract</label>
            </div>
            <select
              style={{
                width: "170px",
                height: "40px",
                borderRadius: "10px",
                background: "transparent",
                color: "white",
                fontSize: "large",
              }}
              id="category"
              onChange={(e) => setOperator(e.target.value)}
              value={"Add"}
            >
              <option value={"Add"}>Add</option>
              <option value={"Subtract"}>Subtract</option>
            </select>
            <div style={{ width: "140px" }}>
              <label>Price: </label>
            </div>
            <input
              onChange={(e) => setInputPrice(e.target.value)}
              type="number"
              id="input0"
              value={inputPrice}
              placeholder="enter input amount"
            />
          </div>

          <div className="HomeFoodItemDiv">
            {items
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((food, i) => {
                return (
                  <div className="HomeFoodItemName">
                    <div className="inputDetails">
                      <div
                        id="input0"
                        className={food.id}
                        name={"name"}
                        onClick={() => setItemsData(food)}
                        // defaultValue={food.name}
                      >
                        {i + 1}
                        {")"}. {food.name}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="ItemsSections">
          {itemsFields.map((item, i) => {
            return (
              <div style={{ display: "grid", gridTemplateColumns: "15% auto" }}>
                {i < itemsFields.length - 1 ? (
                  <label className="MenuItemsLabels">{item}:</label>
                ) : (
                  <label className="MenuItemsLabels">Update Image:</label>
                )}
                {i < itemsFields.length - 1 ? (
                  <input
                    id={itemName.id}
                    className="input01"
                    // defaultValue={itemName[item]}
                    name={item}
                    value={formData[item]}
                    onChange={handleChange}
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
          <div
            style={{
              width: "98%",
              height: "auto",
              display: "grid",
              gridTemplateColumns: "33% auto 33%",
              margin: "2% auto",
              // background: "red",
            }}
          >
            <div
              style={{
                width: "90%",
                // border: "1px solid white",
                margin: "0% auto",
                padding: "5px",
              }}
            >
              <button
                style={{
                  color: "white",
                  background: "#F0941E",
                  fontSize: "32px",
                  width: "100%",
                  // borderRadius: "10px",
                  padding: "5px",
                  border: "none",
                }}
                onClick={() => {
                  setExtrasDropDown((prevState) => ({
                    ...prevState,
                    extras: !prevState.extras,
                  }));
                }}
              >
                Extras
              </button>
              {extrasDropDown.extras && (
                <table style={{}}>
                  <thead>
                    <tr>
                      <th style={{ fontSize: "25px" }}>Name:</th>
                      <th style={{ fontSize: "25px" }}>Price:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extras.map((data, i) => (
                      <tr style={{ background: "transparent" }} key={i}>
                        <td>
                          <input
                            name="name"
                            className="extrasInput"
                            placeholder="Name"
                            onChange={(e) => handleExtrasChange(e, i)}
                            value={data.name}
                          />
                        </td>
                        <td>
                          <input
                            name="price"
                            className="extrasInput"
                            placeholder="Price"
                            type="number"
                            onChange={(e) => handleExtrasChange(e, i)}
                            value={data.price}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <img
                style={{
                  width: "400px",
                  height: "280px",
                  marginLeft: "0px",
                  marginRight: "auto",
                  // float: "right",
                }}
                alt=""
                // alt="no Image added"
                src={
                  itemName.fileURL
                    ? itemName.fileURL
                    : require("../../assets/NoImage.jpeg")
                }
              ></img>
            </div>
            <div
              style={{
                width: "90%",
                // border: "1px solid white",
                margin: "0% auto",
                padding: "5px",
              }}
            >
              <button
                style={{
                  color: "white",
                  background: "#F0941E",
                  fontSize: "32px",
                  width: "100%",
                  // borderRadius: "10px",
                  padding: "5px",
                  border: "none",
                }}
                onClick={() => {
                  setExtrasDropDown((prevState) => ({
                    ...prevState,
                    flavours: !prevState.flavours,
                  }));
                }}
              >
                Flavour
              </button>
              {extrasDropDown.flavours && (
                <table style={{}}>
                  <thead>
                    <tr>
                      <th style={{ fontSize: "25px" }}>Name:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flavours.map((data, i) => (
                      <tr style={{ background: "transparent" }} key={i}>
                        <td>
                          <input
                            name="name"
                            className="extrasInput"
                            placeholder="Name"
                            onChange={(e) => handleFlavourChange(e, i)}
                            value={data.name}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div
            style={{
              width: "400px",
              margin: "20px auto",
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
        </div>
      );
    }
  };
  const goBack = () => {
    if (itemName === "") {
      setItemSection("");
      setItems([]);
    } else {
      setItemName("");
      setExtras([
        {
          name: "",
          price: "",
        },
        {
          name: "",
          price: "",
        },
        {
          name: "",
          price: "",
        },
        {
          name: "",
          price: "",
        },
        {
          name: "",
          price: "",
        },
      ]);
      setFlavours([
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ]);
    }
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
      name !== "Extras" &&
      (tableRow.value === "" ||
        tableRowPrice.value === "" ||
        tableRowInformation.value === "")
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
        extras: extras,
        flavours: flavours,
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
    const file = e.target.files[0];
    if (!file) return null;
    const storageRef = ref(storage, `files/${itemName.name || "image"}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        if (downloadURL) {
          alert("image has been uploaded successfully");
          // let result = itemName;
          // let result2 = (itemSection);
          setItemName("");
          // window.location.reload();
        }
        try {
          updateDoc(taskDocRef, {
            fileURL: downloadURL,
          });
          alert("Table row has been successfully updated.");
          fetchPost(itemSection);
          setItemName(itemName);
          itemsSectionComp(itemSection);
        } catch (err) {
          alert(err);
        }
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
                  onClick={() =>
                    adminUserEmail === "yushaa@theblazinggrill.co.za" ||
                    adminUserEmail === "kaleem1999@outlook.com"
                      ? itemClick(item.name)
                      : alert("Only admin  user has full access.")
                  }
                >
                  <img alt="" className="MenuImage" src={item.img}></img>
                  <text className="itemName">{item.name}</text>
                </div>
              );
            })}
            <div
              className="menuNameImage"
              onClick={() =>
                adminUserEmail === "yushaa@theblazinggrill.co.za" ||
                adminUserEmail === "kaleem1999@outlook.com"
                  ? setState("MenuSection")
                  : alert("Only admin  user has full access.")
              }
            >
              <img
                alt=""
                className="MenuImage"
                src="https://kaleem99.github.io/The-Blazing-Grill-Images/sectionsImages.png"
              ></img>
              <text className="itemName">Sections</text>
            </div>
            {/* <div
              className="menuNameImage"
              onClick={() =>
                adminUserEmail === "yushaa@theblazinggrill.co.za" ||
                adminUserEmail === "kaleem1999@outlook.com"
                  ? setState("MenuSection")
                  : alert("Only admin  user has full access.")
              }
            >
              <img
                alt=""
                className="MenuImage"
                src="https://kaleem99.github.io/The-Blazing-Grill-Images/sectionsImages.png"
              ></img>
              <text className="itemName">Place InStore Order</text>
            </div> */}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns: "20% auto 20%",
              margin: "auto",
              width: "80%",
            }}
          >
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
      {itemSection && (
        <div
          style={{
            width: "86%",
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{ width: "200px" }}
            className="FuncButtons"
            onClick={() => goBack()}
          >
            Back
          </button>
          <p>&nbsp;&nbsp; &nbsp; </p>
          {itemName === "" && (
            <button
              style={{ width: "200px" }}
              onClick={() => updateMultipleItemsPrices()}
              className="FuncButtons"
            >
              Update all {itemSection}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuItems;
