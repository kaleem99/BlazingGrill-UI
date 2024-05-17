import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/config";
const getDatabaseDocs = async (collectionName) => {
  const result = await getDocs(collection(db, collectionName)).then(
    async (querySnapshot) => {
      const newData = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(newData, "J");
      return newData;
    }
  );
  return result;
};

export default getDatabaseDocs;
