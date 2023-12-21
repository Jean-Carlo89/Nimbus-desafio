"use client";
import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/ReactSidebar";
import Map from "@/components/Map";
import NextSideBar from "@/components/Sidebar/NextSideBar";

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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mapData, setMapData] = useState<Marker[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/markers")
      .then((res) => {
        res
          .json()
          .then((res) => {
            console.log(res);
            setMapData(res);
          })
          .catch((e) => {
            console.log("Error parsing request");
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col  border-pink-200 border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <NextSideBar mapData={mapData} setMapData={setMapData}/>
            </div>
            <div className=" bg-[#F1F2F5]  flex  flex-col container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto ">
              {children}
              <Map mapData={mapData} setMapData={setMapData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// className="container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto
