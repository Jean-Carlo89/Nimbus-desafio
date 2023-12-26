"use client";
import { Circle, Marker, Rectangle} from "@/app/map/layout";
import { useGlobalContext } from "@/context/initialGeoCode";
import { useAddCircle } from "@/hooks/circles/useAddCircle";
import { useAddMarker } from "@/hooks/markers/useAddMarker";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircleProps } from "../../Map";
import { generateRectangle } from "@/helpers/generateRectangle";
import { MockApi } from "@/mocks/mock-api";


type AreasForm =
{ lat_sup: number, lat_inf:number, long_left:number, long_right:number, description: "",}


type EditRectanglesHeaderProps = {
id:string
form :AreasForm,
setForm: Dispatch<SetStateAction<AreasForm>>;
setRectangles:  Dispatch<SetStateAction<Rectangle[]>>
}



export default function EditCirclesHeader({id, form,setForm,setRectangles}: EditRectanglesHeaderProps) {



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

    const lat_inf = parseFloat(form?.lat_inf);
    const lat_sup = parseFloat(form?.lat_sup);
    const long_left = parseFloat(form?.long_left);
    const long_right = parseFloat(form?.long_right);
    const description = form?.description;




    const invalidValues = [];

    if (isNaN(lat_inf)) {
      invalidValues.push("Latitude Inferior");
    }
    if (isNaN(lat_sup)) {
      invalidValues.push("Latitude Superior");
    }
  

    if (isNaN(long_left)) {
      invalidValues.push("Longitude Esquerda");
    }   

    if (isNaN(long_right)) {
      invalidValues.push("Longitude Direita");
    }

    if (invalidValues.length > 0) {
     
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return; 
    }

  
if (form?.lat_inf !== null && form?.long_left !== null  && form?.long_right !== null  && form?.lat_sup !== null) {

 
// {
//     "id": "772b6bce-7ddd-4da7-9fff-b58616cc00a8",
//     "bounds": {
//       "lat": {
//         "sup": -12.998369098679731,
//         "inf": -12.959895674690555
//       },
//       "lng": {
//         "left": -38.542236870433136,
//         "right": -38.47153733199316
//       }
//     },
//     "description": "",
//     "is_active": true
//   }



const rectangle:Rectangle ={
  id: id,
  bounds: {
    lat: {
      sup: lat_sup,
      inf: lat_inf
    },
    lng: {
      left: long_left,
      right: long_right
    }
  },
  description: description,
  is_active: true
}



 

try {



await MockApi.Rectangles.patch(id, rectangle)


setRectangles(prevRectangles => {
      return prevRectangles.map(marker => 
        marker.id === id ? { ...marker, ...rectangle } : marker
      );
    });




} catch (error) {
  console.log(error)
alert("Houve um erro ao atualizar o circulo")
}





  }else{
alert("Por favor verifique os valores colocados"
)
}

  }

  return (
    <>
      <div className=" border-4 ">
        <h1 className=" text-2xl mb-[15px]">Editar Área</h1>
      <form onSubmit={handleSubmit}>
          <div className="flex w-min-[600px] w-[750px] flex-wrap justify-between border-4">
            <div className=" flex my-[10px]" >
              <h2 className="pr-[15px]">Descrição:</h2>
              <input onChange={onChange} value={form?.description || ""} className="w-[100px] rounded border-black border-2" id="description" placeholder={"descrição..."}></input>
            </div>{" "}


            <div className=" flex my-[10px]">
              <h2 className="pr-[15px]">Latitude Superior:</h2>
              <input onChange={onChange} value={form?.lat_sup || ""} className="w-[100px] rounded border-black border-2" id="lat_sup" placeholder={"latitude..."}></input>
            </div>

            <div className=" flex my-[10px]">
              <h2 className="pr-[15px]">Longitude Esquerda:</h2>
              <input onChange={onChange} value={form?.long_left || ""} className="w-[100px] rounded border-black border-2" id="long_left" placeholder={"descrição..."}></input>
            </div>{" "}

            <div className=" flex my-[10px]">
              <h2 className="pr-[15px]">Latitude Inferior:</h2>
              <input onChange={onChange} value={form?.lat_inf || ""} className="w-[100px] rounded border-black border-2" id="lat_inf" placeholder={"latitude..."}></input>
            </div>


            <div className=" flex my-[10px]">
              <h2 className="pr-[15px]">Longitude Direita:</h2>
              <input onChange={onChange} value={form?.long_right || ""} className="w-[100px] rounded border-black border-2" id="long_right" placeholder={"Longitude..."}></input>
            </div>{" "}








            <button className=" bg-[#104E8B] h-[30px] text-white rounded w-[60px] align-items my-auto flex justify-center ml-5">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}
