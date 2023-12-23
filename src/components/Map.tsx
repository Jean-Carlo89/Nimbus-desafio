"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents, useMap, FeatureGroup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import "leaflet-defaulticon-compatibility";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useGlobalContext } from "@/context/initialGeoCode";
import { Circle as appCircle, Marker as appMarker } from "@/app/map/layout";
import axios from "axios";
import { useAddMarker } from "@/hooks/markers/useAddMarker";
import "leaflet-draw/dist/leaflet.draw.css"
import {EditControl} from "react-leaflet-draw"
import { useAddCircle } from "@/hooks/circles/useAddCircle";

type MapProps = {
  markers: appMarker[];
  setMarkers: Dispatch<SetStateAction<appMarker[]>>;
 circles: appCircle[];
  setCircles: Dispatch<SetStateAction<appCircle[]>>;
};


export type CircleProps = {
id:any
center : [number,number],
radius:number
description:string
is_active:boolean
}

export default function Map({ markers: mapData, setMarkers: setMapData, circles, setCircles }: MapProps) {
  

  useEffect(() => {
    const storedGeoCode = localStorage.getItem("initialGeoCode");
    if (storedGeoCode) {
      const { lat, long, zoom } = JSON.parse(storedGeoCode);
      setInitialGeoCode({ lat, long, zoom });
    }
  }, []);


  const { initialGeoCode, setInitialGeoCode } = useGlobalContext();
 
const onCreate = (e:any ) =>{
console.log("create")
console.log(e)
var layer = e.layer;

console.log("layer")
console.log(e.layer)

  
    // if (e.layerType === 'rectangle') {
    //      layer.setStyle({
    //         color: 'blue',      // Cor da linha
    //         weight: 4,          // Espessura da linha
    //         dashArray: '10, 5', // Padrão da linha pontilhada
    //         opacity: 1          // Opacidade da linha
    //     });
    // }




   if (e.layerType === 'circle') {

console.log(e)
const circle:CircleProps ={
  center: [e.layer._latlng.lat, e.layer._latlng.lng],
  radius: e.layer._mRadius,
  description: "",
  id: e.layer._latlng.lat + 1,
is_active:true

}
useAddCircle(circle, setCircles)
}
}

// const onEdit = (e: any) =>{
// console.log("edit")
// console.log(e)
// }

// const onDelete = (e: any) =>{
// console.log("deletee")
// console.log(e)
// }

  const [mapZoom, setMapZoom] = useState(13);
  return (
    <div className="container border-4 mx-auto">
      <div className="mx-auto ">
        <MapContainer center={[initialGeoCode?.lat, initialGeoCode?.long]} zoom={initialGeoCode?.zoom} scrollWheelZoom={true} >

<FeatureGroup> <EditControl position="topright" onCreated={(e)=>onCreate(e)} onEdited={(e)=>onEdit(e) } onDeleted={(e)=>onDelete(e)} draw={{rectangle:{shapeOptions: {
			stroke:true,
			color: 'black',
			weight: 4,
			opacity: 0.5,
			fill: false,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			showArea: true,
dashArray : '10, 5' ,
			clickable: true
		}}, polyline:false, circle:true,}



} /> </FeatureGroup>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Markers />
<Circles/>
{/* <Rectangles/> */}

          <RecenterAutomatically lat={initialGeoCode?.lat} lng={initialGeoCode?.long} zoom={initialGeoCode?.zoom} />
        </MapContainer>
      </div>
    </div>
  );
function Circles(){


return circles.map((circle)=>{
return <Circle  center={circle.center} radius={circle.radius} opacity={1} fillOpacity={0.02} > <Popup > {circle.description || "Sem descrição no momento"}</Popup></Circle>
})



}



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
