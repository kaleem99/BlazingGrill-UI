import { useState } from "react";
import MenuItemsSection from "./data/menuSections";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/config";
import addToCart from "../helpers/AddToCart";
import SlideUpComponent from "../components/SlidUpComp";
import fetchPost from "../helpers/fetchData";
import "./PlaceOrder.css";
import deepEqual from "../helpers/AddToCartCheckIfKeyAreTheSame";
import ViewItem from "../components/viewItems";
import { connect, useDispatch } from "react-redux";
import { VIEW_ITEM_STATE } from "../redux/actions";
const PlaceAndOrder = ({
  total,
  setTotal,
  itemState,
  setItemState,
  selectedItem,
  setSelectedItem,
  getTotalFromCart,
  viewItem,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState({});
  const [flavour, setFlavour] = useState({});
  const dispatch = useDispatch();

  const handleCartData = async () => {
    let checkPoint = false;
    if (flavour.filter((data) => data.name !== "").length > 0) {
      if (flavour.filter((data) => data.selected === true).length === 0) {
        return alert("Please ensure to choose a flavour for a customer");
      }
    }
    const result = { ...selectedItem };

    result.extras = extras;
    result.quantity = quantity;
    result.flavours = flavour;
    // addToCart(result);

    let getCartItems = localStorage.getItem("CART");
    if (getCartItems == null) {
      localStorage.setItem("CART", JSON.stringify([result]));
    } else {
      const newResult = JSON.parse(getCartItems);
      for (let i = 0; i < newResult.length; i++) {
        let quantityA = newResult[i].quantity;
        let quantityB = result.quantity;
        delete newResult[i].quantity;
        delete result.quantity;
        const output = deepEqual(newResult[i], result);
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
    getTotalFromCart();
    if (extras.length > 0) {
      setAllQuantitiesToZero();
    }
    if (flavour.length > 0) {
      setAllFlavoursToFalse();
    }
  };
  const addItemsToCart = () => {
    console.log(viewItem);
    viewItem.map((data) => (data.quantity = 1));
    const previousCart = JSON.parse(localStorage.getItem("CART"));
    console.log(previousCart);
    if (viewItem.flavours && !checkIfAllFlavoursAdded()) {
      return alert("please ensure to choose a flavour for all items");
    }
    if (previousCart) {
      localStorage.setItem(
        "CART",
        JSON.stringify([...viewItem, ...previousCart])
      );
    } else {
      localStorage.setItem("CART", JSON.stringify(viewItem));
    }
    getTotalFromCart();
    alert("Items have been added successfully to your cart.");
  };
  const checkIfAllFlavoursAdded = () => {
    let count = 0;
    for (let i = 0; i < viewItem.length; i++) {
      const flavours = viewItem[i].flavours;
      console.log(flavours);
      if (flavours) {
        for (let j = 0; j < flavours.length; j++) {
          if (flavours[j].selected === true) {
            count++;
          }
        }
        const filteredFlavours = flavours.filter((data) => data.name != "");
        if (filteredFlavours.length === 0) {
          return true;
        }
        console.log(filteredFlavours, "SS");
      }
    }
    return count === viewItem.length;
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
  const setAllQuantitiesToZero = () => {
    const updatedItems = extras.map((item) => ({ ...item, quantity: 0 }));
    setExtras(updatedItems);
  };
  const setAllFlavoursToFalse = () => {
    const updatedItems = flavour.map((item) => ({ ...item, selected: false }));
    setFlavour(updatedItems);
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
            items.quantity = 0;
            return items;
          })
        : [];
    setExtras(result);
    setFlavour(flavour);
    setQuantity(1);
    const copiedFood = Object.assign({}, food);

    dispatch({ type: VIEW_ITEM_STATE, payload: copiedFood });
  };
  const setFlavourSelected = (index, quantity) => {
    const totalQuantity = flavour
      .map((data) => data.quantity)
      .reduce((a, b) => a + b);
    if (totalQuantity < quantity) {
      const updatedFlavours = flavour.map((data, i) => {
        if (index === i) {
          data.selected = true;
          data.quantity += 1;
        } else {
          if (data.quantity === 0) {
            data.selected = false;
          }
        }
        return data;
      });
      setFlavour(updatedFlavours);
    }
  };
  return itemState === "" ? (
    <div style={{ padding: "20px" }} className="Menu">
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
        <ViewItem
          selectedItem={selectedItem}
          setQuantity={setQuantity}
          quantity={quantity}
          handleExtrasQuantity={handleExtrasQuantity}
          extras={extras}
          setFlavourSelected={setFlavourSelected}
          flavour={flavour}
          setFlavour={setFlavour}
        />
      )}
      <div className="bottomFixedBar" style={{}}>
        <div className="bottomFixedBarInner">
          <p className="bottomInnerTotal">Total: {total}</p>
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
            onClick={() => addItemsToCart()}
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
      <SlideUpComponent
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        itemState={itemState}
        setItemState={setItemState}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    viewItem: state.viewItem,
  };
};
export default connect(mapStateToProps, {})(PlaceAndOrder);

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
// export default PlaceAndOrder;
