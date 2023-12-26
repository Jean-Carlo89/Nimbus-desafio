"use client";
import { Marker } from "@/app/map/layout";
import { useGlobalContext } from "@/context/initialGeoCode";
import { generateMarker } from "@/helpers/generateMarkers";
import {useAddMarker} from "@/hooks/markers/useAddMarker";

import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


type MarkersHeaderProps = {
form: { lat: number, long: number , description: string },
setForm: Dispatch<SetStateAction<{ lat: number, long: number , description: string }>>,
setMarkers : Dispatch<SetStateAction<Marker[]>>;
edit?: boolean
updateMarker: ()=> any


}

export default function MarkersHeader({setMarkers,edit=false, form,setForm , updateMarker}:MarkersHeaderProps) {



const addMarker = useAddMarker()



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //*** form is transforming to string */

    const lat = parseFloat(form.lat);
    const long = parseFloat(form.long);
    const description = form.description;

   
    const invalidValues = [];

    if (isNaN(lat)) {
      invalidValues.push("Latitude");
    }

    if (isNaN(long)) {
      invalidValues.push("Longitude");
    }

    if (invalidValues.length > 0) {
     
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return;
    }

if (form.lat !== null && form.long !== null) {

const initial_marker  : Marker = {
  id: form.lat + 1,
  geoCode: {
    lat: lat,
    lng: long
  },
  popUp: description || "",
is_active:true
}

const marker = generateMarker(initial_marker)

if(edit){

await updateMarker()

}else{
// await useAddMarker(marker, setMarkers)
await addMarker(marker,setMarkers)
}



  }else{
alert("Latitude ou Longitude recebram valores nulos. Por favor verifique os valores colocados"
)
}

  }

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }

  return (

    <>
      <div className=" border-4 ">
        <h1 className=" text-2xl mb-[15px]">{ edit ? "Editar Ponto" :"Novo Ponto"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex w-min-[600px] w-[750px] justify-between border-4">
            <div className=" flex">
              <h2 className="pr-[15px]">Descrição:</h2>
              <input onChange={onChange} value={form?.description} className="w-[100px] rounded border-black border-2" id="description" placeholder={"descrição..."}></input>
            </div>{" "}
            <div className=" flex">
              <h2 className="pr-[15px]">Latitude:</h2>
              <input onChange={onChange} value={form?.lat} className="w-[100px] rounded border-black border-2" id="lat" placeholder={"latitude..."}></input>
            </div>
            <div className=" flex">
              <h2 className="pr-[15px]">Longitude:</h2>
              <input onChange={onChange} value={form?.long} className="w-[100px] rounded border-black border-2" id="long" placeholder={"Longitude..."}></input>
            </div>{" "}
            <button className=" bg-[#104E8B]  text-white rounded w-[60px] flex justify-center ml-5">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}
