/* eslint-disable prettier/prettier */
import React from 'react';
import './KpiCardStyles.css';
import MiniKpiChart from './MiniKpiChart';

// Functional component that displays a single KPI card
const KpiCard = ({ title, value, percentage, isPositive, description, view, onClick }) => {
  const safeValue = typeof value === 'number' ? `$${value.toLocaleString()}` : 'N/A';
  const safePercentage = typeof percentage === 'number' ? `${Math.abs(percentage)}%` : '–';

  return (
    <div className={`kpi-card ${view}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      {view === 'front' && (
        <>
          <div className="kpi-title">{title}</div>
          <div className="kpi-value">{safeValue}</div>
          <div className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {safePercentage}
          </div>
        </>
      )}

      {view === 'back' && (
        <div className="kpi-back-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}

      {view === 'chart' && (
        <div style={{ height: '100%', padding: '0.5rem' }}>
          <div className="mini-chart-title">{title}</div>
          <MiniKpiChart title={title} chartType="line" />
        </div>
      )}

      {view === 'bar' && (
        <div style={{ height: '100%', padding: '0.5rem' }}>
          <MiniKpiChart title={title} chartType="bar" />
        </div>
      )}
    </div>
  );
};

// Optional: set default props
KpiCard.defaultProps = {
  title: 'KPI',
  value: 0,
  percentage: 0,
  isPositive: true,
  showInfoBack: false
};

export default KpiCard;
