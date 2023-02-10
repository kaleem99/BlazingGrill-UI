import "./App.css";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "./database/config";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import NavMenu from "./frontend/NavigationMenu";
import Sections from "./frontend/sections";
import { auth } from "./database/config";
import { onAuthStateChanged } from "firebase/auth";

const sections = ["Home", "Add Menu Item", "image", "Orders"];
function App() {
  const [state, setState] = useState("Add Menu Item");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storeDetails, setStoreDetails] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStoreDetails(newData);
      });
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setIsLoggedIn(true);
        console.log(uid);
      } else {
        setIsLoggedIn(false);
        console.log("user is logged out", isLoggedIn);
        setState("Home");
      }
    });
  }, []);

  return (
    <div className="App">
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
      {/* <button onClick={() => fetchPost()}>Testing</button> */}
    </div>
  );
}

export default App;
