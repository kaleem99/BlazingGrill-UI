import { auth } from "../../database/config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../database/config";

function AccountDetails({ store, setState, storeName, detailsOfStore }) {
  console.log(store[0].id);
  // const [storeInformation, setStoreInformation] = useState({
  //   email: detailsOfStore.adminUsername,
  //   storeName: detailsOfStore.store,
  //   address: detailsOfStore.address,
  // });
  const [email, setEmail] = useState(detailsOfStore.adminUsername);
  const [storeN, setStoreName] = useState(detailsOfStore.store);
  const [address, setAddress] = useState(detailsOfStore.address);
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
  const upDateStoreInformation = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "storeName":
        setStoreName(e.target.value);
        break;
      default:
        setAddress(e.target.value);
        break;
    }
  };
  console.log(storeName);
  const SaveStoreInfor = () => {
    const examcollref = doc(db, "BlazingStores", store[0].id);
    updateDoc(examcollref, {
      [storeName[0]]: {
        adminUsername: email,
        address: address,
        store: storeN,
      },
    })
      .then((response) => {
        alert("updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Store Account Details</h1>
      <form className="form">
        <input
          onChange={(e) => upDateStoreInformation(e)}
          name={"email"}
          type="text"
          // defaultValue={storeInformation.email}
          value={email}
        />
        <input
          onChange={upDateStoreInformation}
          name={"storeName"}
          // defaultValue={storeInformation.storeName}
          value={storeN}
        />
        <input
          onChange={upDateStoreInformation}
          name={"address"}
          // defaultValue={storeInformation.address}
          value={address}
        />
      </form>
      <div
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      ></div>
      <button
        onClick={() => SaveStoreInfor()}
        style={{
          width: "180px",
          height: "40px",
          backgroundColor: "#f7941d",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
        }}
      >
        Save
      </button>
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

export default AccountDetails;
