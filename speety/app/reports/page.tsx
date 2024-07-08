"use client"
import { getReports } from '@/queries/Reports/getReports'
import React, { useState } from 'react'

interface Report {
  street: string;
  apartment: string;
  city: string;
  county: string;
  state: string;
  country: string;
  pdf: string;
}
export default function ReportsID() {
  //follow the pattern of https://njpropertyrecords.com/property/0703_54_13
  const [reports, setReports] = useState<Report[]>([]);
  const [street, setStreet] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  console.log(reports)
  console.log(street, apartment, city, county, state, country)
  return (
    <div>
      <label htmlFor="">Street</label>
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
      <label htmlFor="">Apt</label>
      <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} />
      <label htmlFor="">City</label>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <label htmlFor="">County</label>
      <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
      <label htmlFor="">State</label>
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <label htmlFor="">Country</label>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      <button onClick={() => getReports(street, apartment, city, county, state, country).then((reports) => {
        setReports(reports as Report[]);
      })}>Search</button>
      <div>
        {reports.map((report) => {
          return (
            <div>
              <div>{report.street}</div>
              <div>{report.apartment}</div>
              <div>{report.city}</div>
              <div>{report.county}</div>
              <div>{report.state}</div>
              <div>{report.country}</div>
              <div>Link to PDF:{report.pdf}</div>
            </div>
          )
        })}

    </div>
    </div>
  )
}
