import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/config";
//getting URL using a file
const getImageUrl = async(file:File)=> { 
    
// Create a root reference
const storage = getStorage(app);

// Create a reference to a particular folder
const storageRef = ref(storage, 'DriverLicenses/'+file.name);

    // Upload the Blob to Firebase Storage
    const uploadTaskSnapshot = await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadURL;

}



export default getImageUrl;
