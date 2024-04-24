import {
  collection,
  query,
  getDocs,
} from "firebase/firestore";

import {db} from "@/firebase/config"

async function agentQ(zip: string){
  // Regular expression to match a 5-digit zip code
  const zipCodePattern = /\b\d{5}\b/;

  try {
    // Create a query to get documents where the "capital" field is equal to true
    const q = query(collection(db, "agentList"));
    // Create an array to store the cities
    const agentList: any[] = [];

    // Execute the query and get the snapshot
    const agentResults = await getDocs(q);
    if (agentResults.empty) {
      console.log("No matching documents.");
      return [];
    }
    else
    {
          // Iterate through the snapshot and push each city to the array
    agentResults.forEach(
      (doc) => {
      const agentData = doc.data() as any;
      if (((agentData.address).match(zipCodePattern))[0]==zip){
        agentList.push(agentData);
      }
      console.log(agentList);
    });
    }
    // Return the array of cities
    return agentList;
  } catch (error) {
    console.error("Error fetching agents:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { agentQ };
