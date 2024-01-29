"use client";
import React from "react";
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
import {getLocation} from "@/locationTrack/currentLocation";

export default async function Location() {
  const res:any = await getLocation();
    const [_latt,_long] = res;
    console.log("Coordinates Received")

      const baseMapLayer = new TileLayer({
        source: new OSM(),
      });

      const map = new Map({
        target: "map", // specifying the HTML element ID where the map will be rendered
        layers: [baseMapLayer],
        view: new View({
          center: [_long, _latt], //initial longitude and latitude
          zoom: 15, //how much can we zoom
        }),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 16],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "image/icon.png", // Update with the correct path to your icon image
        }),
      });

      // Adding a marker on the map
      const marker = new Feature({
        geometry: new Point(fromLonLat([_long, _latt])),
      });
      marker.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const markerVectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Add style to Vector layer style map
      map.addLayer(markerVectorLayer);
  return (
    <div>
      <div id="map" className="flex h-screen">
        <h1 className="text-4xl"> Location Tracker</h1>
      </div>
    </div>
  );
}
