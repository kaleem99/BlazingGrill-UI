import { MenuItem } from "@mui/material";
import { useState } from "react";
import AddMenuItems from "./sections/AddMenuItems";
import Login from "./sections/Login";
import MenuItems from "./sections/MenuItems";
import Orders from "./sections/Orders";
import Register from "./sections/Register";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../database/config";
import Logout from "./sections/Logout";
import AccountDetails from "./sections/Account";
function Sections({
  state,
  setState,
  isLoggedIn,
  storeDetails,
  setStoreDetails,
  setstoreStatus,
  storeStatus,
  store,
}) {
  const [hasbeenClicked, setHasBeenClicked] = useState(false);
  const loginDetails = async () => {
    // getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
    //   const newData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setStore(newData);
    // });
  };
  if (state === "Login" && !hasbeenClicked) {
    loginDetails();
    setHasBeenClicked(true);
  }
  switch (state) {
    case "Home":
      return <MenuItems />;
    case "Add Menu Item":
      return <AddMenuItems />;
    case "Orders":
      return (
        <Orders storeStatus={storeStatus} setstoreStatus={setstoreStatus} />
      );
    // case "Login":
    //   return (
    //     <Login
    //       setState={setState}
    //       store={store}
    //       storeDetails={storeDetails}
    //       setStoreDetails={setStoreDetails}
    //     />
    //   );
    // case "Register":
    //   return <Register setState={setState} />;
    case "Logout":
      return (
        <Logout
          setState={setState}
          storeDetails={storeDetails}
          setStoreDetails={setStoreDetails}
        />
      );
    case "Account":
      if (store[0]) {
        let storeName = Object.keys(store[0]);
        const detailsOfStore = store[0][storeName[0]] || {
          adminUsername: "",
          storeName: "",
          address: "",
        };
        return (
          <AccountDetails
            store={store}
            setState={setState}
            storeName={storeName}
            detailsOfStore={detailsOfStore}
          />
        );
      }
      break;
    default:
      return <MenuItems />;
  }
}

export default Sections;
