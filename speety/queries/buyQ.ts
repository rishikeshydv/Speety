import { Firestore, collection, query, getDocs, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";


interface Property{
  price:string;
  beds:string;
  baths:string;
  houseType:string;
  transactionType:string;
  address: string;
  apartment:string;
  city:string;
  state:string;
  zip:string;
  listedBy: string;
  imageUrl:string[];
  videoUrl:string[]
}

async function buyQ(db: Firestore, zip: string,priceUpper: string, priceLower: string, searchType: string, bed: string, bath: string, homeType: string) {
  try {
    const q = query(
      collection(db, "propertyDetails"), 
      where("zip", "==", zip), 
      where("price", "<", Number(priceUpper)), 
      where("price", ">", Number(priceLower)), 
      where("searchType", "==", searchType), 
      where("bed", "==", bed), 
      where("bath", "==", bath), 
      where("homeType", "==", homeType)
    );


    // Execute the query and get the snapshot
    const buyResults = await getDocs(q);

    // Create an array to store the cities
    const buyList: Property[] = [];

    // Iterate through the snapshot and push each city to the array
    buyResults.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const buyData: Property = doc.data() as any;
      buyList.push(buyData);
    });
    return buyList;
  } catch (error) {
    console.error("Error fetching houses:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { buyQ };

