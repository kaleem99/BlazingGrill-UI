import { useState, useEffect } from "react";
import Switch from "react-switch";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../database/config";

function Orders({
  storeStatus,
  setstoreStatus,
  storeName,
  store,
  detailsOfStore,
}) {
  const examcollref = doc(db, "BlazingStores", store[0].id);
  const handleChange = () => {
    let status = "";

    if (storeStatus) {
      status = false;
    } else {
      status = true;
    }
    updateDoc(examcollref, {
      [storeName[0]]: {
        adminUsername: detailsOfStore.adminUsername,
        address: detailsOfStore.address,
        store: detailsOfStore.store,
        storeStatus: status,
      },
    })
      .then((response) => {
        const result = status ? "online" : "offline";
        alert("store status has been updated to " + result);
        setstoreStatus(status);
      })
      .catch((error) => {
        console.log(error.message);
      });
    return status;
  };

  return (
    <div className="Home">
      <Switch
        onChange={() => setstoreStatus(handleChange())}
        checked={storeStatus}
      />
      <br></br>
      <p style={{ color: "white", fontSize: "30px" }}>
        store status:{" "}
        {storeStatus ? "Accepting Orders" : "Not Accepting Orders"}
      </p>
      <text style={{ color: "white", fontSize: "30px" }}>Orders</text>
      <br></br>
      <div class="ItemsSections">
        <h1>Currently no orders</h1>
      </div>
    </div>
  );
}

export default Orders;
