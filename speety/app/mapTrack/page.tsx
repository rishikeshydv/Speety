"use client";
import React from "react";
import { useEffect } from "react";
import "ol/ol.css"; // Import OpenLayers styles
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Locator} from "@/services/location/currentLocation";

export default function Location() {
  Locator()
  .then((res)=>{
    const [_latt,_long] = res;
    console.log("Coordinates Received")
  const baseMapLayer = new TileLayer({
    source: new OSM(),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 16],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "public/logo.png", 
    }),
  });

  // Adding a marker on the map
  const marker = new Feature({
    geometry: new Point(fromLonLat([_long, _latt])),
    //geometry: new Point(fromLonLat([29.3949, 85.124])),
  });
  marker.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [marker],
  });

  const markerVectorLayer = new VectorLayer({
    source: vectorSource,
  });

  function componentRetrieve() {
    const map = new Map({
      target: "map", // specifying the HTML element ID where the map will be rendered
      layers: [baseMapLayer],
      view: new View({
        center: [_long, _latt], //initial longitude and latitude
        //center: [28.3949, 84.124],
        zoom: 2, //how much can we zoom
      }),
    });
    // Add style to Vector layer style map
    map.addLayer(markerVectorLayer);
  }

  useEffect(() => {
    componentRetrieve(); // Initialize the map after the component is mounted
  }, []); // Empty dependency array to run the effect only once

  
  
  // })
  return (
    <div>
      <div id="map" className="flex h-screen">
        <h1 className="text-4xl"> Location Tracker</h1>
      </div>
    </div>
  );
}

