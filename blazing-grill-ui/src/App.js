import "./App.css";
import "./slideUp.css";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "./database/config";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import NavMenu from "./frontend/NavigationMenu";
import Sections from "./frontend/sections";
import { auth } from "./database/config";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./frontend/sections/Login";
import Register from "./frontend/sections/Register";
import Lottie from "react-lottie";
import PlaceAndOrder from "./frontend/PlaceAndOrder";
import OrderConfirmationModal from "./components/PopupModal";
// ...
import { getCurrentTime } from "./helpers/getCurrentTime";

import SendEmailOrder from "./components/sendEmailOrder";
import SendOrderCancellation from "./components/SendOrderCancellation";
import { clearCart } from "./helpers/ClearCart";

// ...
import Checkout from "./frontend/Checkout";
import { getOrders } from "./helpers/GetOrdersPlaced";
import DownloadImages from "./components/DownloadAllImages";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: require("./assets/loading.json"),
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const sections = [
  "Home",
  "Add Menu Item",
  "image",
  "Orders",
  "Account",
  "Driver",
];
function App() {
  const [state, setState] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [storeDetails, setStoreDetails] = useState([]);
  // const [signInRegister, setSignInRegister] = useState("Login");
  const [storeStatus, setstoreStatus] = useState(false);
  const [currentStore, setCurrentStore] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [itemState, setItemState] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [PendingOrders, setPendingOrders] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  // ...

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [time, setTime] = useState("");
  const [timerObj, setTimerObj] = useState("00:00");
  // ...
  let store = "";
  useEffect(() => {
    getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStoreDetails(newData);
      store = newData.filter((stores, i) => {
        if (stores[Object.keys(newData[i])[0]].adminUsername === email) {
          return stores;
        }
      });
      setCurrentStore(store);
      // console.log(store[0], auth.currentUser.displayName)
      // console.log(Object.keys(store[0]), "STOEE")
      // if (store[0]) {
      //   const storeName = Object.keys(store[0])[0];
      //   setCurrentStore(store);

      //   // console.log(store[0][storeName].store);
      // }
    });
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        getOrders(
          auth.currentUser.displayName,
          setPendingOrders,
          setInProgress
        );
      }
      if (user) {
        if (user.emailVerified) {
          setIsLoggedIn(true);
          setEmail(user.email);
        } else {
          setIsLoggedIn(false);
          console.log("user is logged out", isLoggedIn);
          if (state !== "Register") {
            setState("Login");
          }
        }
      } else {
        // Handle the case when user is not logged in
        setIsLoggedIn(false);
        setState("Login");
      }
    });
    // ...

    // ...
    getTotalFromCart();
  }, []);
  const getTotalFromCart = () => {
    let x = localStorage.getItem("CART");
    x = JSON.parse(x);
    let num = 0;
    let extrasNum = 0;
    if (x != null && x.length > 0) {
      for (let i = 0; i < x.length; i++) {
        let extras = x[i].extras;
        for (let key in extras) {
          if (extras[key].quantity != 0) {
            extrasNum += parseFloat(extras[key].price) * extras[key].quantity;
          }
        }
        let newPrice = parseFloat(x[i].price) * x[i].quantity;
        num += newPrice;
      }
      num += extrasNum;
      setTotal(num.toFixed(2));
    } else {
      setTotal(0);
    }
  };

  const loginRegister = () => {
    switch (state) {
      case "Register":
        return <Register setState={setState} />;
      default:
        return (
          <Login
            setState={setState}
            // store={store}
            storeDetails={storeDetails}
            setStoreDetails={setStoreDetails}
          />
        );
    }
  };
  // let storeName = Object.keys(testing[0]);
  // const detailsOfStore = testing[0][storeName[0]] || {
  //   adminUsername: "",
  //   storeName: "",
  //   address: "",
  // };

  const getDetailsOfStore = () => {
    const testing = storeDetails.filter((stores, i) => {
      if (
        stores[Object.keys(storeDetails[i])[0]].adminUsername ===
        auth.currentUser.email
      ) {
        return stores;
      }
    });
    let storeName = Object.keys(testing[0]);
    const detailsOfStore = testing[0][storeName[0]] || {
      adminUsername: "",
      storeName: "",
      address: "",
    };
    return detailsOfStore;
  };
  const handleAcceptOrder = (index) => {
    const detailsOfStore = getDetailsOfStore();
    const docRef = doc(db, "Orders", PendingOrders[index].id);
    const foodOrder = PendingOrders[index].food;
    const newOrderData = PendingOrders[index];
    newOrderData.status = "In Progress";
    newOrderData.estimate = time;
    SendEmailOrder(
      newOrderData.Name,
      newOrderData.food,
      newOrderData.total,
      newOrderData.email,
      detailsOfStore.adminUsername,
      newOrderData.orderNumber,
      detailsOfStore.address,
      time
    );
    updateDoc(docRef, newOrderData);

    alert("Order has been accepted");
    //
    clearCart(newOrderData.userId);
    let newPendingOrder = PendingOrders.shift();
    setPendingOrders(PendingOrders);
  };

  const handleDeclineOrder = (index) => {
    const detailsOfStore = getDetailsOfStore();

    const docRef = doc(db, "Orders", PendingOrders[index].id);
    const foodOrder = PendingOrders[index].food;
    const newOrderData = PendingOrders[index];
    newOrderData.status = "Declined";
    addDoc(collection(db, "DeclinedOrders"), newOrderData);
    updateDoc(docRef, newOrderData);
    deleteDoc(docRef);
    const deletedOrder = PendingOrders.shift();
    SendOrderCancellation(
      newOrderData.Name,
      newOrderData.food,
      newOrderData.total,
      newOrderData.email,
      detailsOfStore.adminUsername,
      newOrderData.orderNumber,
      detailsOfStore.address,
      newOrderData.phoneNumber,
      newOrderData.orderType
    );
    // newOrderData.checkoutUrl;
    fetch(
      `https://express-template-backend.onrender.com/refund/${newOrderData.checkoutID}/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to process the refund.");
        }
        return response.json();
      })
      .then((data) => {
        // Display a success message to the user when the refund is successful
        alert("Order refund has been processed successfully.");
      })
      .catch((error) => {
        console.error("Error processing the refund:", error);
        // Display an error message to the user when the refund request fails
        alert("Failed to process the refund. Please try again later.");
      });
  };
  // console.log(store, true, store === "")
  if (isLoggedIn === undefined) {
    return (
      <div className="App">
        <Lottie options={defaultOptions} height={400} width={400} />;
      </div>
    );
  } else {
    const arrUrl = window.location.href.split("?");
    const urlChar = arrUrl[arrUrl.length - 1];
    return (
      <div className="App">
        {PendingOrders.length > 0 &&
          PendingOrders.map((data, i) => {
            return (
              <OrderConfirmationModal
                food={PendingOrders[i].food}
                onAccept={() => handleAcceptOrder(i)}
                onDecline={() => handleDeclineOrder(i)}
                setTime={setTime}
                time={time}
                setTimerObj={setTimerObj}
                timerObj={timerObj}
                getCurrentTime={getCurrentTime}
                data={data}
              />
            );
          })}
        {!isLoggedIn ? (
          <>
            {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
            <img
              className="BlazingImage"
              alt=""
              src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
            ></img>
            {loginRegister()}
          </>
        ) : (
          <>
            {urlChar !== "Place-order" ? (
              <>
                <NavMenu
                  sections={sections}
                  setState={setState}
                  state={state}
                  isLoggedIn={isLoggedIn}
                />

                <div className="sections">
                  <Sections
                    state={state}
                    setState={setState}
                    isLoggedIn={isLoggedIn}
                    setStoreDetails={setStoreDetails}
                    storeDetails={storeDetails}
                    store={store}
                    storeStatus={storeStatus}
                    setstoreStatus={setstoreStatus}
                    auth={auth}
                    setPendingOrders={setPendingOrders}
                    setInProgress={setInProgress}
                    PendingOrders={PendingOrders}
                    inProgress={inProgress}
                    currentStore={currentStore}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    height: "100px",
                    position: "fixed",
                    textAlign: "center",
                    width: "100%",
                    background: "#030303",
                    zIndex: 99,
                  }}
                >
                  <h1
                    style={{
                      color: "white",
                    }}
                  >
                    The Blazing Grill
                  </h1>
                  <img
                    onClick={() => (window.location.href = "/BlazingGrill-UI")}
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
                  />

                  {checkout ? (
                    <>
                      <button
                        onClick={() => {
                          setItemState("");
                          setSelectedItem("");
                          setCheckout(false);
                        }}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: 0,
                          bottom: 0,
                          height: "60px",
                          margin: "auto",
                          width: "140px",
                          borderRadius: "30px",
                          border: "none",
                          fontSize: "larger",
                          fontWeight: "bold",
                        }}
                      >
                        Add more items
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setItemState("");
                        setSelectedItem("");
                        setCheckout(true);
                      }}
                      className="checkoutPlaceOrder"
                      style={itemState != "" ? { right: "210px" } : {}}
                    >
                      Checkout
                    </button>
                  )}
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
                    setSelectedItem={setSelectedItem}
                    getTotalFromCart={getTotalFromCart}
                    total={total}
                    setItemState={setItemState}
                    store={currentStore}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
// function App() {
//   return (
//     <div>
//       <h1>Site is currently undergoing maintenance</h1>
//     </div>
//   );
// }
export default App;
