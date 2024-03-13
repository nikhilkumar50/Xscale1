import React, { useEffect, useState } from "react";
import SimulationCard from "./SimulationCard";
import { FaHandPointRight } from "react-icons/fa";
import Table from "./Table";

const SimulationReport = ({ data }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/excel-data",
  //         {
  //           responseType: "blob",
  //         }
  //       );
  //       const blob = new Blob([response.data]);
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         const data = reader.result;
  //         const workbook = XLSX.read(data, { type: "binary" });
  //         const sheetName = workbook.SheetNames[0];
  //         const sheet = workbook.Sheets[sheetName];
  //         const parsedData = XLSX.utils.sheet_to_json(sheet);
  //         setData(parsedData);
  //       };

  //       reader.readAsBinaryString(blob);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [data]);

  
  return (
    <div className="border border-secondary rounded-md shadow-xl bg-primary px-2 w-full">
      <div className="flex flex-col sm:flex-row gap-4 justify-evenly items-center w-full mt-4 mb-4">
        <SimulationCard title={"Product Unit Price"} value={"₹25,000"} />
        <SimulationCard title={"Revenue"} value={"₹25,000"} />
        <SimulationCard title={"EBITDA %"} value={"20"} />
        <SimulationCard title={"No Of Customer"} value={"500"} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <h2 className="text-md font-bold mt-2 mb-2">
          Cashflow based on the specified{" "}
          <span className="text-green-500">Revenue</span> and{" "}
          <span className="text-green-500">Margin Targets </span>
          <span className="text-blue-400">(Lowest Unit Price)</span>
        </h2>
      </div>

      <Table data={data} />

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <h2 className="text-md font-bold mt-2 mb-2">
          Cashflow -Nearest to Given{" "}
          <span className="text-green-500">Revenue</span>{" "}
          <span className="text-green-500"> Target </span>
          <span className="text-blue-400">(Without Considering Margin)</span>
        </h2>
      </div>

      <Table data={data} />
    </div>
  );
};

export default SimulationReport;
