"use client";
import { useGlobalContext } from "@/context/initialGeoCode";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Marker } from "../../layout";

export default function PontoPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ lat: null, long: null, description: null });

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
const response = await axios.put(`http://localhost:3001/markers/${params.id}`,body)

console.log(response)

}

console.log( {params})

useEffect(()=>{


fetch(`http://localhost:3001/markers/${params.id}`).then((res)=>{
res.json().then((res)=>{
console.log(res)
setForm({lat:res.geoCode.lat, long:res.geoCode.lng, description:res.popUp})
})
}).catch((e)=>{
console.log(e)
})
},[])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //*** form is transforming to string */

    const lat = parseFloat(form.lat);
    const long = parseFloat(form.long);
    const description = form.description;

    console.log({ lat, long, description });
    const invalidValues = [];

    if (isNaN(lat)) {
      invalidValues.push("Latitude");
    }

    if (isNaN(long)) {
      invalidValues.push("Longitude");
    }

    if (invalidValues.length > 0) {
      // Some input values are not valid numbers
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return; // Exit the function without updating the state
    }

    await updateMarker()
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
      <div className="border-red-400 border-4 ">
        <h1 className=" text-2xl mb-[15px]">Editar Ponto</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex w-min-[600px] w-[750px] justify-between border-green-500 border-4">
            <div className=" flex">
              <h2 className="pr-[15px]">Descrição:</h2>
              <input onChange={onChange} value={form.description} className="w-[100px] rounded border-black border-2" id="description" placeholder={"descrição..."}></input>
            </div>{" "}
            <div className=" flex">
              <h2 className="pr-[15px]">Latitude:</h2>
              <input onChange={onChange} value={form.lat} className="w-[100px] rounded border-black border-2" id="lat" placeholder={"latitude..."}></input>
            </div>
            <div className=" flex">
              <h2 className="pr-[15px]">Longitude:</h2>
              <input onChange={onChange} value={form.long} className="w-[100px] rounded border-black border-2" id="long" placeholder={"Longitude..."}></input>
            </div>{" "}
            <button className=" bg-[#104E8B]  text-white rounded w-[60px] flex justify-center ml-5">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}
