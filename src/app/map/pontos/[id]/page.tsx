"use client";
import { useGlobalContext } from "@/context/initialGeoCode";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Marker } from "../../layout";
import MarkersHeader from "@/components/Headers/markers/MarkersHeader";
import { useMarkersContext } from "@/context/areas";
import { MockApi } from "@/mocks/mock-api";

export default function PontoPage({ params }: { params: { id: string } }) {





const {markers, setMarkers} = useMarkersContext()
  const [form, setForm] = useState({ lat: 0, long: 0, description: "" });

const api = MockApi



useEffect(()=>{

//fetch(`http://localhost:3001/markers/${params.id}`)


api.Markers.getById(params.id).then((res)=>{
res.json().then((res)=>{

setForm({lat:res.geoCode.lat, long:res.geoCode.lng, description:res.popUp})

})
}).catch((e)=>{
console.log(e)
})
},[])


async function updateMarker(){

 const lat = parseFloat(form.lat);
    const long = parseFloat(form.long);

const body : Marker = {
  id: params.id,
  geoCode: {
    lat,
    lng: long
  },
  popUp: form.description || "",
 is_active:true
}
try {
 

const response = await api.Markers.patch(params.id, body)

setMarkers(prevMarkers => {
      return prevMarkers.map(marker => 
        marker.id === params.id ? { ...marker, ...body } : marker
      );
    });

} catch (error) {
  console.log(error)
alert("Houve um erro ao atualizar o ponto")
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
<MarkersHeader  form={form}  setForm={setForm} setMarkers={null as any} edit={true} updateMarker={updateMarker}/>
  
  );
}
