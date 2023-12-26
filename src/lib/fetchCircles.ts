import { Circle } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";



export async function fetchCircles()  {
  try {
  
  
const circles = await MockApi.Circles.get()

     return circles?.length ? circles : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}