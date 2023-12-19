"use client";
import { usePathname } from "next/navigation";
import React from "react";

// export default function Header() {
//   const pathname = usePathname();
//   const headerComponent = getHeaderComponent(pathname);

//   return headerComponent || null;
// }

// function getHeaderComponent(pathname: string) {
//   const headerMap: Record<string, React.JSX.Element> = {
//     "/map": <div className="border-red-400 border-4">Header ddd</div>,
//     "/map/pontos": (
//       <div className="border-red-400 border-4 ">
//         <h1 className=" text-2xl">Ponto e Zoom Iniciais</h1>
//         <div className="flex w-[600px] justify-between border-green-500 border-4">
//           <div className=" flex">
//             <h2>lala</h2> <input></input>
//           </div>{" "}
//           <div>BBBBBBBBB</div> <div>lala</div> <div>Salvar</div>
//         </div>
//       </div>
//     ),
//   };

//   return <div className="border-green-500 border-4">{headerMap[pathname]}</div>;
// }

// "use client";
// import { usePathname } from "next/navigation";
// import React from "react";

// export default function Header() {
//   const pathname = usePathname();
//   // return <div className=" border-red-400 border-4 ">Header ddd</div>;
// }

// function getHeaderComponent(pathname: string) {
//   const headerMap = {
//     "/map": <div className="border-red-400 border-4">Header ddd</div>,
//     "/map/pontos": <div className="border-red-400 border-4">Pontos</div>,
//     // Add more route-to-header mappings here
//   };

//   return headerMap[${`pathname`}];
// }
