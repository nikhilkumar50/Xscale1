import React from "react";
const SimulationCard = ({ title, value }) => {
  return (
    <div className="flex flex-col border border-secondary rounded-md shadow-xl bg-primary p-2 justify-center items-center sm:w-44 h-20 bg-gradient-to-br from-blue-950 via-blue-600 to-blue-400">
      <span className="text-sm font-bold text-white">{title}</span>
      <span className="text-white font-bold">{value}</span>

    </div>
  );
};


export default SimulationCard;
