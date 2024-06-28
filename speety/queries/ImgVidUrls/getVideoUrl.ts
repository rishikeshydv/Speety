import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {app } from "@/firebase/config";

const getVideoUrl = async (file:File)=> {
    
// Create a root reference
const storage = getStorage(app);

// Create a reference to a particular folder
const storageRef = ref(storage, 'frontend-vids/'+file.name);

// 'file' comes from the Blob or File API
    // Upload the Blob to Firebase Storage
    const uploadTaskSnapshot = await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadURL;
    
}

export default getVideoUrl;
