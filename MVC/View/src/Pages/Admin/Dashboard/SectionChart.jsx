import React from 'react';
import { Bar } from 'react-chartjs-2';

const SectionChart = ({ data }) => {
  const totalOrders = data ? data.length : 0;
  const pendingOrders = data ? data.filter(order => order.status === 'pending').length : 0;

  const chartData = {
    labels: ['Toplam Sipariş', 'Bekleyen Sipariş'], 
    datasets: [
      {
        label: 'Siparişler',
        data: [totalOrders, pendingOrders],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default SectionChart; 