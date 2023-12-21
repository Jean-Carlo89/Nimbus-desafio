/* eslint-disable react/no-children-prop */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

import { FaRegTrashAlt } from "react-icons/fa";
import MenuLink from "../MenuLink";
import { Marker } from "@/app/map/layout";
import { sensitiveHeaders } from "http2";
import axios from "axios";

type BarProps = {
  children: React.ReactNode;
};

export type SideBarProps = {
  markers: Marker[];
  setMarkers: Dispatch<SetStateAction<Marker[]>>;
 setActiveHeader: Dispatch<SetStateAction<string>>;
};

const pontos = [
  {
    text: 1,
  },
  {
    text: 2,
  },
  {
    text: 3,
  },
];





export default function SideBar({ markers, setMarkers, setActiveHeader}: SideBarProps) {

async function deleteMarker(id:any){

const response = await axios.delete(`http://localhost:3001/markers/${id}`)

console.log(response)



 if (response.status === 200) {
        const updatedMarkers = markers.filter(marker => marker.id !== id);
        setMarkers(updatedMarkers);
    }
}


function toggleMarker(id:any) {
  setMarkers(prevMarkers => prevMarkers.map(marker => 
    marker.id === id ? { ...marker, is_active: !marker.is_active } : marker
  ));
}
  return (
    <div className=" w-full h-full container border-red-500 border-2 flex flex-col justify-between  bg-[#333333] ">
      <div className=" flex flex-col z-10 items-center  border-blue-500 border-4 ">
        <div className="py-[10px] block   hover:bg-orange-200 cursor-pointer justify-center h-[90%]  border-pink-500 border-4 w-[80%] mt-[20px] bg-[#D6D8DB]" onClick={()=>setActiveHeader("InitialPoints")} >
          Ponto e Zoom Iniciais
        </div>



        <div className="pb-[50px]  border-yellow-400 border-2 w-[80%] mt-[20px]">
          <div className=" mx-auto pb-[10px] border-yellow-400 border-2 w-[80%] mt-[20px] z-10" >
            <div className="mx-auto border-red-400 border-2 flex justify-center text-white cursor-pointer" onClick={()=>setActiveHeader("Markers")} >
              Pontos <span className="ml-[10px]">+</span>
            </div>
          </div>

          <div className="overflow overflow-y-scroll no-scrollbar max-h-[300px] ">
            
            <ul className="flex flex-col justify-center  w-full   border-green-500 border-4">
              {markers.map((marker, i) => {
                return (
                  <div onClick={()=> toggleMarker(marker.id)} key={marker.id || i} className={" rounded mb-[5px] cursor-pointer py-[10px] flex justify-between w-full h-[90%]  border-pink-500 border-4 " + `${marker.is_active ? "bg-[#C18E47]" :"bg-[#D6D8DB]" }`}>
                    <li>{"Ponto " + (i + 1)}</li>

<div className=" z-20 cursor-pointer" onClick={()=>deleteMarker(marker.id)}> <FaRegTrashAlt  /></div>
                   
                  </div>
                );
              })}
            </ul>
          </div>
        </div>

        <div>Circulos</div>
      </div>
    </div>
  );
}

