import style from "./recieptStyles";
const KitchenReceipt = ({
  receiptData,
  kitchenComponentRef,
  handleKitchenPrint,
  food,
}) => {
  return (
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
          <br />
          {/* <strong>Total:</strong> R{data.total} */}
          <br />
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
      </div>
      <button style={style.printButtons} onClick={handleKitchenPrint}>
        Print Kitchen Reciept
      </button>
    </div>
  );
};

export default KitchenReceipt;
