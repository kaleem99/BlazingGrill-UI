import { FaExpand } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import { useState } from "react";
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
      <div
        className={!expand ? "customerViewInnerContent" : "ordersPageExpanded"}
      >
        {data.map((item, i) => (
          <div className="customerViewRows">
            <div>
              <text>
                {item.name}
                {i == 0 && (
                  <div
                    className="ordersExpand2"
                    onClick={() => setCustomerView(false)}
                  >
                    <MdExitToApp />
                  </div>
                )}
                {i == 1 && (
                  <div
                    className="ordersExpand"
                    onClick={() => setExpand(!expand)}
                  >
                    <FaExpand />
                  </div>
                )}
              </text>

              <div className="customerColumns">
                {filteredData.map((item2) => (
                  <div className="customerColumnsItems">
                    {item.status == item2.status && (
                      <div className="sectionColumnItemOrders">
                        {item2.orderNumber}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersCustomerView;
