import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputCost = () => {
  const [fixedCostForm, setFixedCostForm] = useState(false);
  const [variableCostFrom, setVariableCostForm] = useState(false);
  const [productDetailsForm, setProductDetailsForm] = useState(false);
  const [yoyTable, setYoyTable] = useState(false);

  const [formData, setFormData] = useState({
    costTitle: "",
    description: "",
    ProductName: "",
    geolocation: "",

    upFrontProductDevelopmentCost: "",
    ongoingproductdevelopmentCost: "",
    otherFixedAdminCost: "",
    otherFixedInfrastructureCost: "",
    upfrontImplementationCostPerCustomer: "",
    salesAndMarketingCost: "",
    extraCostSpace1: "",
    extraCostSpace2: "",

    infrastructureBasedCostPerUserPerYear: "",
    ImplementationCostPerUser: "",
    supportCostPerYearPerUser: "",
    incrementalSaledAndMarketingCostPerUser: "",
    costOfCapital: "",
    otherVariableCost: "",

    product_development_cost_y1: "",
    product_development_cost_y2: "",
    product_development_cost_y3: "",
    product_development_cost_y4: "",
    product_development_cost_y5: "",

    admin_cost_y1: "",
    admin_cost_y2: "",
    admin_cost_y3: "",
    admin_cost_y4: "",
    admin_cost_y5: "",

    infrastructure_cost_y1: "",
    infrastructure_cost_y2: "",
    infrastructure_cost_y3: "",
    infrastructure_cost_y4: "",
    infrastructure_cost_y5: "",

    sales_marketing_y1: "",
    sales_marketing_y2: "",
    sales_marketing_y3: "",
    sales_marketing_y4: "",
    sales_marketing_y5: "",

    fixed_cost1_y1: "",
    fixed_cost1_y2: "",
    fixed_cost1_y3: "",
    fixed_cost1_y4: "",
    fixed_cost1_y5: "",

    fixed_cost2_y1: "",
    fixed_cost2_y2: "",
    fixed_cost2_y3: "",
    fixed_cost2_y4: "",
    fixed_cost2_y5: "",

    implementation_cost_y1: "",
    implementation_cost_y2: "",
    implementation_cost_y3: "",
    implementation_cost_y4: "",
    implementation_cost_y5: "",

    usage_based_cost_y1: "",
    usage_based_cost_y2: "",
    usage_based_cost_y3: "",
    usage_based_cost_y4: "",
    usage_based_cost_y5: "",

    onboarding_cost_per_user_y1: "",
    onboarding_cost_per_user_y2: "",
    onboarding_cost_per_user_y3: "",
    onboarding_cost_per_user_y4: "",
    onboarding_cost_per_user_y5: "",

    support_cost_per_user_y1: "",
    support_cost_per_user_y2: "",
    support_cost_per_user_y3: "",
    support_cost_per_user_y4: "",
    support_cost_per_user_y5: "",

    incremental_sales_cost_y1: "",
    incremental_sales_cost_y2: "",
    incremental_sales_cost_y3: "",
    incremental_sales_cost_y4: "",
    incremental_sales_cost_y5: "",

    other_variable_cost_y1: "",
    other_variable_cost_y2: "",
    other_variable_cost_y3: "",
    other_variable_cost_y4: "",
    other_variable_cost_y5: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePercentageChange = (event) => {
    let value = event.target.value;
    
    
    if (!value.endsWith('%')) {
      
      value += '%';
    }
    
    
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };
  
  

  const staticValues = [
    "YOY % Change in Product Development Cost",
    "YOY % Change in Admin Cost",
    "YOY % Change in infrastructure Cost",
    "YOY % Change in Sales and Marketing ",
    "YOY % Change in Other fixed Cost 1",
    "YOY % Change in Other fixed Cost 2",
    "YOY % Change in Upfront implementation/Onboarding Cost",
    "YOY % Change in infrastructure or Usage Based cost per user/per year",
    "YOY % Changein Implementation/Onboarding Cost Per User",
    "YOY % Change in Support Cost Per User",
    "YOY % Change un Incremental Sales and Marketing Cost per user",
    "YOY % Change in Other Variable Cost",
  ];

  const productDetails = () => {
    setProductDetailsForm(!productDetailsForm);
  };
  const yoyDetails = () => {
    setYoyTable(!yoyTable);
  };

  const fixedCostDetails = () => {
    setFixedCostForm(!fixedCostForm);
  };
  const variableCostDetails = () => {
    setVariableCostForm(!variableCostFrom);
  };

  const handleSubmit = async (event) => {
    if (!formData.costTitle || !formData.description || !formData.ProductName || !formData.geolocation) {
      
      toast.error("Required Field are empty .");
      return false;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/saveInputCost",
        formData
      );
      console.log("Server response:", response.data);
      console.log(formData);
      toast.success("Saved successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="rounded-div my-4 pt-1 min-h-auto ">
      <h1 className="text-primary bg-back font-bold  mb-4 p-3 text-center border border-secondary rounded-md shadow-xl px-2 max-w-[1110px] w-full mx-auto py-3">
        Cost Information
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h2
            className="text-primary font-bold mb-6 mt-6 px-2 cursor-pointer"
            onClick={productDetails}
          >
            Product Details
            <span className="cursor-pointer" onClick={productDetails}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {productDetailsForm ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
            </span>
          </h2>
          {productDetailsForm && (
            <div className="secondary-div ">
              <div className="md:max-w-[450px]">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <label className="text-primary mb-2 " htmlFor="costTitle">
                    Cost Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border-secondary border-2 text-primary rounded-md p-2 h-10"
                    type="text"
                    id="costTitle"
                    name="costTitle"
                    onChange={handleChange}
                    value={formData.costTitle}
                    
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <label className="text-primary mb-2 text-md" htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="border-secondary border-2 rounded-md p-2 min-h-12"
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="md:max-w-[450px] grid grid-cols-2 gap-4 mb-4">
                  <label className="text-primary " htmlFor="ProductName">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="ProductName"
                    name="ProductName"
                    onChange={handleChange}
                    value={formData.ProductName}
                  />
                </div>

                <div className="md:max-w-[450px] grid grid-cols-2 gap-4 mb-4">
                  <label className="text-primary mb-2" htmlFor="geolocation">
                    Geo Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="geolocation"
                    name="geolocation"
                    onChange={handleChange}
                    value={formData.geolocation}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2
            className="text-primary font-bold mb-6 mt-6 px-2 cursor-pointer"
            onClick={fixedCostDetails}
          >
            Fixed Cost for First Year
            <span className="cursor-pointer" onClick={fixedCostDetails}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {fixedCostForm ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
            </span>
          </h2>

          {fixedCostForm && (
            <div className="secondary-div">
              <div className="grid grid-cols-2 gap-8">
                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="upFrontProductDevelopmentCost"
                  >
                    Product Development Cost (One Time)
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="upFrontProductDevelopmentCost"
                    name="upFrontProductDevelopmentCost"
                    onChange={handleChange}
                    value={formData.upFrontProductDevelopmentCost}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="ongoingproductdevelopmentCost"
                  >
                    Ongoing Product Development Cost
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="ongoingproductdevelopmentCost"
                    name="ongoingproductdevelopmentCost"
                    onChange={handleChange}
                    value={formData.ongoingproductdevelopmentCost}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="otherFixedAdminCost"
                  >
                    Other Fixed Admin Cost
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="otherFixedAdminCost"
                    name="otherFixedAdminCost"
                    onChange={handleChange}
                    value={formData.otherFixedAdminCost}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="otherFixedInfrastructureCost"
                  >
                    Other Fixed Infrastructure Cost
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="otherFixedInfrastructureCost"
                    name="otherFixedInfrastructureCost"
                    onChange={handleChange}
                    value={formData.otherFixedInfrastructureCost}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="upfrontImplementationCostPerCustomer"
                  >
                    Upfront Implementation Cost Per Customer
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="upfrontImplementationCostPerCustomer"
                    name="upfrontImplementationCostPerCustomer"
                    onChange={handleChange}
                    value={formData.upfrontImplementationCostPerCustomer}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="salesAndMarketingCost"
                  >
                    Sales And Marketing Cost
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="salesAndMarketingCost"
                    name="salesAndMarketingCost"
                    onChange={handleChange}
                    value={formData.salesAndMarketingCost}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="extraCostSpace1"
                  >
                    Any Other Cost 1
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="extraCostSpace1"
                    name="extraCostSpace1"
                    onChange={handleChange}
                    value={formData.extraCostSpace1}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="extraCostSpace2"
                  >
                    Any Other Cost 2
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="extraCostSpace2"
                    name="extraCostSpace2"
                    onChange={handleChange}
                    value={formData.extraCostSpace2}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2
            className="text-primary font-bold mb-6 mt-6 px-2 cursor-pointer"
            onClick={variableCostDetails}
          >
            Variable Cost per User for First Year
            <span className="cursor-pointer" onClick={variableCostDetails}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {variableCostFrom ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
            </span>
          </h2>

          {variableCostFrom && (
            <div className="secondary-div mb-2">
              <div className="grid grid-cols-2 gap-8">
                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="infrastructureBasedCostPerUserPerYear"
                  >
                    Infrastructure or Usage Based Cost per user/per year
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="infrastructureBasedCostPerUserPerYear"
                    name="infrastructureBasedCostPerUserPerYear"
                    onChange={handleChange}
                    value={formData.infrastructureBasedCostPerUserPerYear}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="ImplementationCostPerUser"
                  >
                    Implementation/Onboarding Cost per user(One-time)
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="ImplementationCostPerUser"
                    name="ImplementationCostPerUser"
                    onChange={handleChange}
                    value={formData.ImplementationCostPerUser}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="supportCostPerYearPerUser"
                  >
                    Support Cost per year/per user
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="supportCostPerYearPerUser"
                    name="supportCostPerYearPerUser"
                    onChange={handleChange}
                    value={formData.supportCostPerYearPerUser}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="incrementalSaledAndMarketingCostPerUser"
                  >
                    Incremental Sales and Marketing Cost per user
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="incrementalSaledAndMarketingCostPerUser"
                    name="incrementalSaledAndMarketingCostPerUser"
                    onChange={handleChange}
                    value={formData.incrementalSaledAndMarketingCostPerUser}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label className="text-primary mb-2" htmlFor="costOfCapital">
                    Cost of Capital
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="costOfCapital"
                    name="costOfCapital"
                    onChange={handleChange}
                    value={formData.costOfCapital}
                  />
                </div>

                <div className="md:w-full grid grid-cols-2 gap-4">
                  <label
                    className="text-primary mb-2"
                    htmlFor="otherVariableCost"
                  >
                    Other Variable Cost
                  </label>
                  <input
                    className="border-secondary border-2 rounded-md p-2 h-10"
                    type="text"
                    id="otherVariableCost"
                    name="otherVariableCost"
                    onChange={handleChange}
                    value={formData.otherVariableCost}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2
            className="text-primary font-bold mb-6 mt-6 px-2  cursor-pointer"
            onClick={yoyDetails}
          >
            YOY % Changes
            <span className="cursor-pointer" onClick={yoyDetails}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {yoyTable ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                )}
              </svg>
            </span>
          </h2>
          {yoyTable && (
            <div className="secondary-div mb-4 ">
              {
                <table className="mt-4 text-center border border-secondary rounded-md shadow-xl px-2 max-w-[1110px] w-full mx-auto">
                  <thead>
                    <tr className="border-r border-secondary">
                      <th className="text-left border-r text-primary border-secondary">
                        YOY% Change
                      </th>
                      <th className="border-r border-secondary text-primary">
                        Y1-Y2
                      </th>
                      <th className="border-r border-secondary text-primary">
                        Y2-Y3
                      </th>
                      <th className="border-r border-secondary text-primary">
                        Y3-Y4
                      </th>
                      <th className="border-r border-secondary text-primary">
                        Y4-Y5
                      </th>
                      <th className="border-r border-secondary text-primary">
                        Y5-Y6
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Product Development Cost
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="product_development_cost_y1"
                          name="product_development_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange} 
                          value={formData.product_development_cost_y1 } 

                          
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="product_development_cost_y2"
                          name="product_development_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.product_development_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="product_development_cost_y3"
                          name="product_development_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.product_development_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="product_development_cost_y4"
                          name="product_development_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.product_development_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="product_development_cost_y5"
                          name="product_development_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.product_development_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Admin Cost
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="admin_cost_y1"
                          name="admin_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.admin_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="admin_cost_y2"
                          name="admin_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.admin_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="admin_cost_y3"
                          name="admin_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.admin_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="admin_cost_y4"
                          name="admin_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.admin_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="admin_cost_y5"
                          name="admin_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.admin_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in infrastructure Cost
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="infrastructure_cost_y1"
                          name="infrastructure_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.infrastructure_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="infrastructure_cost_y2"
                          name="infrastructure_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.infrastructure_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="infrastructure_cost_y3"
                          name="infrastructure_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.infrastructure_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="infrastructure_cost_y4"
                          name="infrastructure_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.infrastructure_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="infrastructure_cost_y5"
                          name="infrastructure_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.infrastructure_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Sales and Marketing
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="sales_marketing_y1"
                          name="sales_marketing_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.sales_marketing_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="sales_marketing_y2"
                          name="sales_marketing_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.sales_marketing_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="sales_marketing_y3"
                          name="sales_marketing_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.sales_marketing_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="sales_marketing_y4"
                          name="sales_marketing_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.sales_marketing_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="sales_marketing_y5"
                          name="sales_marketing_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.sales_marketing_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Other fixed Cost 1
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost1_y1"
                          name="fixed_cost1_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost1_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost1_y2"
                          name="fixed_cost1_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost1_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost1_y3"
                          name="fixed_cost1_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost1_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost1_y4"
                          name="fixed_cost1_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost1_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost1_y5"
                          name="fixed_cost1_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost1_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Other fixed Cost 2
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost2_y1"
                          name="fixed_cost2_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost2_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost2_y2"
                          name="fixed_cost2_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost2_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost2_y3"
                          name="fixed_cost2_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost2_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost2_y4"
                          name="fixed_cost2_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost2_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="fixed_cost2_y5"
                          name="fixed_cost2_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.fixed_cost2_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Upfront implementation/Onboarding Cost
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="implementation_cost_y1"
                          name="implementation_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.implementation_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="implementation_cost_y2"
                          name="implementation_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.implementation_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="implementation_cost_y3"
                          name="implementation_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.implementation_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="implementation_cost_y4"
                          name="implementation_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.implementation_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="implementation_cost_y5"
                          name="implementation_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.implementation_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in infrastructure or Usage Based cost per
                        user/per year
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="usage_based_cost_y1"
                          name="usage_based_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.usage_based_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="usage_based_cost_y2"
                          name="usage_based_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.usage_based_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="usage_based_cost_y3"
                          name="usage_based_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.usage_based_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="usage_based_cost_y4"
                          name="usage_based_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.usage_based_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="usage_based_cost_y5"
                          name="usage_based_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.usage_based_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Implementation/Onboarding Cost Per User
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="onboarding_cost_per_user_y1"
                          name="onboarding_cost_per_user_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.onboarding_cost_per_user_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="onboarding_cost_per_user_y2"
                          name="onboarding_cost_per_user_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.onboarding_cost_per_user_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="onboarding_cost_per_user_y3"
                          name="onboarding_cost_per_user_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.onboarding_cost_per_user_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="onboarding_cost_per_user_y4"
                          name="onboarding_cost_per_user_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.onboarding_cost_per_user_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="onboarding_cost_per_user_y5"
                          name="onboarding_cost_per_user_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.onboarding_cost_per_user_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Support Cost Per User
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="support_cost_per_user_y1"
                          name="support_cost_per_user_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.support_cost_per_user_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="support_cost_per_user_y2"
                          name="support_cost_per_user_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.support_cost_per_user_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="support_cost_per_user_y3"
                          name="support_cost_per_user_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.support_cost_per_user_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="support_cost_per_user_y4"
                          name="support_cost_per_user_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.support_cost_per_user_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="support_cost_per_user_y5"
                          name="support_cost_per_user_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.support_cost_per_user_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Incremental Sales and Marketing Cost per
                        user
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="incremental_sales_cost_y1"
                          name="incremental_sales_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.incremental_sales_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="incremental_sales_cost_y2"
                          name="incremental_sales_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.incremental_sales_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="incremental_sales_cost_y3"
                          name="incremental_sales_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.incremental_sales_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="incremental_sales_cost_y4"
                          name="incremental_sales_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.incremental_sales_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="incremental_sales_cost_y5"
                          name="incremental_sales_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.incremental_sales_cost_y5}
                        />
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="text-left border-r text-primary border-secondary">
                        YOY % Change in Other Variable Cost
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="other_variable_cost_y1"
                          name="other_variable_cost_y1"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.other_variable_cost_y1}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="other_variable_cost_y2"
                          name="other_variable_cost_y2"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.other_variable_cost_y2}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="other_variable_cost_y3"
                          name="other_variable_cost_y3"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.other_variable_cost_y3}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="other_variable_cost_y4"
                          name="other_variable_cost_y4"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.other_variable_cost_y4}
                        />
                      </td>
                      <td className="border-r border-secondary">
                        <input
                          type="text"
                          id="other_variable_cost_y5"
                          name="other_variable_cost_y5"
                          className="border border-secondary rounded-md max-w-10 md:max-w-14 lg:max-w-24"
                          onChange={handleChange}
                          value={formData.other_variable_cost_y5}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          )}
        </div>
      </div>

      <div className="text-primary bg-back font-bold mb-4 p-3 text-center border border-secondary rounded-md shadow-xl px-2 max-w-[1110px] w-full mx-auto py-2 flex justify-between items-center">
        <div className="flex-grow"></div>{" "}
        {/* Empty div to push buttons to the right */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-4"
          onClick={() => handleSubmit()}
        >
          Save
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded">
          Cancel
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default InputCost;
