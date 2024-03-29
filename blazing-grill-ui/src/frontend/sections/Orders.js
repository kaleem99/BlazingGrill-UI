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

import { MdOutlineArrowCircleLeft } from "react-icons/md";
import OrdersCustomerView from "./OrdersCustomerView";
import { getOrders } from "../../helpers/GetOrdersPlaced";
function Orders({
  storeStatus,
  setstoreStatus,
  storeName,
  store,
  detailsOfStore,
  setPendingOrders,
  setInProgress,
  PendingOrders,
  inProgress,
}) {
  const examcollref = doc(db, "BlazingStores", store[0].id);

  const [customersOrders, setCustomersOrders] = useState([]);
  const [orderSection, setOrderSection] = useState("Collection");
  const ButtonStatus = ["In Progress", "Collection", "Delivery", "Complete"];
  const [changeState, setChangeState] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page or index
  const [customerView, setCustomerView] = useState(false);
  const audio = new Audio(
    "https://kaleem99.github.io/hostingContents/mixkit-clear-announce-tones-2861.wav"
  );
  // Calculate the starting and ending indexes for the current page
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;

  // Get the items to display for the current page
  useEffect(() => {
    setstoreStatus(detailsOfStore.storeStatus);
    // getOrders(storeName, setPendingOrders, setInProgress);
  }, []);
  const handleChange = () => {
    let status = "";

    if (storeStatus) {
      status = false;
    } else {
      status = true;
    }

    detailsOfStore.storeStatus = status;
    updateDoc(examcollref, {
      [storeName[0]]: detailsOfStore,
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

  // console.log(PendingOrders);
  const setOrders = (data) => {
    setCustomersOrders(data);
  };
  const changeOrderStatus = (userId, data) => {
    const userRef = doc(db, "Orders", userId);

    // let x = document.getElementById("SelectValue");
    const newData = data;
    newData.status = changeState;
    updateDoc(userRef, newData);
  };
  const handleStateChange = (value) => {
    setCustomersOrders([]);
    setOrderSection(value);
  };
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // console.log(inProgress)
  // Function to handle the "back" button click
  const handleBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const displayedItems = inProgress.slice(startIndex, endIndex);
  const checkConditionFunction = (type) => {
    if (type === "Complete") {
      return displayedItems;
    } else {
      return inProgress;
    }
  };
  if (!customerView) {
    return (
      <div className="Home">
        {storeName[0] !== "admin" && (
          <>
            <Switch
              onChange={() => setstoreStatus(handleChange())}
              checked={storeStatus}
            />
            <br></br>
            <p style={{ color: "white", fontSize: "30px" }}>
              store status:{" "}
              {storeStatus ? "Accepting Orders" : "Not Accepting Orders"}
            </p>
          </>
        )}
        <text style={{ color: "white", fontSize: "30px" }}>Orders</text>
        <br></br>
        <div className="ItemsSections">
          {/* <input type="text" className="searchInputBox" /> */}
          <button
            className="NextAndBackButton1"
            onClick={handleBack}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="NextAndBackButton2"
            onClick={handleNext}
            disabled={endIndex >= inProgress.length}
          >
            Next
          </button>
          <h2
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "bolder",
              fontFamily: "sans-serif",
            }}
          >
            Page: {currentPage + 1}
          </h2>

          <div className="container">
            {ButtonStatus.map((value) => (
              <button
                className={
                  orderSection === value ? "column btnActiveOrders" : "column"
                }
                onClick={() => handleStateChange(value)}
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
                  <th>Order Type</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Customer Cell Number</th>
                  <th>Date</th>
                  <th>View Orders</th>
                  <th>Change Status</th>
                </tr>
                {checkConditionFunction(orderSection)
                  .sort((a, b) => (b.date > a.date ? 1 : -1))
                  .map(
                    (data, i) =>
                      data.status === orderSection && (
                        <tr>
                          <td>{data.orderNumber}</td>
                          <td>{data.orderType}</td>
                          <td>{data.Name}</td>
                          <td>{data.email}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.date}</td>
                          <td>
                            <button
                              onClick={() => setOrders(data)}
                              style={{
                                height: "35px",
                                borderRadius: "10px",
                                border: "2px solid #f7941d",
                              }}
                            >
                              View Customers Orders
                            </button>
                          </td>
                          <td>
                            <select
                              id="SelectValue"
                              onChange={(e) => setChangeState(e.target.value)}
                              defaultValue={data.status}
                            >
                              <option value="In Progress">In Progress</option>
                              {(orderSection === "Delivery" ||
                                orderSection === "Collection") && (
                                <option value="Complete">Complete</option>
                              )}
                              <option value={data.orderType}>
                                {data.orderType}
                              </option>
                            </select>
                            <button
                              onClick={() => changeOrderStatus(data.id, data)}
                              id="save"
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                <button onClick={() => setCustomerView(true)}>
                  Customer View
                </button>
              </table>
            ) : (
              <table>
                <tr>
                  <th>Go Back</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Customer Phone Number</th>
                  <th>Order Type</th>
                  <th></th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>
                    <p
                      className="BackButton"
                      style={{ width: "50px", height: "50px", border: "none" }}
                      onClick={() => setCustomersOrders([])}
                    >
                      <MdOutlineArrowCircleLeft />
                    </p>
                  </td>
                  <td>{customersOrders.Name}</td>
                  <td>{customersOrders.email}</td>
                  <td>{customersOrders.phoneNumber}</td>
                  <td>{customersOrders.orderType}</td>
                  <td></td>
                  <td>R{customersOrders.total}</td>
                </tr>
                <tr>
                  <th></th>
                  <th>Product Type</th>
                  <th>Product Name</th>
                  <th>Special Instructions</th>
                  <th>Extras</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>

                {customersOrders.food.map((items) => (
                  <tr>
                    <td></td>
                    <td>{items.productType}</td>
                    <td>{items.productName}</td>
                    <td>
                      {items.specialInstructions
                        ? items.specialInstructions
                        : "None"}
                    </td>
                    <td>{items.extras ? items.extras.join(", ") : "None"}</td>
                    <td>{items.productQuantity}</td>
                    <td>R{items.productPrice}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <OrdersCustomerView
        orders={checkConditionFunction(orderSection)}
        setCustomerView={setCustomerView}
      />
    );
  }
}

export default Orders;
