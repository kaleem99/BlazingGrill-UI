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
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: require("./assets/loading.json"),
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const sections = ["Home", "Add Menu Item", "image", "Orders", "Account"];
function App() {
  const [state, setState] = useState("Add Menu Item");
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [storeDetails, setStoreDetails] = useState([]);
  const [signInRegister, setSignInRegister] = useState("Login");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
        console.log(querySnapshot.docs[0].data);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStoreDetails(newData);
      });
      console.log(auth);
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
        console.log(uid);
        console.log(user);
      } else {
        setIsLoggedIn(false);
        console.log("user is logged out", isLoggedIn);
        setState("Login");
      }
    });
  }, []);
  const loginRegister = () => {
    switch (signInRegister) {
      case "Register":
        return <Register setState={setSignInRegister} />;
      // case "Login":
      //   return (
      //     <Login
      //       setState={setSignInRegister}
      //       // store={store}
      //       storeDetails={storeDetails}
      //       setStoreDetails={setStoreDetails}
      //     />
      //   );
      default:
        return (
          <Login
            setState={setSignInRegister}
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
            <div className="sections">
              <Sections
                state={state}
                setState={setState}
                isLoggedIn={isLoggedIn}
                setStoreDetails={setStoreDetails}
                storeDetails={storeDetails}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
