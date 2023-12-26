"use client";
import { SetStateAction, useEffect, useState } from "react";
import Map from "@/components/Map";
import NextSideBar from "@/components/Sidebar/NextSideBar";
import { fetchCircles } from "@/lib/fetchCircles";
import { fetchMarkers } from "@/lib/fetchMarkers";
import { DataContextProvider, useCirclesContext, useMarkersContext, useRectanglesContext } from "@/context/areas";
import { fetchRectangles } from "@/lib/fetchRectangles";


type MapLayoutProps = {
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
bounds : {lat :{sup:number, inf:number}, lng : {left:number, right:number}} 
description:string
is_active: boolean
};




export default function MapLayout({ children }: MapLayoutProps) {





const {markers, setMarkers} = useMarkersContext()

const {circles, setCircles} = useCirclesContext()

const {rectangles, setRectangles}  = useRectanglesContext()

  useEffect(() => {



fetchMarkers().then((res)=>{

  const updatedMapData = res.map(item => ({ ...item, is_active: true }));


    setMarkers(updatedMapData);


  })

  fetchCircles().then((res)=>{
  const updatedMapData = res.map(item => ({ ...item, is_active: true }));
    setCircles(updatedMapData);


  })

  fetchRectangles().then((res)=>{
  const updatedMapData = res.map(item => ({ ...item, is_active: true }));
    setRectangles(updatedMapData);


  })


  
 }, []);



  return (
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <NextSideBar markers={markers} setMarkers={setMarkers} circles={circles} setCircles={setCircles} rectangles={rectangles}   setRectangles={setRectangles}  />
            </div>
            <div className=" bg-[#F1F2F5]  flex  flex-col container border-4 h-[1000px] w-[1200px] mx-auto ">

                {children}
             
              <Map  markers={markers} setMarkers={setMarkers} circles={circles} setCircles={setCircles} rectangles={rectangles} setRectangles={setRectangles}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

