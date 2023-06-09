import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminForm from './components/AdminForm';
import { useState, useEffect } from 'react';
import api from './services/api';
import ConsolePage from './components/ConsolePage';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    api.get("/auth/check").then(res => {
      if (res.status >= 200 && res.status < 300) {
        setIsAuthenticated(true);
      }
    }
    ).catch(err => {
      console.log(err);
      setIsAuthenticated(false);
    }
    )
  }, [isAuthenticated]);


  return (
    <>
      <Routes>
        <Route path='/auth' element={<AdminForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/' element={<ConsolePage auth={isAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
