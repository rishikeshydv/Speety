import { collection, query,getDocs, where } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Property{
[ key: string ]: {address:string,apartment:string,city:string,state:string,zip:string,price:string,beds:string,baths:string,houseType:string,transactionType:string,listedBy:string,brokerId:string,imageUrl:string[],videoUrl:string[],date:string};
}
async function rentQ( zip: string,priceUpper: string, priceLower: string, searchType: string, bed: string, bath: string, homeType: string) {
  try {

//create a dictionary rentList of type Property
    const rentList: Property = {};

    const q = query(
      collection(db, "presentListings")
    );

    // Execute the query and get the snapshot
    const rentResults = await getDocs(q);

    // Iterate through the snapshot and push each city to the array
    rentResults.forEach((doc) => {
      const data = doc.data();
      const keys = Object.keys(data);
      keys.map((key) => {
        rentList[key] = data[key];
      }
      );
 //     console.log("Buy list is",rentList);

    });

    return rentList;
  } catch (error) {
    console.error("Error fetching houses:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { rentQ };

