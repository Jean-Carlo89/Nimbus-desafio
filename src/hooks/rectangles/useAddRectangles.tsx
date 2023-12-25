"use client"
import {Rectangle } from "@/app/map/layout";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";


export async function useAddRectangle(props: Rectangle, setRectangles:  Dispatch<SetStateAction<Rectangle[]>>){




 try {
          const result = await axios.post("http://localhost:3001/rectangles", props);

          if (result.status === 201) {
            setRectangles((prevValue) => [
              ...prevValue,
            props
            ]);
          }
        } catch (error) {
          console.log(error);
        }
}