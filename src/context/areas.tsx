"use client"
import { Circle, Marker, Rectangle } from "@/app/map/layout";
import { fetchCircles } from "@/lib/fetchCircles";
import { fetchMarkers } from "@/lib/fetchMarkers";
import React, { createContext, useContext,  useEffect, Dispatch, SetStateAction, useState } from "react";
import { geoCode } from "./initialGeoCode";


const MarkersContext = createContext<MarkerContextProps>({markers:[], setMarkers: ()=>  []});
const CirclesContext = createContext<CirclesContextProps>({circles:[], setCircles: ()=>  []});
const RectanglesContext = createContext<RectanglesContextProps>({rectangles:[], setRectangles: ()=>  []});

interface MarkerContextProps {
 markers: Marker[],
  setMarkers: Dispatch<SetStateAction<Marker[]>>;
}

interface RectanglesContextProps {
  rectangles:Rectangle[],
  setRectangles: Dispatch<SetStateAction<Rectangle[]>>;
}


interface CirclesContextProps {
  circles: Circle[],
  setCircles: Dispatch<SetStateAction<Circle[]>>;
}

export const DataContextProvider =  ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [circles, setCircles] = useState([]);
  const [rectangles, setRectangles] = useState([]);



  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>
      <CirclesContext.Provider value={{ circles, setCircles }}>
        <RectanglesContext.Provider value={{rectangles, setRectangles}}>
          {children}
        </RectanglesContext.Provider>
      </CirclesContext.Provider>
    </MarkersContext.Provider>
  );
};


export const useMarkersContext = () => useContext(MarkersContext);
export const useCirclesContext = () => useContext(CirclesContext);
export const useRectanglesContext = () => useContext(RectanglesContext);