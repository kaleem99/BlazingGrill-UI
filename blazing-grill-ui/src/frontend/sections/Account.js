import { useEffect, useState } from "react";
import AccountDetails from "./StoreAccountDetails";
import { signOut } from "firebase/auth";
import { auth } from "../../database/config";
import logout from "../../components/logoutOfStore";
import ViewDeliveryDrivers from "../../components/viewDeliveryDrivers";
import DeliveryDriver from "./DeliveryDriver";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Admin, Resource } from "react-admin";
import { firebaseConfig } from "../../database/config";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
  FirebaseRealTimeSaga,
} from "react-admin-firebase";

import {
  MdAccountBox,
  MdDirectionsBike,
  MdOutlineRateReview,
  MdLogout,
  MdPointOfSale,
} from "react-icons/md";
import StoreSales from "./StoreSales";
const accountSections = [
  "Account Details",
  "Store Sales",
  "Add Delivery Drivers",
  "View Delivery Drivers",
  "Logout of Store",
];
function Account({
  store,
  setState,
  storeName,
  detailsOfStore,
  storeStatus,
  storeDetails,
}) {
  useEffect(() => {
    fetch("https://express-template-backend.onrender.com/my/webhook/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        console.log(response, "check")
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // You can handle the response here if needed
        console.log(response, "response Data")
        console.log("Webhook request successful");
      })
      .catch((error) => {
        // You can handle errors here if needed
        console.error("Error:", error);
      });
  }, []);
  const [sections, setSections] = useState("");
  const iconsArr = [
    <MdAccountBox />,
    <MdPointOfSale />,
    <MdDirectionsBike />,
    <MdOutlineRateReview />,
    <MdLogout />,
  ];
  let body = "";
  switch (sections) {
    case "Account Details":
      body = (
        <AccountDetails
          store={store}
          setState={setState}
          storeName={storeName}
          detailsOfStore={detailsOfStore}
          storeStatus={storeStatus}
        />
      );
      break;
    case "Logout of Store":
      logout(setState);
      setSections("");
      body = "";
      break;
    case "Store Sales":
      body = <StoreSales storeDetails={storeDetails} storeName={storeName} />;
      break;
    case "Add Delivery Drivers":
      // setState("DeliveryDriver");
      body = <DeliveryDriver storeName={storeName} />;
      break;
    case "View Delivery Drivers":
      body = <ViewDeliveryDrivers storeName={storeName} />;
      break;
    default:
      body = "";
      break;
  }
  const dataProvider = FirebaseDataProvider(firebaseConfig, {});
  console.log(dataProvider);
  return sections === "" ? (
    <div>
      <h1 style={{ color: "white" }}>Store Account</h1>
      {accountSections.map((data, i) => {
        return (
          <div className="DivAccountHover" onClick={() => setSections(data)}>
            <p
              style={{
                width: "60px",
                fontSize: "50px",
                marginBlockStart: "0.1em",
                color: "white",
              }}
            >
              {iconsArr[i]}
            </p>
            <h1 className="AccountHover">{data}</h1>
          </div>
        );
      })}
    </div>
  ) : (
    <div>
      <h1
        onClick={() => setSections("")}
        style={{
          color: "white",
          // right: "68%",
          position: "relative",
          fontSize: "40px",
          cursor: "pointer",
        }}
      >
        <IoArrowBackCircleSharp />
      </h1>
      {body}
    </div>
  );
}
export default Account;
