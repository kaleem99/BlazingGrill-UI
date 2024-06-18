import React, { useState } from "react";
import Modal from "react-modal";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function OrderConfirmationModal({
  food,
  onAccept,
  onDecline,
  setTime,
  time,
  setTimerObj,
  timerObj,
  getCurrentTime,
  data,
}) {
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
  console.log(data);
  // const updateTimer = () => {
  //   let min =
  // }
  const newCurrentTime = getCurrentTime();
  // if (newCurrentTime > data.time) {
  //   handleDecline();
  // }
  return (
    <Modal
      isOpen={isOpen}
      style={{
        position: "fixed",
        width: "60%",
        height: "45vh",
        margin: "auto",
        borderRadius: "30px",
        inset: "0px",
        backgroundColor: "#dddddd",
        overflow: "auto",
      }}
    >
      {" "}
      <CountdownCircleTimer
        isPlaying
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[60, 30, 15, 0]}
        size={120}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <div
        style={{
          width: "80%",
          marginRight: "0px",
          marginLeft: "auto",
          position: "relative",
          top: "-40%",
        }}
      >
        <h2>
          New Incoming Order {"\n"} {foodStringData}
        </h2>
        <h2>
          {"\n"}
          Please select an order estimate time.
        </h2>
      </div>
      <div style={{ position: "relative", top: "-40%" }}>
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
        </select>{" "}
        {timerObj}
        <p>Do you want to accept this order?</p>
        <button className="btnOrder" onClick={handleAccept}>
          Accept
        </button>
        <button className="btnOrder" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </Modal>
  );
}

export default OrderConfirmationModal;
