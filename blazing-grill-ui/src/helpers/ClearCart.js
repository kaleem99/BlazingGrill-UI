import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../database/config";

export const clearCart = async (userId) => {
  const querySnapshot = await getDocs(
    query(collection(db, "Cart"), where("userId", "==", userId))
  );
  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log("Cart data deleted successfully");
};
