import React from 'react';
import Inicio from './views/Inicio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './views/Registro';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

