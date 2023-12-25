import { Circle } from "@/app/map/layout";



export async function fetchCircles()  {
  try {
  
    const res = await fetch("http://localhost:3001/circles");


    

    const circles : Circle[] = await res.json();

     return circles?.length ? circles : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}