import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Signup from "@/firebase/auth/Signup";


const AgentUser = async (email:string, name:string,confirmPassword:string, password:string,brokerId:string,driverLicense:string,faceCapture:string,role:string,date:string) => {
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

    //we update the agentList database
    const agentRef = collection(db, "agentList");
    const agentDocRef = doc(agentRef, email);
    await setDoc(agentDocRef, {
        name: name,
        description:"",
        address:"",
        phoneNumber:"",
        lastLocation:[],
        website:"",
        role: role,
        reviews: {},
    });

    //we also add the agent to its respective broker
    const brokerRef = collection(db, brokerId);
    const brokerDocRef = doc(brokerRef, email);
    await setDoc(brokerDocRef, {
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

export default AgentUser;