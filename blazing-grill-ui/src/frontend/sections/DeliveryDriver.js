import { auth } from "../../database/config";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/config";
import { updateProfile } from "firebase/auth";

function DeliveryDriver({ storeName }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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

  const SaveStoreInformation = async (event) => {
    event.preventDefault();

    if (email === "" || name === "" || password === "") {
      return alert("Please ensure to fill in all required details");
    }
    if (confirmPass !== "P@ssw0rd786") {
      return alert("admin password is incorrect");
    }
    const DriverData = {
      name,
      email,
      storeName: storeName[0],
    };
    try {
      // await createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      // updateProfile(user, {
      //   displayName: name,
      // });
      alert(
        "Driver Profile was created successfully, please ensure the driver signs up on the mobile app to finish the sign up process and please ensure he uses the same email address"
      );
      // navigate("/login");
      addDoc(collection(db, "DriverProfiles"), DriverData);
      // sendEmailVerification(user);
      // ...
      // })
      // .catch((error) => {
      //   alert(error.message);
      //   // ..
      // });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Add Delivery Driver</h1>
      <form onSubmit={SaveStoreInformation} className="form">
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
        <br></br>
        <button
          type="submit"
          style={{
            width: "180px",
            height: "40px",
            background: "none",
            borderRadius: "7px",
            color: "white",
            fontSize: "20px",
            border: "1px solid white",
            marginTop: "30px",
          }}
        >
          Add Driver
        </button>
      </form>
    </div>
  );
}

export default DeliveryDriver;
