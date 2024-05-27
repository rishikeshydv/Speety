import { collection, setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "@/firebase/config";
import { get } from "http";

export default async function MeetingSettle(
  meetingId: string,
  receiverEmail: string,
  senderEmail: string,
  status: string,
  date: string
) {
  //resolves the user?.email side notifications
  const receiverRef = collection(db, "meetings");
  const receiverDocRef = doc(receiverRef, receiverEmail);
  await updateDoc(receiverDocRef, {
    [`${meetingId}`]: {
      email: senderEmail,
      status: status,
      date: date,
      id: meetingId,
      age: "old",
    },
  });

  //push an acceptance notification to the from side
  const docRef2 = doc(db, "meetings", senderEmail);
  const docSnap2 = await getDoc(docRef2);
  if (docSnap2.exists()) {
    await updateDoc(docRef2, {
      [`${meetingId}`]: {
        email: receiverEmail,
        status: status,
        date: date,
        id: meetingId,
        age: "old",
      },
    });
  } else {
    await setDoc(docRef2, {
      [`${meetingId}`]: {
        email: receiverEmail,
        status: status,
        date: date,
        id: meetingId,
        age: "old",
      },
    });
  }
}
