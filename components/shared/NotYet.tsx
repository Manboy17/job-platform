"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface NotYetProps {
  text: string;
  linkText: string;
  route: string;
}

const NotYet = ({ text, linkText, route }: NotYetProps) => {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-5">
      <h3>{text}</h3>
      <Button asChild className="rounded bg-blue-700" size="default">
        <Link href={route}>{linkText}</Link>
      </Button>
    </div>
  );
};

export default NotYet;
