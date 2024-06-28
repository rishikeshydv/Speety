import { collection, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface eachMessage {
        type:string;
        msg: string;
        date: string;
        status: string;
}


// get all the users
const getConnectedUsers = async (senderUser: string) => {

  if (!senderUser) {
    return;
  }
  //making a list of emails
  const usersRef = collection(db, "connectedHistory");
  const userDocRef = doc(usersRef, senderUser);
  const userSnapshot = await getDoc(userDocRef);
  let usersConnected: any[][] = [];
  let tempEmails: string[] = [];  

  if (userSnapshot.exists()) {
    const retrievedData = await userSnapshot.data();
    const allKeys = Object.keys(retrievedData);
    for (let i=0;i<allKeys.length;i++){
      const newKey = allKeys[i];
      tempEmails.push(newKey+".com")   //this is the email of the user as firebase does not allow special characters in the key such as dot(.)
    }
}

  //getting the name and profile pic of the users
   const _usersRef = collection(db, "User_Info");
   for (let i=0;i<tempEmails.length;i++){
    const _userDocRef = doc(_usersRef, tempEmails[i]);
    const _userSnapshot = await getDoc(_userDocRef);
    if (_userSnapshot.exists()){
      const _retrievedData = await _userSnapshot.data();
      usersConnected.push([tempEmails[i],_retrievedData["name"],_retrievedData["profilePic"]]);
    }

   }

   //is the last message had "received" type and "sent" status, then its a new message
   const newMsgDoc = doc(db, "connectedHistory", senderUser);
   const newMsgSnapshot = await getDoc(newMsgDoc);
   if (newMsgSnapshot.exists()) {
    const newMsgData = newMsgSnapshot.data();
    const keys = Object.keys(newMsgData);
    for (let i=0;i<keys.length;i++){
      const newKey = keys[i];
      const eachUserMsg = newMsgData[newKey].messagesExchanged;
      if (eachUserMsg.length > 0){
        if (eachUserMsg[eachUserMsg.length-1].type === "received" && eachUserMsg[eachUserMsg.length-1].status === "sent"){
          for (let j=0;j<usersConnected.length;j++){
            if (usersConnected[j][0] === newKey+".com"){
              usersConnected[j].push(true); // Convert boolean to string
              break;
            }
          }
        }
      }
    }
   }

  return usersConnected;

};


// get a user's chat history
const getChats = async (senderUser: string, receiverUser:string) => {
    const usersCollection = doc(db, "connectedHistory", senderUser);
    const usersSnapshot = await getDoc(usersCollection);
    let _messagesExchanged: eachMessage[] = [];
    if (usersSnapshot.exists()) {
      const data = usersSnapshot.data();
      if (data && data[receiverUser.slice(0,receiverUser.indexOf("."))] && data[receiverUser.slice(0,receiverUser.indexOf("."))].messagesExchanged) {
        _messagesExchanged = data[receiverUser.slice(0,receiverUser.indexOf("."))].messagesExchanged;
      }
    }
    return _messagesExchanged
  };


async function updateChats(senderUser:string, receiverUser:string, messagesExchanged:eachMessage[]) {

    // Get the name of the receiverUser
    let receiverName = "";
    const userDocRef = doc(db, "User_Info", receiverUser);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const retrievedData = userSnapshot.data();
      receiverName = retrievedData.name;
    }
  
    const receiverKey = receiverUser.split(".")[0];  // Extract key without dot
    const messageRef = doc(db, "connectedHistory", senderUser);
    const docSnapshot = await getDoc(messageRef);
  
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const existingEntry = data[receiverKey];
  
      // Update existing entry or create new entry if it does not exist
      await updateDoc(messageRef, {
        [receiverKey]: {
          messagesExchanged: messagesExchanged,
          name: existingEntry ? existingEntry.name : receiverName,
        },
      });
    } else {
      // Create new document with the chat entry
      await setDoc(messageRef, {
        [receiverKey]: {
          messagesExchanged: messagesExchanged,
          name: receiverName,
        },
      });
    }
  };
  

export { getConnectedUsers, getChats,updateChats };

