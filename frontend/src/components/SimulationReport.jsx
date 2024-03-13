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

  const firstTableData = {
    revenueY1: 34200,
    unitPriceY1: 285,
    ImpFeeY1: 0,
    TotalOfCustomerY1: 30,
    RetainedCustomerY1: 0,
    NewCustomerY1: 0,
    EbitdaY1: -399,

    revenueY2: 101574,
    unitPriceY2: 314,
    ImpFeeY2: 0,
    TotalOfCustomerY2: 81,
    RetainedCustomerY2: 21,
    NewCustomerY2: 60,
    EbitdaY2: -75,

    revenueY3: 243740,
    unitPriceY3: 345,
    ImpFeeY3: 0,
    TotalOfCustomerY3: 177,
    RetainedCustomerY3: 57,
    NewCustomerY3: 120,
    EbitdaY3: 16,

    revenueY4: 551841,
    unitPriceY4: 379,
    ImpFeeY4: 0,
    TotalOfCustomerY4: 364,
    RetainedCustomerY4: 124,
    NewCustomerY4: 240,
    EbitdaY4: 55,

    revenueY5: 1114612,
    unitPriceY5: 379,
    ImpFeeY5: 0,
    TotalOfCustomerY5: 735,
    RetainedCustomerY5: 255,
    NewCustomerY5: 480,
    EbitdaY5: 76,
  };

  const secondTableData = {
    revenueY1: 34200,
    unitPriceY1: 285,
    ImpFeeY1: 0,
    TotalOfCustomerY1: 30,
    RetainedCustomerY1: 0,
    NewCustomerY1: 0,
    EbitdaY1: "-399%",

    revenueY2: 101574,
    unitPriceY2: 314,
    ImpFeeY2: 0,
    TotalOfCustomerY2: 81,
    RetainedCustomerY2: 21,
    NewCustomerY2: 60,
    EbitdaY2: "-75%",

    revenueY3: 243740,
    unitPriceY3: 345,
    ImpFeeY3: 0,
    TotalOfCustomerY3: 177,
    RetainedCustomerY3: 57,
    NewCustomerY3: 120,
    EbitdaY3: 16,

    revenueY4: 551841,
    unitPriceY4: 379,
    ImpFeeY4: 0,
    TotalOfCustomerY4: 364,
    RetainedCustomerY4: 124,
    NewCustomerY4: 240,
    EbitdaY4: 55,

    revenueY5: 1114612,
    unitPriceY5: 379,
    ImpFeeY5: 0,
    TotalOfCustomerY5: 735,
    RetainedCustomerY5: 255,
    NewCustomerY5: 480,
    EbitdaY5: 76,
  };

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
