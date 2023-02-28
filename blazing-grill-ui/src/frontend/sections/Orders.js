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
  const [PendingOrders, setPendingOrders] = useState([]);
  const examcollref = doc(db, "BlazingStores", store[0].id);
  useEffect(() => {
    getDocs(collection(db, "Orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData = newData.filter(
        (data) =>
          data.storeName === storeName[0] && data.status === "Pending" && data
      );
      setPendingOrders(filteredData);
    });
  }, [PendingOrders, storeName]);
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

  const incomingOrder = () => {
    if (PendingOrders.length > 0) {
      const docRef = doc(db, "Orders", PendingOrders[0].id);
      if (window.confirm("New Incoming Order")) {
        const newOrderData = PendingOrders[0];
        newOrderData.status = "Accepted";
        updateDoc(docRef, newOrderData);
        alert("Order has been accepted");
      } else {
        deleteDoc(docRef);
        alert("Order has been declined.");
      }
    }
  };
  // console.log(PendingOrders);

  return (
    <div className="Home">
      {incomingOrder()}
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
        <h2 style={{ color: "white", fontSize: "15px" }}>
          Currently no orders
        </h2>
        <div className="container">
          <div className="column">Column 1</div>
          <div className="column">Column 2</div>
          <div className="column">Column 3</div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
