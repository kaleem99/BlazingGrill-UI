import "./App.css";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "./database/config";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import NavMenu from "./frontend/NavigationMenu";
import Sections from "./frontend/sections";
import { auth } from "./database/config";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./frontend/sections/Login";
import Register from "./frontend/sections/Register";
import Lottie from "react-lottie";
import PlaceAndOrder from "./frontend/PlaceAndOrder";
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setIsLoggedIn(true);
          setEmail(user.email);
          console.log(user);
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

      getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStoreDetails(newData);
      });
    });
    // ...
  }, []);

  const store = storeDetails.filter((stores, i) => {
    if (stores[Object.keys(storeDetails[i])[0]].adminUsername === email) {
      return stores;
    }
  });
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
  if (isLoggedIn === undefined) {
    return (
      <div className="App">
        <Lottie options={defaultOptions} height={400} width={400} />;
      </div>
    );
  } else {
    const arrUrl = window.location.href.split("/");
    const urlChar = arrUrl[arrUrl.length - 1];
    return (
      <div className="App">
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
            <NavMenu
              sections={sections}
              setState={setState}
              state={state}
              isLoggedIn={isLoggedIn}
            />
            {urlChar === "Place-order" ? (
              <PlaceAndOrder total={total} setTotal={setTotal} />
            ) : (
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
                />
              </div>
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
