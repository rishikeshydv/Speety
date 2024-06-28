import {
    collection,
    getDoc,
    doc
  } from "firebase/firestore";
  import { db } from "@/firebase/config";

const getUserProfile = async (email: string) => {

    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, email);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
        const retrievedData = userSnapshot.data();
        const userName = retrievedData?.name || "";
        const userPic = retrievedData.profilePic || "";
        const userProfile = {
            name: userName,
            profilePic: userPic
        };
        return userProfile;
    }
    else {
        return null;
    }
}

export default getUserProfile;