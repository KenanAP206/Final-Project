import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShowsChart = ({ data }) => {
  // Calculate the number of shows and movies
  const totalShows = data ? data.length : 0;
  const watchedShows = data ? data.filter(show => show.watched).length : 0; // Watched shows

  const chartData = {
    labels: ['Total Shows/Movies', 'Watched Shows/Movies'], // Example labels
    datasets: [
      {
        label: 'Shows/Movies Statistics',
        data: [totalShows, watchedShows],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ShowsChart; 