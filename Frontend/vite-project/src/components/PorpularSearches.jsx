import React from "react";
const list = [
     "UI design",
     "Delivery driver",
     "Warehouse",
     "Web developer",
     "Marketing",
     "Project manager",
     "Sales",
     "Remote",
     "Weekly",
     "Medical",
     "Welder",
     "Engineer",
     
];
const PorpularSearches = () => {
     return (
          <div className="ml-96 mt-20 w-[700px] text-center ">
               <div className="text-left p-2 border">
                    <h1 className="">Sample Text</h1>
               </div>
               <div className=" grid grid-cols-4 gap-3">
                    {list.map((item, index) => (
                         <div key={index} className="p-2 border">
                              {item}
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default PorpularSearches;
