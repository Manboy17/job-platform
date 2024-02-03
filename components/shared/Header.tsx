import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import { Button } from "../ui/button";
import Mobile from "./Mobile";
import { getUserById } from "@/lib/actions/user.action";

const Header = async () => {
  const { userId } = auth();

  const user = await getUserById({ userId });

  return (
    <div className="wrapper flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
        <span className="text-lg font-medium">Getjob.wide</span>
      </Link>

      <SignedIn>
        <nav className="hidden md:block">
          <NavLinks />
        </nav>
      </SignedIn>

      <div>
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <Mobile />
            <div className="hidden flex-col md:flex">
              <span className="text-xs">Enterprise</span>
              <span className="text-sm font-medium">
                {user && (
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                )}
              </span>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <Button asChild className="rounded bg-blue-700" size="default">
            <Link href="/sign-in">Log in</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
