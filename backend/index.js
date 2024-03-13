const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 8000;

const excelFilePath = path.join(__dirname, "downloads", "data.xlsx");
const excelFilePathOutput = path.join(__dirname, "downloads", "output.xlsx");

app.use(express.json());
app.use(cors());

app.post("/api/saveInputCost", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = "Input Costs";

    let worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      worksheet = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const formattedData = [{ A: "Cost Details" }, {}, { A: "Key", B: "Value" }];

    const inputData = req.body;
    for (const key in inputData) {
      let value = inputData[key];

      if (!value) {
        value = 0;
      } else if (!isNaN(parseFloat(value))) {
        value = parseFloat(value);
      }

      if (
        key.endsWith("_y1") ||
        key.endsWith("_y2") ||
        key.endsWith("_y3") ||
        key.endsWith("_y4") ||
        key.endsWith("_y5")
      ) {
        value /= 100;
      }

      formattedData.push({
        A: key,
        B: value,
      });
    }

    xlsx.utils.sheet_add_json(worksheet, formattedData, {
      origin: "A1",
      skipHeader: false,
    });

    worksheet["!cols"] = [{ width: 30 }, { width: 30 }];

    const headerStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "FFFF00" } },
      alignment: { horizontal: "center" },
    };

    Object.keys(worksheet).forEach((key) => {
      if (
        key !== "!ref" &&
        key !== "!margins" &&
        key !== "!cols" &&
        key !== "!merges" &&
        key !== "!protect"
      ) {
        worksheet[key].s = headerStyle;
      }
    });

    const dataStyle = {
      alignment: { horizontal: "center" },
    };

    formattedData.forEach((row, index) => {
      if (index !== 0 && index !== 1) {
        Object.keys(row).forEach((key) => {
          const cell = worksheet[key + index];
          if (cell) {
            cell.s = dataStyle;
          }
        });
      }
    });

    xlsx.writeFile(workbook, excelFilePath);
    res.send("Excel file updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Excel file");
  }
});

app.post("/api/saveSimulationCost", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = "Simulation Costs";

    let worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      worksheet = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const formattedData = [
      { A: "Simulation Details" },
      {},
      { A: "Key", B: "Value" },
    ];

    const inputData = req.body;
    for (const key in inputData) {
      let value = inputData[key];

      if (!value) {
        value = 0;
      } else if (!isNaN(parseFloat(value))) {
        value = parseFloat(value);
      }

      if (
        key === "targetmargin" ||
        key == "y1PriceGrowth" ||
        key == " y2PriceGrowth" ||
        key == "y3PriceGrowth" ||
        key == "y4PriceGrowth" ||
        key == "y5PriceGrowth" ||
        key == "y1CustomerGrowth" ||
        key == "y2CustomerGrowth" ||
        key == "y3CustomerGrowth" ||
        key == "y4CustomerGrowth" ||
        key == "y5CustomerGrowth" ||
        key == "averagecustomerretention"
      ) {
        value /= 100;
      }

      formattedData.push({
        A: key,
        B: value,
      });
    }

    xlsx.utils.sheet_add_json(worksheet, formattedData, {
      origin: "A1",
      skipHeader: false,
    });

    worksheet["!cols"] = [{ width: 30 }, { width: 30 }];

    const headerStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "FFFF00" } },
      alignment: { horizontal: "center" },
    };

    Object.keys(worksheet).forEach((key) => {
      if (
        key !== "!ref" &&
        key !== "!margins" &&
        key !== "!cols" &&
        key !== "!merges" &&
        key !== "!protect"
      ) {
        worksheet[key].s = headerStyle;
      }
    });

    const dataStyle = {
      alignment: { horizontal: "center" },
    };

    formattedData.forEach((row, index) => {
      if (index !== 0 && index !== 1) {
        Object.keys(row).forEach((key) => {
          const cell = worksheet[key + index];
          if (cell) {
            cell.s = dataStyle;
          }
        });
      }
    });

    xlsx.writeFile(workbook, excelFilePath);
    res.send("Excel file updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Excel file");
  }
});

app.get("/api/excel-data", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePathOutput);
    const sheetName = "Sheet1";
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    res.json(jsonData);
  } catch (error) {
    console.error("Error reading Excel:", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
