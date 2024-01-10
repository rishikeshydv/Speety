import { Firestore, addDoc, collection } from "firebase/firestore";

interface Home {
  price: string;
  address: string;
  zip: string;
  bed: string;
  bath: string;
}
async function rentQ(db: Firestore,
  price: string,
  address: string,
  zip: string,
  bed: string,
  bath: string
) {
  try {
    // Execute the query and get the snapshot
    const sellProperty = await addDoc(collection(db, "rentHome"), {
      price: price,
      address: address,
      zip: zip,
      bed: bed,
      bath: bath
    });
    // Return the array of cities
    return ("Property Added Successfully!")
    console.log('Data Added');
  } catch (error) {
    console.error("Error adding houses:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { rentQ };

