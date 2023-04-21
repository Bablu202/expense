import { storage } from "./firebase";
import { format } from "date-fns";

import {
  deleteObject,
  getDownloadURL as getStorageDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const BUCKET_URL = "gs://expense-41b6e.appspot.com";

export async function uploadImage(image, uid) {
  const formattedDate = format(new Date(), "yyy-MM-dd'T'HH:mm:ss'Z'");
  const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  return bucket;
}

export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}

export async function replaceImage(image, bucket) {
  await uploadBytes(ref(storage, bucket), image);
}

export function deleteImage(bucket) {
  deleteObject(ref(storage, bucket));
}
