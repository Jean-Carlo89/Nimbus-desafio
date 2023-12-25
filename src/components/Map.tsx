"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import L, { featureGroup } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents, useMap, FeatureGroup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import "leaflet-defaulticon-compatibility";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useGlobalContext } from "@/context/initialGeoCode";
import {  Rectangle as appRectangle, Circle as appCircle, Marker as appMarker } from "@/app/map/layout";
import axios from "axios";
import { useAddMarker } from "@/hooks/markers/useAddMarker";
import "leaflet-draw/dist/leaflet.draw.css"
import {EditControl} from "react-leaflet-draw"
import { useAddCircle } from "@/hooks/circles/useAddCircle";
import { generateMarker } from "@/helpers/generateMarkers";
import { generateCircle as generateCircle } from "@/helpers/generateCircle";
import { useAddRectangle } from "@/hooks/rectangles/useAddRectangles";
import { generateRectangle } from "@/helpers/generateRectangle";

type MapProps = {
  markers: appMarker[];
  setMarkers: Dispatch<SetStateAction<appMarker[]>>;
  circles: appCircle[];
  setCircles: Dispatch<SetStateAction<appCircle[]>>;
  rectangles: appRectangle[]
  setRectangles: Dispatch<SetStateAction<appRectangle[]>>;
};


export type CircleProps = {
id:any
center : [number,number],
radius:number
description:string
is_active:boolean
}



export type RectanglesProps = {
id:any,
bounds : {lat :{sup:number, inf:number}, lng : {left:number, right:number}} 
description:string
is_active: boolean
}

export default function Map({ markers: mapData, setMarkers: setMapData, circles, setCircles , rectangles,setRectangles }: MapProps) {
  

  useEffect(() => {
    const storedGeoCode = localStorage.getItem("initialGeoCode");
    if (storedGeoCode) {
      const { lat, long, zoom } = JSON.parse(storedGeoCode);
      setInitialGeoCode({ lat, long, zoom });
    }
  }, []);


  const { initialGeoCode, setInitialGeoCode } = useGlobalContext();
 
const onCreate = (e:any ) =>{





   if (e.layerType === 'circle') {


const initial_circle:CircleProps ={
  center: [e.layer._latlng.lat, e.layer._latlng.lng],
  radius: e.layer._mRadius,
  description: "",
  id: e.layer._latlng.lat + 1,
is_active:true


}
const circle = generateCircle(initial_circle)

 e.layer.setStyle({
        //color: "red",
fill:false,
        stroke: false
    });



useAddCircle(circle, setCircles)
}

  
 if (e.layerType === 'rectangle') {


  

 e.layer.setStyle({
        //color: "red",
fill:false,
        stroke: false
    });


    const createdLatLngs = e.layer._latlngs




// createdLatLngs[0][0].lat = latitude superior,
// createdLatLngs[0][2].lat = latitude inferior
//createdLatLngs[0][0].lng = longitude esquerda
//createdLatLngs[0][2].lng = longitude direita

const initial_rectangle:RectanglesProps ={
  id: "",
  bounds: {
    lat: {
      sup: createdLatLngs[0][0].lat,
      inf: createdLatLngs[0][2].lat
    },
    lng: {
      left: createdLatLngs[0][0].lng,
      right: createdLatLngs[0][2].lng,
    }
  },
  description: "",
  is_active: true
}


   

 const rectangle = generateRectangle(initial_rectangle)



  useAddRectangle(rectangle,setRectangles) 
  }
}






 
  return (
    <div className="container border-4 mx-auto">
      <div className="mx-auto ">
        <MapContainer center={[initialGeoCode?.lat, initialGeoCode?.long]} zoom={initialGeoCode?.zoom} scrollWheelZoom={true} >



<FeatureGroup > <EditControl edit={{
    remove: false,
    edit: false
  }} position="topright" onCreated={(e)=>onCreate(e)} onEdited={(e)=>onEdit(e) } onDeleted={(e)=>onDelete(e)} draw={  




{


rectangle:{shapeOptions: {
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
		}} ,marker: false,polygon:false, circlemarker:false,polyline:false, circle:{shapeOptions: {
			stroke:true,
			color: 'black',

		}},}



} /> </FeatureGroup>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Markers />
            <Circles/>
            <Rectangles/>
          <RecenterAutomatically lat={initialGeoCode?.lat} lng={initialGeoCode?.long} zoom={initialGeoCode?.zoom} />
        </MapContainer>
      </div>
    </div>
  );
function Circles(){



return circles.map((circle,index)=>{

  if(circle.is_active){
    return <Circle key={circle.id || index } center={circle.center} radius={circle.radius} opacity={1} fillOpacity={0.02} > <Popup > {circle.description || "Sem descrição no momento"}</Popup></Circle>
  }

})

}



function Rectangles(){






return rectangles.map((rectangle,index)=>{

// rec[0].lat = ltitue superior,
// rec[2].lat = latitude inferior
//rec[0].lng = longitude esquerda
//rec[2].lng = longitude direita

  const bounds: [number, number][] = [
    // [rec[0].lat, rec[0].lng],
    // [rec[2].lat, rec[2].lng]

 [rectangle.bounds.lat.sup, rectangle.bounds.lng.left],
    [rectangle.bounds.lat.inf, rectangle.bounds.lng.right ]
  
  ]

  if(rectangle.is_active){
    return <Rectangle key={rectangle.id || index } bounds={bounds} color="#444141"  opacity={0.5} stroke={true} fill={false} weight={4} dashArray={'10, 5'} > <Popup > { "Sem descrição no momento para o retangulo"}</Popup></Rectangle>
    }



})



}



  function Markers() {
    const map = useMapEvents({
      async click(e) {
       

const initial_marker : appMarker = {
  id: e.latlng.lat + 1,
  geoCode: {
    lat: e.latlng.lat,
    lng: e.latlng.lng
  },
  popUp: "",
  is_active: true
}

const marker = generateMarker(initial_marker)
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

