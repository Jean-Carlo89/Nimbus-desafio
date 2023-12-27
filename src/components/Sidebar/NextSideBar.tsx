














/* eslint-disable react/no-children-prop */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import MenuLink from "../MenuLink";
import {Circle, Marker, Rectangle } from "@/app/map/layout";
import { sensitiveHeaders } from "http2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { rectangle } from "leaflet";
import { MockApi } from "@/mocks/mock-api";

type BarProps = {
  children: React.ReactNode;
};

export type SideBarProps = {

  markers: Marker[];
  setMarkers: Dispatch<SetStateAction<Marker[]>>;
  circles: Circle[];
  setCircles: Dispatch<SetStateAction<Circle[]>>;
  rectangles: Rectangle[]
  setRectangles: Dispatch<SetStateAction<Rectangle[]>>;

};






export default function SideBar({ markers, setMarkers,  circles,setCircles , rectangles, setRectangles}: SideBarProps) {

const api = MockApi
const router = useRouter()

async function deleteMarker(id:any){


const response = await api.Markers.delete(id)

 if (response.status === 200) {
        const updatedMarkers = markers.filter(marker => marker.id !== id);
        setMarkers(updatedMarkers);
router.push("/map/pontos")
    }
}

function toggleMarker(id:any) {
  setMarkers(prevMarkers => prevMarkers.map(marker => 
    marker.id === id ? { ...marker, is_active: !marker.is_active } : marker
  ));
}




function toggleCircle(id:any) {
  setCircles(prevMarkers => prevMarkers.map(circle => 
    circle.id === id ? { ...circle, is_active: !circle.is_active } : circle
  ));
}

function toggleRectangle(id:any) {
  setRectangles(prevMarkers => prevMarkers.map(circle => 
    circle.id === id ? { ...circle, is_active: !circle.is_active } : circle
  ));
}

async function deleteCircle(id:any){


const response = await api.Circles.delete(id)
 if (response.status === 200) {
        const updatedMarkers = circles.filter(marker => marker.id !== id);
        setCircles(updatedMarkers);
router.push("/map/perimetros")

    }

}

async function deleteRectangle(id:any){



const response = await api.Rectangles.delete(id)

  if (response.status === 200) {
      const updatedMarkers = rectangles.filter(marker => marker.id !== id);
      setRectangles(updatedMarkers);
      router.push("/map/areas")
 }




}




  return (
    <div className=" w-full h-full container   flex flex-col justify-between  bg-[#333333] overflow overflow-y-scroll no-scrollbar ">
      <div className=" flex flex-col z-10 items-center   ">
        <MenuLink  href={"/map/pontosIniciais"} className="py-[10px] block   rounded  hover:bg-orange-200 cursor-pointer justify-center h-[90%]   w-[80%] mt-[20px] bg-[#D6D8DB]"  >
          Ponto e Zoom Iniciais
        </MenuLink>



        <div className="pb-[50px]  w-[80%] mt-[20px]">
          <div className=" mx-auto pb-[10px]   w-[80%] mt-[20px] z-10" >
            <MenuLink href="/map/pontos" className="mx-auto  flex justify-center text-white cursor-pointer"  >
              Pontos <span className="ml-[10px]">+</span>
            </MenuLink>
          </div>

          <div className="overflow overflow-y-scroll no-scrollbar max-h-[300px] ">
            
            <ul className="flex flex-col justify-center  w-full  ">
              {  markers.length >0 ?  markers.map((marker, i) => {
                return (
                  <div onClick={()=> toggleMarker(marker.id)} key={marker.id || i} className={" rounded mb-[5px] cursor-pointer py-[10px] flex justify-between w-full h-[90%]    " + `${marker.is_active ? "bg-[#C18E47]" :"bg-[#D6D8DB]" }`}>
                    <li>{"Ponto " + (i + 1)}</li>

                    <div className="flex"><Link onClick={(e)=>e.stopPropagation()} className=" z-20 cursor-pointer" href={`/map/pontos/${marker.id}`} > <FaRegEdit /></Link>

                    <div className=" z-20 cursor-pointer" onClick={()=>deleteMarker(marker.id)}> <FaRegTrashAlt  /></div></div>


                   
                  </div>
                );
              }):  <div className="text-white mx-auto mt-[5px]">Sem Pontos adicionados</div> } 
            </ul>
          </div>
        </div>



          <div className="pb-[50px]  w-[80%] mt-[20px]">
              <div className=" mx-auto pb-[10px] w-[80%] mt-[20px] z-10" >
                <MenuLink href="/map/perimetros" className="mx-auto  flex justify-center text-white cursor-pointer"  >
                  Perímetros <span className="ml-[10px]">+</span>
                </MenuLink>
              </div>

              <div className="overflow overflow-y-scroll no-scrollbar max-h-[300px] ">
                
                <ul className="flex flex-col justify-center  w-full   ">
                  { circles.length > 0 ? circles?.map((circle, i) => {
                    return (
                      <div onClick={()=> toggleCircle(circle.id)} key={circle.id || i} className={" rounded mb-[5px] cursor-pointer py-[10px] flex justify-between w-full h-[90%]    " + `${circle.is_active ? "bg-[#C18E47]" :"bg-[#D6D8DB]" }`}>
                        <li>{"Perímetro " + (i + 1)}</li>

                        <div className="flex"><Link onClick={(e)=>e.stopPropagation()} className=" z-20 cursor-pointer" href={`/map/perimetros/${circle.id}`} > <FaRegEdit /></Link>

                        <div className=" z-20 cursor-pointer" onClick={()=>deleteCircle(circle.id)}> <FaRegTrashAlt  /></div></div>
                      
                      </div>
                    );
                  }) : <div className="text-white mx-auto mt-[5px]">Sem Perímetros adicionados</div> }
                </ul>
              </div>
        </div>




   <div className="pb-[50px]   w-[80%] mt-[20px]">
          <div className=" mx-auto pb-[10px]  w-[80%] mt-[20px] z-10" >
            <MenuLink href="/map/areas" className="mx-auto flex justify-center text-white cursor-pointer"  >
              Áreas <span className="ml-[10px]">+</span>
            </MenuLink>
          </div>

          <div className="overflow overflow-y-scroll no-scrollbar max-h-[300px] ">
            
            <ul className="flex flex-col justify-center  w-full  ">
              {rectangles.length >0 ?  rectangles?.map((rectangle, i) => {
                return (
                  <div onClick={()=> toggleRectangle(rectangle.id)} key={rectangle.id || i} className={" rounded mb-[5px] cursor-pointer py-[10px] flex justify-between w-full h-[90%]    " + `${rectangle.is_active ? "bg-[#C18E47]" :"bg-[#D6D8DB]" }`}>
                    <li>{"Área " + (i + 1)}</li>

                      <div className="flex"><Link onClick={(e)=>e.stopPropagation()} className=" z-20 cursor-pointer" href={`/map/areas/${rectangle.id}`} > <FaRegEdit /></Link>

                      <div className=" z-20 cursor-pointer" onClick={()=>deleteRectangle(rectangle.id)}> <FaRegTrashAlt  /></div></div>
                   
                  </div>
                );
              }) : <div className="text-white mx-auto mt-[5px]">Sem Áreas adicionadas</div> }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

