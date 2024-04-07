import React from "react";

const Hero = () => {
     return (
          <div className="w-screen  h-full  flex flex-col items-center justify-center">
               <div className="mt-16">
                    <h1 className="mb-5 text-lg ">Find the right fit.</h1>

                    <div className="flex w-[800px]  items-center border border-gray-300 rounded-md p-2">
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
               <div className="mt-28 ">
                    <h3 className="text-md">
                         JobHub helps people get jobs:{" "}
                         <span className=" text-button">
                              {" "}
                              Over 16 million stories shared{" "}
                         </span>
                    </h3>
                    <h5 className="text-sm  text-center">
                         Unlock your dream career today - Find your perfect job
                    </h5>
               </div>
          </div>
     );
};

export default Hero;
