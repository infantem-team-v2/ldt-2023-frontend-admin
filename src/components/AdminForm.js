import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import api from '../services/api';
import Swal from 'sweetalert2';

const AdminForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const fetchData = async () => {
    try {
      const res = await api.post("/auth", {
        login: login,
        password: password
      });
      if (res.status >= 200 && res.status < 300) {
        Swal.fire();
      }
    } catch (err) {
      Swal.fire();
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
