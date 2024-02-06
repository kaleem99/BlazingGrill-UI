import { useEffect, useRef, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../database/config";
import { auth } from "../../database/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

import MenuItemsSection from "../data/menuSections";
import Geocode from "react-geocode";
const APIKEY = "AIzaSyAe8Q7gExQ3CEzxqr4PFm3ikcMboQPKJIg";
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

Geocode.setApiKey(APIKEY);
Geocode.setLanguage("en");

Geocode.setRegion("za");

Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get latitude & longitude from address.

function Register({ setState }) {
  const [formData, setFormData] = useState({
    store: "",
    adminUsername: "",
    password: "",
    isLoggedIn: false,
    longitude: "",
    latitude: "",
    storeStatus: false,
  });
  const [credentials, setCredentials] = useState("");
  const [address, setAddress] = useState(null);
  const libraries = ["places"];
  // useEffect(() => {
  //   if (address) {
  //     handleAddress();
  //   }
  // }, []);
  const inputRef = useRef();
  const Register = async (e) => {
    e.preventDefault();
    if (
      formData.store === "" ||
      formData.adminUsername === "None" ||
      formData.password === "" ||
      formData.credentials === "" ||
      address === ""
    ) {
      return alert("Please enter all valid details.");
    }
    if (credentials !== "EnterSuper****User@2000+") {
      return alert("Incorrect admin credentials");
    }
    // try {
    console.log(address, 68);
    await Geocode.fromAddress(address.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng,
        });
        setAddress(address.label);
        formData["latitude"] = lat;
        formData["longitude"] = lng;
        formData["address"] = address.label;

        console.log(address.label, 202);
      },
      (error) => {
        console.error(error);
      }
    );
    // return 0;

    console.log(formData, "Address", 69);
    const collectionRef = collection(db, "MenuItems");
    const querySnapshot = await getDocs(collectionRef);
    let documents = [];

    querySnapshot.forEach((doc) => {
      const arr = doc.data().menuItemsArr;
      documents = [...documents, ...arr]; // Use spread operator to concatenate arrays
    });

    // Image Documents
    const collectionRef2 = collection(db, "MenuImages");
    const querySnapshot2 = await getDocs(collectionRef2);
    let documents2 = [];

    querySnapshot2.forEach((doc) => {
      const obj = doc.data();
      console.log(obj);
      documents2 = [...documents2, obj]; // Use spread operator to concatenate arrays
    });
    // return 0;
    //
    let result = [];
    const menuItemContent = {
      page: "None",
      positionX: "None",
      positionY: "None",
      price: "74.90",
      width: 500,
      height: "192",
    };

    console.log(documents);
    // return 0;
    for (let i = 0; i < documents.length; i++) {
      menuItemContent.name = documents[i];
      result.push({ ...menuItemContent }); // Use spread operator to create a new object
    }
    // menuImages
    for (let i = 0; i < documents2.length; i++) {
      // menuItemContent.name = documents[i];
      documents2[i].page = "None";
      documents2[i].positionX = "None";
      documents2[i].positionY = "None";
      // result.push({ ...menuItemContent }); // Use spread operator to create a new object
    }
    //
    formData.menuImages = documents2;
    formData.menuItems = result;
    const { store } = formData;
    //   const docRef = await addDoc(collection(db, formData.store), formData);
    const docRef2 = await addDoc(collection(db, "BlazingStores"), {
      [store]: formData,
    });

    //   console.log("Document written with ID: ", docRef.id);
    //   alert("store has been created successfully");
    // } catch (e) {
    //   console.error("Error adding store: ", e);
    // }
    console.log(formData.adminUsername, formData.password);
    await createUserWithEmailAndPassword(
      auth,
      formData.adminUsername,
      formData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("Successful");
        updateProfile(user, {
          displayName: formData.store,
        });
        // navigate("/login");
        sendEmailVerification(user);
        setState("Login");
        window.location.reload();
        // ...
      })
      .catch((error) => {
        alert("Hello World " + error.message);
        // ..
      });
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handlePlaceChange = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place);
    }
  };
  const handleChange2 = (event) => {
    if (event.target.name === "credentials") {
      setCredentials(event.target.value);
    } else {
      console.log(event);
      // setAddress(event.target.value);
      // Geocode.fromAddress(event.target.value).then(
      //   (response) => {
      //     const { lat, lng } = response.results[0].geometry.location;
      //     console.log(lat, lng);
      //     setFormData({
      //       ...formData,
      //       latitude: lat,
      //       longitude: lng,
      //     });
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
    }
  };
  // const handleAddress = () => {
  //   console.log(address, " Adreesss");

  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server
  };

  return (
    <div className="AddMenu">
      <h1 style={{ color: "white" }}>Register a store.</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="store"
          value={formData.store}
          placeholder="store name"
          onChange={handleChange}
        />
        <br></br>
        {/* <label>name:</label> */}
        <br></br>
        <input
          type="email"
          name="adminUsername"
          value={formData.adminUsername}
          placeholder="store email"
          onChange={handleChange}
        />
        <br />
        {/* <label>Price:</label> */}
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="store password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br></br>
        <input
          type="password"
          name="credentials"
          placeholder="admin credentials"
          value={credentials}
          onChange={handleChange2}
        />
        <br />
        <br></br>
        {/* <input
          type="search"
          name="address"
          placeholder="Store address"
          value={address}
          onChange={handleChange2}
        /> */}
        {/* <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleAddress}
          apiKey={APIKEY}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                className="googleSearch"
                name="address"
                value={address}
                {...getInputProps({
                  placeholder: "Enter location...",
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
        <GooglePlacesAutocomplete
          apiKey={APIKEY}
          selectProps={{ address, onChange: setAddress }}
        ></GooglePlacesAutocomplete>
        <br />
        <br></br>
        <button onClick={(e) => Register(e)}>Register</button>
      </form>
      <p style={{ color: "white" }}>
        Dont Have a store yet Please contact your admin to register.
      </p>
      <h2
        onClick={() => setState("")}
        style={{
          // width: "180px",
          // height: "40px",
          color: "#f7941d",
          borderRadius: "7px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Login
      </h2>
    </div>
  );
}

export default Register;
