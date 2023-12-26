"use client"
import CirclesHeader from '@/components/Headers/circles/CirclesHeader'
import React, { useEffect, useState } from 'react'

import { useCirclesContext, useRectanglesContext } from '@/context/areas';
import EditCirclesHeader from '@/components/Headers/circles/EditCircleHeader';
import EditAreasHeader from '@/components/Headers/areas/EditAreasHeader';
import { MockApi } from '@/mocks/mock-api';

export default function PerimetroPage({ params }: { params: { id: string } }) {

  const {rectangles,setRectangles} = useRectanglesContext()

const [form,setForm] = useState({lat_sup: 0, lat_inf:0, long_left:0, long_right:0, description: ""})

useEffect(()=>{



MockApi.Rectangles.getById(params.id).then((res)=>{
res.json().then((res)=>{

const bounds = res.bounds
setForm({lat_sup: bounds.lat.sup , lat_inf:bounds.lat.inf, long_left: bounds.lng.left, long_right: bounds.lng.right, description: res.description })

})
}).catch((e)=>{
console.log(e)
})
},[])

 
  return (
    <EditAreasHeader id={params.id} form={form} setForm={setForm} setRectangles={setRectangles}/>
  )
}
