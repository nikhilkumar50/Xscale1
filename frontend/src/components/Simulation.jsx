import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimulationReport from "./SimulationReport";
import * as XLSX from "xlsx";

const Simulation = () => {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("annual");
  const [isSaved, setIsSaved] = useState(false);
  const [showSimulationResult, setShowSimulationResult] = useState(false);
  const [data, setData] = useState([]);
  const[fetchDetails,setFetchDetails]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/excel-data",
          {
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data]);
        const reader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setData(parsedData);
          console.log(parsedData);
        };
        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[fetchDetails]);

  



  const [formData, setFormData] = useState({
    TargetYear: "",
    TargetRevenue: "",
    TargetMargin: "",
    minProductPriceRange: "",
    maxProductPriceRange: "",
    upfrontfixedfee: "",

    y1PriceGrowth: "",
    y2PriceGrowth: "",
    y3PriceGrowth: "",
    y4PriceGrowth: "",
    y5PriceGrowth: "",

    mincustomerY1: "",
    maxcustomerY1: "",

    y1CustomerGrowth: "",
    y2CustomerGrowth: "",
    y3CustomerGrowth: "",
    y4CustomerGrowth: "",
    y5CustomerGrowth: "",

    averagecustomerretention: "",
    averagecustomerusage: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/saveSimulationCost",
        formData
      );
      console.log("Server response:", response.data);
      
      setIsSaved(true);
      setFetchDetails(!fetchDetails)
      toast.success("Saved successfully!");

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleSimulate = () => {
    if (!isSaved) {
      toast.error("Please Save Before Simulating.");
      return;
    }
    setFetchDetails(!fetchDetails)
    setShowSimulationResult(true);

    
  };

  return (
    <div className="flex flex-row w-full">
      <div
        className={`${
          open ? "max-w-[440px]" : "w-10"
        } hidden min-h-screen sm:inline-block relative duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-4 dark:bg-slate-800 `}
      >
        <BsArrowLeftCircle
          className={`${
            !open && "rotate-180"
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />

        <div className={`flex ${open && "gap-x-4"} items-center `}>
          <span className="text-primary font-bold  text-xl  cursor-pointer">
            Simulation Input
          </span>
        </div>

        <div className={`flex flex-col ${open && "gap-x-4"}`}>
          <div
            className={`flex flex-row ${open && "gap-4 justify-between"} gap-2`}
          >
            <div className="flex flex-col ">
              <label
                className="text-primary mb-1 mt-1 text-sm font-bold"
                htmlFor="TargetRevenue"
              >
                Target Revenue
              </label>
              <input
                className={`border-secondary border-2  ${
                  open && "max-w-36"
                } text-primary rounded-md p-2 max-w-32 h-6`}
                type="number"
                id="TargetRevenue"
                name="TargetRevenue"
                onChange={handleChange}
                value={formData.TargetRevenue}
              />
            </div>
            <div className="flex flex-col ">
              <label
                className="text-primary mb-1 mt-1 text-sm font-bold"
                htmlFor="TargetYear"
              >
                Target Year
              </label>
              <input
                className={`border-secondary border-2  ${
                  open && "max-w-36"
                } text-primary rounded-md p-2 max-w-32 h-6`}
                type="number"
                id="TargetYear"
                name="TargetYear"
                onChange={handleChange}
                value={formData.TargetYear}
              />
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <label
              className="text-primary mb-1 mt-1 text-sm font-bold"
              htmlFor="TargetMargin"
            >
              Target Margin
            </label>
            <input
              className={`border-secondary border-2  ${
                open && "max-w-36"
              } text-primary rounded-md p-2 max-w-32 h-6`}
              type="number"
              id="TargetMargin"
              name="TargetMargin"
              onChange={handleChange}
              value={formData.TargetMargin}
              
            />
          </div>

          <div className={`flex flex-col ${open && " justify-between"} mt-2`}>
            <div className={`mt-1 text-md font-bold`}>Product Price Range</div>

            <div
              className={`flex flex-row ${open && " justify-between"} gap-2`}
            >
              <div className="flex flex-col ">
                <label
                  className="text-primary mb-1 mt-1 text-sm "
                  htmlFor="minProductPriceRange"
                >
                  Min
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md p-2 max-w-32 h-6`}
                  type="number"
                  id="minProductPriceRange"
                  name="minProductPriceRange"
                  onChange={handleChange}
                  value={formData.minProductPriceRange}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  className="text-primary mb-1 mt-1 text-sm "
                  htmlFor="maxProductPriceRange"
                >
                  Max
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md p-2 max-w-32 h-6`}
                  type="number"
                  id="maxProductPriceRange"
                  name="maxProductPriceRange"
                  onChange={handleChange}
                  value={formData.maxProductPriceRange}
                />
              </div>
            </div>
          </div>

          <div
            className={`flex flex-row ${
              open && "gap-4 justify-between"
            } gap-2 mt-3`}
          >
            <div className="flex flex-col ">
              <label
                className="text-primary mb-1 mt-1 text-sm font-bold"
                htmlFor="upfrontfixedfee"
              >
                Upfront Fixed Fee
              </label>
              <input
                className={`border-secondary border-2  ${
                  open && "max-w-36"
                } text-primary rounded-md p-2 max-w-32 h-6`}
                type="number"
                id="upfrontfixedfee"
                name="upfrontfixedfee"
                onChange={handleChange}
                value={formData.upfrontfixedfee}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-primary mb-1 mt-1 text-sm font-bold"
                htmlFor="subscriptionType"
              >
                Subscription Type
              </label>
              <div className="flex items-center space-x-4">
                <label htmlFor="annual" className="flex items-center">
                  <input
                    type="radio"
                    id="annual"
                    name="subscriptionType"
                    value="annual"
                    className="hidden"
                    checked={selectedOption === "annual"}
                    onChange={() => setSelectedOption("annual")}
                  />
                  <div
                    className={`border-secondary border-2 rounded-md h-6 cursor-pointer ${
                      selectedOption === "annual" ? "bg-back" : ""
                    } max-w-20`}
                  >
                    <span className=" text-sm font-bold p-1  ">
                      Annually
                    </span>
                  </div>
                </label>
                <label htmlFor="monthly" className="flex items-center">
                  <input
                    type="radio"
                    id="monthly"
                    name="subscriptionType"
                    value="monthly"
                    className="hidden"
                    checked={selectedOption === "monthly"}
                    onChange={() => setSelectedOption("monthly")}
                  />
                  <div
                    className={`border-secondary border-2 rounded-md  cursor-pointer ${
                      selectedOption === "monthly" ? "bg-back" : ""
                    } max-w-20 h-6`}
                  >
                    <span className=" text-sm font-bold p-1">
                      Monthly
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className={`mt-3 text-sm font-bold`}>
            YOY Product Price Growth rate
          </div>

          <div className={`flex flex-row  gap-2 mt-1  `}>
            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${
                  open && "ml-1"
                } text-center text-sm  h-6`}
                htmlFor="y1PriceGrowth"
              >
                Y1
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 h-6 text-black`}
                id="y1PriceGrowth"
                type="number"
                name="y1PriceGrowth"
                onChange={handleChange}
                value={formData.y1PriceGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y2PriceGrowth"
              >
                Y2
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 text-black h-6`}
                id="y2PriceGrowth"
                type="number"
                name="y2PriceGrowth"
                onChange={handleChange}
                value={formData.y2PriceGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y3PriceGrowth"
              >
                Y3
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 text-black h-6`}
                id="y3PriceGrowth"
                type="number"
                name="y3PriceGrowth"
                onChange={handleChange}
                value={formData.y3PriceGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y4PriceGrowth"
              >
                Y4
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 text-black h-6`}
                id="y4PriceGrowth"
                type="number"
                name="y4PriceGrowth"
                onChange={handleChange}
                value={formData.y4PriceGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"}text-sm  h-6`}
                htmlFor="y5PriceGrowth"
              >
                Y5
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-12 text-black h-6`}
                id="y5PriceGrowth"
                type="number"
                name="y5PriceGrowth"
                onChange={handleChange}
                value={formData.y5PriceGrowth}
              />
            </div>
          </div>

          {/* <div className={`flex flex-row ${open && "gap-2 ml-2"} gap-2 mt-1 `}>
            <div className="flex flex-row gap-2">
              <label
                className={`mt-2 ${open && "ml-1"} `}
                htmlFor="y4PriceGrowth"
              >
                Y4
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-16"
                } text-primary rounded-lg p-2 max-w-12 text-black`}
                id="y4PriceGrowth"
                type="number"
              />
            </div>

            <div className="flex flex-row gap-2">
              <label
                className={`mt-2 ${open && "ml-1"} `}
                htmlFor="y5PriceGrowth"
              >
                Y5
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-16"
                } text-primary rounded-lg p-2 max-w-12 text-black`}
                id="y5PriceGrowth"
                type="number"
              />
            </div>
          </div> */}
          <div
            className={`flex flex-col ${
              open && "gap-2 justify-between"
            } gap-2 mt-2`}
          >
            <div className={`mt-1 text-sm font-bold  `}>
              Approx No. of Customer in Y1
            </div>

            <div className={`flex flex-row ${open && "justify-between"} gap-2`}>
              <div className="flex flex-col ">
                <label
                  className="text-primary mb-1  text-sm "
                  htmlFor="mincustomerY1"
                >
                  Min
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md p-2 max-w-32 h-6`}
                  type="number"
                  id="mincustomerY1"
                  name="mincustomerY1"
                  onChange={handleChange}
                  value={formData.mincustomerY1}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  className="text-primary mb-1  text-sm "
                  htmlFor="maxcustomerY1"
                >
                  Max
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md p-2 max-w-32 h-6`}
                  type="number"
                  id="maxcustomerY1"
                  name="maxcustomerY1"
                  onChange={handleChange}
                  value={formData.maxcustomerY1}
                />
              </div>
            </div>
          </div>

          <div className={`mt-3 text-sm font-bold `}>
            YOY Customer Growth rate
          </div>

          <div className={`flex flex-row  gap-2 mt-1 `}>
            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${
                  open && "ml-1"
                } text-center text-sm  h-6 `}
                htmlFor="y1CustomerGrowth"
              >
                Y1
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 h-6 text-black`}
                id="y1CustomerGrowth"
                type="number"
                name="y1CustomerGrowth"
                onChange={handleChange}
                value={formData.y1CustomerGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6 `}
                htmlFor="y2CustomerGrowth"
              >
                Y2
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 text-black h-6`}
                id="y2CustomerGrowth"
                type="number"
                name="y2CustomerGrowth"
                onChange={handleChange}
                value={formData.y2CustomerGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y3CustomerGrowth"
              >
                Y3
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 h-6 text-black`}
                id="y3CustomerGrowth"
                type="number"
                name="y3CustomerGrowth"
                onChange={handleChange}
                value={formData.y3CustomerGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y4CustomerGrowth"
              >
                Y4
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md p-2 max-w-14 text-black h-6`}
                id="y4CustomerGrowth"
                type="number"
                name="y4CustomerGrowth"
                onChange={handleChange}
                value={formData.y4CustomerGrowth}
              />
            </div>

            <div className="flex flex-row gap-1 pt-1">
              <label
                className={`mt-1 ${open && "ml-1"} text-sm  h-6`}
                htmlFor="y5CustomerGrowth"
              >
                Y5
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-10"
                } text-primary rounded-md h-6 p-2 max-w-12 text-black`}
                id="y5CustomerGrowth"
                type="number"
                name="y5CustomerGrowth"
                onChange={handleChange}
                value={formData.y5CustomerGrowth}
              />
            </div>
          </div>
          {/* <div className={`flex flex-row ${open && "gap-2 ml-2"} gap-2 mt-1 `}>
            <div className="flex flex-row gap-2">
              <label
                className={`mt-2 ${open && "ml-1"} `}
                htmlFor="y4CustomerGrowth"
              >
                Y4
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-16"
                } text-primary rounded-lg p-2 max-w-12 text-black`}
                id="y4CustomerGrowth"
                type="number"
              />
            </div>

            <div className="flex flex-row gap-2">
              <label
                className={`mt-2 ${open && "ml-1"} `}
                htmlFor="y5CustomerGrowth"
              >
                Y5
              </label>
              <input
                className={`border-secondary border-2 ${
                  open && "max-w-16"
                } text-primary rounded-lg p-2 max-w-12 text-black`}
                id="y5CustomerGrowth"
                type="number"
              />
            </div>
          </div> */}

          <div className="flex flex-col ">
            <label
              className="text-primary mb-1 mt-1 text-sm font-bold"
              htmlFor="averagecustomerretention"
            >
              Average Yearly Customer Retenation Rate
            </label>
            <input
              className={`border-secondary border-2  ${
                open && "max-w-36"
              } text-primary rounded-md h-6 p-2 max-w-32`}
              type="number"
              id="averagecustomerretention"
              name="averagecustomerretention"
              onChange={handleChange}
              value={formData.averagecustomerretention}
            />
          </div>

          <div className="flex flex-col ">
            <label
              className="text-primary mb-1 mt-2 text-sm font-bold"
              htmlFor="averagecustomerusage"
            >
              Average User per Customer at the start
            </label>
            <input
              className={`border-secondary border-2  ${
                open && "max-w-36"
              } text-primary rounded-md h-6 p-2 max-w-32`}
              type="number"
              id="averagecustomerusage"
              name="averagecustomerusage"
              onChange={handleChange}
              value={formData.averagecustomerusage}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-4 "
            onClick={() => handleSubmit()}
          >
            Save
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded "
          onClick={()=>handleSimulate()}>
            Simulate
          </button>
        </div>
      </div>
      <ToastContainer />

      <div className="border border-secondary rounded-md shadow-xl bg-primary px-2   w-full mx-auto min-h-screen">

      {showSimulationResult && (
        <div className="border border-secondary rounded-2xl shadow-xl bg-primary px-2 max-w-5xl mt-4  w-full mx-auto">
        <SimulationReport data={data}/>

          
        </div>
      )}

      </div>
    </div>
  );
};

export default Simulation;
