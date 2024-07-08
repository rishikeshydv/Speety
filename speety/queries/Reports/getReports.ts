import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface Report {
    street: string;
    apartment: string;
    city: string;
    county: string;
    state: string;
    country: string;
    pdf: string;
}
export const getReports = async (street:string,apt:string,city:string,county:string,state:string,country:string) => {
  const docRef = doc(db, "reports","scail");
  const docSnap = await getDoc(docRef); 
    let reports:Report[] = [];
    if (docSnap.exists()) {
        const data = docSnap.data();
        const dataKeys = Object.keys(data);
        dataKeys.forEach((key) => {
            const report = data[key];
            if (report.street === street && report.apartment === apt && report.city === city && report.county === county && report.state === state && report.country === country) {
                reports.push(report);
        }
    });
    return reports;
}
};