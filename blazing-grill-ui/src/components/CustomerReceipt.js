import style from "./recieptStyles";
const CustomerReceipts = ({
  receiptData,
  food,
  handlePrint,
  componentRef,
  vat,
}) => {
  return (
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
            <div
              key={item.productName}
              style={{
                marginBottom: "5px",
                textAlign: "left",
                marginTop: "5px",
              }}
            >
              {item.productQuantity} x {item.productName}{" "}
              <span style={{ float: "right" }}>R{item.productPrice}</span>
            </div>
          ))}
          <br />
          <hr style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }} />
          <strong style={{ float: "left" }}>Order Type:</strong>{" "}
          <text style={{ float: "right" }}>{receiptData.orderType}</text>
          <br />
          <strong style={{ float: "left" }}>Order Number:</strong>
          <text style={{ float: "right" }}> {receiptData.orderNumber}</text>
          <br />
          <hr style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Tax:</p>
            <p className="right">R{vat.toFixed(2)}</p>
          </div>
          {/* <br /> */}
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Total:</p>
            <p className="right">R{receiptData.total}</p>
          </div>
          {/* <br /> */}
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left"> Date:</p>
            <p className="right">{receiptData.date}</p>
          </div>
          {/* <br /> */}
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Time:</p>
            <p className="right">{receiptData.time}</p>
          </div>
          {/* <br /> */}
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Sales Channel:</p>
            <p className="right"> Kaleem</p>
          </div>
          {/* <br /> */}
          <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
          <em>Come Get Some!!!</em>
        </div>
      </div>
      <button style={style.printButtons} onClick={handlePrint}>
        Print Customer Reciept
      </button>
    </div>
  );
};

export default CustomerReceipts;
