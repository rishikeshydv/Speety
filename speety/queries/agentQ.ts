import {
  collection,
  query,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

import {db} from "@/firebase/config"

interface Agent{
  photoUrl:string; 
  name:string;
  stars:number;
  phone:string;
  usersReviews:number;
  company: string;
  license: string;
  address:string;
  email:string;
  zip:string

}

async function agentQ(zip: string){
  try {
    // Create a query to get documents where the "capital" field is equal to true
    const q = query(collection(db, "agentList"), where("zip", "==", zip));

    // Execute the query and get the snapshot
    const agentResults = await getDocs(q);

    // Create an array to store the cities
    const agentList: Agent[] = [];

    // Iterate through the snapshot and push each city to the array
    agentResults.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const agentData: Agent = doc.data() as any;
      agentList.push(agentData);
    });
    // Return the array of cities
    console.log(agentList);
    return agentList;
  } catch (error) {
    console.error("Error fetching agents:", error);
    // If an error occurs, you might want to handle it or return an empty array
    return [];
  }
}

export { agentQ };
