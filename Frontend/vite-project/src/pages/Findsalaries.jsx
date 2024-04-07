import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Toppaying from "../components/Toppaying";
import FrequentlySearchedCareers from "../components/FrequentlySearchedCareers";
const Findsalaries = () => {
  return (
    <div>
      <Navbar />

      <Banner
        heading="Find a career you will love"
        subtitle="Explore which careers have the highest job satisfaction, best salaries, and more
"
      />
      <div className=" w-screen  flex justify-center  h-44 items-center">
        <div className="flex w-[800px]   items-center border border-gray-300 rounded-md p-2">
          <svg
            className="w-28 h-5 mr-2 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 13.707a1 1 0 001.414-1.414l-3.3-3.3a5 5 0 10-1.414 1.414l3.3 3.3zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="outline-none focus:outline-none w-full"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[95vh] w-screen">
        <Toppaying />
      </div>

      <FrequentlySearchedCareers />
      <Footer />
    </div>
  );
};

export default Findsalaries;
