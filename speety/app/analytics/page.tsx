    //this page has all the analytics
"use client"
import axios from 'axios'
import { set } from 'date-fns';
import { METHODS } from 'http';
import React, { useEffect, useState } from 'react'

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

  interface CrimeInfo {
    city: string;
    state: string;
    total_population: string;
    crime_rate: string;           //this is not a percentage, it is the number of crimes per 100000 people per year
  }
export default function Analytics() {
    //EACH PROPERTY WHILE BEING PUSHED TO THE DATABASE SHOULD GO UNDER VOLATALITY CHECK
    const [category, setCategory] = useState('street')
    const [street, setStreet] = useState('')
    const [county, setCounty] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    

    const [trendAnalysis, setTrendAnalysis] = useState<string>("");
    const [similarProperties, setSimilarProperties] = useState<any>();
    const [volatileProperties, setVolatileProperties] = useState<any>();
    console.log(volatileProperties, similarProperties, trendAnalysis)

    const [demographics, setDemographics] = useState<DemographyType>();
    const [crimeInfo, setCrimeInfo] = useState<CrimeInfo>();
    async function getStreetTrend(){
        const res = await axios.post('http://127.0.0.1:8080/api/v1/price-trend/street', {
            street: street,
            county: county,
            city: city,
            state: state
        })
        if (typeof(res.data.message) === 'string'){
            alert(res.data.message)
         }
        setVolatileProperties(res.data.message[0])
        setSimilarProperties(res.data.message[1])
        setTrendAnalysis(res.data.message[2])
    }

    async function getCountyTrend(){
        const res = await axios.post('http://127.0.0.1:8080/api/v1/price-trend/county', {
            county: county,
            city: city,
            state: state
        })
        if (typeof(res.data.message) === 'string'){
            alert(res.data.message)
         }
        setVolatileProperties(res.data.message[0])
        setSimilarProperties(res.data.message[1])
        setTrendAnalysis(res.data.message[2])
    }

    async function getCityTrend(){
        const res = await axios.post('http://127.0.0.1:8080/api/v1/price-trend/city', {
            city: city,
            state: state
        })
        if (typeof(res.data.message) === 'string'){
           alert(res.data.message)
        }
        setVolatileProperties(res.data.message[0])
        setSimilarProperties(res.data.message[1])
        setTrendAnalysis(res.data.message[2])
    }

    async function getStateTrend(){
        const res = await axios.post('http://127.0.0.1:8080/api/v1/price-trend/state', {
            state: state
        })
        if (typeof(res.data.message) === 'string'){
           alert(res.data.message)
        }
        setVolatileProperties(res.data.message[0])
        setSimilarProperties(res.data.message[1])
        setTrendAnalysis(res.data.message[2])
    }

      // we check the crime info of the property
async function getCrimeInfo() {
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

  // we get the demographics of the property
  async function getDemographics() {
    const requestData = {
      city: city,
      state: state,
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/demography', requestData);
    console.log(res.data.demography);
    setDemographics(res.data.demography);
  }
  return (
    <div>
        <div>
        <h1>Analysis by Category</h1>
        <select id="renovation-type" name="renovation-type" onChange={(e)=>setCategory(e.target.value)}>
            <option value="street">Street</option>
            <option value="county">County</option>
            <option value="city">City</option>
            <option value="state">State</option>
        </select>
        </div>

        <div>
        {
            category === 'street' ? <div>
                <p>Make sure the Street is just the street name without the block number. For example: 123 Main St should just be Main St</p>
               <input type="text" placeholder='enter street' onChange={(e)=>setStreet(e.target.value)}/>
               <input type="text" placeholder='enter county'onChange={(e)=>setCounty(e.target.value)}/>
                <input type="text" placeholder='enter city' onChange={(e)=>setCity(e.target.value)}/>
                <input type="text" placeholder='enter state' onChange={(e)=>setState(e.target.value)}/>
                <button className='bg-blue-300 p-3' onClick={getStreetTrend}>Submit</button>
            </div> : category === 'county' ? <div>
                <input type="text" placeholder='enter county'onChange={(e)=>setCounty(e.target.value)}/>
                <input type="text" placeholder='enter city' onChange={(e)=>setCity(e.target.value)}/>
                <input type="text" placeholder='enter state' onChange={(e)=>setState(e.target.value)}/>
                <button className='bg-blue-300 p-3' onClick={getCountyTrend}>Submit</button>
            </div> : category === 'city' ? <div>
                <input type="text" placeholder='enter city' onChange={(e)=>setCity(e.target.value)}/>
                <input type="text" placeholder='enter state' onChange={(e)=>setState(e.target.value)}/>
                <button className='bg-blue-300 p-3' onClick={getCityTrend}>Submit</button>
            </div> : category === 'state' ? <div>
                <input type="text" placeholder='enter state' onChange={(e)=>setState(e.target.value)}/>
                <button className='bg-blue-300 p-3' onClick={getStateTrend}>Submit</button>
            </div> : null
        }
        </div>

                {/* If city and state exists, we have the get crime button */}
                {
                    city && state ? <div>
                        <div>
                        <button className='bg-green-300 p-3' onClick={getCrimeInfo}>Get Crime Info</button>  
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
                        <button className='bg-green-300 p-3' onClick={getDemographics}>Get Demographics</button>
                        <h1>city: {crimeInfo?.city}</h1>
                        <h1>state: {crimeInfo?.state}</h1>
                        <h1>total_population: {crimeInfo?.total_population}</h1>
                        <h1>crime_rate: {crimeInfo?.crime_rate}</h1>
                        </div>
                        
                    </div> : null   
                }


        <div>
            <h1>Analysis</h1>
            <p>{trendAnalysis}</p>
        </div>

        <div>
            <h1>Similar Properties</h1>
            {/* There properties should be passed through a good looking UI prop or you can use the UI Prop already made at speety/services/property/PropertyProp.tsx */}
            <p>{
                similarProperties ? Object.keys(similarProperties).map((key:any, index:number)=>{
                    return <div key={index}>
                        <p>{similarProperties[key].street}, {similarProperties[key].city}, {similarProperties[key].state}</p>
                        <p>{similarProperties[key].price}</p>
                    </div>
}): null
                }
            </p>
        </div>

        <div>
            <h1>Volatility</h1>
            <p>{
                volatileProperties ? Object.keys(volatileProperties).map((key:any, index:number)=>{
                    return <div key={index}>
                        <p>{volatileProperties[key].street}, {volatileProperties[key].city}, {volatileProperties[key].state}</p>
                        <p>{volatileProperties[key].price}</p>
                    </div>
}
): null
                }
            </p>
        </div>

    </div>
  )
}
