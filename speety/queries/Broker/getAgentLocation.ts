import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import exp from "constants";

const getAgentLocation = async (email:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data().lastLocation;
    } else {
        return null;
    }
}
export default getAgentLocation;