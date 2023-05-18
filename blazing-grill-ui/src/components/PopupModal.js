import React, { useState } from "react";
import Modal from "react-modal";

function OrderConfirmationModal({ food, onAccept, onDecline, setTime, time }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleAccept = () => {
    if (time === "") {
      return alert("Please ensure to select an order estimated time.");
    }
    onAccept();
    setIsOpen(false);
  };

  const handleDecline = () => {
    onDecline();
    setIsOpen(false);
  };
  let foodStringData = "";
  for (let i = 0; i < food.length; i++) {
    foodStringData +=
      "\n" + food[i].productQuantity + " x " + food[i].productName;
    // "\n";
  }
  console.log(foodStringData);
  return (
    <Modal
      isOpen={isOpen}
      style={{
        position: "fixed",
        width: "50%",
        height: "40vh",
        margin: "auto",
        borderRadius: "30px",
        inset: "0px",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <h2>
        New Incoming Order {"\n"} {foodStringData}
      </h2>
      <h2>
        {"\n"}
        Please select an order estimate time.
      </h2>
      <select
        name="time"
        id="SelectValue"
        onChange={(e) => setTime(e.target.value)}
      >
        <option selected disabled>
          None
        </option>
        <option value="10">10 minutes</option>
        <option value="20">20 minutes</option>
        <option value="30">30 minutes</option>
        <option value="40">40 minutes</option>
        <option value="50">50 minutes</option>
        <option value="60">60 minutes</option>
      </select>
      <p>Do you want to accept this order?</p>
      <button className="btnOrder" onClick={handleAccept}>
        Accept
      </button>
      <button className="btnOrder" onClick={handleDecline}>
        Decline
      </button>
    </Modal>
  );
}

export default OrderConfirmationModal;
