import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="wrapper flex items-center justify-between sm:flex-row flex-col gap-2 sm:gap-0">
      <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
      <span>2024 &copy; Denys Hlushchenko</span>
    </footer>
  );
};

export default Footer;
