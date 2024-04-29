import React from "react";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const PrintComponent = ({ receiptData, setShowReciept, setReceiptData }) => {
  const [state, setState] = useState();
  const food = receiptData.food;
  const componentRef = React.useRef();
  const kitchenComponentRef = React.useRef();
  console.log(food);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleKitchenPrint = useReactToPrint({
    content: () => kitchenComponentRef.current,
  });
  // console.log(food);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        width: "100%",
        height: "100vh",
        background: "#1F1F1F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "9"
      }}
    >
      <button onClick={() => setShowReciept(false)} style={style.closeBtn}>
        <IoCloseCircleSharp />
      </button>
      <div
        style={{
          display: "flex",
          width: "750px",
          color: "black",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ width: "350px" }} ref={componentRef}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                fontFamily: "Arial, sans-serif",
                border: "1px solid #ccc",
              }}
            >
              <h2
                style={{
                  color: "#333",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                The Blazing Grill
              </h2>
              <strong>{receiptData.storeName}</strong>
              <br />
              {food.map((item) => (
                <div key={item.productName} style={{ marginBottom: "5px" }}>
                  {item.productQuantity} x {item.productName}{" "}
                  <span style={{ float: "right" }}>R{item.productPrice}</span>
                </div>
              ))}
              <br />
              <hr
                style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
              />
              <strong>Order Type:</strong> {receiptData.orderType}
              <br />
              <strong>Order Number:</strong> R{receiptData.orderNumber}
              <hr
                style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
              />
              <strong>Tax:</strong> R{(receiptData.total * 15) / 100}
              <br />
              <strong>Total:</strong> R{receiptData.total}
              <br />
              <strong>Date:</strong> {receiptData.date}
              <br />
              <strong>Time:</strong> {receiptData.time}
              <br />
              <strong>Sales Channel:</strong> Kaleem
              <br />
              <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
              <em>Come Get Some!!!</em>
            </div>
          </div>
          <button style={style.printButtons} onClick={handlePrint}>
            Print Customer Reciept
          </button>
        </div>
        <div style={{ width: "50px" }}></div>
        <div>
          <div style={{ width: "350px" }} ref={kitchenComponentRef}>
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
                - - The Blazing Grill Kitchen - -
              </h3>
              <br />
              {food.map((item) => (
                <div key={item.productName} style={{ marginBottom: "5px" }}>
                  {item.productQuantity} x {item.productName}{" "}
                  <input
                    style={{ float: "right", height: "17px", width: "17px" }}
                    type="checkbox"
                  />
                  {/* <bold style={{ float: "right" }}>R{item.productPrice}</bold> */}
                </div>
              ))}
              <br />
              <hr
                style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
              />
              {/* <strong>Tax:</strong> R{(data.total * 15) / 100} */}
              <br />
              {/* <strong>Total:</strong> R{data.total} */}
              <br />
              <strong>Date:</strong> {receiptData.date}
              <br />
              <strong>Time:</strong> {receiptData.time}
              <br />
              <strong>Channel:</strong> Kaleem
              <br />
              <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
              <em>Come Get Some!!!</em>
            </div>
          </div>
          <button style={style.printButtons} onClick={handleKitchenPrint}>
            Print Kitchen Reciept
          </button>
        </div>
      </div>
    </div>
  );
};
const style = {
  printButtons: {
    width: "100%",
    height: "40px",
    float: "right",
    margin: "10px auto",
    borderRadius: "5px",
    border: "none",
  },
  closeBtn: {
    position: "absolute",
    right: "50px",
    top: "50px",
    fontSize: "50px",
    display: "flex",
  },
};
export default PrintComponent;
