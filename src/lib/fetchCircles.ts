import { Circle } from "@/app/map/layout";



export async function fetchCircles()  {
  try {
  
    const res = await fetch("http://localhost:3001/circles");

    console.log(res);

    

    const markers : Circle[] = await res.json();

    return markers;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}