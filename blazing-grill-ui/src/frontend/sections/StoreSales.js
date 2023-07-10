import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../../database/config";
import { useState, useEffect } from "react";
import { db } from "../../database/config";
function StoreSales({ storeName, storeDetails }) {
  const [sales, setSales] = useState("");
  const [currentSales, setCurrentSales] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [todaysOrders, setTodaysOrders] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [selectedStore, setSelectedStore] = useState(storeName[0]);
  const arrSalesItems = [1, 2, 3, 4];
  useEffect(() => {
    getDocs(collection(db, "Orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log(newData);
      const filteredArray = newData.filter(
        (obj) => obj.storeName === selectedStore
      );
      const totalSum = filteredArray.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.total;
      }, 0);
      const today = new Date().toISOString().split("T")[0];
      const filteredTodaysSales = newData.filter((data) => data.date === today);

      setSales(totalSum);
      setCurrentSales(
        filteredTodaysSales.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.total;
        }, 0)
      );
      setTotalOrders(filteredArray.length);
      setTodaysOrders(filteredTodaysSales.length);
      setFilteredData(filteredArray);
    });
  }, []);
  const changeStore = (value) => {
    setSelectedStore(value);
    getDocs(collection(db, "Orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log(newData);
      const filteredArray = newData.filter((obj) => obj.storeName === value);
      const totalSum = filteredArray.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.total;
      }, 0);
      const today = new Date().toISOString().split("T")[0];
      const filteredTodaysSales = newData.filter((data) => data.date === today);

      setSales(totalSum);
      setCurrentSales(
        filteredTodaysSales.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.total;
        }, 0)
      );
      setTotalOrders(filteredArray.length);
      setTodaysOrders(filteredTodaysSales.length);
      setFilteredData(filteredArray);
    });
  };
  const myDateInput = document.getElementById("SalesDatePicker");
  if (myDateInput != null) {
    myDateInput.defaultValue = new Date().toISOString().substring(0, 10);
  }
  const changeSalesDate = (value) => {
    console.log(value);
    const filterByDate = filteredData.filter((data) => data.date === value);
    console.log(filterByDate);
    setCurrentSales(
      filterByDate.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.total;
      }, 0)
    );
    setTodaysOrders(filterByDate.length);
  };
  return (
    <div
      style={{
        width: "60%",
        height: "auto",
        // border: "1px solid white",
        margin: "auto",
      }}
    >
      <h1 style={{ color: "white" }}>Store Sales</h1>
      <div
        style={{
          width: "auto",
          height: "auto",
          background: "#ededed",
          margin: "50px auto",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
          {storeName[0] === "admin" ? (
            <select
              style={{
                width: "200px",
                margin: "auto",
                height: "40px",
                borderRadius: "10px",
              }}
              onChange={(e) => changeStore(e.target.value)}
            >
              {storeDetails.map(
                (data) =>
                  Object.keys(data)[0] !== "admin" && (
                    <option selected={Object.keys(data)[0] === selectedStore}>
                      {Object.keys(data)[0]}
                    </option>
                  )
              )}
            </select>
          ) : (
            <div></div>
          )}
          <input
            onChange={(e) => changeSalesDate(e.target.value)}
            type="date"
            id="SalesDatePicker"
          />
          <div></div>
          {arrSalesItems.map((data, i) => {
            return (
              <div
                style={{
                  width: "250px",
                  height: "220px",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "0px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {i === 0 && (
                  <>
                    <p>Total Store Sales: </p>
                    <h2 className="Sales">R{sales === "" ? "" : sales}</h2>
                    <p>Todays Sales:</p>
                    <h2 className="Sales">
                      R{currentSales === "" ? "" : currentSales}
                    </h2>
                  </>
                )}
                {i === 1 && (
                  <>
                    <p>Total Orders: </p>
                    <h2 className="Sales">
                      {totalOrders === "" ? "" : totalOrders}
                    </h2>
                    <p>Todays Orders:</p>
                    <h2 className="Sales">
                      {todaysOrders === "" ? "" : todaysOrders}
                    </h2>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StoreSales;
