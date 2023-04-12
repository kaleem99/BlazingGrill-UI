import { useState, useEffect } from "react";
import Switch from "react-switch";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../database/config";
import SendEmailOrder from "../../components/sendEmailOrder";

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
    // const fetchData = async () => {
    //   getDocs(collection(db, "Orders")).then((querySnapshot) => {
    //     const newData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     const filteredData = newData.filter(
    //       (data) =>
    //         data.storeName === storeName[0] && data.status === "Pending" && data
    //     );
    //     const filteredInProgressData = newData.filter(
    //       (data) => data.storeName === storeName[0] && data
    //     );
    //     setInProgress(filteredInProgressData);
    //     setPendingOrders(filteredData);
    //     console.log("*".repeat(50));
    //   });
    // };
    // fetchData();
    const unsubscribe = onSnapshot(
      collection(db, "Orders"),
      (querySnapshot) => {
        // Callback function triggered when the collection data changes
        if (!querySnapshot.empty) {
          // Check if the collection contains data
          const items = [];
          const inProgress = [];
          querySnapshot.forEach((doc) => {
            // Add each document's data to the 'items' array
            console.log(doc.data());
            if (
              doc.data().status === "Pending" &&
              doc.data().storeName === storeName[0]
            ) {
              items.push({ id: doc.id, ...doc.data() });
            }

            // if (doc.data().status === "In Progress") {
            inProgress.push(doc.data());
            // }
          });
          setPendingOrders(items);
          setInProgress(inProgress);
        } else {
          console.log("No data in the collection");
        }
      }
    );

    return () => {
      // Cleanup function to unsubscribe from snapshot listener
      unsubscribe();
    };
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
        latitude: detailsOfStore.latitude,
        longitude: detailsOfStore.longitude,
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
      console.log(PendingOrders[0]);
      const foodOrder = PendingOrders[0].food;
      let foodStringData = "";
      for (let i = 0; i < foodOrder.length; i++) {
        foodStringData +=
          "\n" +
          foodOrder[i].productQuantity +
          " x " +
          foodOrder[i].productName;
        // "\n";
      }
      if (window.confirm("New Incoming Order " + foodStringData)) {
        const newOrderData = PendingOrders[0];
        newOrderData.status = "In Progress";
        SendEmailOrder(
          newOrderData.Name,
          newOrderData.food,
          newOrderData.total
        );
        updateDoc(docRef, newOrderData);
        alert("Order has been accepted");
        let newPendingOrder = PendingOrders.shift();
        setPendingOrders(PendingOrders);
      } else {
        const newOrderData = PendingOrders[0];
        // newOrderData.status = "Declined";
        // updateDoc(docRef, newOrderData);
        // setTimeout(() => {
        deleteDoc(docRef);
        // }, 1000);
        const deletedOrder = PendingOrders.shift();
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
  console.log(storeStatus);
  return (
    <div className="Home">
      {incomingOrder()}
      {/* <button
        onClick={() =>
          SendEmailOrder(
            "Kaleem",
            [
              {
                productQuantity: 1,
                productPrice: 30,
                productName: "MEDIUM FRIES",
                productType: "Fries",
              },
              {
                productName: "6 BBQ WINGS",
                productPrice: 59,
                productQuantity: 1,
                productType: "Chicken Wings",
              },
            ],
            89
          )
        }
      >
        Send Order
      </button> */}
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
                        <select id="SelectValue" defaultValue={data.status}>
                          <option value="In Progress">In Progress</option>
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