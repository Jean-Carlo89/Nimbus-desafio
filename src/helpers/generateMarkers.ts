import { Marker } from '@/app/map/layout';
import { v4 as uuidv4 } from 'uuid';
export function generateMarker(marker: Marker) : Marker{


const new_marker = {...marker}
new_marker.id = uuidv4()
return  new_marker
 





}
