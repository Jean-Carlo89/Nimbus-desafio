
import React from 'react'

export default function Home() {


  return (
    <div>Home</div>
  )
}


// "use client"
// import ReactSideBar from '@/components/Sidebar/ReactSidebar'
// import Image from 'next/image'
// import { SetStateAction, useEffect, useState } from 'react'
// import { Circle, Marker } from './map/layout'
// import Map from "../components/Map"
// import InitialPointsHeader from '@/components/Headers/InitialPointHeader'
// import MarkersHeader from '@/components/Headers/markers/MarkersHeader'
// import { fetchMarkers } from '@/lib/fetchMarkers'
// import { fetchCircles } from '@/lib/fetchCircles'
// import CirclesHeader from '@/components/Headers/CirclesHeader'


// export default function Home() {

// const headerComponents = {
//   InitialPoints: InitialPointsHeader,
//   Markers: MarkersHeader,
// Circles: CirclesHeader
 
// };

// const [edit, setEdit] = useState(false)

// const [activeHeader, setActiveHeader] = useState('');

// const [mapMarkers, setMapMarkers] = useState<Marker[]>([]);

// const [circles, setCircles] = useState<Circle[]>([]);




//   useEffect(() => {



// fetchMarkers().then((res)=>{
// const updatedMapData = res.map(item => ({ ...item, is_active: true }));
//   setMapMarkers(updatedMapData);


// })

// fetchCircles().then((res)=>{
// const updatedMapData = res.map(item => ({ ...item, is_active: true }));
//   setCircles(updatedMapData);


// })
  
  

//   }, []);

// const renderHeader = () => {
//     const HeaderComp = headerComponents[activeHeader];
//     if (!HeaderComp) return null;

    
//     if (activeHeader === 'Markers') {
//       return <HeaderComp markers={mapMarkers} setMarkers={setMapMarkers} edit={edit} /> ;
//     }

//  if (activeHeader === 'Circles') {
//       return <HeaderComp circles={circles} setCircles={setCircles} edit={edit} /> ;
//     }




//     return <HeaderComp />;
//   };

//   return (
    
//     <div className="  h-[100vh] w-full flex justify-center items-center  ">
//       <main className="h-full w-full mx-auto container">
//         <div className="flex flex-col  border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
//           <div className="flex h-full justify-center w-full ">
//             <div className=" w-[30%]  ">
//               <ReactSideBar markers={mapMarkers} setMarkers={setMapMarkers} circles={circles} setCircles={setCircles} setActiveHeader={setActiveHeader} setEdit={setEdit}/>
//             </div>
//             <div className=" bg-[#F1F2F5]  flex  flex-col container  border-4 h-[1000px] w-[1200px] mx-auto ">
//               {/* {children} */}
//               {renderHeader()}
//               <Map markers={mapMarkers} setMarkers={setMapMarkers} circles={circles} setCircles={setCircles} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )


// }

