import { Marker } from "@/app/map/layout";
import { MockApi } from "@/mocks/mock-api";


export async function fetchMarkers()  {
  try {
  
 
const markers =await MockApi.Markers.get()
     return markers?.length >0 ? markers : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}

