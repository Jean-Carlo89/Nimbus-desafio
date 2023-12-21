/* eslint-disable react/no-children-prop */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

import { FaRegTrashAlt } from "react-icons/fa";
import MenuLink from "../MenuLink";
import { Marker } from "@/app/map/layout";

type BarProps = {
  children: React.ReactNode;
};

export type SideBarProps = {
  mapData: Marker[];
  setMapData: Dispatch<SetStateAction<Marker[]>>;
// setActiveHeader: Dispatch<SetStateAction<string>>
};

const pontos = [
  {
    text: 1,
  },
  {
    text: 2,
  },
  {
    text: 3,
  },
];




export default function SideBar({ mapData, setMapData, }: SideBarProps) {
  return (
    <div className=" w-full h-full container border-red-500 border-2 flex flex-col justify-between  bg-[#333333] ">
      <div className=" flex flex-col z-10 items-center  border-blue-500 border-4 ">
        <MenuLink className="py-[10px] block   hover:bg-orange-200 cursor-pointer justify-center h-[90%]  border-pink-500 border-4 w-[80%] mt-[20px] bg-[#D6D8DB]" href={"/map/pontosIniciais"}>
          Ponto e Zoom Iniciais
        </MenuLink>



        <div className="pb-[50px] border-yellow-400 border-2 w-[80%] mt-[20px]">
          <MenuLink className="pb-[50px] border-yellow-400 border-2 w-[80%] mt-[20px] z-10" href={"/map/pontos"}>
            <div className="mx-auto border-red-400 border-2 flex justify-center text-white">
              Pontos <span className="ml-[10px]">+</span>
            </div>
          </MenuLink>

          <div className="overflow overflow-y-scroll no-scrollbar max-h-[300px] ">
            
            <ul className="flex flex-col justify-center  w-full   border-green-500 border-4">
              {mapData.map((ponto, i) => {
                return (
                  <div key={ponto.id || i} className="py-[10px] bg-[#D6D8DB] flex justify-between w-full h-[90%]  border-pink-500 border-4 ">
                    <li>{"Ponto " + (i + 1)}</li>

                    <FaRegTrashAlt />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>

        <div>Circulos</div>
      </div>
    </div>
  );
}

