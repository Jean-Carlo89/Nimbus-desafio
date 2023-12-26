import { Circle, Rectangle } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";



export async function fetchRectangles()  {
  try {
  
    

  const rectangles = await MockApi.Rectangles.get()

   


    return rectangles?.length ? rectangles : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}