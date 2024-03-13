import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; 
function LineGraph() {
  const data = {
    labels: ['y1', 'y2', 'y3', 'y4', 'y5'],
    datasets: [
      {
        label: 'Margin',
        data: [5, 10, 20, 30, 15],
        borderColor: 'rgb(255, 99, 132)', 
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
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
          callback: (value) => value + '%'
        }
      }
    }
  };

  return (
    <div className="w-full "> 
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraph;
