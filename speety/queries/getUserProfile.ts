import {
    collection,
    getDoc,
    doc
  } from "firebase/firestore";
  import { db } from "@/firebase/config";

const getUserProfile = async (email: string) => {
    let userName: string = "";
    let userPic: string = "";

    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, email);
    const userSnapshot = await getDoc(userDocRef);
    let userProfile: any = {};
    if (userSnapshot.exists()) {
        const retrievedData = await userSnapshot.data();
        userName = retrievedData["name"];
        userPic = retrievedData["profilePic"];
        userProfile = {
            name: userName,
            profilePic: userPic
        };
    }
    return userProfile;
}

export default getUserProfile;