import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase'; // Ensure this import path is correct

export async function isAdmin(userId) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data().isAdmin;
  } else {
    console.log("No such user!");
    return false;
  }
}