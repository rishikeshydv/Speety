import { collection, query, getDocs, where, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config';

export default async function rejectHandler(_uniqueId:string) {
    const q = query(collection(db, "notifications"), where("uniqueId","==",_uniqueId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
        try {
            // Get the document reference from the snapshot
            const docRef = doc(db, "notifications", docSnapshot.id);
            // Update the status field
            await updateDoc(docRef, { status: "DENIED" });
            console.log("Document status updated to DENIED");
        } catch (error) {
            console.error("Error updating document:", error);
        }
    });
}
