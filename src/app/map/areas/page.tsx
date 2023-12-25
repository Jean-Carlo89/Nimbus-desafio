"use client"
import CirclesHeader from '@/components/Headers/circles/CirclesHeader'
import React, { useState } from 'react'
import { Circle, Rectangle } from '../layout'
import {  useRectanglesContext } from '@/context/areas';
import AreasHeader from '@/components/Headers/areas/AreasHeader';

export default function AreasPage() {


  const {rectangles,setRectangles} = useRectanglesContext()
 
  return (
    <AreasHeader rectangles={rectangles} setRectangles={setRectangles } />
  )
}
