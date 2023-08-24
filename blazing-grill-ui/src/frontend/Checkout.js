import { useEffect, useState } from "react";
import ViewItem from "../components/viewItems";

function Checkout({
  getTotalFromCart,
  selectedItem,
  setSelectedItem,
  total,
  setItemState,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  // view cart items states
  const [quantity, setQuantity] = useState(0);
  const [flavour, setFlavour] = useState({});
  const [extras, setExtras] = useState({});

  useEffect(() => {
    getUpdatedCartItems();
  }, []);
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
      <table style={{ width: "80%", margin: "auto" }}>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Flavour</th>
          <th>Extras</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove</th>
          <th>Edit Cart</th>
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
                    Remove Item
                  </button>
                </td>
                <td>
                  <button onClick={() => editItem(i)} className="editButton">
                    Edit Item
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="bottomFixedBar" style={{ width: "50%" }}>
        <button className="checkoutButton">Place Order</button>

        <button onClick={() => clearCart()} className="checkoutButton">
          Clear Cart
        </button>
      </div>
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
