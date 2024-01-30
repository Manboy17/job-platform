import Filters from "@/components/shared/Filters";
import Search from "@/components/shared/Search";
import React from "react";

const MainPage = () => {
  return (
    <>
      <section className="bg-blue-600 w-full py-4">
        <div className="wrapper">
          <h1 className="text-white text-2xl tracking-wide md:text-3xl lg:text-4xl">
            Find your dream job
          </h1>
          <p className="text-white text-xs pt-3 tracking-wide md:text-sm">
            Looking for jobs? Browse our latest job opening to view
          </p>
        </div>
      </section>

      <section className="wrapper py-5">
        <div className="flex flex-col items-center w-full justify-between gap-6 lg:flex-row">
          <Search />
          <Filters />
        </div>
      </section>
    </>
  );
};

export default MainPage;
