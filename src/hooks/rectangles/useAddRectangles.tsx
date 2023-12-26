import { Rectangle } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";
import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useAddRectangle = () => {
  const addRectangle = useCallback(
    async (rectangle: Rectangle, setRectangles: Dispatch<SetStateAction<Rectangle[]>>) => {
      try {


    

const result = await MockApi.Rectangles.post(rectangle)

        if (result.status === 201) {
          setRectangles(prevValue => [...prevValue, rectangle]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return addRectangle;
};






