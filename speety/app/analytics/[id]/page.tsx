"use client"
import { db } from '@/firebase/config';
import axios from 'axios';
import { set } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface PriceChanges{
  year: string;
  price: string;
}

interface LocationData {
  lat: number;
  lng: number;
}

interface Property {
  address: string;
  apartment: string;
  baths:string;
  beds: string;
  brokerId: string;
  city: string;
  date: string;
  description: string;
  houseType: string;
  imageUrls: string[];
  listedBy: string;
  listerEmail: string;
  lotSize: string;
  parkingSpce: string;
  price: string;
  priceOverTime: PriceChanges[];
  sqft: string;
  state: string;
  state_code: string;
  transactionType: string;
  videoUrls: string[];
  yearBuilt: string;
  zip: string; 
}

interface CrimeInfo {
  city: string;
  state: string;
  total_population: string;
  crime_rate: string;           //this is not a percentage, it is the number of crimes per 100000 people per year
}

interface PriceTrendRequest {
  bed: number[];
  bath: number[];
  acre_lot: number[];
  street: number[];
  city: string[];
  state: string[];
  house_size: number[];
  zip_code: number[];
}

interface DemographyType {
  average_household_size: number;
  city: string;
  count: number;
  female_population: number;
  foreign_born: number;
  main_race: string;
  male_population: number;
  median_age: number;
  number_of_veterans: number;
  state: string;
  state_code: string;
  total_population: number;
}

interface TransitData {
  description: string;
  summary: string;
  score: number;
}

interface BikeData{
  description: string;
  score: number;
}

