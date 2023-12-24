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
import {  Circle as appCircle, Marker as appMarker } from "@/app/map/layout";
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

console.log({e})



   if (e.layerType === 'circle') {


const circle:CircleProps ={
  center: [e.layer._latlng.lat, e.layer._latlng.lng],
  radius: e.layer._mRadius,
  description: "",
  id: e.layer._latlng.lat + 1,
is_active:true

}
 e.layer.setStyle({
        //color: "red",
fill:false,
        stroke: false
    });

console.log(e)

useAddCircle(circle, setCircles)
}
}






  const [mapZoom, setMapZoom] = useState(13);
  return (
    <div className="container border-4 mx-auto">
      <div className="mx-auto ">
        <MapContainer center={[initialGeoCode?.lat, initialGeoCode?.long]} zoom={initialGeoCode?.zoom} scrollWheelZoom={true} >

{/* <FeatureGroup> <EditControl position="topright" onCreated={(e)=>onCreate(e)} onEdited={(e)=>onEdit(e) } onDeleted={(e)=>onDelete(e)} draw={{rectangle:{shapeOptions: {
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
		}}, polyline:false, circle:{shapeOptions: {
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
		}},}



} /> </FeatureGroup> */}

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
		}}, polyline:false, circle:{shapeOptions: {
			stroke:true,
			color: 'black',
// 			weight: 4,
// 			opacity: 0.5,
// 			fill: false,
// 			fillColor: null, //same as color by default
// 			fillOpacity: 0.2,
// 			showArea: true,
// dashArray : '10, 5' ,
// 			clickable: true
		}},}



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

// const circle: appCircle = {
//   id:
//   center: [],
//   radius: 0,
//   description: "",
//   is_active: false
// }



return circles.map((circle)=>{

if(circle.is_active){
return <Circle  center={circle.center} radius={circle.radius} opacity={1} fillOpacity={0.02} > <Popup > {circle.description || "Sem descrição no momento"}</Popup></Circle>
}

})



}



  function Markers() {
    const map = useMapEvents({
      async click(e) {
       

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

//  function Rectangles() {
//     const map = useMapEvents({
//       async dragend(e) {




        
//       },
//     });

//     return (
//       <>
//         {mapData.map((marker, i) => {

// if(marker.is_active){
//   return (
//             <div key={i}>
//               <Marker position={marker.geoCode} icon={new Icon({ iconRetinaUrl: MarkerIcon.src, iconUrl: MarkerIcon.src, shadowUrl: require("leaflet/dist/images/marker-shadow.png"), popupAnchor: [0, -41], iconAnchor: [16, 48] })}>
//                 <Popup>{marker.popUp || "No description"}</Popup>
//               </Marker>{" "}
//             </div>
//           );
// }
        
//         })}
        
//       </>
//     );
//   }
}

export const RecenterAutomatically = ({ lat, lng, zoom } : {lat:number, lng:number, zoom:number}) => {
  const map = useMap();

  useEffect(() => {
  
    if (lat === null || lng === null || zoom === null) {
     
      return; 
    }

   
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom]);

  return null;
};

