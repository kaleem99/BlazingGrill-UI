import { useState } from "react";
import AccountDetails from "./StoreAccountDetails";
import { signOut } from "firebase/auth";
import { auth } from "../../database/config";
import logout from "../../components/logoutOfStore";
import ViewDeliveryDrivers from "../../components/viewDeliveryDrivers";
import DeliveryDriver from "./DeliveryDriver";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const accountSections = [
  "Account Details",
  "Add Delivery Drivers",
  "View Delivery Drivers",
  "Logout of Store",
];
function Account({ store, setState, storeName, detailsOfStore, storeStatus }) {
  const [sections, setSections] = useState("");

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
      {accountSections.map((data) => {
        return (
          <h1 className="AccountHover" onClick={() => setSections(data)}>
            {data}
          </h1>
        );
      })}
    </div>
  ) : (
    <div>
      <h1
        onClick={() => setSections("")}
        style={{
          color: "white",
          right: "68%",
          top: "37%",
          position: "absolute",
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
