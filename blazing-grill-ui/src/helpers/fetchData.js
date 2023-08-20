import { getDocs, collection } from "firebase/firestore";
import { db } from "../database/config";
const fetchPost = async (name, setFunction) => {
  await getDocs(collection(db, name)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFunction(newData);
  });
};

export default fetchPost;
