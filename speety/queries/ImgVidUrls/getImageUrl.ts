import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/config";

const getImageUrl = (file:File)=> {
    
// Create a root reference
const storage = getStorage();

// Create a reference to a particular folder
const storageRef = ref(storage, 'propertyPostedImages/'+file.name);

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;
    })
  }
  );
}

export default getImageUrl;
