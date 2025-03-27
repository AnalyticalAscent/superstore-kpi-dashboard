/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/data/monthlydata.json')
      .then((res) => res.json())
      .then((data) => {
        const months = data.map((d) => d.Month);
        const sales = data.map((d) => d.Total_Sales);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Monthly Sales ($)',
              data: sales,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              tension: 0.3,
              pointRadius: 3,
              fill: true
            }
          ]
        });
      });
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '1rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>📈 Monthly Sales</h2>
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default SalesChart;
