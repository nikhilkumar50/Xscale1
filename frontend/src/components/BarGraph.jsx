import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BarGraph() {
  const data = {
    labels: ['y1', 'y2', 'y3', 'y4', 'y5'],
    datasets: [
      {
        label: 'Retention Customers',
        data: [250, 300, 200, 180, 220],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Light blue
      },
      {
        label: 'New Customers',
        data: [30, 50, 60, 80, 60],
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
