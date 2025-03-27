import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const metricMap = {
  'Total Sales': 'Total_Sales',
  'Profit Ratio': 'Profit_Ratio',
  'Avg Discount': 'Avg_Discount',
  'Unique Customers': 'Unique_Customers'
};

const MiniKpiChart = ({ title, chartType = 'line' }) => {
  const [data, setData] = useState(null);
  const metric = metricMap[title];

  useEffect(() => {
    fetch('/data/monthlydata.json')
      .then((res) => res.json())
      .then((json) => {
        setData({
          labels: json.map((d) => d.Month),
          datasets: [
            {
              data: json.map((d) => d[metric]),
              borderColor: '#1f77b4',
              backgroundColor: 'rgba(31,119,180,0.1)',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4
            }
          ]
        });
      });
  }, [metric]);

  if (!data) return <p style={{ fontSize: '0.8rem' }}>Loading chart...</p>;

  return chartType === 'bar' ? (
    <Bar
      data={data}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true, ticks: { maxTicksLimit: 6 } },
          y: { display: true }
        }
      }}
    />
  ) : (
    <Line
      data={data}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true, ticks: { maxTicksLimit: 6 } },
          y: { display: true }
        }
      }}
    />
  );
};

export default MiniKpiChart;
