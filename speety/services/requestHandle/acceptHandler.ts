//  #1 : upon pressing the accept button, we store uuid,user1_email,user2_email
//  #2 : we also add each other's connection to connectedHistory collection
//  #3 : connectedHistory for both sender and receiver
import { db } from "@/firebase/config";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
export default async function acceptHandler(
  senderEmail: string,
  receiverEmail: string
) {
  const _roomId = uuidv4(); //we will be using the uuidv4() just once to make sure the roomId is same

  //  #1
  const socketAdd = addDoc(collection(db, "socketCreation"), {
    roomId: _roomId,
    user1: senderEmail,
    user2: receiverEmail,
  });

  //  #2
  const q = query(
    collection(db, "connectionHistory"),
    where("senderEmail", "==", senderEmail)
  );
  const querySnapshot = await getDocs(q);
  //if the initial list of connectedUsers already made, we push the new users in the list
  if (querySnapshot.size != 0) {
    querySnapshot.forEach((doc) => {
      doc.data().connectedEmails.push(receiverEmail);
    });
  } else {
    await addDoc(collection(db, "connectionHistory"), {
      senderEmail: senderEmail,
      connectedEmails: [receiverEmail],
    });
  }

  // #3

  const _q = query(
    collection(db, "connectionHistory"),
    where("senderEmail", "==", receiverEmail)
  );
  const _querySnapshot = await getDocs(q);
  //if the initial list of connectedUsers already made, we push the new users in the list
  if (querySnapshot.size != 0) {
    querySnapshot.forEach((doc) => {
      doc.data().connectedEmails.push(senderEmail);
    });
  } else {
    await addDoc(collection(db, "connectionHistory"), {
      senderEmail: receiverEmail,
      connectedEmails: [senderEmail],
    });
  }
}
