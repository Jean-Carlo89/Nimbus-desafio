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



export default function DashboardLayout({ children }: DashboardLayoutProps) {
 // const [mapData, setMapData] = useState<Marker[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3001/markers")
  //     .then((res) => {
  //       res
  //         .json()
  //         .then((res) => {
  //           console.log(res);
  //           setMapData(res);
  //         })
  //         .catch((e) => {
  //           console.log("Error parsing request");
  //         });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

const headerComponents = {
  InitialPoints: InitialPointsHeader,
  Markers: MarkersHeader,
Circles: CirclesHeader
 
};

const [edit, setEdit] = useState(false)

const [activeHeader, setActiveHeader] = useState('');

const [mapMarkers, setMapMarkers] = useState<Marker[]>([]);

const [circles, setCircles] = useState<Circle[]>([]);




  useEffect(() => {



fetchMarkers().then((res)=>{
console.log(res)
const updatedMapData = res.map(item => ({ ...item, is_active: true }));
  setMapMarkers(updatedMapData);


})

fetchCircles().then((res)=>{
const updatedMapData = res.map(item => ({ ...item, is_active: true }));
  setCircles(updatedMapData);


})
  
  

  }, []);

const renderHeader = () => {
    const HeaderComp = headerComponents[activeHeader];
    if (!HeaderComp) return null;

    
    if (activeHeader === 'Markers') {
      return <HeaderComp markers={mapMarkers} setMarkers={setMapMarkers} edit={edit} /> ;
    }

 if (activeHeader === 'Circles') {
      return <HeaderComp circles={circles} setCircles={setCircles} edit={edit} /> ;
    }




    return <HeaderComp />;
  };

  return (
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col  border-pink-200 border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <NextSideBar markers={mapMarkers} setMarkers={setMapMarkers} circles={circles} setCircles={setCircles} setActiveHeader={setActiveHeader} setEdit={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
              } }/>
            </div>
            <div className=" bg-[#F1F2F5]  flex  flex-col container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto ">
              {children}
              <Map  markers={mapMarkers} setMarkers={setMapMarkers} circles={circles} setCircles={setCircles}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// className="container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto
