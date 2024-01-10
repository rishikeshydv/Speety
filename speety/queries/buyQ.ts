import { Firestore, collection, query, getDocs, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";


interface Home {
  price: string;
  address: string;
  zip: string;
  bed: string;
  bath: string;
}

async function buyQ(db: Firestore, zip: string) {
  try {

    // Create a query to get documents where the "capital" field is equal to true
    const q = query(collection(db, "buyHome"), where("zip", "==", zip));

    // Execute the query and get the snapshot
    const buyResults = await getDocs(q);

    // Create an array to store the cities
    const buyList: Home[] = [];

    // Iterate through the snapshot and push each city to the array
    buyResults.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const buyData: Home = doc.data() as any;
      buyList.push(buyData);
    });
    // Return the array of cities
    console.log(buyList);
    return buyList;
  } catch (error) {
    console.error("Error fetching houses:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { buyQ };

