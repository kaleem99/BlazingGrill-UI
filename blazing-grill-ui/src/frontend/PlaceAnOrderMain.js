import PlaceAndOrder from "./PlaceAndOrder";
import Checkout from "./Checkout";
const PlaceAnOrderMain = ({
  checkout,
  setCheckout,
  setItemState,
  setSelectedItem,
  itemState,
  selectedItem,
  total,
  setTotal,
  setCart,
  cart,
  getTotalFromCart,
  fetchStoreDetails,
  currentStore,
}) => {
  return (
    <div style={{ width: "90%", margin: "auto", height: "100%" }}>
      <div
        style={{
          height: "80px",
          //   position: "fixed",
          textAlign: "center",
          width: "100%",
          //   background: "#030303",
          zIndex: 99,
        }}
      >
        {/* <h1 style={{ color: "white" }}>Place An Order</h1> */}

        {/* <h1
          style={{
            color: "white",
          }}
        >
          The Blazing Grill
        </h1> */}
        {/* <img
          //   onClick={() => (window.location.href = "/BlazingGrill-UI")}
          width={"100px"}
          height={"80px"}
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            bottom: "auto",
            cursor: "pointer",
          }}
          alt=""
          src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite-1024x894.png"
        /> */}

        {checkout ? (
          <>
            <button
              onClick={() => {
                setItemState("");
                setSelectedItem("");
                setCheckout(false);
              }}
              style={{
                // position: "absolute",
                // right: "10px",
                // top: 0,
                // bottom: 0,
                height: "60px",
                margin: "20px auto",
                width: "auto",
                borderRadius: "30px",
                border: "none",
                fontSize: "larger",
                fontWeight: "bold",
                float: "right",
              }}
            >
              Add more items
            </button>
          </>
        ) : (
          <div className="CheckoutPlaceOrderHeader">
            {itemState === "" && selectedItem === "" && (
              <button
                style={{
                  right: "200px",
                  border: "2px solid #f7941d",
                  width: "180px",
                }}
                className="checkoutPlaceOrder"
              >
                Total: {total}
              </button>
            )}
            <button
              onClick={() => {
                setItemState("");
                setSelectedItem("");
                setCheckout(true);
              }}
              className="checkoutPlaceOrder"
              style={itemState != "" ? { right: "5%" } : {}}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      {!checkout ? (
        <PlaceAndOrder
          setCart={setCart}
          cart={cart}
          total={total}
          setTotal={setTotal}
          itemState={itemState}
          setItemState={setItemState}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          getTotalFromCart={getTotalFromCart}
        />
      ) : (
        <Checkout
          selectedItem={selectedItem}
          fetchStoreDetails={fetchStoreDetails}
          setSelectedItem={setSelectedItem}
          getTotalFromCart={getTotalFromCart}
          total={total}
          setItemState={setItemState}
          store={currentStore}
        />
      )}
    </div>
  );
};

export default PlaceAnOrderMain;
