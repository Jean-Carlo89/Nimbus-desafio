/* eslint-disable react/no-children-prop */
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import { MenuItem } from "./MenuItem";
import { FaRegTrashAlt } from "react-icons/fa";

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
    <div className=" w-full h-full container border-red-500 border-2 flex flex-col justify-between  ">
      <div className=" flex flex-col z-10 items-center  ">
        <div className="pb-[50px] border-yellow-400 border-2 w-[80%]">
          <span>Pontos</span>

          <ul className="flex flex-col justify-center  w-full h-fit border-green-500 border-4">
            {pontos.map((ponto) => {
              return (
                <div key={ponto.text} className="py-[10px] bg-[#D6D8DB] flex justify-between w-full h-[90*]  border-pink-500 border-4 ">
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

// const Bar = styled.div`
//   border: 1px solid green;
//   width: 100px;
//   height: 1000px;
// `;

// const Bar2 = styled.div`
//   height: 200px;
//   width: 200px;
//   border: 1px solid teal;
// `;
