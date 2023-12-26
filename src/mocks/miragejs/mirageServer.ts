//*** Mirage js attempt; encountered errors related to data persistence */

// // src/mirageServer.js
// "use client"
// import { Circle, Marker, Rectangle } from '@/app/map/layout';
// import { createServer, Model , Response} from 'miragejs';

// export function makeServer() {
//   let server = createServer({
   

    
//     models: {
//       marker: Model.extend<Partial<Marker>>({}),
//       circle: Model.extend<Partial<Circle>>({}),
//       rectangle: Model.extend<Partial<Rectangle>>({}),
//     },

//    seeds(server) {
//       // Initialize the arrays with empty data
//       server.create('marker', { popUp:"inital value", id: '95f9740e-fd40-4575-a7b2-97f7088fc404', geoCode: { lat: -12.926937622341308, lng: -38.50122427410508 }  });
//       server.create('circle', { id: '015a287e-d74f-447b-b8bc-324f82e724af', center: [0, 0], radius: 0 });
//       server.create('rectangle', { id: 'ec20cca0-cb56-4e8c-bd4f-00cff29b855a', bounds: { lat: { sup: 0, inf: 0 }, lng: { left: 0, right: 0 } } });
//     },


//     routes() {
    

 
//       this.get('/http://localhost:3001/markers', (schema) => {
//         return schema.markers.all().models;


//       })
// this.get('/markers/:id', (schema, request) => {
//     const id = request.params.id;
    
//     // Find the marker by ID
//     const marker = schema.markers.find(id);

//     // Check if the marker is not found and return a 404 response
//     if (!marker) {
//       return new Response(404, { 'Content-Type': 'application/json' }, JSON.stringify({ error: "Marker not found" }));
//     }

//     // Return the found marker
//     return marker;
// });

// // Assuming you have already set up your Mirage server and models

// this.delete('/http://localhost:3001/markers/:id', (schema, request) => {
//     let id = request.params.id;
//     let marker = schema.markers.find(id);

//   let allMarkers = schema.markers.all().models;
   


//     if (marker) {
//         marker.destroy();
//         return new Response(200); // 204 No Content
//     } else {
//         return new Response(404, { 'Content-Type': 'application/json' }, JSON.stringify({ error: "Marker not found" }));
//     }
// });



//  this.post('/http://localhost:3001/markers', (schema, request) => {
//         // Parse the request body as JSON
//         const requestBody = JSON.parse(request.requestBody);

//         // Create a new marker based on the request body
//         const newMarker = schema.markers.create(requestBody);

//   let allMarkers = schema.markers.all().models;
 

//         return newMarker;
//       });

//  this.put('/http://localhost:3001/markers/:id', (schema, request) => {
//         const id = request.params.id;
//         const requestBody = JSON.parse(request.requestBody);
//         const updatedMarkerData = requestBody.data; // Replace 'data' with the actual structure of your request body

//         // Find the marker by ID
//         const marker = schema.markers.find(id);

//         // Update the marker attributes
//         marker.update(updatedMarkerData);

//         // Return the updated marker
//         return marker;
//       });
//       // this.get('/circles', (schema) => {
//       //   return schema.circles.all();
//       // });
//       // this.get('/rectangles', (schema) => {
//       //   return schema.rectangles.all();
//       // });

      
//     },
//   });

// //alert("server on")
//   return server;
// }
