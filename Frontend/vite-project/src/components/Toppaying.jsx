import React from "react";

const title = [
  "Web developer",
  "UI designer",
  "Welder",
  "Project manager",
  "UX designer",
  "Marketing",
  "Security personnel",
  "Delivery driver",
  "Warehouse",
  "Sales",
  "Medical",
  "Engineering"
];

const salary = [
  "Average Salary $34,677 per year",
  "Average Salary $28,897 per year",
  "Average Salary $20,637 per year",
  "Average Salary $20,637 per year",
  "Average Salary $3,677 per year",
  "Average Salary $34,677 per year",
  "Average Salary $28,897 per year",
  "Average Salary $20,637 per year",
  "Average Salary $20,637 per year",
  "Average Salary $3,677 per year",
  "Average Salary $34,677 per year",
  "Average Salary $28,897 per year",
];

const Toppaying = () => {
  return (
    <div className="container mx-auto px-4 w-[900px] ">
      <h1 className="text-2xl font-bold mb-4">
        Browse top paying jobs from industry
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {title.map((jobTitle, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">{jobTitle}</h2>
            <p className="text-blue-900">{salary[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppaying;
