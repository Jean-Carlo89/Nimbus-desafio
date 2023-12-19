import React from "react";
import Map from "../../../components/Map";
import Header from "../../../components/Header";

export default function MapPage() {
  return (
    <div className="container border-red-400 border-4 h-[1000px] w-[1200px] mx-auto">
      <Header />

      <Map />
    </div>
  );
}
