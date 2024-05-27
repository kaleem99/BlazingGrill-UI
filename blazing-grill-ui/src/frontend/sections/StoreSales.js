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
import { useState, useEffect, useRef } from "react";
import { db } from "../../database/config";
import getDatabaseDocs from "../../helpers/GetDatabaseDocs";
import { useReactToPrint } from "react-to-print";
import CashoutReciepts from "../../components/CashoutReceipt";

function StoreSales({ storeName, storeDetails }) {
  const [sales, setSales] = useState("");
  const [currentSales, setCurrentSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todaysOrders, setTodaysOrders] = useState(0);
  const [todaysRejectedOrders, setTodaysRejectedOrders] = useState();
  const [filteredData, setFilteredData] = useState("");
  const [selectedStore, setSelectedStore] = useState(storeName[0]);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [deliveryAndCollectionSales, setDeliveryAndCollectionSales] = useState({
    Collection: 0,
    Delivery: 0,
  });
  const [receiptData, setReceiptData] = useState([]);
  const [cashout, setCashout] = useState(false);
  const ref = useRef();
  const arrSalesItems = [1, 2, 3, 4, 5];
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const fetchDeclinedOrders = async () => {
      let result = await getDatabaseDocs("DeclinedOrders");
      // console.log(result, 2);
      result = result.filter((data) => data.storeName === storeName[0]);
      setRejectedOrders(result.length);
      // "Blazing Grills Florida"
      // console.log(storeName[0], result, 34);
    };
    fetchDeclinedOrders();
    getDocs(collection(db, "Orders")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log(newData);
      const filteredArray = newData.filter(
        (obj) => obj.storeName === selectedStore
      );
      const rejectedDatabaseOrders = filteredArray.filter(
        (data) => data.status === "Declined"
      ).length;
      console.log(filteredArray);
      const totalSum = filteredArray.reduce((accumulator, currentObject) => {
        return parseFloat(accumulator) + parseFloat(currentObject.total);
      }, 0);
      const today = new Date().toISOString().split("T")[0];
      const filteredTodaysSales = filteredArray.filter(
        (data) => data.date === today
      );
      const collectionSales = filteredArray.filter(
        (data) => data.orderType === "Collection"
      ).length;
      const deliverySales = filteredArray.filter(
        (data) => data.orderType === "Delivery"
      ).length;
      setDeliveryAndCollectionSales({
        Delivery: deliverySales,
        Collection: collectionSales,
      });
      // console.log(totalSum, "TOTAL SUM:");
      setSales(totalSum.toFixed(2));
      const sumOfCurrentSales = filteredTodaysSales.reduce((a, b) => {
        return a + parseFloat(b.total);
      }, 0);
      // console.log(filteredTodaysSales, "filteredTodaysSales");
      setCurrentSales(sumOfCurrentSales.toFixed(2));
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

      setSales(totalSum.toFixed(2));
      setCurrentSales(
        filteredTodaysSales.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.total;
        }, [])
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
    const filterByDate = filteredData.filter((data) => data.date === value);
    setCurrentSales(
      filterByDate.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.total;
      }, [])
    );
    setTodaysOrders(filterByDate.length);
    // ref.current.value = value;
    console.log(ref.current.value);
  };
  const chashoutSales = async () => {
    const orders = await getDatabaseDocs("Orders");
    const filteredOrders = orders.filter(
      (data) => data.date === ref.current.value
    );
    setReceiptData(filteredOrders);
    // if (filteredOrders.length > 0) {
      setCashout(true);
    // }
    console.log(orders, 10);
    console.log(new Date().getUTCDate(), ref.current.value);
    console.log(filteredOrders, ref.current.value);
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
      {cashout && (
        <CashoutReciepts
          receiptData={receiptData}
          handlePrint={handlePrint}
          componentRef={componentRef}
          setCashout={setCashout}
        />
      )}
      <h1 style={{ color: "white" }}>Store Sales</h1>
      <div
        style={{
          width: "auto",
          height: "auto",
          // background: "#ededed",
          margin: "auto",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "33% 33% 33%" }}>
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
            ref={ref}
            id="SalesDatePicker"
          />
          <div></div>
          {arrSalesItems.map((data, i) => {
            return (
              <div
                style={{
                  width: "90%",
                  height: "220px",
                  marginTop: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "0px",
                  // background: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "10px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {i === 0 && (
                  <>
                    <p className="SalesText">Total Store Sales: </p>
                    <h2 className="Sales">R{sales === "" ? 0 : sales}</h2>
                    <p className="SalesText">Todays Sales:</p>
                    <h2 className="Sales">
                      R{currentSales === "" ? "" : currentSales}
                    </h2>
                  </>
                )}
                {i === 1 && (
                  <>
                    <p className="SalesText">Total Orders: </p>
                    <h2 className="Sales">
                      {totalOrders === "" ? "" : totalOrders}
                    </h2>
                    <p className="SalesText">Todays Orders:</p>
                    <h2 className="Sales">
                      {todaysOrders === "" ? "" : todaysOrders}
                    </h2>
                  </>
                )}
                {i === 2 && (
                  <>
                    <p className="SalesText">Total Rejected Orders: </p>
                    <h2 className="Sales">{rejectedOrders}</h2>
                    {/* <p className="SalesText">Todays Rejected Orders:</p> */}
                    {/* <h2 className="Sales">{todaysOrders}</h2> */}
                  </>
                )}
                {i === 3 && (
                  <>
                    <p className="SalesText">Collection Orders: </p>
                    <h2 className="Sales">
                      {deliveryAndCollectionSales.Collection}
                    </h2>
                    <p className="SalesText">Delivery Orders:</p>
                    <h2 className="Sales">
                      {deliveryAndCollectionSales.Delivery}
                    </h2>
                  </>
                )}
                {i === 4 && (
                  <>
                    <p className="SalesText">Cash Out Sales: </p>
                    <button onClick={() => chashoutSales()}>Cash out</button>
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
