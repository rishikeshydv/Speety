import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Signup from "@/firebase/auth/Signup";


const BrokerUser = async (email:string, name:string,confirmPassword:string, password:string,brokerId:string,driverLicense:string,faceCapture:string,role:string,date:string) => {
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
    });

    //we only need to create a database of the broker, adding agents is automatically done by AgentUser.ts
    const brokerRef = collection(db, email);
    const agentDocRef = doc(brokerRef, email);
    await setDoc(agentDocRef, {
        name: name,
    });


    //we update the user verification ticket
    const userVerificationRef = collection(db, "user_verifications");
    const userVerificationDocRef = doc(userVerificationRef, email);
    await setDoc(userVerificationDocRef, {
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

export default BrokerUser;