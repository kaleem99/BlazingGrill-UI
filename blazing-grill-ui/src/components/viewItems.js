const ViewItem = ({
  selectedItem,
  setQuantity,
  quantity,
  handleExtrasQuantity,
  extras,
  setFlavourSelected,
  flavour,
}) => {
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
      <div style={{ height: "auto", width: "100%", display: "flex" }}>
        <div style={{ width: "50%" }}>
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
            <h1 style={{ textAlign: "center", color: "white" }}>{quantity}</h1>

            <button
              style={{ fontSize: "48px", borderRadius: "10px" }}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        {extras != null && extras.length > 0 && (
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
            {extras
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
        )}

        {/*  */}
        {flavour != null && flavour.length > 0 && (
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
            {flavour
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
        )}
      </div>
    </div>
  );
};
export default ViewItem;

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
