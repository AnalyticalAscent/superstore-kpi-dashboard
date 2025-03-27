/* eslint-disable prettier/prettier */
// React imports
import React, { useEffect, useState } from 'react';

// Import the KPI Card component
import KpiCard from './KpiCard';

// Import shared CSS styles
import './KpiCardStyles.css';

// Dashboard component: renders the grid of KPI cards
const Dashboard = () => {
  // React state to hold the fetched KPI data
  const [kpiData, setKpiData] = useState([]);
  const [cardView, setCardView] = useState('front'); // Options: "front" | "back" | "chart"
  const [activeChartIndex, setActiveChartIndex] = useState(null); // per-card click state
  const handleCardClick = (index) => {
    setActiveChartIndex((prev) => (prev === index ? null : index));
  };

  // useEffect runs once after component mounts
  useEffect(() => {
    // Fetch the JSON data from public/data/dashboard.json
    fetch('/data/dashboard.json')
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setKpiData(data)) // Set the data in state
      .catch((err) => console.error('Failed to load KPI data:', err));
  }, []); // Empty dependency array = run once when component mounts

  // 🔹 Render the dashboard layout with a grid of KPI cards
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Superstore KPI Dashboard</h1>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <button
          className={cardView === 'front' ? 'active' : ''}
          onClick={() => {
            setCardView('front');
            setActiveChartIndex(null);
          }}
        >
          🔹 KPI View
        </button>

        <button
          className={cardView === 'chart' ? 'active' : ''}
          onClick={() => {
            setCardView('chart');
            setActiveChartIndex(null);
          }}
        >
          📈 Mini Chart
        </button>

        <button
          className={cardView === 'back' ? 'active' : ''}
          onClick={() => {
            setCardView('back');
            setActiveChartIndex(null);
          }}
        >
          📘 Info
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Map through KPI data and render a KpiCard for each item */}
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index} // Unique key for React
            title={kpi.title} // KPI title, e.g. "Sales"
            value={kpi.value} // Numeric value, e.g. 85175
            percentage={kpi.percentage} // % change
            isPositive={kpi.isPositive} // Boolean: true = positive trend
            description={kpi.description}
            view={activeChartIndex === index ? 'bar' : cardView} // Current view mode: "front" | "back" | "chart" | "bar"
            onClick={() => handleCardClick(index)} // click a card to swap to bar click agahin to return
            chartType="bar"
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
