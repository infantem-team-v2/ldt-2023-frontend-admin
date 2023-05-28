import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import Swal from 'sweetalert2';

const AdminForm = ({ setIsAuthenticated }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };


  const fetchData = async () => {
    try {
      const res = await api.post("/auth/sign/in", {
        email: login,
        password: password
      });
      if (res.status >= 200 && res.status < 300) {
        Swal.fire({
          icon: 'success',
          title: 'Успешно!',
          text: 'Вы вошли в систему!',
        }
        ).then(() => {
          setIsAuthenticated(true);
          navigate('/');
        })
      }
    } catch (err) {
      Swal.fire(
        'Ошибка!',
        'Неверный логин или пароль!',
      );
    }


  }

  return (
    <div className='contaner-md position-absolute top-50 start-50 translate-middle w-25' >
      <Form
        onSubmit={handleSubmit}
        className='p-5 border border-primary rounded-3 shadow-lg bg-white'
      >
        <Form.Group controlId="login">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ввведите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default AdminForm;
