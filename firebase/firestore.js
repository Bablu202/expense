import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const RECIPTS_COLLECTION = "receipts";

export function addReceipt(
  uid,
  date,
  locaitonName,
  address,
  items,
  amount,
  imageBucket
) {
  addDoc(collection(db, RECIPTS_COLLECTION), {
    uid,
    date,
    locaitonName,
    address,
    items,
    amount,
    imageBucket,
  });
}
