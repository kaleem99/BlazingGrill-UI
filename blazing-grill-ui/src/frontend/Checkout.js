import { useEffect, useState } from "react";
import ViewItem from "../components/viewItems";
import getDateAndTime from "../helpers/getDataAndTime";
import Modal from "react-modal";
import { db } from "../database/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import SendEmailOrder from "../components/sendEmailOrder";
import { generateUniqueOrderNumber } from "../helpers/generateOrderNumber";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
  },
};
function Checkout({
  getTotalFromCart,
  selectedItem,
  setSelectedItem,
  total,
  setItemState,
  store,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  // view cart items states
  const [quantity, setQuantity] = useState(0);
  const [flavour, setFlavour] = useState({});
  const [extras, setExtras] = useState({});
  const [popup, setPopup] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    getUpdatedCartItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails({
      ...checkoutDetails,
      [name]: value,
    });
  };
  const getUpdatedCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("CART"));
    setCartItems(cartItems);
  };
  const formatExtras = (data) => {
    const formattedData = data.extras.filter((item) => item.quantity > 0);
    if (formattedData.length > 0) {
      const formattedItems = formattedData.map(
        (item) => `${item.quantity} x ${item.name}`
      );
      const joinedString = formattedItems.join(", ");
      return joinedString;
    }
    return "None";
  };
  const formatFlavours = (data) => {
    if (data.flavours.filter((item) => item.name !== "").length > 0) {
      return data.flavours.filter((item) => item.selected)[0].name;
    } else {
      return "";
    }
  };
  const clearCart = () => {
    localStorage.removeItem("CART");
    setCartItems([]);
  };
  const removeItem = async (indexToRemove) => {
    const getAllItems = JSON.parse(localStorage.getItem("CART"));
    if (indexToRemove >= 0 && indexToRemove < getAllItems.length) {
      getAllItems.splice(indexToRemove, 1); // Remove 1 element at the specified index
    }
    await localStorage.setItem("CART", JSON.stringify(getAllItems));
    setCartItems(getAllItems);
    getTotalFromCart();
  };
  const editItem = (index) => {
    setIndex(index);
    let carData = localStorage.getItem("CART");
    carData = JSON.parse(carData);
    console.log(carData[index]);
    console.log(index);
    setSelectedItem(carData[index]);
    setExtras(carData[index].extras);
    setFlavour(carData[index].flavours);
    setQuantity(carData[index].quantity);
    setEdit(true);
  };
  const handleExtrasQuantity = (name, type) => {
    let newQuantity = 0;
    const initialQuantity = extras.filter((item) => item.name === name)[0]
      .quantity;
    if (type === "PLUS") {
      newQuantity = initialQuantity + 1;
    } else {
      newQuantity = initialQuantity - 1;
    }
    const updatedItems = extras.map((item) => {
      if (item.name === name) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setExtras(updatedItems);
  };
  const setFlavourSelected = (index) => {
    const updatedFlavours = flavour.map((data, i) => {
      if (index === i) {
        data.selected = true;
      } else {
        data.selected = false;
      }
      return data;
    });
    console.log(updatedFlavours);
    setFlavour(updatedFlavours);
  };
  const updateCart = async () => {
    const result = { ...selectedItem };
    result.extras = extras;
    result.quantity = quantity;
    result.flavours = flavour;
    let getCartItems = localStorage.getItem("CART");
    getCartItems = JSON.parse(getCartItems);
    getCartItems[index] = result;
    await localStorage.setItem("CART", JSON.stringify(getCartItems));
    getUpdatedCartItems();
    alert("Item has been successfully updated.");
    getTotalFromCart();
    setEdit(false);
    setItemState("");
    setSelectedItem("");
  };
  const getSubtotal = (data) => {
    if (data.extras != null || data.extras.length > 0) {
      let result = 0;
      let num = 0;
      for (let i = 0; i < data.extras.length; i++) {
        let extras = data.extras[i];
        if (extras.price != "") {
          num += parseFloat(extras.price) * extras.quantity;
        }
      }
      result = parseFloat(data.price) * data.quantity;
      return (result + num).toFixed(2);
    }
    return data.price;
  };
  // console.log(cartItems);
  const placeOrder = async () => {
    const colReference = collection(db, "Orders");

    const resultCart = {};
    const food = [];
    for (let i = 0; i < cartItems.length; i++) {
      const obj = {};
      const extras = [];
      obj.productName = cartItems[i].name;
      obj.productPrice = cartItems[i].price;
      obj.productQuantity = cartItems[i].quantity;
      obj.productType = cartItems[i].category;
      obj.specialInstructions = "";
      if (cartItems[i].extras != null && cartItems[i].extras.length > 0) {
        let cartExtras = cartItems[i].extras;
        for (let j = 0; j < cartExtras.length; j++) {
          if (cartExtras[j].quantity > 0) {
            extras.push(`${cartExtras[j].quantity} x ${cartExtras[j].name}`);
          }
        }
      }
      obj.extras = extras;
      food.push(obj);
    }
    const x = getDateAndTime();
    const time = x.formattedTime;
    const date = x.formattedDate;
    console.log(time, date);
    const storeName = Object.keys(store[0])[0];
    const detailsOfStore = store[0][storeName];
    const uniqueOrderNum = generateUniqueOrderNumber(
      detailsOfStore.store,
      checkoutDetails.name
    );
    console.log(storeName);
    console.log(cartItems);
    resultCart.Name = checkoutDetails.name;
    resultCart.email = checkoutDetails.email;
    resultCart.paid = "paid";
    resultCart.status = "In Progress";
    resultCart.storeName = storeName;
    resultCart.time = time;
    resultCart.date = date;
    resultCart.orderType = "Collection";
    resultCart.estimate = "30";
    resultCart.deliveryInstructions = "";
    resultCart.phoneNumber = "";
    resultCart.total = total;
    resultCart.food = food;
    resultCart.orderNumber = uniqueOrderNum;
    addDoc(colReference, resultCart)
      .then((docRef) => {
        const addedDocumentId = docRef.id;
        const newDocRef = doc(db, "Orders", addedDocumentId);
        resultCart.id = addedDocumentId;
        updateDoc(newDocRef, resultCart)
          .then(() => {
            console.log("Added Document with ID:", addedDocumentId);
          })
          .catch((error) => {
            console.error("Error updating document:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
    SendEmailOrder(
      resultCart.Name,
      resultCart.food,
      resultCart.total,
      resultCart.email,
      detailsOfStore.adminUsername,
      resultCart.orderNumber,
      detailsOfStore.address,
      time
    );
    alert(
      "Order has been places please check the orders page and the in progress section."
    );
    await localStorage.removeItem("CART");
    setCartItems([]);
    console.log(store[0][storeName]);
    setPopup(false);
    getTotalFromCart();
    console.log(colReference.id);
  };
  return !edit ? (
    <div
      style={{
        height: "auto",
        width: "100%",
        margin: "100px auto",
        paddingTop: "50px",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "85%", margin: "auto" }}>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Flavour</th>
          <th>Extras</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove Item</th>
          <th>Subtotal</th>
          <th>Edit Item</th>
        </tr>
        {cartItems != null &&
          cartItems.map((data, i) => {
            return (
              <tr>
                <td>{data.category}</td>
                <td>{data.name}</td>
                <td>{formatFlavours(data)}</td>
                <td>{formatExtras(data)}</td>
                <td>R{data.price}</td>
                <td style={{ textAlign: "center" }}>{data.quantity}</td>
                <td>
                  <button
                    onClick={() => removeItem(i)}
                    className="removeButton"
                  >
                    Remove
                  </button>
                </td>
                <td>R{getSubtotal(data)}</td>
                <td>
                  <button onClick={() => editItem(i)} className="editButton">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="bottomFixedBar" style={{ width: "50%" }}>
        <button className="checkoutButton" onClick={() => setPopup(true)}>
          Place Order
        </button>

        <button onClick={() => clearCart()} className="checkoutButton">
          Clear Cart
        </button>
      </div>
      <Modal
        // style={{
        //   position: "fixed",
        //   width: "50%",
        //   height: "40vh",
        //   margin: "auto",
        //   borderRadius: "30px",
        //   inset: "0px",
        //   backgroundColor: "black",
        // }}
        style={customStyles}
        isOpen={popup}
      >
        <h2>Please enter customers details below</h2>
        <label className="place-order-label">Name</label>
        <br></br>
        <input
          name="name"
          value={checkoutDetails.name}
          onChange={(e) => handleChange(e)}
          className="place-order-input"
        />
        <br></br>
        <label className="place-order-label">Email</label>
        <br></br>
        <input
          name="email"
          value={checkoutDetails.email}
          onChange={(e) => handleChange(e)}
          className="place-order-input"
        />
        <p>order receipts will be sent to store and customers email address</p>
        <button
          style={{
            width: "150px",
            height: "45px",
            fontSize: "larger",
            marginTop: "20px",
            marginRight: "30px",
          }}
          onClick={() => placeOrder()}
          className="checkoutButton"
        >
          Place order
        </button>
        <button
          onClick={() => setPopup(false)}
          style={{
            width: "150px",
            height: "45px",
            fontSize: "larger",
            marginTop: "20px",
            marginLeft: "30px",
          }}
          className="checkoutButton"
        >
          Cancel
        </button>
      </Modal>
    </div>
  ) : (
    <>
      <ViewItem
        selectedItem={selectedItem}
        setQuantity={setQuantity}
        quantity={quantity}
        handleExtrasQuantity={handleExtrasQuantity}
        extras={extras}
        setFlavourSelected={setFlavourSelected}
        flavour={flavour}
      />
      <div className="bottomFixedBar" style={{}}>
        <div className="bottomFixedBarInner">
          <h1 className="bottomInnerTotal">Total: {total}</h1>
        </div>
        {selectedItem !== "" ? (
          <button
            style={{
              backgroundColor: "#F7941D",
              marginLeft: "auto",
              marginRight: "auto",
              border: "none",
              color: "white",
              // fontSize: "larger",
            }}
            className="BackButton"
            onClick={() => updateCart()}
          >
            Update cart
          </button>
        ) : (
          <div></div>
        )}
        <button onClick={() => setEdit(false)} className="BackButton">
          Back
        </button>
      </div>
    </>
  );
}

export default Checkout;
