"use client"
import CirclesHeader from '@/components/Headers/circles/CirclesHeader'
import React, { useState } from 'react'
import { Circle } from '../layout'
import { useCirclesContext } from '@/context/areas';

export default function PerimetrosPage() {

  const {circles,setCircles} = useCirclesContext()
 
  return (
    <CirclesHeader circles={circles} setCircles={setCircles}/>
  )
}
