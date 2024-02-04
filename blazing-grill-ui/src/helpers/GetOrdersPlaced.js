import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../database/config";
const audio = new Audio(
  "https://kaleem99.github.io/hostingContents/mixkit-clear-announce-tones-2861.wav"
);
const getOrders = (storeName, setPendingOrders, setInProgress) => {
  // setstoreStatus(detailsOfStore.storeStatus);
  const unsubscribe = onSnapshot(collection(db, "Orders"), (querySnapshot) => {
    if (!querySnapshot.empty) {
      const items = [];
      const inProgress = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data().storeName, storeName)
        if (
          doc.data().status === "Pending" &&
          doc.data().storeName === storeName
        ) {
          audio.play();
          items.push({ id: doc.id, ...doc.data() });
        }
        if (doc.data().storeName === storeName) {
          inProgress.push(doc.data());
        }
      });
      setPendingOrders(items);
      console.log(items, "This is Items.");
      setInProgress(inProgress);
      console.log(inProgress);
    } else {
      console.log("No data in the collection");
    }
  });

  return () => {
    // Cleanup function to unsubscribe from snapshot listener
    unsubscribe();
  };
};
export { getOrders };
