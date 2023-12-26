
import { Circle } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";
import axios from "axios";
import { mock } from "node:test";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useAddCircle = () => {
  
  const addCircle = useCallback(
    async (circle: Circle, setCircles: Dispatch<SetStateAction<Circle[]>>) => {
      try {
   

const result = await MockApi.Circles.post(circle)

        if (result.status === 201) {
          setCircles((prevValue) => [
            ...prevValue,
            circle
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return addCircle;
};




