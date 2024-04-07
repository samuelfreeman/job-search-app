import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
const Jobinfo = () => {
  return (
    <div>
      <Navbar />
      <Banner heading="Build a career you will love" />

      <div className="h-[90vh] w-screen flex flex-col justify-center items-center text-left">
        <h1 className="w-[400px] h-[20vh]">Salaries</h1>
        <h5 className=""></h5>
        <h1></h1>
        <h3></h3>
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobinfo;
