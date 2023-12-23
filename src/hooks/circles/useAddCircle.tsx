"use client"
import { Circle, Marker } from "@/app/map/layout";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";


export async function useAddCircle(props:Circle, setMarkers:  Dispatch<SetStateAction<Circle[]>>){




 try {
          const result = await axios.post("http://localhost:3001/circles", props);

console.log(result.data)

          if (result.status === 201) {
            setMarkers((prevValue) => [
              ...prevValue,
            props
            ]);
          }
        } catch (error) {
          console.log(error);
        }
}