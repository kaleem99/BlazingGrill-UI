import React, { useState } from "react";
import Modal from "react-modal";

function OrderConfirmationModal({ food, onAccept, onDecline }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
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
      <h2>New Incoming Order {foodStringData}</h2>
      <p>Do you want to accept this order?</p>
      <button className="btnOrder" onClick={handleAccept}>Accept</button>
      <button className="btnOrder" onClick={handleDecline}>Decline</button>
    </Modal>
  );
}

export default OrderConfirmationModal;
