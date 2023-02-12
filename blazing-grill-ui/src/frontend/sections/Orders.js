import { useState } from "react";
import Switch from "react-switch";

function Orders({ storeStatus, setstoreStatus }) {

  const handleChange = () => {
    if (storeStatus) {
      return false;
    } else {
      return true;
    }
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
