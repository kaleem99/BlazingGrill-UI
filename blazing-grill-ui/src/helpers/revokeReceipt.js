import SendOrderCancellation from "../components/SendOrderCancellation";
import {
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../database/config";
const revokeReceiptData = async (receiptData) => {
  console.log(receiptData, "receiptData", 10);
  //   const detailsOfStore = getDetailsOfStore();
  const docRef = doc(db, "Orders", receiptData.id);
  //   const foodOrder = PendingOrders[index].food;
  //   const newOrderData = PendingOrders[index];
  receiptData.status = "Revoked";
  await addDoc(collection(db, "RevokedOrders"), receiptData);
  // updateDoc(docRef, newOrderData);
  deleteDoc(docRef);
  //   const deletedOrder = PendingOrders.shift();
  //   SendOrderCancellation(
  //     newOrderData.Name,
  //     newOrderData.food,
  //     newOrderData.total,
  //     newOrderData.email,
  //     detailsOfStore.adminUsername,
  //     newOrderData.orderNumber,
  //     detailsOfStore.address,
  //     newOrderData.phoneNumber,
  //     newOrderData.orderType
  //   );
  // newOrderData.checkoutUrl;
};

export default revokeReceiptData;
