import { Marker } from "@/app/map/layout";


export async function fetchMarkers()  {
  try {
  
    const res = await fetch("http://localhost:3001/markers");

    console.log(res);

    

    const markers : Marker[] = await res.json();

    return markers;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);

      return [];
    }
  }
}


//  fetch("http://localhost:3001/markers")
//       .then((res) => {
//         res
//           .json()
//           .then((res) => {
           
           
//           })
//           .catch((e) => {
//             console.log("Error parsing request");
//           });
//       })
//       .catch((e) => {
//         console.log(e);
//       });