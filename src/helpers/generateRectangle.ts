import { Rectangle } from '@/app/map/layout';
import { v4 as uuidv4 } from 'uuid';
export function generateRectangle(rectangle: Rectangle) : Rectangle{


    const new_rectagnle = {...rectangle}
    new_rectagnle.id = uuidv4()
    return  new_rectagnle
 

}
