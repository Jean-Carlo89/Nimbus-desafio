"use client"
import ReactSideBar from '@/components/Sidebar/ReactSidebar'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import { Marker } from './map/layout'
import Map from "../components/Map"
import InitialPointsHeader from '@/components/Headers/InitialPointHeader'
import MarkersHeader from '@/components/Headers/MarkersHeader'


export default function Home() {

const headerComponents = {
  InitialPoints: InitialPointsHeader,
  Markers: MarkersHeader
  // Add other headers here
};

 const [activeHeader, setActiveHeader] = useState('');
const [mapData, setMapData] = useState<Marker[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/markers")
      .then((res) => {
        res
          .json()
          .then((res) => {
           
             const updatedMapData = res.map(item => ({ ...item, is_active: true }));
  setMapData(updatedMapData);
          })
          .catch((e) => {
            console.log("Error parsing request");
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

const renderHeader = () => {
    const HeaderComp = headerComponents[activeHeader];
    if (!HeaderComp) return null;

    
    if (activeHeader === 'Markers') {
      return <HeaderComp markers={mapData} setMarkers={setMapData} /> ;
    }



    return <HeaderComp />;
  };

  return (
    
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col  border-pink-200 border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <ReactSideBar markers={mapData} setMarkers={setMapData} setActiveHeader={setActiveHeader}/>
            </div>
            <div className=" bg-[#F1F2F5]  flex  flex-col container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto ">
              {/* {children} */}
              {renderHeader()}
              <Map mapData={mapData} setMapData={setMapData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )


}

