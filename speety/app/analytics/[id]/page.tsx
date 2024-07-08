"use client"
import { db } from '@/firebase/config';
import axios from 'axios';
import { set } from 'date-fns';
import { collection, getDocs,doc, getDoc } from 'firebase/firestore';
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

interface SalesProbabilityRequest {
  bed: number[];
  bath: number[];
  acre_lot: number[];
  street: number[];
  city: string[];
  state: string[];
  house_size: number[];
  zip_code: number[];
  price: number[];
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

const renovationCriteria = {
  // bath model
  bath_model_medium_size: "5 x 7 sqft",
  bath_model_large_size: "9 x 9 sqft",

  bath_model_medium_do_it_yourself: 5000,

  bath_model_medium_cost_low: 9000,
  bath_model_medium_cost_high: 14000,

  bath_model_large_cost_low: 35000,
  bath_model_large_cost_high: 45000,

  // kitchen model
  kitchen_model_medium_size: "10 x 10 sqft", // 10x10 is the regular size of a kitchen
  kitchen_model_large_size: "15 x 20 sqft", // 15x20 is the large size of a kitchen

  kitchen_model_medium_do_it_yourself: 10000,

  kitchen_model_medium_cost_low: 15000,
  kitchen_model_medium_cost_high: 20000,

  kitchen_model_high_cost_low: 50000,
  kitchen_model_high_cost_high: 65000,

  // roof model
  roof_model_medium_size: "1700 sqft", // sqft
  roof_model_large_size: "2100 sqft", // sqft

  roof_model_do_it_yourself_low: 2200, // asphalt shingles


  tile_roof_low: 7650,
  tile_roof_high: 18000,

  metal_roof_low: 5100,
  metal_roof_high: 20000,

  slate_roof_low: 17000,
  slate_roof_high: 60000,

  // house clean model
  house_clean_small_model:"900 sqft",
  house_clean_medium_model:"1300 sqft",
  house_clean_large_model:"2200 sqft",

  house_clean_do_it_yourself_low: 0,

  house_clean_small_low: 74, // 900 sqft
  house_clean_small_high: 200, // 900 sqft

  house_clean_medium_low: 95, // 1300 sqft
  house_clean_medium_high: 300, // 1300 sqft

  house_clean_large_low: 149, // 2200 sqft
  house_clean_large_high: 400, // 2200 sqft

  // central air conditioning model
  air_conditioning_model_size: "2000 sqft", 

  air_conditioning_model_do_it_yourself_low: 2000,

  air_conditioning_model_low: 3500, // 2000 sq ft
  air_conditioning_model_high: 4000, // 2000 sq ft

  // water boiler model
  water_boiler_model_do_it_yourself_low: 3000,

  water_boiler_model_low: 4000,
  water_boiler_model_high: 28000
};


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
  //state variables for renovation properties
  //model
  const [bathModel, setBathModel] = useState<string>();
  const [kitchenModel, setKitchenModel] = useState<string>();
  const [roofModel, setRoofModel] = useState<string>();
  const [houseCleanModel, setHouseCleanModel] = useState<string>();
  const [airConditioningModel, setAirConditioningModel] = useState<string>();
  const [waterBoilerModel, setWaterBoilerModel] = useState<string>();
  //size
  const [bathSize, setBathSize] = useState<string>();
  const [kitchenSize, setKitchenSize] = useState<string>();
  const [roofSize, setRoofSize] = useState<string>();
  const [houseCleanSize, setHouseCleanSize] = useState<string>();
  //cost
  const [bathCost, setBathCost] = useState<number>(0);
  const [kitchenCost, setKitchenCost] = useState<number>(0);
  const [roofCost, setRoofCost] = useState<number>(0);
  const [houseCleanCost, setHouseCleanCost] = useState<number>(0);
  const [airConditioningCost, setAirConditioningCost] = useState<number>(0);
  const [waterBoilerCost, setWaterBoilerCost] = useState<number>(0);

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
    const requestData:SalesProbabilityRequest = {
      "bed": [parseInt(currentProperty?.beds as string)],
      "bath": [parseInt(currentProperty?.baths as string)],
      "acre_lot": [parseFloat(currentProperty?.lotSize as string)],
      "street": [893593.0],
      "city": [currentProperty?.city as string],
      "state": [currentProperty?.state as string],
      "house_size": [parseInt(currentProperty?.sqft as string)],
      "zip_code": [parseInt(currentProperty?.zip as string)],
      "price": [parseInt(currentProperty?.price as string)],
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/rent-price',requestData);
    setRentPrice(res.data.rent);
  }

//now we hit the sales probability ML Model to get the sales probability of the property
  async function getSalesProbability() {
    const requestData:SalesProbabilityRequest = {
      "bed": [parseInt(currentProperty?.beds as string)],
      "bath": [parseInt(currentProperty?.baths as string)],
      "acre_lot": [parseFloat(currentProperty?.lotSize as string)],
      "street": [893593.0],
      "city": [currentProperty?.city as string],
      "state": [currentProperty?.state as string],
      "house_size": [parseInt(currentProperty?.sqft as string)],
      "zip_code": [parseInt(currentProperty?.zip as string)],
      "price": [parseInt(currentProperty?.price as string)],
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

    //now we do the cost benefit analysis of the property
    function renovate_yourself() {
      setBathCost(renovationCriteria.bath_model_medium_do_it_yourself);
      setKitchenCost(renovationCriteria.kitchen_model_medium_do_it_yourself);
      setRoofCost(renovationCriteria.roof_model_do_it_yourself_low);
      setHouseCleanCost(renovationCriteria.house_clean_do_it_yourself_low);
      setAirConditioningCost(renovationCriteria.air_conditioning_model_do_it_yourself_low);
      setWaterBoilerCost(renovationCriteria.water_boiler_model_do_it_yourself_low);
    }

    function renovate_contractor() {
      setBathCost(0);
      setKitchenCost(0);
      setRoofCost(0);
      setHouseCleanCost(0);
      setAirConditioningCost(0);
      setWaterBoilerCost(0);
    };

    //logic for finding all the resale probability properties by state
    const [resaleState, setResaleState] = useState<string>();
    interface Property {
      // Add index signature
      [key: string]: any;
      state: string;
    }

    const [resaleProperties, setResaleProperties] = useState<Property[]>();
    async function getResaleProperties() {
      const propertyRef = doc(db,"volatileProperties",resaleState as string);
      const propertySnapshot = await getDoc(propertyRef)
      if (propertySnapshot.exists()) {
        const properties = propertySnapshot.data() as Property;
        const propertyKeys = Object.keys(properties);
        propertyKeys.forEach(key => {
          const property = properties[key] as Property;
          if (property.state === resaleState) {
            setResaleProperties([...resaleProperties as Property[], property]);
          }
        })
      }
    }

   
  return (
    <div>
      <div>
        <h1>Welcome to Analytics</h1>
        <p>My property ID: {propertyId}</p>
        <div>
          {currentProperty?.priceOverTime?.map((priceChange:any, index:any) => (
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
          <button className='bg-gray-300' onClick={checkVolatility}>Check Resale Potential</button>
          <h1>{volatilityValue ? `Yes, the property is volatile and has chances of profit making.` : `No, the property aligns with the normal price trend of the associated area.`}</h1>
        </div>
        {/* Cost Benefit Analysis is only done */}
        <div>
          {
            volatilityValue ? (
              <div>
                {/* Buttons */}
                <div className='flex gap-2'>
                  <button className='bg-green-300 p-3' onClick={renovate_yourself}>Do it Yourself</button>
                  <button className='bg-green-300 p-3' onClick={renovate_contractor}>Contractor</button>
                </div>
                <div>
                <label htmlFor="bath-size">Choose a bath size:</label>
                <select id="bath-size" className='bg-gray-200' defaultValue={"9000"} onChange={(e)=>setBathCost(Number(e.target.value))}>
                  <option value="9000">5 x 7 sqft (Medium) Low Cost</option>
                  <option value="14000">5 x 7 sqft (Medium) High Cost</option>
                  <option value="35000">9 x 9 sqft (Large) Low Cost</option>
                  <option value="45000">9 x 9 sqft (Large) High Cost</option>
                </select>

                <label htmlFor="bath-size">Choose a kitchen size:</label>
                <select id="kitchen-size" className='bg-gray-200' defaultValue={"15000"} onChange={(e)=>setKitchenCost(Number(e.target.value))}>
                  <option value="15000">10 x 10 sqft (Medium) Low Cost</option>
                  <option value="20000">10 x 10 sqft (Medium) High Cost</option>
                  <option value="50000">15 x 20 sqft (Large) Low Cost</option>
                  <option value="65000">15 x 20 sqft (Large) High Cost</option>
                </select>

                <label htmlFor="roof-size">Choose a roof size:</label>
                <select id="roof-size" className='bg-gray-200' defaultValue={"2200"} onChange={(e)=>setRoofCost(Number(e.target.value))}>
                  <option value="7650">Tile Roof Low Cost</option>
                  <option value="18000">Tile Roof High Cost</option>
                  <option value="5100">Metal Roof Low Cost</option>
                  <option value="20000">Metal Roof High Cost</option>
                  <option value="17000">Slate Roof Low Cost</option>
                  <option value="60000">Slate Roof High Cost</option>
                </select>

                <label htmlFor="house-clean-size">Choose a house clean size:</label>
                <select id="house-clean-size" className='bg-gray-200' defaultValue={"74"} onChange={(e)=>setHouseCleanCost(Number(e.target.value))}>
                  <option value="74">900 sqft (Small) Low Cost</option>
                  <option value="200">900 sqft (Small) High Cost</option>
                  <option value="95">1300 sqft (Medium) Low Cost</option>
                  <option value="300">1300 sqft (Medium) High Cost</option>
                  <option value="149">2200 sqft (Large) Low Cost</option>
                  <option value="400">2200 sqft (Large) High Cost</option>
                </select>

                <label htmlFor="air-conditioning-size">Choose a air conditioning size:</label>
                <select id="air-conditioning-size" className='bg-gray-200' defaultValue={"3500"} onChange={(e)=>setAirConditioningCost(Number(e.target.value))}>
                  <option value="3500">2000 sqft Low Cost</option>
                  <option value="4000">2000 sqft High Cost</option> 
                </select>

                <label htmlFor="water-boiler-size">Choose a water boiler size:</label>
                <select id="water-boiler-size" className='bg-gray-200' defaultValue={"4000"} onChange={(e)=>setWaterBoilerCost(Number(e.target.value))}>
                  <option value="4000">Low Cost</option>
                  <option value="28000">High Cost</option>
                </select>
                </div>
                <div>
                  <h1>Bath Cost:{bathCost}</h1>
                  <h1>Kitchen Cost:{kitchenCost}</h1>
                  <h1>Roof Cost:{roofCost}</h1>
                  <h1>House Clean Cost:{houseCleanCost}</h1>
                  <h1>Air Conditioning Cost:{airConditioningCost}</h1>
                  <h1>Water Boiler Cost:{waterBoilerCost}</h1>
                  <h1>Repair Cost: {bathCost+kitchenCost+roofCost+houseCleanCost+airConditioningCost+waterBoilerCost}</h1>
                </div>
              </div>
            ):null
          }
        </div>
        <div>
          <h1 > Get Resale Properties by State</h1>
          <label htmlFor="abc">Enter State</label>
          <input type="text" placeholder='enter a state' value={resaleState} onChange={(e)=>setResaleState(e.target.value)} />
          <button className='bg-gray-300 p-3' onClick={getResaleProperties}>Get Properties</button>
          <div>
            {
              resaleProperties?.map((property,index) => (
                <div key={index}>
                  <p>Address: {property.address}</p>
                  <p>City: {property.city}</p>
                  <p>State: {property.state}</p>
                  <p>Price: {property.price}</p>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}


