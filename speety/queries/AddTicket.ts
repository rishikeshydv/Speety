import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

  const AddTicket = async (email:string, name:string, password:string,confirmPasswod:string,brokerId:string,driverLicense:string,faceCapture:string,role:string) => {
    const userRef = collection(db, "user_verifications");
    const userDocRef = doc(userRef, email);
    await setDoc(userDocRef, {
        email: email,
        name: name,
        password: password,
        confirmPasswod: confirmPasswod,
        brokerId: brokerId,
        driverLicense: driverLicense,
        faceCapture: faceCapture,
        role: role,
    });
          
  }

export default AddTicket;