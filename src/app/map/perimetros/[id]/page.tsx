"use client"
import CirclesHeader from '@/components/Headers/circles/CirclesHeader'
import React, { useEffect, useState } from 'react'

import { useCirclesContext } from '@/context/areas';
import EditCirclesHeader from '@/components/Headers/circles/EditCircleHeader';
import { mock } from 'node:test';
import { MockApi } from '@/mocks/mock-api';

export default function PerimetroPage({ params }: { params: { id: string } }) {

  const {circles,setCircles} = useCirclesContext()

const [form,setForm] = useState({lat:0, long: 0, description:"", radius:0})

useEffect(()=>{


MockApi.Circles.getById(params.id).then((res)=>{
res.json().then((res)=>{

setForm({lat:res.center[0], long:res.center[1], description:res.description, radius: res.radius})

})
}).catch((e)=>{
console.log(e)
})
},[])

 
  return (
    <EditCirclesHeader id={params.id} form={form} setForm={setForm} setCircles={setCircles}/>
  )
}
