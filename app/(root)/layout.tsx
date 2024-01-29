import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
