import { auth } from "../../database/config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../database/config";
import {
  signInWithEmailAndPassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

function DeliveryDriver({
  store,
  setState,
  storeName,
  detailsOfStore,
  storeStatus,
}) {
  // const [storeInformation, setStoreInformation] = useState({
  //   email: detailsOfStore.adminUsername,
  //   storeName: detailsOfStore.store,
  //   address: detailsOfStore.address,
  // });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [view, setView] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState([]);
  const [driverEmail, setDriverEmail] = useState([]);

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
    setView(true);
  };
  const upDateStoreInformation = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPass":
        setConfirmPass(e.target.value);
        break;
      default:
        setAddress(e.target.value);
        break;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setDriverName(value);
    } else {
      setDriverEmail(value);
    }
  };
  const SaveStoreInfor = async () => {
    if (confirmPass !== "P@ssw0rd786") {
      return alert("admin password is incorrect");
    }
    const DriverData = {
      name,
      email,
      storeName: storeName[0],
    };
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          });
          alert("Driver Profile was created successfully");
          // navigate("/login");
          addDoc(collection(db, "DriverProfiles"), DriverData);
          sendEmailVerification(user);
          // ...
        })
        .catch((error) => {
          alert(error.message);
          // ..
        });
    } catch (err) {
      alert(err.message);
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
  return !view ? (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Add Delivery Driver</h1>
      <form className="form">
        <label>Driver Name</label>
        <br></br>

        <input
          onChange={(e) => upDateStoreInformation(e)}
          name={"name"}
          // defaultValue={storeInformation.storeName}
          placeholder={"Enter Driver Name"}
          value={name}
        />
        <br></br>
        <label>Driver Email</label>
        <br></br>
        <input
          onChange={(e) => upDateStoreInformation(e)}
          name={"email"}
          type="text"
          placeholder={"Enter Driver Email"}
          // defaultValue={storeInformation.email}
          value={email}
        />
        <br></br>

        {/* <label>Driver Number</label>
      <br></br>

      <input
        onChange={upDateStoreInformation}
        name={"address"}
        // defaultValue={storeInformation.address}
        placeholder={"Enter Driver Number"}
        value={address}
      />
      <br></br> */}

        <label>Driver Password</label>
        <br></br>

        <input
          onChange={upDateStoreInformation}
          name={"password"}
          placeholder={"Create Driver Password"}
          value={password}
          type="password"
        />
        <br></br>
        <label>Admin Password</label>
        <br></br>

        <input
          onChange={upDateStoreInformation}
          name={"confirmPass"}
          placeholder={"Please enter admin password to save details."}
          value={confirmPass}
          type="password"
        />
      </form>
      <button
        onClick={() => SaveStoreInfor()}
        style={{
          width: "180px",
          height: "40px",
          background: "none",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
          border: "1px solid white",
          marginLeft: "30px",
        }}
      >
        Add Driver
      </button>
      <button
        onClick={() => getDriverProfiles()}
        style={{
          width: "180px",
          height: "40px",
          background: "none",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
          border: "1px solid white",
          marginLeft: "30px",
        }}
      >
        View Drivers
      </button>
    </div>
  ) : (
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
      <button
        onClick={() => setView(false)}
        style={{
          width: "180px",
          height: "40px",
          background: "none",
          borderRadius: "7px",
          color: "white",
          fontSize: "20px",
          border: "1px solid white",
          marginLeft: "30px",
        }}
      >
        Add Drivers
      </button>
    </div>
  );
}

export default DeliveryDriver;
