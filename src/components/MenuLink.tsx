"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";

type MenuLinkProps = {
  children: React.ReactNode;
  href: string;
  className: string;
};

export default function MenuLink(props: MenuLinkProps) {
  const pathname = usePathname();

  
  return (
    <Link href={props.href} className={pathname === props.href ? props.className + " bg-[#d18e30]" : props.className}>
      {props.children}
      {/* <div>{props.children}</div> */}
    </Link>
  );
}
