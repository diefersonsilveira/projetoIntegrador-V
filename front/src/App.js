import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPaciente from './components/LoginPaciente/LoginPaciente';
import CadastroPaciente from './components/CadastroPaciente/CadastroPaciente';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {}
          <Route path="/login" element={<LoginPaciente />} />
          <Route path="/cadastro" element={<CadastroPaciente />} />
          
          {}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;