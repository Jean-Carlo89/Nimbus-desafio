"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export type geoCode = {
  lat: number;
  long: number;
  zoom: number;
};
interface ContextProps {
  initialGeoCode: geoCode;
  setInitialGeoCode: Dispatch<SetStateAction<geoCode>>;
}

const GlobalContext = createContext<ContextProps>({
  initialGeoCode: {
    lat: 51.505,
    long: -0.09,
    zoom: 13,
  },
  setInitialGeoCode: (): geoCode => {
    return { lat: 51.505, long: -0.09, zoom: 13 };
    
  },
});

export const GlobalContextProvider = ({ children }) => {
  const [initialGeoCode, setInitialGeoCode] = useState<geoCode>({
    lat: 51.505,
    long: -0.09,
    zoom: 13,
  });

  return <GlobalContext.Provider value={{ initialGeoCode: initialGeoCode, setInitialGeoCode: setInitialGeoCode }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
