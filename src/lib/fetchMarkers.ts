import { Marker } from "@/app/map/layout";


export async function fetchMarkers()  {
  try {
  
    const res = await fetch("http://localhost:3001/markers");


    

    const markers : Marker[] = await res.json();

     return markers?.length ? markers : []
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}

