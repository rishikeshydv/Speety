import { collection, getDoc, getDocs, doc, updateDoc, addDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/config";
import moment from 'moment'; 


interface eachMessage {
        type:string;
        msg: string;
        date: string;
}



// get all the users
const getConnectedUsers = async (senderUser: string) => {

  if (!senderUser) {
    return;
  }
  const usersRef = collection(db, "connectedHistory");
  const userDocRef = doc(usersRef, senderUser);
  const userSnapshot = await getDoc(userDocRef);
  let usersConnected: string[][] = [];
  let tempEmails: string[] = [];  

  if (userSnapshot.exists()) {
    const retrievedData = await userSnapshot.data();
    const allKeys = Object.keys(retrievedData);
    for (let i=0;i<allKeys.length;i++){
      const newKey = allKeys[i];
      tempEmails.push(newKey+".com")   //this is the email of the user as firebase does not allow special characters in the key such as dot(.)
    }
}

   const _usersRef = collection(db, "User_Info");
   for (let i=0;i<tempEmails.length;i++){
    const _userDocRef = doc(_usersRef, tempEmails[i]);
    const _userSnapshot = await getDoc(_userDocRef);
    if (_userSnapshot.exists()){
      const _retrievedData = await _userSnapshot.data();
      usersConnected.push([tempEmails[i],_retrievedData["name"],_retrievedData["profilePic"]]);
    }

   }
   console.log(usersConnected);
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


const updateChats = async (senderUser: string, receiverUser: string, messagesExchanged: eachMessage[]) => {
  //we here get the name of teh receiverUser
  let receiverName = "";
const _usersRef = collection(db, "User_Info");
 const _userDocRef = doc(_usersRef, receiverUser);
 const _userSnapshot = await getDoc(_userDocRef);
 if (_userSnapshot.exists()){
   const _retrievedData = _userSnapshot.data();
  receiverName = _retrievedData["name"];
 }

  const messageRef = doc(db, "connectedHistory", senderUser);
  const docSnapshot = await getDoc(messageRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    const connectedKeys = Object.keys(data);
    for (let i = 0; i < connectedKeys.length; i++) {
      const key = connectedKeys[i];
      if (key === receiverUser.slice(0,receiverUser.indexOf("."))) {
        const entryRef = doc(db, "connectedHistory", senderUser);
        await updateDoc(entryRef, {
          [receiverUser.slice(0,receiverUser.indexOf("."))]:  //this is the email of the user as firebase does not allow special characters in the key such as dot(.)
          {
            messagesExchanged: messagesExchanged,
            name: data[key].name,
          },
        });
      }
      else{
        const entryRef = doc(db, "connectedHistory", senderUser);
        await setDoc(entryRef, {
          [receiverUser.slice(0,receiverUser.indexOf("."))]: {  //this is the email of the user as firebase does not allow special characters in the key such as dot(.)
            messagesExchanged: messagesExchanged,
            name: data[key].name,
          },
        });
      }
    }
  }
  else{
    const entryRef = doc(db, "connectedHistory", senderUser);
    await setDoc(entryRef, {
      [receiverUser.slice(0,receiverUser.indexOf("."))]: {  //this is the email of the user as firebase does not allow special characters in the key such as dot(.)
        messagesExchanged: messagesExchanged,
        name: receiverName,
      },
    });
  }
};

export { getConnectedUsers, getChats,updateChats };

