import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChanguePassword.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null); // Estado del usuario

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta inicial (formulario de login) */}
        <Route index element={<Form callback={setUser} />} />

        {/* Ruta protegida para usuarios normales */}
        <Route 
          path='/userHome' 
          element={user && user !== 'admin' ? <UserHome user={user} /> : <Navigate to="/" />} 
        />

        {/* Ruta protegida para el administrador */}
        <Route 
          path='/adminHome' 
          element={user === 'admin' ? <AdminHome user={user} /> : <Navigate to="/" />} 
        />

        {/* Ruta para cambio de contraseña, accesible solo si el usuario está logueado */}
        <Route 
          path='/change-password' 
          element={user ? <ChangePassword user={user} /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
