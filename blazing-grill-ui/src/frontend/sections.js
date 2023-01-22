import { MenuItem } from "@mui/material";
import { useState } from "react";
import AddMenuItems from "./sections/AddMenuItems";
import MenuItems from "./sections/MenuItems";

function Sections({state}) {
  switch (state) {
    case "Home":
      return <MenuItems />;
    case "Add Menu Item":
      return <AddMenuItems />;
    default:
      return <MenuItems />;
  }
}

export default Sections;
