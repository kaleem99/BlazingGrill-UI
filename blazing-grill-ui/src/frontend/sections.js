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
function Sections({ state, setState }) {
  const [store, setStore] = useState([]);
  const [hasbeenClicked, setHasBeenClicked] = useState(false);
  const loginDetails = async () => {
    getDocs(collection(db, "BlazingStores")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStore(newData);
    });
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
      return <Orders />;
    case "Login":
      return <Login setState={setState} store={store} />;
    case "Register":
      return <Register />;
    default:
      return <MenuItems />;
  }
}

export default Sections;
