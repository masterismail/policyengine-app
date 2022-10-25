import './style/App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PolicyEngineCountry from './policyengineCountry';


function PolicyEngine() {
  return <Router>
      <Routes>
        <Route path="/uk/*" element={<PolicyEngineCountry country="uk" />} />
        <Route path="/us/*" element={<PolicyEngineCountry country="us" />} />
        <Route path="/" element={<Navigate to="/uk" />} />
      </Routes>
    </Router>;
}

export default PolicyEngine;