"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents, useMap, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import "leaflet-defaulticon-compatibility";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useGlobalContext } from "@/context/initialGeoCode";
import { Marker as appMarker } from "@/app/map/layout";
import axios from "axios";
import { useAddMarker } from "@/hooks/useAddMarker";
import "leaflet-draw/dist/leaflet.draw.css"
import {EditControl} from "react-leaflet-draw"

type MapProps = {
  mapData: appMarker[];
  setMapData: Dispatch<SetStateAction<appMarker[]>>;
};

export default function Map({ mapData, setMapData }: MapProps) {
  

  useEffect(() => {
    const storedGeoCode = localStorage.getItem("initialGeoCode");
    if (storedGeoCode) {
      const { lat, long, zoom } = JSON.parse(storedGeoCode);
      setInitialGeoCode({ lat, long, zoom });
    }
  }, []);

  const [rectangleBounds, setRectangleBounds] = useState(L.latLngBounds(L.latLng(0, 0), L.latLng(0, 0)));

  const { initialGeoCode, setInitialGeoCode } = useGlobalContext();

  const [mapCenter, setMapCenter] = useState({ lat: -12.991341, lng: -38.516513 });

  // const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });



const onCreate = (e: any) =>{
console.log("create")
console.log(e)
var layer = e.layer;

    // Defina o estilo pontilhado aqui
    // if (e.layerType === 'rectangle') {
    //      layer.setStyle({
    //         color: 'blue',      // Cor da linha
    //         weight: 4,          // Espessura da linha
    //         dashArray: '10, 5', // Padrão da linha pontilhada
    //         opacity: 1          // Opacidade da linha
    //     });
    // }
}

const onEdit = (e: any) =>{
console.log("edit")
console.log(e)
}

const onDelete = (e: any) =>{
console.log("deletee")
console.log(e)
}

  const [mapZoom, setMapZoom] = useState(13);
  return (
    <div className="container border-4 mx-auto">
      <div className="mx-auto ">
        <MapContainer center={[initialGeoCode.lat, initialGeoCode.long]} zoom={initialGeoCode.zoom} scrollWheelZoom={true}>

<FeatureGroup> <EditControl position="topright" onCreated={(e)=>onCreate(e)} onEdited={(e)=>onEdit(e) } onDeleted={(e)=>onDelete(e)} draw={{rectangle:{shapeOptions: {
			stroke:true,
			color: '#FF0000',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			showArea: true,
dashArray : '10, 5' ,
			clickable: true
		}}, polyline:false, circle:false,}} /> </FeatureGroup>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Markers />
{/* <Rectangles/> */}

          <RecenterAutomatically lat={initialGeoCode.lat} lng={initialGeoCode.long} zoom={initialGeoCode.zoom} />
        </MapContainer>
      </div>
    </div>
  );

  function Markers() {
    const map = useMapEvents({
      async click(e) {
        console.log(e);

        console.log({ mapData: mapData });

const marker : appMarker = {
  id: e.latlng.lat + 1,
  geoCode: {
    lat: e.latlng.lat,
    lng: e.latlng.lng
  },
  popUp: "",
  is_active: true
}

await useAddMarker(marker, setMapData)

        
      },
    });

    return (
      <>
        {mapData.map((marker, i) => {

if(marker.is_active){
  return (
            <div key={i}>
              <Marker position={marker.geoCode} icon={new Icon({ iconRetinaUrl: MarkerIcon.src, iconUrl: MarkerIcon.src, shadowUrl: require("leaflet/dist/images/marker-shadow.png"), popupAnchor: [0, -41], iconAnchor: [16, 48] })}>
                <Popup>{marker.popUp || "No description"}</Popup>
              </Marker>{" "}
            </div>
          );
}
        
        })}
        
      </>
    );
  }

 function Rectangles() {
    const map = useMapEvents({
      async dragend(e) {
console.log("Dragging")
        console.log(e);

        console.log({ mapData: mapData });



        
      },
    });

    return (
      <>
        {mapData.map((marker, i) => {

if(marker.is_active){
  return (
            <div key={i}>
              <Marker position={marker.geoCode} icon={new Icon({ iconRetinaUrl: MarkerIcon.src, iconUrl: MarkerIcon.src, shadowUrl: require("leaflet/dist/images/marker-shadow.png"), popupAnchor: [0, -41], iconAnchor: [16, 48] })}>
                <Popup>{marker.popUp || "No description"}</Popup>
              </Marker>{" "}
            </div>
          );
}
        
        })}
        
      </>
    );
  }
}

export const RecenterAutomatically = ({ lat, lng, zoom } : {lat:number, lng:number, zoom:number}) => {
  const map = useMap();

  useEffect(() => {
    // Check if any of the parameters is null
    if (lat === null || lng === null || zoom === null) {
      console.log("One or more parameters is null, using previous values");
      return; // Do not update the map if any parameter is null
    }

    console.log("Recentering map to:", lat, lng, zoom);
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom]);

  return null;
};

// const fake_markers = [
//   {
//     geoCode: { lat: -12.99314730803216, lng: -38.514737784862525 },
//     popUp: "Test House1",
//   },

//   {
//     geoCode: { lat: -12.991945078416206, lng: -38.51488262414933 },
//     popUp: "Test H 2",
//   },

//   {
//     geoCode: { lat: -12.992765731436737, lng: -38.51791352033615 },
//     popUp: "Test Ho 3",
//   },

//   {
//     geoCode: { lat: -12.993204805824472, lng: -38.51486116647721 },
//     popUp: "Test Ho 4",
//   },
//];
