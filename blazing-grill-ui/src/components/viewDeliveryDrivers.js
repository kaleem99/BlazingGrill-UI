import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../database/config";
import { updateProfile } from "firebase/auth";
import { auth } from "../database/config";

const ViewDeliveryDrivers = ({storeName}) => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState([]);
  const [driverEmail, setDriverEmail] = useState([]);
  useEffect(() => {
    const getDriverProfiles = async () => {
      const data = await getDocs(collection(db, "DriverProfiles")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return newData.filter(
            (drivers) => drivers.storeName === storeName[0] && drivers
          );
        }
      );
      console.log(data, "dj");
      setDrivers(data);
      setDriverName(data[0].name);
      setDriverEmail(data[0].email);
    };
    getDriverProfiles();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setDriverName(value);
    } else {
      setDriverEmail(value);
    }
  };
  const updateDriverData = () => {
    // if (password !== "P@ssw0rd786") {
    //   return alert("admin password is incorrect");
    // }
    const examcollref = doc(db, "DriverProfiles", drivers[0].id);
    const newDriverData = drivers[0];
    newDriverData.name = driverName;
    newDriverData.email = driverEmail;
    try {
      updateProfile(auth.currentUser, {
        email: driverEmail,
        displayName: driverName,
      });
      updateDoc(examcollref, newDriverData);
      alert("Driver profile updated successfully");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Store Delivery Drivers</h1>
      <div className="DriverTable">
        <table>
          <tr>
            <th></th>
            <th>Driver Name</th>
            <th>Driver Email</th>
            <th>Driver Phone Number</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {drivers.map((data, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <input
                    style={{ color: "black" }}
                    className="input01"
                    value={driverName}
                    name={"name"}
                    onChange={(e) => handleChange(e)}
                  />
                </td>
                <td>
                  <input
                    style={{ color: "black" }}
                    className="input01"
                    value={driverEmail}
                    name={"email"}
                    onChange={(e) => handleChange(e)}
                  />
                </td>
                <td>
                  <input
                    style={{ color: "black" }}
                    className="input01"
                    value={data.phoneNumber}
                  />
                </td>
                <td>
                  <button
                    onClick={() => updateDriverData()}
                    style={{ border: "2px solid" }}
                    className="FuncButtons"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    style={{ border: "2px solid" }}
                    className="FuncButtons"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ViewDeliveryDrivers;
