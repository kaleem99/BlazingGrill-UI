import { MenuItem } from "@mui/material";
import { useState } from "react";
import AddMenuItems from "./sections/AddMenuItems";
import Login from "./sections/Login";
import MenuItems from "./sections/MenuItems";
import Orders from "./sections/Orders";
import Register from "./sections/Register";

function Sections({ state, setState }) {
  switch (state) {
    case "Home":
      return <MenuItems />;
    case "Add Menu Item":
      return <AddMenuItems />;
    case "Orders":
      return <Orders />;
    case "Login":
      return <Login setState={setState} />;
    case "Register":
      return <Register />;
    default:
      return <MenuItems />;
  }
}

export default Sections;
