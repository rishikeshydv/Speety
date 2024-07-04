    //this page has all the analytics
"use client"
import axios from 'axios'
import { METHODS } from 'http';
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

    //EACH PROPERTY TO BE PUSHED SHOULD PASS THROUGH THE PROPERTY PRICE PREDICTION MODEL
    //EACH PROPERTY SHOULD ALSO PASS THROUGH THE COST BENEFIT ANALYSIS MODEL
    //DATABASE MUST HAVE PREDICTED PRICE AND COST BENEFIT ANALYSIS VALUES
    //EACH PROPERTY WHILE BEING PUSHED TO THE DATABASE SHOULD GO UNDER VOLATALITY CHECK
    //VOLATALITY CHECK SHOULD BE DONE BY THE VOLATALITY CHECK API/Algorithm
    //VOLATALITY SHOULD BE YES/NO if the difference between actual price and predicted price is more than 100K


    //this is the logic for finding cost benefit analysis
    //Evaluate the financial impact of property improvements and renovations
    const newProperty = {
        'bed': [4],
        'bath': [3],
        'acre_lot': [0.8],
        'street': [893593.0],
        'city': ['Newark'],
        'state': ['New Jersey'],
        'house_size': [2200],
        'zip_code': [7003],
        'price': [500000],
    }
    async function costBenefitAnalysis() {
        const getPrice = await axios.post(`http://http://127.0.0.1:8080/api/v1/predict-price`, newProperty)
        const getRenovationCost = await axios.get(`http://api/v1/renovation`)
        const priceDifference = Number(getPrice) - newProperty.price[0]   //this is gross profit
        const netProfit = priceDifference - Number(getRenovationCost)
        return netProfit
    }


  return (
    <div>
        <button onClick={getRestaurants}>
            Get Places Nearby
        </button>
        <button onClick={costBenefitAnalysis}>
            Cost Benefit Analysis
        </button>
    </div>
  )
}
