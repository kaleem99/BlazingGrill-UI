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
import MenuSection from "./sections/MenuSections";
import StoreMenu from "./StoreMenu/StoreMenu";
import DeliveryDriver from "./sections/DeliveryDriver";
import Account from "./sections/Account";
function Sections({
  state,
  setState,
  isLoggedIn,
  storeDetails,
  setStoreDetails,
  setstoreStatus,
  storeStatus,
  store,
  auth,
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

  const checkStoreStatus = () => {
    const data = getDocs(collection(db, "BlazingStores")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        let Name = auth.currentUser.displayName;
        const newFilteredData = newData.filter(
          (data) => data[Name] !== undefined && data
        );
        console.log(newFilteredData);
        setstoreStatus(newFilteredData[0][Name].storeStatus);
        // console.log(1);
      }
    );
  };
  if (state === "Login" && !hasbeenClicked) {
    loginDetails();
    setHasBeenClicked(true);
  }
  switch (state) {
    case "Home":
      return (
        <MenuItems
          setState={setState}
          adminUserEmail={auth.currentUser.email}
        />
      );
    case "Add Menu Item":
      return <AddMenuItems adminUserEmail={auth.currentUser.email} />;
    case "Orders":
      checkStoreStatus();
      if (store[0]) {
        let storeName = Object.keys(store[0]);
        const detailsOfStore = store[0][storeName[0]] || {
          adminUsername: "",
          storeName: "",
          address: "",
        };
        return (
          <Orders
            storeName={storeName}
            storeStatus={storeStatus}
            setstoreStatus={setstoreStatus}
            store={store}
            detailsOfStore={detailsOfStore}
          />
        );
      }
      break;
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
    case "Menu":
      return <StoreMenu />;
    case "Account":
      if (store[0]) {
        let storeName = Object.keys(store[0]);
        const detailsOfStore = store[0][storeName[0]] || {
          adminUsername: "",
          storeName: "",
          address: "",
        };
        return (
          <Account
            store={store}
            setState={setState}
            storeName={storeName}
            detailsOfStore={detailsOfStore}
            storeStatus={storeStatus}
            storeDetails={storeDetails}
          />
        );
      }
      break;
    case "MenuSection":
      if (store[0]) {
        let storeName = Object.keys(store[0]);
        const detailsOfStore = store[0][storeName[0]] || {
          adminUsername: "",
          storeName: "",
          address: "",
        };
        return (
          <MenuSection
            storeDetails={detailsOfStore}
            adminUserEmail={auth.currentUser.email}
          />
        );
      }
      break;
    case "DeliveryDriver":
      if (store[0]) {
        let storeName = Object.keys(store[0]);
        const detailsOfStore = store[0][storeName[0]] || {
          adminUsername: "",
          storeName: "",
          address: "",
        };
        return (
          <DeliveryDriver
            store={store}
            setState={setState}
            storeName={storeName}
            detailsOfStore={detailsOfStore}
            storeStatus={storeStatus}
          />
        );
      }
      break;
    default:
      return <MenuItems />;
  }
}

export default Sections;
