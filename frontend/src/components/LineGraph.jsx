import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function LineGraph({
  firstData,
  secondData,
  thirdData,
  fourthData,
  fifthData,
}) {
  const data = {
    labels: ["y1", "y2", "y3", "y4", "y5"],
    datasets: [
      {
        label: "EBITA",
        data: [
          firstData.__EMPTY_6,
          secondData.__EMPTY_6,
          thirdData.__EMPTY_6,
          fourthData.__EMPTY_6,
          fifthData.__EMPTY_6,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value) => value + "%",
        },
      },
    },
  };

  return (
    <div className="w-full h-56">
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraph;
