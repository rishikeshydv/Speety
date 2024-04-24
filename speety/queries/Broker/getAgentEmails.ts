import { collection, doc, query,getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const getAgentEmails = async (brokerId:string) => {
    const agentRef = query(collection(db, brokerId));
    const agentSnapshot = await getDocs(agentRef);
    const agentEmails:string[] = [];
    agentSnapshot.forEach((doc) => {
        agentEmails.push(doc.id);
    });
    return agentEmails;
}

export default getAgentEmails;