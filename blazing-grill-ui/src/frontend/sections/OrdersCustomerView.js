import { FaExpand } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import { useState } from "react";
import { formatDateAndTime } from "../../helpers/DataAndTime";
const data = [
  { name: "In Progress", status: "In Progress" },
  { name: "Ready for collection", status: "Collection" },
];

const OrdersCustomerView = ({ orders, setCustomerView }) => {
  const [expand, setExpand] = useState(false);
  console.log(orders);
  const filteredData = orders.filter(
    (data) => data.status === "In Progress" || "Collection"
  );
  return (
    <div className="OrdersCustomerView">
      <div className={expand ? "OuterContentCustomerView" : ""}>
        {expand && (
          <div
            style={{
              marginLeft: "0px",
              marginRight: "auto",
              width: "100%",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div style={{ width: "50%", textAlign: "left" }}>
              <img
                // className="BlazingImage"
                alt=""
                style={{ width: "160px" }}
                src="https://www.theblazinggrill.co.za/wp-content/uploads/2021/07/TBG_Final_TransWhite.png"
              ></img>
            </div>

            {formatDateAndTime().map((item) => (
              <div
                style={{
                  width: "200px",
                  textAlign: "center",
                  color: "white",
                  margin: "40px auto",
                  // display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#696969",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderRadius: "5px",
                }}
              >
                <h2>{item}</h2>
              </div>
            ))}
          </div>
        )}
        <div
          className={
            !expand ? "customerViewInnerContent" : "ordersPageExpanded"
          }
        >
          {data.map((item, i) => (
            <div className="customerViewRows">
              <div style={{ height: "80px" }}>
                <p style={{ marginBlockStart: "0px", marginBlockEnd: "0px" }}>
                  <p
                    style={{ marginBlockStart: "15px", marginBlockEnd: "0px" }}
                  >
                    {item.name}
                    {i === 0 && (
                      <div
                        className="ordersExpand2"
                        onClick={() => setCustomerView(false)}
                      >
                        <MdExitToApp />
                      </div>
                    )}{" "}
                    {i === 1 && (
                      <div
                        className="ordersExpand"
                        onClick={() => setExpand(!expand)}
                      >
                        <FaExpand />
                      </div>
                    )}
                  </p>
                </p>
              </div>
              <div className="customerColumns">
                {filteredData.map(
                  (item2) =>
                    item.status === item2.status && (
                      <div className="customerColumnsItems">
                        <div className="sectionColumnItemOrders">
                          {item2.orderNumber}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersCustomerView;
