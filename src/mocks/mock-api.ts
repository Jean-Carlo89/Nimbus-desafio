import { Circle, Marker, Rectangle } from "@/app/map/layout";
const host = "http://localhost:3001"

export const MockApi = {

  Markers  :{
  async post(markerData: Marker) {


    const response = await fetch(`${host}/markers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(markerData),
    });
    return response
  },

  async delete(markerId: any) {
    const res = await fetch(`${host}/markers/${markerId}`, {
      method: 'DELETE',
    });

return res
  },

  async patch(markerId: any, markerData: Marker) {
    const response = await fetch(`${host}/markers/${markerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(markerData),
    });
    return response.json();
  },

async get(){
 const response = await fetch(`${host}/markers`);

return response.json();
},

async getById(id:any) : Promise<Response>{
 const response = await fetch(`${host}/markers/${id}`);

return response
}

},

Circles  :{
  async post(circle:Circle) {


    const response = await fetch(`${host}/circles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(circle),
    });
    return response
  },

  async delete(markerId: any) {
    const res = await fetch(`${host}/circles/${markerId}`, {
      method: 'DELETE',
    });

return res
  },

  async patch(markerId: any,CircleData: Circle) {
    const response = await fetch(`${host}/circles/${markerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CircleData),
    });
    return response.json();
  },

async get(){
 const response = await fetch(`${host}/circles`);

return response.json();
},

async getById(id:any) : Promise<Response>{
 const response = await fetch(`${host}/circles/${id}`);

return response
}

},
Rectangles :{
  async post(rec:Rectangle) {


    const response = await fetch(`${host}/rectangles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rec),
    });
    return response
  },

  async delete(markerId: any) {
    const res = await fetch(`${host}/rectangles/${markerId}`, {
      method: 'DELETE',
    });

return res
  },

  async patch(markerId: any,rectanglesData: Rectangle) {
    const response = await fetch(`${host}/rectangles/${markerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rectanglesData),
    });
    return response.json();
  },

async get(){
 const response = await fetch(`${host}/rectangles`);

return response.json();
},

async getById(id:any) : Promise<Response>{
 const response = await fetch(`${host}/rectangles/${id}`);

return response
}

}


};
