import React from "react";

const banner = (props) => {
  return (
    <div className="  h-40  w-screen text-center  bg-button flex flex-col justify-center items-center">
      <h1 className="m-2 text-white text-4xl">{props.heading}</h1>
      <h5 className="m-4 text-white text-sm">{props.subtitle}</h5>
    </div>
  );
};

export default banner;
