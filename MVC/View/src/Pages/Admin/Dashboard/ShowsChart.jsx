import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShowsChart = ({ data }) => {
  const totalShows = data ? data.length : 0;
  const premiumShows = data ? data.filter(show => show.premium).length : 0;

  const chartData = {
    labels: ['Total Shows/Movies', 'Premium Shows/Movies'], 
    datasets: [
      {
        label: 'Shows/Movies Statistics',
        data: [totalShows, premiumShows],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ShowsChart; 