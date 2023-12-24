import { Circle, Marker } from '@/app/map/layout';
import { v4 as uuidv4 } from 'uuid';
export function generateCircle(circle: Circle) : Circle{


const new_circle = {...circle}
new_circle.id = uuidv4()
return  new_circle
 





}
