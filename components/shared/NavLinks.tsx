"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-10 md:flex-row flex-col">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li key={link.label} className={`${isActive ? "font-semibold" : ""}`}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
