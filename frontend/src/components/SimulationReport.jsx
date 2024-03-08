import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const SimulationReport = ({data}) => {
  
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
    <div className="mx-auto p-5">
      <h1 className="text-xl font-bold text-center mb-4">Report</h1>

      {data.length > 0 && (
        <div className="rounded-div mb-2">
          <table className="table mb-2">
            <thead className="bg-secondary-div">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left text-white">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td
                      key={index}
                      className="px-4 py-2 border border-secondary"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimulationReport;
