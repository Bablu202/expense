import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  doc,
  query,
  where,
  deleteDoc,
  onSnapshot,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
import { db } from "./firebase";
import { getDownloadURL } from "./storage";

const RECIEPTS_COLLECTION = "receipts";

export function addReceipt(
  uid,
  date,
  locaitonName,
  address,
  items,
  amount,
  imageBucket
) {
  addDoc(collection(db, RECIEPTS_COLLECTION), {
    uid,
    date,
    locaitonName,
    address,
    items,
    amount,
    imageBucket,
  });
}

export async function getReceipts(uid, setReceipts, setIsLoadingRecepeits) {
  const receiptsQuery = query(
    collection(db, RECIEPTS_COLLECTION),
    where("uid", "==", uid),
    orderBy("date", "desc")
  );
  const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
    let allReceipts = [];
    for (const documentSnapshot of snapshot.docs) {
      const receipt = documentSnapshot.data();
      await allReceipts.push({
        ...receipt,
        date: receipt["date"].toDate(),
        id: documentSnapshot.id,
        imageUrl: await getDownloadURL(receipt["imageBucket"]),
      });
    }
    setReceipts(allReceipts);
    setIsLoadingRecepeits(false);
  });
  return unsubscribe;
}

export function updateReceipt(
  docId,
  uid,
  date,
  locationName,
  address,
  Items,
  amount,
  imageBucket
) {
  setDoc(doc(db, RECIEPTS_COLLECTION, docId), {
    uid,
    date,
    locationName,
    address,
    Items,
    amount,
    imageBucket,
  });
}
