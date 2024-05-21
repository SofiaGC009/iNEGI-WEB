import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Vivienda from './Pages/Vivienda';
import Habitante from './Pages/Habitante';
import Login from './Pages/Login';
import Material from './Pages/Material';
import Ocupacion from './Pages/Ocupacion';
import Menu from './Pages/Menu';
import OcupacionVivienda from './Pages/OcupacionVivienda';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vivienda" element={<Vivienda />} />
        <Route path="/habitante" element={<Habitante/>} />
        <Route path="/material" element={<Material/>}/>
        <Route path="/ocupacion" element={<Ocupacion/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/ocupacionVivienda" element={<OcupacionVivienda />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();



