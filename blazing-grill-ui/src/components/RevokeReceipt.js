import { useState } from "react";
import style from "./recieptStyles";
const RevokeReceipt = ({
  receiptData,
  food,
  handleRevokePrint,
  revokedRef,
  setState,
  state,
}) => {
  return (
    <div>
      <h2 style={{ color: "white" }}>Please enter A Reason</h2>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{ width: "100%", marginBottom: "30px" }}
        className="place-order-input"
      />
      <div style={{ width: "350px" }} ref={revokedRef}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffffff",
            fontFamily: "Arial, sans-serif",
            border: "1px solid #ccc",
          }}
        >
          <h3
            style={{
              color: "#333",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            *** The Blazing Grill Kitchen ***
          </h3>
          <br />
          {food.map((item) => (
            <div
              key={item.productName}
              style={{ marginBottom: "5px", textAlign: "left" }}
            >
              {item.productQuantity} x {item.productName}{" "}
              <input
                style={{ float: "right", height: "17px", width: "17px" }}
                type="checkbox"
              />
              {/* <bold style={{ float: "right" }}>R{item.productPrice}</bold> */}
            </div>
          ))}
          <br />
          <hr style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }} />
          {/* <strong>Tax:</strong> R{(data.total * 15) / 100} */}
          <strong>
            <h2>** Revoked **</h2>
          </strong>
          <strong style={{ float: "left" }}>Date:</strong>{" "}
          <text style={{ float: "right" }}>{receiptData.date}</text>
          <br />
          <strong style={{ float: "left" }}>Time:</strong>
          <text style={{ float: "right" }}> {receiptData.time}</text>
          <br />
          <strong style={{ float: "left" }}>Channel:</strong>
          <text style={{ float: "right" }}> Kaleem</text>
          <br />
          <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
          <em>Come Get Some!!!</em>
        </div>
        <button
          style={style.printButtons}
          onClick={() => {
            if (state !== "") {
              alert("Please ensure to add a valid reason");
            }
            const result = window.confirm(
              "Are your sure you want to revoke the order."
            );
            if (result) {
              handleRevokePrint();
            }
          }}
        >
          Revoke Customer Reciept
        </button>
      </div>
    </div>
  );
};

export default RevokeReceipt;
