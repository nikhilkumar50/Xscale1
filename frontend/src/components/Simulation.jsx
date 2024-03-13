import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimulationReport from "./SimulationReport";
import { TbReportSearch } from "react-icons/tb";
import * as XLSX from "xlsx";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import DataDisplay from "./DataDisplay";

const Simulation = () => {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("annual");
  const [isSaved, setIsSaved] = useState(false);
  const [showSimulationResult, setShowSimulationResult] = useState(false);
  const [data, setData] = useState([]);
  const [fetchDetails, setFetchDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/excel-data'); 
        setData(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDetails]);

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

    subscriptionType: selectedOption,
  });

  const handleChange = (event) => {
    event.preventDefault();
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
      setIsSaved(true);
      setFetchDetails(!fetchDetails);
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
    setFetchDetails(!fetchDetails);
    setShowSimulationResult(true);
    setOpen(!open);
  };

  return (
    <div className="flex flex-row w-full">
      <div
        className={`${
          open ? "max-w-[440px]" : "w-fit"
        } hidden min-h-screen sm:inline-block relative duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-4 dark:bg-slate-800 `}
      >
        <BsArrowLeftCircle
          className={`${
            !open && "rotate-180"
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className={`flex ${open && "gap-x-4"} items-center `}>
            <span className="text-primary font-bold  text-xl  cursor-pointer">
              Simulation Input
            </span>
          </div>
        )}

        {!open && <TbReportSearch className="pl-2 w-16 h-10" />}

        <div className={`flex flex-col ${open && "gap-x-4"}`}>
          {open && (
            <>
              <div
                className={`flex flex-row ${
                  open && "gap-4 justify-between"
                } gap-2`}
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
                    type="text"
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
                    type="text"
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
                  Target Margin(%)
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md p-2 max-w-32 h-6`}
                  type="text"
                  id="TargetMargin"
                  name="TargetMargin"
                  onChange={handleChange}
                  value={formData.TargetMargin}
                  autoComplete="off"
                />
              </div>

              <div
                className={`flex flex-col ${open && " justify-between"} mt-2`}
              >
                <div className={`mt-1 text-md font-bold`}>
                  Product Price Range
                </div>

                <div
                  className={`flex flex-row ${
                    open && " justify-between"
                  } gap-2`}
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
                      type="text"
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
                      type="text"
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
                    type="text"
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
                        value="Annually"
                        className="hidden"
                        checked={selectedOption === "annual"}
                        onChange={handleChange}
                        onClick={() => setSelectedOption("annual")}
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
                        onChange={handleChange}
                        onClick={() => setSelectedOption("monthly")}
                      />
                      <div
                        className={`border-secondary border-2 rounded-md  cursor-pointer ${
                          selectedOption === "monthly" ? "bg-back" : ""
                        } max-w-20 h-6`}
                      >
                        <span className=" text-sm font-bold p-1">Monthly</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`mt-3 text-sm font-bold`}>
                YOY Product Price Growth rate(%)
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
                    type="text"
                    name="y1PriceGrowth"
                    onChange={handleChange}
                    value={formData.y1PriceGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y2PriceGrowth"
                    onChange={handleChange}
                    value={formData.y2PriceGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y3PriceGrowth"
                    onChange={handleChange}
                    value={formData.y3PriceGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y4PriceGrowth"
                    onChange={handleChange}
                    value={formData.y4PriceGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y5PriceGrowth"
                    onChange={handleChange}
                    value={formData.y5PriceGrowth}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  open && "gap-2 justify-between"
                } gap-2 mt-2`}
              >
                <div className={`mt-1 text-sm font-bold  `}>
                  Approx No. of Customer in Y1
                </div>

                <div
                  className={`flex flex-row ${open && "justify-between"} gap-2`}
                >
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
                      type="text"
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
                      type="text"
                      id="maxcustomerY1"
                      name="maxcustomerY1"
                      onChange={handleChange}
                      value={formData.maxcustomerY1}
                    />
                  </div>
                </div>
              </div>

              <div className={`mt-3 text-sm font-bold `}>
                YOY Customer Growth rate(%)
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
                    type="text"
                    name="y1CustomerGrowth"
                    onChange={handleChange}
                    value={formData.y1CustomerGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y2CustomerGrowth"
                    onChange={handleChange}
                    value={formData.y2CustomerGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y3CustomerGrowth"
                    onChange={handleChange}
                    value={formData.y3CustomerGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y4CustomerGrowth"
                    onChange={handleChange}
                    value={formData.y4CustomerGrowth}
                    autoComplete="off"
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
                    type="text"
                    name="y5CustomerGrowth"
                    onChange={handleChange}
                    value={formData.y5CustomerGrowth}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-primary mb-1 mt-1 text-sm font-bold"
                  htmlFor="averagecustomerretention"
                >
                  Average Yearly Customer Retenation Rate(%)
                </label>
                <input
                  className={`border-secondary border-2  ${
                    open && "max-w-36"
                  } text-primary rounded-md h-6 p-2 max-w-32`}
                  type="text"
                  id="averagecustomerretention"
                  name="averagecustomerretention"
                  onChange={handleChange}
                  value={formData.averagecustomerretention}
                  autoComplete="off"
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
                  type="text"
                  id="averagecustomerusage"
                  name="averagecustomerusage"
                  onChange={handleChange}
                  value={formData.averagecustomerusage}
                />
              </div>
            </>
          )}
        </div>

        {open && (
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-4 "
              onClick={() => handleSubmit()}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded "
              onClick={() => handleSimulate()}
            >
              Simulate
            </button>
          </div>
        )}
      </div>

      <ToastContainer />

      <div className="w-full border border-secondary rounded-md shadow-xl bg-primary px-2 min-h-screen">
        {showSimulationResult && (
          <>
            <h1 className="text-xl font-bold text-center mb-4 p-4">
              Simulation Result
            </h1>
            <div className="flex flex-row gap-1">
              <div className="w-3/4  mt-4 mb-2">
                <SimulationReport data={data} />
              </div>
              <div className="w-1/4 border border-secondary rounded-md shadow-xl bg-primary px-2 p-5  mt-4 mb-2">
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Margin Over Years</h1>
                  <LineGraph />
                </div>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Customers Over Years</h1>
                  <BarGraph />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

     
    </div>
  );
};
export default Simulation;
