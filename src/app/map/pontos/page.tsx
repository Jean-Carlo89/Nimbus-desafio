"use client";
import MarkersHeader from "@/components/Headers/markers/MarkersHeader";
import { useGlobalContext } from "@/context/initialGeoCode";
import React, { useEffect, useState } from "react";
import { Marker } from "../layout";
import { useMarkersContext } from "@/context/areas";

export default function PontosPage() {

const {markers, setMarkers} = useMarkersContext()
  const [form, setForm] = useState({ lat: null, long: null, description: null });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //*** form is transforming to string */

    const lat = parseFloat(form.lat);
    const long = parseFloat(form.long);
    const description = form.description;

  
    const invalidValues = [];

    if (isNaN(lat)) {
      invalidValues.push("Latitude");
    }

    if (isNaN(long)) {
      invalidValues.push("Longitude");
    }

    if (invalidValues.length > 0) {
     
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return;
    }

   
  }

  

  return (

<MarkersHeader  form={form} setMarkers={setMarkers} setForm={setForm} edit={false}/>
   
  );
}
