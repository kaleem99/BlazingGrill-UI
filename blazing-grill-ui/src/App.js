import "./App.css";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "./database/config";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import NavMenu from "./frontend/NavigationMenu";
import Sections from "./frontend/sections";
const sections = ["Home", "Add Menu Item", "Orders"];
function App() {
  const [state, setState] = useState("Home");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const fetchPost = async () => {
  //   await getDocs(collection(db, "Burgers")).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setTodos(newData);
  //     console.log(newData);
  //   });
  // };
  return (
    <div className="App">
      <NavMenu sections={sections} setState={setState} state={state} />
      <div className="sections">
        <Sections state={state} setState={setState} />
      </div>
      {/* <button onClick={() => fetchPost()}>Testing</button> */}
    </div>
  );
}

export default App;
