import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Signup from "@/firebase/auth/signup";
const NormalUser = async (email:string, name:string,confirmPassword:string, password:string,brokerId:string,driverLicense:string,faceCapture:string,role:string,date:string) => {
    //we sign them up
    await Signup(email, password);
    //we update the user info database
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, email);
    await setDoc(userDocRef, {
        name: name,
        brokerId: brokerId,
        role: role,
        loginStatus: "Offline",
        address: "Not Added",
        description: "Not Added",
        phone: "Not Added",
        profilePic: faceCapture,
        website: "Not Added",


    });
    //we update the user verification ticket
    const userVerificationRef = collection(db, "user_verifications");
    const userVerificationDocRef = doc(userVerificationRef, email);
    await updateDoc(userVerificationDocRef, {
        email: email,
        name: name,
        confirmPassword: confirmPassword,
        password: password,
        brokerId: brokerId,
        driverLicense: driverLicense,
        faceCapture: faceCapture,
        role: role,
        date: date,
        status: "Closed",
    });   
}

export default NormalUser;