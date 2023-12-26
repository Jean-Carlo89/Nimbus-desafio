
import { Marker } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";
import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useAddMarker = () => {
  const addMarker = useCallback(
    async (marker: Marker, setMarkers: Dispatch<SetStateAction<Marker[]>>) => {
      const markerValue: Marker = {
        id: marker.id,
        geoCode: { lat: marker.geoCode.lat, lng: marker.geoCode.lng },
        popUp: marker.popUp || "",
        is_active: true
      };

      try {
       

const result = await MockApi.Markers.post(marker)

        if (result.status === 201) {
          setMarkers(prevValue => [
            ...prevValue,
            markerValue
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return addMarker;
};




