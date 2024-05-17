import { useEffect, useState } from "react";
import getDocs from "../../helpers/GetDatabaseDocs";

const RevokedOrders = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchDatabaseDocs = async () => {
      const result = await getDocs("RevokedOrders");
      console.log(result, 1);
      setState(result);
    };
    fetchDatabaseDocs();
  }, []);
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1 style={{ color: "white" }}>Revoked Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>Revoke Messages</th>
            <th>Store Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.status}</td>
              <td>{order.revokeMessage}</td>
              <td>{order.storeName}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>R{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevokedOrders;
