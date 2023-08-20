import { useState } from "react";
import MenuItemsSection from "./data/menuSections";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/config";
import addToCart from "../helpers/AddToCart";
import SlideUpComponent from "../components/SlidUpComp";
import fetchPost from "../helpers/fetchData";
import "./PlaceOrder.css";
import deepEqual from "../helpers/AddToCartCheckIfKeyAreTheSame";
const PlaceAndOrder = ({ total, setTotal, itemState, setItemState }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({});
  const [flavour, setFlavour] = useState({});
  const handleCartData = async () => {
    let checkPoint = false;
    if (flavour.filter((data) => data.name !== "").length > 0) {
      if (flavour.filter((data) => data.selected === true).length === 0) {
        return alert("Please ensure to choose a flavour for a customer");
      }
    }
    const result = { ...selectedItem };
    console.log(quantity);
    result.extras = extras;
    result.quantity = quantity;
    result.flavours = flavour;
    // addToCart(result);
    console.log(result);

    let getCartItems = localStorage.getItem("CART");
    if (getCartItems == null) {
      localStorage.setItem("CART", JSON.stringify([result]));
    } else {
      console.log(JSON.parse(getCartItems));
      const newResult = JSON.parse(getCartItems);
      for (let i = 0; i < newResult.length; i++) {
        let quantityA = newResult[i].quantity;
        let quantityB = result.quantity;
        delete newResult[i].quantity;
        delete result.quantity;
        const output = deepEqual(newResult[i], result);
        console.log(output);
        newResult[i].quantity = quantityA;
        result.quantity = quantityB;
        if (output) {
          newResult[i].quantity =
            parseInt(newResult[i].quantity) + parseInt(result.quantity);
          checkPoint = true;
          break;
        }
      }
      if (!checkPoint) {
        newResult.push(result);
      }
      localStorage.setItem("CART", JSON.stringify(newResult));
    }
    alert("Item has been successfully added.");
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
  const handleItemClicked = (food) => {
    setSelectedItem(food);
    const result =
      food.extras != null
        ? food.extras.map((items) => {
            items.quantity = 0;
            return items;
          })
        : [];
    const flavour =
      food.flavours != null
        ? food.flavours.map((items) => {
            items.selected = false;
            return items;
          })
        : [];
    setExtras(result);
    setFlavour(flavour);
  };
  const setFlavourSelected = (index) => {
    console.log(index);
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
  return itemState === "" ? (
    <div style={{ marginTop: "100px", padding: "20px" }} className="Menu">
      <div style={{ margin: "0% auto" }} className="items">
        {MenuItemsSection.slice(0, MenuItemsSection.length - 1).map((item) => {
          return (
            <div
              className="menuNameImage"
              onClick={async () => await fetchPost(item.name, setItemState)}
            >
              <img alt="" className="MenuImage" src={item.img}></img>
              <text className="itemName">{item.name}</text>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <>
      {selectedItem === "" ? (
        <div
          style={{
            marginTop: "100px",
            width: "100%",
            height: "auto",
            overflow: "auto",
          }}
        >
          <>
            <h1 style={{ color: "white" }}>Place An Order</h1>
            <div
              style={{
                margin: "3% auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                border: "none",
                width: "99%",
              }}
              className="ItemsSections"
            >
              {itemState
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((food, i) => {
                  return (
                    <div
                      onClick={() => handleItemClicked(food)}
                      className="HomeFoodItemName"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        alt=""
                        style={{
                          width: "200px",
                          height: "130px",
                          margin: "auto",
                          borderRadius: "10px",
                        }}
                        src={food.fileURL}
                      />
                      <div
                        style={{ margin: "10px auto" }}
                        className="inputDetails"
                      >
                        <div
                          id="input0"
                          className={food.id}
                          name={"name"}
                          style={{
                            borderBottom: "none",
                            fontSize: "1.3em",
                            fontWeight: "200",
                          }}
                          // defaultValue={food.name}
                        >
                          {food.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        </div>
      ) : (
        <div style={{ marginTop: "4%", padding: "50px" }}>
          <div
            style={{
              width: "98%",
              justifyContent: "space-between",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* ... Pressable and Image for back button ... */}
          </div>
          {/* <div
            style={{
              width: "80%",
              height: "auto",
              marginTop: 15,
              borderRadius: 15,
              margin: "auto",
            }}
          >
            <img
              alt=""
              style={
                itemState === "Specials"
                  ? {
                      width: 300,
                      height: 300,
                      borderRadius: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }
                  : {
                      width: "30%",
                      height: 250,
                      borderRadius: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }
              }
              src={selectedItem.fileURL ? selectedItem.fileURL : ""}
            />
          </div> */}
          <div style={{ height: "auto", width: "100%", display: "flex" }}>
            <div>
              <h1 style={styles.text2}>{selectedItem.name}</h1>

              <h2
                style={{
                  //   fontSize: 15,
                  color: "white",
                  marginTop: "10%",
                  width: "80%",
                  marginBottom: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  marginBlockStart: "0em",
                }}
              >
                {selectedItem.Information}
              </h2>
              <h2
                style={{
                  //   fontSize: "larger",
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  marginRight: 10,
                  marginTop: 20,
                  fontWeight: "600",
                  width: "auto",
                  fontSize: 30,
                }}
              >
                R{selectedItem.price}
              </h2>
              <textarea
                style={styles.input}
                placeholder={
                  "Special Instructions, e.g no Garnish or extra sauce, spice."
                }
                className="placeOrder"
                value={selectedItem.specialInstructions}
                // onChange={(event) =>
                //   setChosenItem({
                //     ...selectedItem,
                //     specialInstructions: event.target.value,
                //   })
                // }
                placeholderTextColor="white"
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  width: "84%",
                  margin: "auto",
                  marginTop: "5% auto",
                }}
              >
                <button
                  onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                  style={{ fontSize: "48px", borderRadius: "10px" }}
                >
                  -
                </button>
                <h1 style={{ textAlign: "center", color: "white" }}>
                  {quantity}
                </h1>

                <button
                  style={{ fontSize: "48px", borderRadius: "10px" }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ width: "80%" }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#F7941D",
                  fontSize: "35px",
                }}
              >
                Extras
              </h2>
              {extras != null &&
                extras.length > 0 &&
                extras
                  .filter((data, i) => data.price != "" && data.name != "")
                  .map((data) => (
                    <div
                      style={{
                        margin: "20px auto",
                        width: "90%",
                        color: "white",
                        border: "1px solid",
                        display: "grid",
                        gridTemplateColumns: "50% 50%",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          width: "100%",
                          gridTemplateColumns: "60% 40%",
                        }}
                      >
                        <h1
                          style={{
                            marginBlockStart: "0em",
                            marginBlockEnd: "0em",
                            height: "40px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontSize: "1.5em",
                          }}
                        >
                          {data.name}
                        </h1>
                        <h1
                          style={{
                            marginBlockStart: "0em",
                            marginBlockEnd: "0em",
                            height: "40px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            fontSize: "1.5em",
                          }}
                        >
                          R{data.price}
                        </h1>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto auto",
                          height: "auto",
                        }}
                      >
                        <button
                          onClick={(e) =>
                            data.quantity > 0 &&
                            handleExtrasQuantity(e.currentTarget.name, "MINUS")
                          }
                          name={data.name}
                          style={{
                            fontSize: "40px",
                            borderRadius: "10px",
                            width: "90px",
                            margin: "auto",
                            height: "60px",
                            borderRadius: "20px",
                          }}
                        >
                          -
                        </button>
                        <h1 style={{ textAlign: "center", fontSize: 30 }}>
                          {data.quantity}
                        </h1>

                        <button
                          style={{
                            fontSize: "40px",
                            borderRadius: "10px",
                            width: "90px",
                            margin: "auto",
                            height: "60px",
                            borderRadius: "20px",
                          }}
                          name={data.name}
                          onClick={(e) =>
                            handleExtrasQuantity(e.currentTarget.name, "PLUS")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            {/*  */}
            <div style={{ width: "40%" }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#F7941D",
                  fontSize: "35px",
                }}
              >
                Flavour
              </h2>
              {flavour != null &&
                flavour.length > 0 &&
                flavour
                  .filter((data) => data.name != "")
                  .map((data, i) => (
                    <div
                      style={{
                        margin: "20px auto",
                        width: "90%",
                        color: "white",
                        border: "1px solid",
                      }}
                    >
                      <button
                        style={
                          data.selected
                            ? { background: "#F7941D", fontWeight: "900" }
                            : {}
                        }
                        onClick={() => setFlavourSelected(i)}
                        className="flavourButton"
                      >
                        {data.name}
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
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
            onClick={() => handleCartData()}
          >
            Add to cart
          </button>
        ) : (
          <div></div>
        )}
        {selectedItem === "" ? (
          <button onClick={() => setItemState("")} className="BackButton">
            Back
          </button>
        ) : (
          <button onClick={() => setSelectedItem("")} className="BackButton">
            Back
          </button>
        )}
      </div>
      <SlideUpComponent itemState={itemState} setItemState={setItemState} />
    </>
  );
};
const widthImage = "100%";
const styles = {
  selectDropDownList: {
    color: "white",
    padding: 10,
    width: "75%",
    marginTop: 10,
  },
  inputStyles: {
    color: "black",
    width: "75%",
    height: "auto",
    margin: "auto",
  },
  extrasAndToppingsButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#F7941D",
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
    justifyContent: "center", // Vertical alignment (centered vertically)
    alignItems: "center",
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    width: "80%",
    padding: 10,
    color: "black",
    borderRadius: 10,
    borderColor: "white",
    background: "white",
    placeholderColor: "white",
    fontSize: 20,
  },
  text: {
    textAlign: "center",
    // margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    // fontFamily: "IMFell",
  },
  toppings: {
    textAlign: "center",
    // margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    // marginTop: 10,
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    // fontFamily: "IMFell",
  },
  cartButton: {
    textAlign: "center",
    margin: "auto",
    // marginTop: 20,
    justifyContent: "center",
    color: "white",
    fontSize: 20,
  },

  text2: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 40,
    width: "100%",
    fontWeight: "600",
  },
  div: {
    width: widthImage,
    height: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    // backgroundColor: "white",
  },
  imageDiv: {
    // width: widthImage,
    height: 600,
    margin: "auto",
  },
  image: {
    width: 120,
    height: 100,
  },
  getStarted: {
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    height: 50,
    paddingTop: 10,
    backgroundColor: "#F7941D",
    borderRadius: 5,
  },
  BlazingImage: {
    width: 45,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  halalCertificate: {
    width: 40,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
};
export default PlaceAndOrder;
