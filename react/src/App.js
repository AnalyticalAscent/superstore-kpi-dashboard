import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SalesChart from './components/SalesChart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation */}
        <nav className="nav-bar">
          <Link to="/">🏠 Dashboard</Link>
          <Link to="/sales">📈 Sales Chart</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales" element={<SalesChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