export default function PropertyIDAnalytics() {
  const params = useParams();
  const propertyId = decodeURIComponent(params["id"] as string);
  const [currentProperty, setCurrentProperty] = useState<Property>(); //this will be a single property object
  const [similarProperties, setSimilarProperties] = useState<Property[]>(); //this will be an array of properties
  const [crimeInfo, setCrimeInfo] = useState<CrimeInfo>();
  const [predictedPrice, setPredictedPrice] = useState<any>();
  const [priceTrend, setPriceTrend] = useState<any>();
  const [demographics, setDemographics] = useState<DemographyType>();
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [walkableScore, setWalkableScore] = useState<number>();
  const [transitData, setTransitData] = useState<TransitData>();
  const [bikeData, setBikeData] = useState<BikeData>();
  const mapRef = useRef<HTMLDivElement>();
  const [nearbyTypes, setNearbyTypes] = useState<string>("restaurant");
  // "school","restaurant","grocery_or_supermarket","night_club","cafe","shopping_mall","museum","beauty_salon","gym"
  const [radius, setRadius] = useState<number>(1000);
  const [mapZoom, setMapZoom] = useState<number>(16);
  const [volatilityValue, setVolatilityValue] = useState<boolean>(false);
  const [rentPrice, setRentPrice] = useState<any>();
  const [salesProbability, setSalesProbability] = useState<any>();

  //retrieve the property with the given id from the database
  async function getProperty() {
    const propertyRef = collection(db,"presentListings")
    const propertySnapshot = await getDocs(propertyRef)
    if (propertySnapshot.empty) {
      return;
    }
    propertySnapshot.forEach(agent => {
      const agentData = agent.data()
      const propertyKeys = Object.keys(agentData)
      if (propertyKeys.includes(propertyId)) {
        const property = agentData[propertyId] as Property;
        setCurrentProperty(property);
      }
    })
  }

  //get similar properties
  async function getSimilarProperties() {
    const propertyRef = collection(db,"presentListings")
    const propertySnapshot = await getDocs(propertyRef)
    if (propertySnapshot.empty) {
      return;
    }
    const properties: Property[] = [];
    propertySnapshot.forEach(doc => {
      if (doc.id !== propertyId && currentProperty) {
        const propertyId = doc.id;
        const property = doc.data() as Property;
        //this is the logic for finding similar properties
        if (property.baths === currentProperty.baths && property.beds === currentProperty.beds && property.city === currentProperty.city && property.state === currentProperty.state) {
          properties.push(property);
        }
      }
    });
    setSimilarProperties(properties);
  }

  useEffect(() => {
    getProperty();
    getSimilarProperties();
  }, []);

  //now, we check the crime info of the property
async function getCrimeInfo(city:string, state:string) {
  const crimeResponse = await axios.post(`http://127.0.0.1:8080/api/v1/crime-rate`,{
    city: city,
    state: state
  })
  if (typeof crimeResponse.data === 'string'){
        setCrimeInfo({
          city: city,
          state: state,
          total_population: 'N/A',
          crime_rate: 'Safe City'
        })
  }
  else {
    setCrimeInfo(crimeResponse.data);
  }
    }

  //now we hit the price predict ML Model to get the price trend of the property
  async function getPricePrediction() {
    const requestData:PriceTrendRequest = {
      "bed": [parseInt(currentProperty?.beds as string)],
      "bath": [parseInt(currentProperty?.baths as string)],
      "acre_lot": [parseFloat(currentProperty?.lotSize as string)],
      "street": [893593.0],
      "city": [currentProperty?.city as string],
      "state": [currentProperty?.state as string],
      "house_size": [parseInt(currentProperty?.sqft as string)],
      "zip_code": [parseInt(currentProperty?.zip as string)],
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/predict-price',requestData);
    setPredictedPrice(res.data.price);
  }

  //now we hit the rent predict ML Model to get the rent trend of the property
  async function getRentPrediction() {
    const requestData:PriceTrendRequest = {
      "bed": [parseInt(currentProperty?.beds as string)],
      "bath": [parseInt(currentProperty?.baths as string)],
      "acre_lot": [parseFloat(currentProperty?.lotSize as string)],
      "street": [893593.0],
      "city": [currentProperty?.city as string],
      "state": [currentProperty?.state as string],
      "house_size": [parseInt(currentProperty?.sqft as string)],
      "zip_code": [parseInt(currentProperty?.zip as string)],
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/rent-price',requestData);
    setRentPrice(res.data.rent);
  }

//now we hit the sales probability ML Model to get the sales probability of the property
  async function getSalesProbability() {
    const requestData:PriceTrendRequest = {
      "bed": [parseInt(currentProperty?.beds as string)],
      "bath": [parseInt(currentProperty?.baths as string)],
      "acre_lot": [parseFloat(currentProperty?.lotSize as string)],
      "street": [893593.0],
      "city": [currentProperty?.city as string],
      "state": [currentProperty?.state as string],
      "house_size": [parseInt(currentProperty?.sqft as string)],
      "zip_code": [parseInt(currentProperty?.zip as string)],
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/sales-probability',requestData);
    setSalesProbability(res.data.probability);
  }

  //now we hit the price-trend-bot API to get the price trend of the individual property
  async function getPriceTrend() {
    const requestData = {
      "current_price": currentProperty?.price,
      "predicted_price": predictedPrice,
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/price-trend/individual-property', requestData);
    setPriceTrend(res.data.message);
  }

  //now we get the demographics of the property
  async function getDemographics() {
    const requestData = {
      "city": String(currentProperty?.city),
      "state": String(currentProperty?.state),
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/demography', requestData);
    console.log(res.data.demography);
    setDemographics(res.data.demography);
  }

  //getting the longitude & latitude of the property

  useEffect(() => {
    //geocode function
    const geocodeDestination = async (address: any): Promise<LocationData> => {
      const myGeocoder = new google.maps.Geocoder();
      return new Promise<LocationData>((resolve, reject) => {
        myGeocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results) {
            const destinationLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            resolve(destinationLocation);
          } else {
            reject(new Error("Geocode request failed."));
          }
        });
      });
    };

    //convert the address to lat and long
    if (currentProperty) {
      const address = `${currentProperty.address}, ${currentProperty.city}, ${currentProperty.state}, ${currentProperty.zip},United States`;
      geocodeDestination(address)
        .then((location) => {
          setLongitude(location.lng);
          setLatitude(location.lat);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }, [currentProperty]);

  useEffect(() => {
    const initializeMap = () => {
      if (!google.maps.Map){
        return; 
      }
    const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
        zoom: mapZoom,
        center: {
          lat: latitude as number,
          lng: longitude as number,
        },
        mapId: "Nearby Places",
      });

 
      const service = new google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location: {
          lat: latitude as number,
          lng: longitude as number,
        },
        radius: radius,
        type: nearbyTypes, // Assuming nearbyTypes is an array, select the first element
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results ) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      });

      function createMarker(place: google.maps.places.PlaceResult) {
        if (!place.geometry || !place.geometry.location) return;
      
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          label: {
            text: place.name ?? "",
            color: "#4E5166",
            fontSize: "12px",
            fontWeight: "bold",
          },
        });
      
      }
      

      const marker = new google.maps.Marker({
        position: {
          lat: latitude as number,
          lng: longitude as number,
        },
        map,
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/6830/6830146.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&loading=async&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", initializeMap); 
      document.body.appendChild(script);
    } else {
        initializeMap(); // If Google Maps is already loaded
    }
  }, [latitude,longitude,nearbyTypes,radius,mapZoom]);
  
  //now we get the walkability score of a property
  async function getWalkabilityScore() {
    const requestData = {
      "fullAddress": `${currentProperty?.address}, ${currentProperty?.city}, ${currentProperty?.state}, ${currentProperty?.zip},United States`,
      "latitude": latitude,
      "longitude": longitude,
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/walkability', requestData);
    console.log(res.data.walkabilityData)
    setWalkableScore(res.data.walkabilityData.walkscore);
    setBikeData(res.data.walkabilityData.bike);
    }

    //get the transit score of the property
    async function getTransitScore() {
      const requestData = {
        "city": currentProperty?.city,
        "state": currentProperty?.state_code,
        "latitude": latitude,
        "longitude": longitude,
      }
      const res = await axios.post('http://127.0.0.1:8080/api/v1/transit', requestData);
     setTransitData({
        description: res.data.transitData.description,
        summary: res.data.transitData.summary,
        score: res.data.transitData.transit_score,
     });
    }

    //function to check the volatility of the property
    function checkVolatility() {
      if (!currentProperty || !predictedPrice) {
        return;
      }
      if (Math.abs(Number(currentProperty?.price) - predictedPrice) > 80000) {
        setVolatilityValue(true);
      } else {
        setVolatilityValue(false);
      }
    }
   
  return (
    <div>
      <div>
        <h1>Welcome to Analytics</h1>
        <p>My property ID: {propertyId}</p>
        <div>
          {currentProperty?.priceOverTime?.map((priceChange, index) => (
            <div key={index}>
              <p>Date: {priceChange.year}</p>
              <p>Price: {priceChange.price}</p>
            </div>
          ))}
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={() => getCrimeInfo(currentProperty?.city as string,currentProperty?.state as string)}>Get Crime Info</button>
          <h1>city: {crimeInfo?.city}</h1>
          <h1>state: {crimeInfo?.state}</h1>
          <h1>total_population: {crimeInfo?.total_population}</h1>
          <h1>crime_rate: {crimeInfo?.crime_rate}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getPricePrediction}>Get Price Prediction</button>
          <h1>{predictedPrice}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getRentPrediction}>Get Rent Prediction</button>
          <h1>{rentPrice}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getSalesProbability}>Get Sales Probability</button>
          <h1>{salesProbability}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getPriceTrend}>Get Price Trend</button>
          <h1>{priceTrend}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getDemographics}>Get Demography</button>
          <h1>{demographics?.city}</h1>
          <h1>{demographics?.state}</h1>
          <h1>{demographics?.average_household_size}</h1>
          <h1>{demographics?.count}</h1>
          <h1>{demographics?.female_population}</h1>
          <h1>{demographics?.foreign_born}</h1>
          <h1>{demographics?.main_race}</h1>
          <h1>{demographics?.male_population}</h1>
          <h1>{demographics?.median_age}</h1>
          <h1>{demographics?.number_of_veterans}</h1>
          <h1>{demographics?.state_code}</h1>
          <h1>{demographics?.total_population}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getWalkabilityScore}>Get Walkability Score</button>
          <h1>Walk Score: {walkableScore}</h1>
          <h1>Bike Description: {bikeData?.description}</h1>
          <h1>Bike Score: {bikeData?.score}</h1>
        </div>
        <div>
          <button className='bg-gray-300 p-3' onClick={getTransitScore}>Get Transit Score</button>
          <h1>Transit Description: {transitData?.description}</h1>
          <h1>Transit Summary: {transitData?.summary}</h1>
          <h1>Transit Score: {transitData?.score}</h1>
        </div>
      </div>
      <div>
          <h2>Nearby Places</h2>
          <div className="w-[350px] h-[600px] shadow-lg md:w-[700px] md:h-[550px] xl:w-[1000px] xl:h-[550px] 2xl:w-[1000px] 2xl:h-[550px]" ref={mapRef as  React.RefObject<HTMLDivElement>}></div>
          {/* "school","restaurant","grocery_or_supermarket","night_club","cafe","shopping_mall","museum","beauty_salon","gym" */}
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("school")}>Schools</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("restaurant")}>Restaurants</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("grocery_or_supermarket")}>Grocery Stores</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("night_club")}>Night Clubs</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("cafe")}>Cafes</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("shopping_mall")}>Shopping Malls</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("museum")}>Museums</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("beauty_salon")}>Beauty Salons</button>
          <button className='bg-blue-300 p-3' onClick={()=>setNearbyTypes("gym")}>Gyms</button>
          <input type="number" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} />
          {/* The map zoom input type should be replaced with a slide bar */}
          <input type="number" value={mapZoom} onChange={(e) => setMapZoom(parseInt(e.target.value))} />
        </div>
        <div>
          <button className='bg-gray-300' onClick={checkVolatility}>Volatility Check</button>
          <h1>{volatilityValue ? `Yes, the property is volatile and has chances of profit making.` : `No, the property aligns with the normal price trend of the associated area.`}</h1>
        </div>
    </div>
  )
}


