"use client"
import { Marker } from "@/app/map/layout";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";


export async function useAddMarker(props:Marker, setMarkers:  Dispatch<SetStateAction<Marker[]>>){


 const marker_value : Marker = {
    id: `${props.geoCode.lat + 1}`,
    geoCode: { lat: props.geoCode.lat, lng: props.geoCode.lng },
    popUp: props.popUp || "",
is_active: true

  }

 try {
          const result = await axios.post("http://localhost:3001/markers", marker_value);

console.log(result.data)

          if (result.status === 201) {
            setMarkers((prevValue) => [
              ...prevValue,
             marker_value
            ]);
          }
        } catch (error) {
          console.log(error);
        }
}