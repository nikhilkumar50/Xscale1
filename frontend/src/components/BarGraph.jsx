import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BarGraph({
  firstData,
  secondData,
  thirdData,
  fourthData,
  fifthData,
}) {
  const data = {
    labels: ['y1', 'y2', 'y3', 'y4', 'y5'],
    datasets: [
      {
        label: 'Retention Customers',
        data: [
          firstData.__EMPTY_4,
          secondData.__EMPTY_4,
          thirdData.__EMPTY_4,
          fourthData.__EMPTY_4,
          fifthData.__EMPTY_4,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Light blue
      },
      {
        label: 'New Customers',
        data: [
          firstData.__EMPTY_5,
          secondData.__EMPTY_5,
          thirdData.__EMPTY_5,
          fourthData.__EMPTY_5,
          fifthData.__EMPTY_5,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Pink
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-md h-64" >
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarGraph;
