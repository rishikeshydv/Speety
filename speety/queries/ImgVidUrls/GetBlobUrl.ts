import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/config";

//getting URL using a Blob Url/Src
const GetBlobUrl = async (id:string,imgSrc:string)=> {
   
    // Create a root reference
    const storage = getStorage();
    
    // Create a reference to a particular folder
    const storageRef = ref(storage, 'faceCaptures/'+id+'.png');
    
    // Convert base64 image to a Blob
    const response = await fetch(imgSrc);
    const blob = await response.blob();
    
    // Upload the Blob to Firebase Storage
    const uploadTaskSnapshot = await uploadBytes(storageRef, blob);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadURL;
          }

export default GetBlobUrl;