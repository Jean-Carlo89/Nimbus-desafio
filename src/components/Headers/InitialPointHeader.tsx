"use client";
import { useGlobalContext } from "@/context/initialGeoCode";
import React, { useEffect, useState } from "react";

export default function InitialPointsHeader() {
  const { initialGeoCode, setInitialGeoCode } = useGlobalContext();

  const [form, setForm] = useState({ lat: null, long: null, zoom: null });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //*** form is transforming to string */

    const lat = parseFloat(form.lat);
    const long = parseFloat(form.long);
    const zoom = parseInt(form.zoom);


    const invalidValues = [];

    if (isNaN(lat)) {
      invalidValues.push("Latitude");
    }

    if (isNaN(long)) {
      invalidValues.push("Longitude");
    }

    if (isNaN(zoom)) {
      invalidValues.push("Zoom");
    }

    if (invalidValues.length > 0) {
      
      alert(`Please enter valid numeric values for ${invalidValues.join(", ")}.`);
      return; 
    }

    try {
      setInitialGeoCode({ lat: form.lat, long: form.long, zoom: form.zoom });

      localStorage.setItem("initialGeoCode", JSON.stringify({ lat, long, zoom }));
    } catch (error) {
      console.error(error);
      console.log(error);
      alert("Houve um erro ao setar as coordenadas iniciais");
    } finally {
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prev) => {
      let helper = { ...prev };

      helper[`${e.target.id}`] = e.target.value;

      return helper;
    });
  }

  return (
    <>
      <div className=" border-4 ">
        <h1 className=" text-2xl mb-[15px]">Ponto e Zoom Iniciais</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex w-min-[600px] w-[750px] justify-between border-4">
            <div className=" flex">
              <h2 className="pr-[15px]">Latitude:</h2>
              <input onChange={onChange} value={form.lat} className="w-[100px] rounded border-black border-2" id="lat" placeholder={"latitude..."}></input>
            </div>
            <div className=" flex">
              <h2 className="pr-[15px]">Longitude:</h2>
              <input onChange={onChange} value={form.long} className="w-[100px] rounded border-black border-2" id="long" placeholder={"Longitude..."}></input>
            </div>{" "}
            <div className=" flex">
              <h2 className="pr-[15px]">Zoom:</h2>
              <input onChange={onChange} value={form.zoom} className="w-[100px] rounded border-black border-2" id="zoom" placeholder={"zoom..."}></input>
            </div>{" "}
            <button className=" bg-[#104E8B]  text-white rounded w-[60px] flex justify-center ml-5">Salvar</button>
          </div>
        </form>
      </div>
    </>
  );
}
