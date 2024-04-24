import React from "react";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";
const PrintComponent = ({ data }) => {
  const [state, setState] = useState();
  const food = data.food;
  const componentRef = React.useRef();
  const kitchenComponentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleKitchenPrint = useReactToPrint({
    content: () => kitchenComponentRef.current,
  });
  console.log(food);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        width: "700px",
      }}
    >
      <button style={{ width: "auto", height: "40px" }} onClick={handlePrint}>
        Print Customer Reciept
      </button>
      <button
        style={{ width: "auto", height: "40px", float: "right" }}
        onClick={handleKitchenPrint}
      >
        Print Kitchen Reciept
      </button>
      <div style={{ display: "flex", width: "700px" }}>
        <div style={{ width: "350px" }} ref={componentRef}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              fontFamily: "Arial, sans-serif",
              border: "1px solid #ccc",
            }}
          >
            <h2 style={{ color: "#333", marginBottom: "10px" }}>
              The Blazing Grill
            </h2>
            <strong>{data.storeName}</strong>
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
            <strong>Tax:</strong> R{(data.total * 15) / 100}
            <br />
            <strong>Total:</strong> R{data.total}
            <br />
            <strong>Date:</strong> {data.date}
            <br />
            <strong>Sales Channel:</strong> Kaleemba
            <br />
            <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
            <em>Come Get Some!!!</em>
          </div>
        </div>
        <div style={{ width: "350px" }} ref={kitchenComponentRef}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              fontFamily: "Arial, sans-serif",
              border: "1px solid #ccc",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>
              - - - The Blazing Grill Kitchen - - -
            </h3>
            <br />
            {food.map((item) => (
              <div key={item.productName} style={{ marginBottom: "5px" }}>
                {item.productQuantity} x {item.productName}{" "}
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
            <strong>Date:</strong> {data.date}
            <br />
            <strong>Time:</strong> {data.time}
            <br />
            <strong>Channel:</strong> Kaleemba
            <br />
            <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
            <em>Come Get Some!!!</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
