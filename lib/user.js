import { doc, setDoc } from "firebase/firestore";
import { db } from './firebase';

export async function createUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  
  const userProfile = {
    phoneNumber: user.phoneNumber,
    isAdmin: false,
    notifications: true
  };

  // Set with merge: true to not overwrite other fields unintentionally
  await setDoc(userRef, userProfile, { merge: true });
}