    //this page has all the analytics
"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Analytics() {
    //this is the GET request sent to the Scail Analytics Backend to get the places nearby
    //the UI should be like tabs, upon clicking different radio buttons
    const categories= ["restaurants", "parks", "gyms", "museums", "shopping_malls", "night_clubs", "hotels", "universities", "schools", "hospitals", "pharmacies", "bus_stops", "train_stations", "airports", "banks"]
    const [restaurants, setRestaurants] = useState<any>();
    
    async function getRestaurants() {
        const response = await axios.get(`http://127.0.0.1:8080/api/v1/geospatial/37.7937/-122.3965/${categories}`)
        setRestaurants(response.data)
    }

    console.log(restaurants)

  return (
    <div>
        <button onClick={getRestaurants}>
            Click Me
        </button>
    </div>
  )
}
