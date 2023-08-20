import { useEffect, useState } from "react";

function Checkout({}) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("CART"));
    setCartItems(cartItems);
  }, []);
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
  };
  return (
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
  );
}

export default Checkout;
