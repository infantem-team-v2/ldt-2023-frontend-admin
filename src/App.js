import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminForm from './components/AdminForm';
import { useState, useEffect } from 'react';
import api from './services/api';
import ConsolePage from './components/ConsolePage';

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api.get("/auth/check").then(res => {
      if (res.status >= 200 && res.status < 300) {
        setIsAuthenticated(true);
      }
    }
    ).catch(err => {
      setIsAuthenticated(false);
    }
    )
  }, [isAuthenticated]);


  return (
    <>
      <Routes>
        <Route path='/auth' element={<AdminForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/' element={<PrivateRoute auth={isAuthenticated}><ConsolePage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
