import { Circle, Rectangle } from "@/app/map/layout";



export async function fetchRectangles()  {
  try {
  
    const res = await fetch("http://localhost:3001/rectangles");

    const rectangles : Rectangle[] = await res.json();




    return rectangles?.length ? rectangles : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}