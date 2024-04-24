import { collection, query,getDocs, where } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Property{
[ key: string ]: {address:string,apartment:string,city:string,state:string,zip:string,price:string,beds:string,baths:string,houseType:string,transactionType:string,listedBy:string,brokerId:string,imageUrl:string[],videoUrl:string[],date:string};
}
async function buyQ( zip: string,priceUpper: string, priceLower: string, searchType: string, bed: string, bath: string, homeType: string) {
  try {

//create a dictionary buyList of type Property
    const buyList: Property = {};

    const q = query(
      collection(db, "presentListings")
    );

    // Execute the query and get the snapshot
    const buyResults = await getDocs(q);

    // Iterate through the snapshot and push each city to the array
    buyResults.forEach((doc) => {
      const data = doc.data();
      const keys = Object.keys(data);
      keys.map((key) => {
        buyList[key] = data[key];
      }
      );
 //     console.log("Buy list is",buyList);

    });

    return buyList;
  } catch (error) {
    console.error("Error fetching houses:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { buyQ };

