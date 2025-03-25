import React from 'react';
import './KpiCardStyles.css';

// Functional component that displays a single KPI card
const KpiCard = ({ title, value, percentage, isPositive }) => {
  const safeValue = typeof value === 'number' ? `$${value.toLocaleString()}` : 'N/A';
  const safePercentage = typeof percentage === 'number' ? `${Math.abs(percentage)}%` : '–';

  return (
    <div className="kpi-card">
      {/* KPI title: e.g., "Sales", "Profit Ratio" */}
      <div className="kpi-title">{title || 'Untitled KPI'}</div>

      {/* Main value: formatted with commas */}
      <div className="kpi-value">{safeValue}</div>

      {/* Change indicator: shows arrow and % change */}
      <div className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
        {/* Arrow symbol and % */}
        {isPositive ? '▲' : '▼'} {safePercentage}
      </div>
    </div>
  );
};

// Optional: set default props
KpiCard.defaultProps = {
  title: 'KPI',
  value: 0,
  percentage: 0,
  isPositive: true
};

export default KpiCard;
