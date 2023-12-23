"use client";
import { useGlobalContext } from "@/context/initialGeoCode";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Marker } from "../../layout";
import MarkersHeader from "@/components/Headers/markers/MarkersHeader";
import { useMarkersContext } from "@/context/areas";

export default function PontoPage({ params }: { params: { id: string } }) {


const markers2 = [
    {
      "id": "-11.894477216124459",
      "geoCode": {
        "lat": -12.98766404830767,
        "lng": -38.507573504498964
      },
      "popUp": "jjjjj",
      "is_active": true
    },
    {
      "id": "-11.929614580987227",
      "geoCode": {
        "lat": -12.929614580987227,
        "lng": -38.50122427410508
      },
      "popUp": "gggg",
      "is_active": true
    },
    {
      "id": "-11.991176693830331",
      "geoCode": {
        "lat": -12.991176693830331,
        "lng": -38.494960844121934
      },
      "popUp": "",
      "is_active": true
    }
  ]
 


const {markers, setMarkers} = useMarkersContext()
  const [form, setForm] = useState({ lat: null, long: null, description: null });





useEffect(()=>{


fetch(`http://localhost:3001/markers/${params.id}`).then((res)=>{
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
  const response = await axios.put(`http://localhost:3001/markers/${params.id}`,body)


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
