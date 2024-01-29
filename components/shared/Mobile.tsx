import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import NavLinks from "./NavLinks";

const Mobile = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu size={30} className="pt-1" />
        </SheetTrigger>
        <SheetContent>
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
          <div className="flex items-center justify-center h-screen">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Mobile;
