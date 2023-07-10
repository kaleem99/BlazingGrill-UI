import { useState } from "react";
import AccountDetails from "./StoreAccountDetails";
import { signOut } from "firebase/auth";
import { auth } from "../../database/config";
import logout from "../../components/logoutOfStore";
import ViewDeliveryDrivers from "../../components/viewDeliveryDrivers";
import DeliveryDriver from "./DeliveryDriver";
import { IoArrowBackCircleSharp } from "react-icons/io5";
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
