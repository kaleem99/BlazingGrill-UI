import React from "react";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import RevokeReceipt from "./RevokeReceipt";
import style from "./recieptStyles";
import CustomerReceipts from "./CustomerReceipt";
import KitchenReceipt from "./KitchenReceipt";
import revokeReceiptData from "../helpers/revokeReceipt";
const PrintComponent = ({ receiptData, setShowReciept, setReceiptData }) => {
  const [state, setState] = useState("");
  const food = receiptData.food;
  const componentRef = React.useRef();
  const kitchenComponentRef = React.useRef();
  const revokedRef = React.useRef();

  // console.log(food);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleKitchenPrint = useReactToPrint({
    content: () => kitchenComponentRef.current,
  });
  const handleRevokePrint = useReactToPrint({
    content: () => revokedRef.current,
    onAfterPrint: () => {
      console.log("Revoked");
      receiptData.revokeMessage = state;
      revokeReceiptData(receiptData);
      setShowReciept(false);
    },
  });
  // console.log(food);
  const vat = (receiptData.total * 15) / 100;
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
        overflow: "auto",
      }}
    >
      <button onClick={() => setShowReciept(false)} style={style.closeBtn}>
        <IoCloseCircleSharp />
      </button>

      <div
        style={{
          display: "grid",
          width: "1100px",
          color: "black",
          margin: "auto",
          gridTemplateColumns: "350px 350px 350px",
          justifyContent: "center",
          gridGap: "25px",
        }}
      >
        <RevokeReceipt
          handleRevokePrint={handleRevokePrint}
          food={food}
          receiptData={receiptData}
          revokedRef={revokedRef}
          state={state}
          setState={setState}
        />
        <CustomerReceipts
          handlePrint={handlePrint}
          food={food}
          receiptData={receiptData}
          vat={vat}
          handleKitchenPrint={handleKitchenPrint}
          componentRef={componentRef}
        />
        <KitchenReceipt
          handleKitchenPrint={handleKitchenPrint}
          food={food}
          receiptData={receiptData}
          kitchenComponentRef={kitchenComponentRef}
        />
      </div>
    </div>
  );
};

export default PrintComponent;
