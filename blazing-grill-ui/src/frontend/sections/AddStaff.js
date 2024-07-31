import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../database/config";

const AddStaff = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "TheBlazingGrillStaff"),
      (snapshot) => {
        const staffList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStaff(staffList);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "TheBlazingGrillStaff"), {
        email: email,
      });
      setEmail("");
      setMessage("Email added successfully!");
    } catch (error) {
      setMessage("Error adding email: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "TheBlazingGrillStaff", id));
      setMessage("Email deleted successfully!");
    } catch (error) {
      setMessage("Error deleting email: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <h3 style={styles.listHeading}>Staff List</h3>
        <ul style={styles.list}>
          {staff.map((staffMember) => (
            <li key={staffMember.id} style={styles.listItem}>
              <span>{staffMember.email}</span>
              <button
                onClick={() => handleDelete(staffMember.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <h2 style={styles.heading}>Add Staff Email</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Email
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "80%",
    margin: "auto",
    marginTop: "50px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    marginTop: "10px",
    color: "#28a745",
  },
  listContainer: {
    marginTop: "20px",
    width: "100%",
  },
  listHeading: {
    marginBottom: "10px",
    color: "white",
    fontSize: "larger",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "white",
    fontSize: "large",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "20px",
  },
};

export default AddStaff;
