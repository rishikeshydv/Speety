//This is an algorithm to show similar properties when navigating to /buy/propertyId
import zipcodes from 'zipcodes';
import { collection, query,getDocs, } from "firebase/firestore";
import { db } from "@/firebase/config";

interface Property {
    [key: string]: {
      address: string;
      apartment: string;
      city: string;
      state: string;
      zip: string;
      price: string;
      beds: string;
      baths: string;
      houseType: string;
      transactionType: string;
      listedBy: string;
      listerEmail: string;
      brokerId: string;
      imageUrl: string[];
      videoUrl: string[];
      date: string;
      sqft: string;
      lotSize: string;
      yearBuilt: string;
      description: string;
      parkingSpace: string;
      estimatedMortgage: string;
      amenities: string;
    };
  }

const SimilarPropertyForRent = async(beds:string, baths:string, price:string, zipcode:string,radius:number) => {
    const  zipNearby = zipcodes.radius(zipcode, radius);

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
            if (data[key].transactionType === "Rent"){
            if (Number(data[key].beds) < (Number(beds)+1) && Number(data[key].beds) > (Number(beds)-1)){
                if (Number(data[key].baths) < (Number(baths)+1) && Number(data[key].baths) > (Number(baths)-1)){
                    if (Number(data[key].price) < (Number(price)+500) && Number(data[key].price) > (Number(price)-500)){
                        if (zipNearby.includes(data[key].zip)){
                            buyList[key] = data[key];
                        }
                    }
                }
            }
        }
        });
})
return buyList;
}
export default SimilarPropertyForRent;