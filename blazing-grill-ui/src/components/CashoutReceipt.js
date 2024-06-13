import style from "./recieptStyles";
const CashoutReciepts = ({
  receiptData,
  //   food,
  handlePrint,
  componentRef,
  setCashout,
  //   vat,
}) => {
  const date = receiptData.length > 0 ? receiptData[0].date : 0;
  const time = receiptData.length > 0 ? receiptData[0].time : 0;
  const totalSales =
    receiptData.length > 0
      ? receiptData
          .map((data) => data.total)
          .reduce((a, b) => parseFloat(a) + parseFloat(b))
      : 0;
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
        zIndex: "9",
      }}
    >
      {receiptData.length > 0 ? (
        <div>
          <h1 style={{ color: "white" }}>Cashout sales reciept</h1>
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
              <strong>{receiptData[0].storeName}</strong>
              <p>Cashup Declaration = complete</p>
              <br></br>
              <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
                <p className="Left pRemoveMargins">Date:</p>
                <p className="right pRemoveMargins">
                  {date} -{time}
                  {time >= "00:00" && time <= "12:00" ? "AM" : "PM"}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p className="Left pRemoveMargins">Till:</p>
                <p className="right pRemoveMargins">1</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p className="Left pRemoveMargins">Cashier:</p>
                <p className="right pRemoveMargins">Default Administrator</p>
              </div>
              <br></br>
              <hr
                style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
              />
              <p style={{ textAlign: "left" }}>Total Sales</p>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p className="Left pRemoveMargins">No Transactions:</p>
                <p className="right pRemoveMargins">{receiptData.length}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p className="Left pRemoveMargins">Total Declared:</p>
                <p className="right pRemoveMargins">R{totalSales.toFixed(2)}</p>
              </div>
              <br />
              <hr
                style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
              />
              <p style={{ textAlign: "left" }}>Sales channels total</p>
              <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <p className="Left pRemoveMargins">POS: KM</p>
                <p className="right pRemoveMargins">R{totalSales.toFixed(2)}</p>
              </div>
              <br></br>
              <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
                <p className="Left pRemoveMargins">Cashier:</p>
                <p className="right pRemoveMargins">{".".repeat(35)}</p>
              </div>
              <button
                style={style.printButtons}
                onClick={() => setCashout(false)}
              >
                Close Reciept
              </button>
              {/* <br />
          <hr
            style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
          />
          <strong>Order Type:</strong> {receiptData.orderType}
          <br />
          <strong>Order Number:</strong> R{receiptData.orderNumber}
          <hr
            style={{ borderTop: "1px dashed #ccc", marginBottom: "10px" }}
          />
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Total:</p>
            <p className="right">R{receiptData.total}</p>
          </div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left"> Date:</p>
            <p className="right">{receiptData.date}</p>
          </div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Time:</p>
            <p className="right">{receiptData.time}</p>
          </div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <p className="Left">Sales Channel:</p>
            <p className="right"> Kaleem</p>
          </div>
          <br />
          <hr style={{ borderTop: "1px dashed #ccc", marginTop: "10px" }} />
          <em>Come Get Some!!!</em> */}
            </div>
          </div>
          <button style={style.printButtons} onClick={handlePrint}>
            Cash out reciept
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "white" }}>No Orders for selected date</h1>
          <button style={style.printButtons} onClick={() => setCashout(false)}>
            Close Reciept
          </button>
        </div>
      )}
    </div>
  );
};

export default CashoutReciepts;
