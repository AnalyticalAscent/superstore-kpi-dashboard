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
    <div className="dashboard-grid">
      {/* Map through KPI data and render a KpiCard for each item */}
      {kpiData.map((kpi, index) => (
        <KpiCard
          key={index} // Unique key for React
          title={kpi.title} // KPI title, e.g. "Sales"
          value={kpi.value} // Numeric value, e.g. 85175
          percentage={kpi.percentage} // % change
          isPositive={kpi.isPositive} // Boolean: true = positive trend
        />
      ))}
    </div>
  );
};

export default Dashboard;
