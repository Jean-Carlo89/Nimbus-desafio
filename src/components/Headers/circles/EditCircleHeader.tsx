"use client";
import { Circle, Marker } from "@/app/map/layout";
import { useGlobalContext } from "@/context/initialGeoCode";
import { useAddCircle } from "@/hooks/circles/useAddCircle";
import { useAddMarker } from "@/hooks/markers/useAddMarker";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircleProps } from "../../Map";
import { MockApi } from "@/mocks/mock-api";

type CircleForm = {lat:number, long:number, radius:number , description:string}

type EditCirclesHeaderProps = {
id:string
form :CircleForm,
setForm: Dispatch<SetStateAction<CircleForm>>;
setCircles:  Dispatch<SetStateAction<Circle[]>>
}


export default function EditCirclesHeader({id, form,setForm,setCircles}: EditCirclesHeaderProps) {



  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //*** form is transforming to string */

    const lat = parseFloat(form?.lat);
    const long = parseFloat(form?.long);
    const description = form?.description;
const radius = parseFloat(form?.radius)

   


    const invalidValues = [];

    if (isNaN(lat)) {
      invalidValues.push("Latitude");
    }
 if (isNaN(radius)) {
      invalidValues.push("Raio");
    }

    if (isNaN(long)) {
      invalidValues.push("Longitude");
    }

    if (invalidValues.length > 0) {
     
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return; 
    }

  
if (form?.lat !== null && form?.long !== null && form?.radius !==null) {

 


const circle:Circle ={
  center: [lat, long],
  radius:radius,
  description: description,
  id: id,
is_active:true

}


try {
  



await MockApi.Circles.patch(id,circle)

setCircles(prevCircles => {
      return prevCircles.map(marker => 
        marker.id === id ? { ...marker, ...circle } : marker
      );
    });




} catch (error) {
  console.log(error)
alert("Houve um erro ao atualizar o circulo")
}


  }else{
alert("Latitude, Longitude ou raio recebram valores nulos. Por favor verifique os valores colocados"
)
}

  }

  return (
    <>
      <div className=" border-4 ">
        <h1 className=" text-2xl mb-[15px]">Editar Perímetro</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex w-min-[600px] w-[750px] justify-between  border-4">
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

 <div className=" flex">
              <h2 className="pr-[15px]">Raio:</h2>
              <input onChange={onChange} value={form?.radius} className="w-[100px] rounded border-black border-2" id="radius" placeholder={"Raio..."}></input>
            </div>{" "}
            <button className=" bg-[#104E8B]  text-white rounded w-[60px] flex justify-center ml-5">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}
