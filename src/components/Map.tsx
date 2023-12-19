"use client";
import React, { useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import "leaflet-defaulticon-compatibility";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import Header from "./Header";
export default function Map() {
  //scrollWheelZoom={false}

  const [rectangleBounds, setRectangleBounds] = useState(L.latLngBounds(L.latLng(0, 0), L.latLng(0, 0)));

  const [mapCenter, setMapCenter] = useState({ lat: -12.991341, lng: -38.516513 });

  // const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [mapZoom, setMapZoom] = useState(13);
  return (
    <div className="container border-4 mx-auto">
      <div className="mx-auto">
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={mapCenter} icon={new Icon({ iconRetinaUrl: MarkerIcon.src, iconUrl: MarkerIcon.src, shadowUrl: require("leaflet/dist/images/marker-shadow.png") })}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

//icon={new Icon({ iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"), iconUrl: require("leaflet/dist/images/marker-icon.png"), shadowUrl: require("leaflet/dist/images/marker-shadow.png") })}

//icon={new L.Icon({ iconUrl: MarkerIcon.src, iconRetinaUrl: MarkerIcon.src, iconSize: [25, 41], popupAnchor: [0, -41], shadowUrl: MarkerShadow.src, shadowSize: [41, 41] })}
