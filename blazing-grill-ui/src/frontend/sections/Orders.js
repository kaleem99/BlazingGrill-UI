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
  const [inProgress, setInProgress] = useState([]);
  const examcollref = doc(db, "BlazingStores", store[0].id);
  const [customersOrders, setCustomersOrders] = useState([]);
  const [orderSection, setOrderSection] = useState("Collection");
  const ButtonStatus = ["In Progress", "Collection", "Delivery", "Complete"];
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
      const filteredInProgressData = newData.filter(
        (data) => data.storeName === storeName[0] && data
      );
      console.log(filteredData);
      setInProgress(filteredInProgressData);
      setPendingOrders(filteredData);
      console.log(filteredInProgressData);
      console.log(PendingOrders);
    });
  }, []);
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
        let newPendingOrder = PendingOrders.shift();
        setPendingOrders(PendingOrders);
      } else {
        const newOrderData = PendingOrders[0];
        newOrderData.status = "Declined";
        updateDoc(docRef, newOrderData);
        setTimeout(() => {
          deleteDoc(docRef);
        }, 1000);
        alert("Order has been declined.");
      }
    }
  };
  // console.log(PendingOrders);
  const setOrders = (data) => {
    setCustomersOrders(data);
  };
  const changeOrderStatus = (userId, data) => {
    const userRef = doc(db, "Orders", userId);

    let x = document.getElementById("SelectValue");
    console.log(x.value);
    const newData = data;
    newData.status = x.value;
    updateDoc(userRef, newData);
  };
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
      <div className="ItemsSections">
        <h2 style={{ color: "white", fontSize: "15px" }}>
          Currently no orders
        </h2>
        <div className="container">
          {ButtonStatus.map((value) => (
            <button
              className={
                orderSection === value ? "column btnActiveOrders" : "column"
              }
              onClick={() => setOrderSection(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div>
          {customersOrders.length === 0 ? (
            <table>
              <tr>
                <th>Order Number</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Test</th>
                <th>View Orders</th>
                <th>Change Status</th>
              </tr>

              {inProgress.map(
                (data, i) =>
                  data.status === orderSection && (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{data.Name}</td>
                      <td>{data.email}</td>
                      <td>{data.date}</td>
                      <td>
                        <button
                          onClick={() => setOrders(data)}
                          style={{ height: "35px", borderRadius: "10px" }}
                        >
                          View Customers Orders
                        </button>
                      </td>
                      <td>
                        <select id="SelectValue">
                          <option value="Collection">Collection</option>
                          <option value="Complete">Complete</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                        <button
                          onClick={() => changeOrderStatus(data.id, data)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </table>
          ) : (
            <table>
              <tr>
                <th>Product Type</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
              {customersOrders.food.map((items) => (
                <tr>
                  <td>{items.productType}</td>
                  <td>{items.productName}</td>
                  <td>{items.productQuantity}</td>
                </tr>
              ))}
              <button onClick={() => setCustomersOrders([])}>
                Back To Customer Details
              </button>
              ;
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
