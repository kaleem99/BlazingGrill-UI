import { auth } from "../../database/config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import axios from "axios";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../database/config";
import {
  signInWithEmailAndPassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

function AccountDetails({
  store,
  setState,
  storeName,
  detailsOfStore,
  storeStatus,
}) {
  // const [storeInformation, setStoreInformation] = useState({
  //   email: detailsOfStore.adminUsername,
  //   storeName: detailsOfStore.store,
  //   address: detailsOfStore.address,
  // });
  const [email, setEmail] = useState(detailsOfStore.adminUsername);
  const [storeN, setStoreName] = useState(detailsOfStore.store);
  const [address, setAddress] = useState(detailsOfStore.address);
  const [password, setPassword] = useState("");
  console.log(store);
  const upDateStoreInformation = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "storeName":
        setStoreName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        setAddress(e.target.value);
        break;
    }
  };
  const SaveStoreInfor = (event) => {
    event.preventDefault();
    if (password !== "P@ssw0rd786") {
      return alert("admin password is incorrect");
    }
    const examcollref = doc(db, "BlazingStores", store.id);
    try {
      updateProfile(auth.currentUser, {
        email: email,
        displayName: storeN,
      });
      updateDoc(examcollref, {
        [storeN]: {
          ...detailsOfStore,
          adminUsername: email,
          address: address,
          store: storeN,
          // storeStatus: storeStatus,
          // latitude: detailsOfStore.latitude,
          // longitude: detailsOfStore.longitude,
        },
      });
      alert("updated");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Store Account Details</h1>
      <form onSubmit={SaveStoreInfor} className="form">
        <label>Store Email</label>
        <br></br>
        <input
          onChange={(e) => upDateStoreInformation(e)}
          name={"email"}
          type="text"
          // defaultValue={storeInformation.email}
          value={email}
        />
        <br></br>
        <label>Store Name</label>
        <br></br>

        <input
          onChange={upDateStoreInformation}
          name={"storeName"}
          // defaultValue={storeInformation.storeName}
          value={storeN}
        />
        <br></br>
        <label>Store Address</label>
        <br></br>

        <input
          onChange={upDateStoreInformation}
          name={"address"}
          // defaultValue={storeInformation.address}
          value={address}
        />
        <br></br>

        <label>Admin Password</label>
        <br></br>

        <input
          onChange={upDateStoreInformation}
          name={"password"}
          placeholder={"Please enter admin password to save details."}
          value={password}
          type="password"
        />
        <button
          type="submit"
          style={{
            width: "180px",
            height: "40px",
            background: "none",
            borderRadius: "7px",
            color: "white",
            fontSize: "20px",
            border: "1px solid white",
            marginTop: "30px",
          }}
        >
          Save
        </button>
      </form>
      {/* <PaymentForm /> */}
      <div
        style={{
          maxWidth: "auto",
          margin: "auto",
        }}
      ></div>
    </div>
  );
}

export default AccountDetails;
// YYY-MM-DDTHH:MM:SS[+HH:MM]
// curl -X GET \
//   -H "Content-Type: text/csv" \
//   -H "merchant-id: 12516198" \
//   -H "version: v1" \
//   -H "timestamp: YYY-MM-DDTHH:MM:SS[+HH:MM]" \
//   -H "signature: 67373adc02c7f07a8725b6c1d22d9a3e" \
//   "https://api.payfast.co.za/transactions/history?from=2017-01-01&to=2017-02-01"
