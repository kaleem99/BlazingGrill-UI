import { useState } from "react";
import Draggable from "react-draggable";
import { MdRestoreFromTrash } from "react-icons/md";
import { connect, useDispatch } from "react-redux";
import {
  DECREMENT_CART_AND_OBJECT,
  INCREMENT_CART_AND_ADD_OBJECT,
  UPDATE_FLAVOURS,
  UPDATE_SELECTED_ITEM,
  UPDATE_SELECTED_ITEM_EXTRAS,
  VIEW_ITEM_STATE,
} from "../redux/actions";

const ViewItem = ({
  selectedItem,
  setQuantity,
  quantity,
  handleExtrasQuantity,
  extras,
  setFlavourSelected,
  flavour,
  setFlavour,
  viewItem,
}) => {
  console.log(viewItem, 18);
  const dispatch = useDispatch();
  const [state, setState] = useState(viewItem[0]);
  const [stateIndex, setStateIndex] = useState(0);

  const setFlavourMeth = (data, index) => {
    dispatch({
      type: UPDATE_FLAVOURS,
      payload: { objIndex: stateIndex, flavourIndex: index },
    });
    console.log(selectedItem);
  };
  // console.log(selectedItem)
  const handleExtrasQuantityMeth = (name, type, index) => {
    dispatch({
      type: UPDATE_SELECTED_ITEM_EXTRAS,
      payload: { stateIndex: stateIndex, name, type, index },
    });
  };
  // const clearFlavourQuantity = (index, flavour) => {
  //   const updatedFlavours = flavour.map((data, i) => {
  //     if (index === i && data.quantity > 0) {
  //       data.selected = false;
  //       data.quantity = 0;
  //     }
  //     return data;
  //   });
  //   setFlavour(updatedFlavours);
  // };

  return (
    <div style={{ marginTop: "4%", padding: "50px" }}>
      <div
        style={{
          width: "98%",
          justifyContent: "space-between",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></div>
      <div
        style={{
          height: "auto",
          width: "100%",
          display: "flex",
          marginBottom: "50px",
        }}
      >
        <div style={{ width: "40%" }}>
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
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  setState(viewItem[0]);
                  setStateIndex(0);
                  dispatch({ type: DECREMENT_CART_AND_OBJECT });
                }
              }}
              style={{ fontSize: "48px", borderRadius: "10px" }}
            >
              -
            </button>
            <h1 style={{ textAlign: "center", color: "white" }}>{quantity}</h1>

            <button
              style={{ fontSize: "48px", borderRadius: "10px" }}
              onClick={() => {
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                const newObject = {
                  ...state,
                  name: selectedItem.name + " " + newQuantity,
                };
                newObject.selected = false;
                dispatch({
                  type: INCREMENT_CART_AND_ADD_OBJECT,
                  payload: newObject,
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        <div style={{ width: "40%" }}>
          {/* <Draggable> */}
          <div>
            <div className="selectedItemOption">
              <h1 style={{ color: "white" }}>{state.name}</h1>

              {flavour != null && flavour.length > 0 && (
                <div style={{ width: "90%", margin: "auto" }}>
                  {flavour.filter((data) => data.name != "").length > 0 && (
                    <h2
                      style={{
                        textAlign: "center",
                        color: "#F7941D",
                        fontSize: "25px",
                      }}
                    >
                      Flavour
                    </h2>
                  )}
                  <div style={{ display: "flex", margin: "auto" }}>
                    {viewItem[stateIndex].flavours
                      .filter((data) => data.name != "")
                      .map((data, i) => (
                        <div
                          style={{
                            margin: "0px auto",
                            width: "95%",
                            color: "white",
                            position: "relative",
                            // zIndex: 99,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              // border: "1px solid",
                              width: "95%",
                              fontSize: "15px",
                            }}
                          >
                            <button
                              onClick={() => setFlavourMeth(data, i)}
                              className={
                                data.selected ? "activeBtn" : "notActiveBtn"
                              }
                              // style={
                              //   flavour[i].selected
                              //     ? { backgroundColor: "#F0941E", width: "100%" }
                              //     : { width: "100%" }
                              // }
                            >
                              <h2>{data.name}</h2>
                              {/* {console.log(selectedItem, "SELECTED ITEM")} */}
                            </button>
                            {/* <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to empty the flavour quantity"
                              ) === true
                            ) {
                              clearFlavourQuantity(i, flavour);
                            }
                          }}
                          style={{
                            fontSize: "25px",
                            width: "100%",
                            background: "none",
                            color: "white",
                          }}
                        >
                          <MdRestoreFromTrash />
                        </button> */}
                          </div>
                        </div>
                      ))}
                  </div>
                  {extras != null && extras.length > 0 && (
                    <div style={{ width: "100%", margin: "auto" }}>
                      <h2
                        style={{
                          textAlign: "center",
                          color: "#F7941D",
                          fontSize: "25px",
                        }}
                      >
                        Extras
                      </h2>
                      {viewItem[stateIndex].extras
                        .filter(
                          (data, i) => data.price != "" && data.name != ""
                        )
                        .map((data, index) => (
                          <div
                            style={{
                              margin: "20px auto",
                              width: "100%",
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
                                  handleExtrasQuantityMeth(
                                    e.currentTarget.name,
                                    "MINUS",
                                    index
                                  )
                                }
                                name={data.name}
                                className="extrasButton"
                              >
                                -
                              </button>
                              <h1 style={{ textAlign: "center", fontSize: 30 }}>
                                {data.quantity}
                              </h1>

                              <button
                                className="extrasButton"
                                name={data.name}
                                onClick={(e) =>
                                  handleExtrasQuantityMeth(
                                    e.currentTarget.name,
                                    "PLUS",
                                    index
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* </Draggable> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "25%",
          }}
        >
          {viewItem.map((data, i) => (
            <button
              onClick={() => {
                setState(data);
                setStateIndex(i);
                dispatch({ type: UPDATE_SELECTED_ITEM, payload: i });
              }}
              className={data.selected ? "activeBtn" : "notActiveBtn"}
              style={{
                width: "90%",
                height: "60px",
                fontSize: "22px",
                margin: "10px auto",
                // textAlign: "left",
              }}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    viewItem: state.viewItem,
  };
};
export default connect(mapStateToProps, {})(ViewItem);

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
