import { Circle, Rectangle } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";



export async function fetchRectangles()  {
  try {
  
    

  const res = await MockApi.Rectangles.get()

    const rectangles : Rectangle[] = await res.json();


    return rectangles?.length ? rectangles : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}