import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NewDashboard from './dashboard/NewDashboard';
import DisplayHeat from './heat-map-chart/DisplayHeat';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/newdashboard" element={<NewDashboard />} />
        <Route path="/heatmap" element={<DisplayHeat />} />
      </Routes>
    </Router>
);

reportWebVitals();
