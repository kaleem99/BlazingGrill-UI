import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../database/config";
import MenuItemsSection from "../data/menuSections";
import { auth } from "../../database/config";
import { signOut } from "firebase/auth";

function Logout({ setState, setStoreDetails, storeDetails, store }) {
  const Logout = async (e) => {
    if (window.confirm("Are you sure you want to logout!")) {
    } else {
      return false;
    }
    signOut(auth)
      .then(() => {
        // Signed in
        console.log("signed Out successfully");
        setState("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  console.log(storeDetails);
  return (
    <div className="AddMenu">
      <img
        className="BlazingImage"
        alt=""
        src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
      ></img>
      <h1 style={{ color: "white" }}>You are currently logged in.</h1>
      <div
        style={{
          width: "60%",
          height: "40vh",
          border: "1px solid #f7941d",
          margin: "auto",
        }}
      >
        {storeDetails.map((data, i) => {
          return (
            <>
              <h1 style={{ color: "white" }}>{data["formData"].store}</h1>
              <h1 style={{ color: "white" }}>{data["formData"].address}</h1>
            </>
          );
        })}
      </div>
      <button
        onClick={() => Logout()}
        style={{
          width: "180px",
          height: "40px",
          backgroundColor: "#f7941d",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
        }}
      >
        Logout of store
      </button>
    </div>
  );
}

export default Logout;
