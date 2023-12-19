/* eslint-disable react/no-children-prop */
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { styled } from "styled-components";

import { FaRegTrashAlt } from "react-icons/fa";
import MenuLink from "./MenuLink";

type BarProps = {
  children: React.ReactNode;
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

export default function SideBar() {
  return (
    <div className=" w-full h-full container border-red-500 border-2 flex flex-col justify-between  bg-[#333333] ">
      <div className=" flex flex-col z-10 items-center  border-blue-500 border-4 ">
        <MenuLink className="py-[10px] block   hover:bg-orange-200 cursor-pointer justify-center h-[90%]  border-pink-500 border-4 w-[80%] mt-[20px] bg-[#D6D8DB]" href={"/map/pontos"}>
          Ponto e Zoom Iniciais
        </MenuLink>

        <div className="pb-[50px] border-yellow-400 border-2 w-[80%] mt-[20px]">
          <div className="mx-auto border-red-400 border-2 flex justify-center">Pontos </div>

          <ul className="flex flex-col justify-center  w-full h-fit border-green-500 border-4">
            {pontos.map((ponto) => {
              return (
                <div key={ponto.text} className="py-[10px] bg-[#D6D8DB] flex justify-between w-full h-[90%]  border-pink-500 border-4 ">
                  <li key={ponto.text}>{ponto.text}</li>

                  <FaRegTrashAlt />
                </div>
              );
            })}
          </ul>
        </div>

        <div>Circulos</div>
      </div>
    </div>
  );
}

// export default function SideBar() {
//   return (
//     <div className=" w-full h-full container border-red-500 border-2 flex flex-col justify-between  ">
//       <div className=" flex flex-col z-10 items-center  ">
//         <div className="py-[10px] bg-[#D6D8DB] flex justify-between h-[90%]  border-pink-500 border-4 w-[80%] mt-[20px]">Pontos Iniciais</div>

//         <div className="pb-[50px] border-yellow-400 border-2 w-[80%] mt-[20px]">
//           <div className="mx-auto border-red-400 border-2 flex justify-center">Pontos</div>

//           <ul className="flex flex-col justify-center  w-full h-fit border-green-500 border-4">
//             {pontos.map((ponto) => {
//               return (
//                 <div key={ponto.text} className="py-[10px] bg-[#D6D8DB] flex justify-between w-full h-[90%]  border-pink-500 border-4 ">
//                   <li key={ponto.text}>{ponto.text}</li>

//                   <FaRegTrashAlt />
//                 </div>
//               );
//             })}
//           </ul>
//         </div>

//         <div>Circulos</div>
//       </div>
//     </div>
//   );
// }
