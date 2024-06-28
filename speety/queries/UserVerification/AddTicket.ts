import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

  const AddTicket = async (email:string, name:string, password:string,confirmPassword:string,brokerId:string,driverLicense:string,faceCapture:string,role:string,date:string) => {
    const userRef = collection(db, "user_verifications");
    const userDocRef = doc(userRef, email);
    await setDoc(userDocRef, {
        email: email,
        name: name,
        password: password,
        confirmPasswod: confirmPassword,
        brokerId: brokerId,
        driverLicense: driverLicense,
        faceCapture: faceCapture,
        role: role,
        date: date,
        status:"Open"
    });
          
  }

export default AddTicket;