"use client";
import { SetStateAction, useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/ReactSidebar";
import Map from "@/components/Map";
import NextSideBar from "@/components/Sidebar/NextSideBar";
import CirclesHeader from "@/components/Headers/CirclesHeader";
import InitialPointsHeader from "@/components/Headers/InitialPointHeader";
import MarkersHeader from "@/components/Headers/markers/MarkersHeader";
import { fetchCircles } from "@/lib/fetchCircles";
import { fetchMarkers } from "@/lib/fetchMarkers";
import { DataContextProvider, useCirclesContext, useMarkersContext } from "@/context/areas";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export type Marker = {
  id: any;
  geoCode: {
    lat: number;
    lng: number;
  };
  popUp: string;
is_active: boolean
};

export type Circle = {
id:any,
center : [number,number],
radius:number
description:string
is_active: boolean
};

export type Rectangle = {
id:any,
bounds : [number,number],
radius:number
description:string
is_active: boolean
};




export default function DashboardLayout({ children }: DashboardLayoutProps) {


const headerComponents = {
  InitialPoints: InitialPointsHeader,
  Markers: MarkersHeader,
Circles: CirclesHeader
 
};



const {markers, setMarkers} = useMarkersContext()

const {circles, setCircles} = useCirclesContext()

  useEffect(() => {



fetchMarkers().then((res)=>{

const updatedMapData = res.map(item => ({ ...item, is_active: true }));
  setMarkers(updatedMapData);


})

fetchCircles().then((res)=>{
const updatedMapData = res.map(item => ({ ...item, is_active: true }));
  setCircles(updatedMapData);


})
  
  

   }, []);



  return (
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col  border-pink-200 border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <NextSideBar markers={markers} setMarkers={setMarkers} circles={circles} setCircles={setCircles} setActiveHeader={null as any}  />
            </div>
            <div className=" bg-[#F1F2F5]  flex  flex-col container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto ">

 {children}
             
              <Map  markers={markers} setMarkers={setMarkers} circles={circles} setCircles={setCircles}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

