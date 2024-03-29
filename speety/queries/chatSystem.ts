import { collection, getDoc, getDocs, doc, updateDoc, addDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/config";
import moment from 'moment'; 


interface eachMessage {
        msg: string;
        date: string;
}
interface _messageInfo {
    anotherUserEmail: string;
    receivedMessages: eachMessage[];
    sentMessages: eachMessage[];

}

// get all the users
const getConnectedUsers = async (senderUser: string) => {
  const usersCollection = collection(db, "connectedHistory");
  const usersSnapshot = await getDocs(usersCollection);
  let usersConnected: string[][] = [];

  const getUserInfo = async (userId: string) => {
    const usersInfo = collection(db, "User_Info");
    const _usersSnapshot = await getDocs(usersInfo);
    _usersSnapshot.forEach((doc) => {
      if (doc.id === userId) {
        usersConnected.push([doc.data().name,doc.id]);
      }
    });
  };

  usersSnapshot.forEach(async (doc) => {
    if (doc.id === senderUser) {
        const data = doc.data();
        const firstKey = Object.keys(data)[0];
          await getUserInfo(data[firstKey].anotherUserEmail);
    }
  });

  return usersConnected;
};


// get a user's chat history
const getChats = async (senderUser: string, receiverUser:string) => {
    const usersCollection = collection(db, "connectedHistory");
    const usersSnapshot = await getDocs(usersCollection);
    let sentMessages: eachMessage[] = [];
    let receivedMessages: eachMessage[] = [];
    usersSnapshot.forEach(async (doc) => {
        if (doc.id === senderUser) {
            const data = doc.data();
        for (let i = 0; i < Object.keys(data).length; i++){
            const firstKey = Object.keys(data)[i];
            if (data[firstKey].anotherUserEmail === receiverUser){
                for (let i = 0; i < data[firstKey].sentMessages.length; i++){
                  sentMessages.push(data[firstKey].sentMessages[i]);
                }
                for (let i = 0; i < data[firstKey].receivedMessages.length; i++){
                  receivedMessages.push(data[firstKey].receivedMessages[i])
                }
           }
        }
          }
    });
  
    return {sentMessages, receivedMessages};
  };

// update a user's chat history
// const updateChats = async (senderUser: string, receiverUser:string,sent:eachMessage,sentTime:string,received:eachMessage,receivedTime:string) => {
//  const messageRef = doc(db, "connectedHistory", String(senderUser));
//   const docSnapshot = await getDoc(messageRef);
//   console.log(docSnapshot.data());
//   docSnapshot.data()?[0].forEach(async (_doc:any) => {
//     for (let i = 0; i < Object.keys(_doc).length; i++){
//         const firstKey = Object.keys(_doc)[i];
//         if (_doc[firstKey].anotherUserEmail === receiverUser){
//             await updateDoc(messageRef, {
//                 [firstKey]: {
//                     sentMessages: arrayUnion(sent),
//                     receivedMessages: arrayUnion(received)
//                 }
//             });
//         }
//     }
//   })    
// }:

const updateChats = async (senderUser: string, receiverUser: string, sent: eachMessage, received: eachMessage) => {
  const messageRef = doc(db, "connectedHistory", String(senderUser));
  const docSnapshot = await getDoc(messageRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    Object.keys(data).forEach(async (key) => {
      const _doc = data[key];
      //console.log(_doc);
      if (_doc.anotherUserEmail === "skoirala@caldwell.edu") {
        const entryRef = doc(db, "connectedHistory", senderUser, key);
        await updateDoc(entryRef, {
          sentMessages: _doc.sentMessages ? [..._doc.sentMessages, sent] : [sent],
          receivedMessages: _doc.receivedMessages ? [..._doc.receivedMessages, received] : [received]
        });
      }
    });
  }
};



export { getConnectedUsers, getChats,updateChats };

