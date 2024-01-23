import React from 'react';
import Inicio from './views/Inicio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './views/Registro';
import Login from './views/Login';
import Categorias from './views/Categorias';
import Crear from './views/Crear';
import Usuario from './views/Usuario';
import Proyecto from './views/Proyecto';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/crear' element={<Crear />} />
          <Route path='/usuario' element={<Usuario />} />
          <Route path='/proyecto' element={<Proyecto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

