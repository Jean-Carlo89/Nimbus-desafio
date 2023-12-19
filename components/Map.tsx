"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

export default function Map() {
  //scrollWheelZoom={false}
  return (
    <div>
      <MapContainer className="h-[100vh] w-[100vw]" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]} icon={new Icon({ iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"), iconUrl: require("leaflet/dist/images/marker-icon.png"), shadowUrl: require("leaflet/dist/images/marker-shadow.png") })}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
