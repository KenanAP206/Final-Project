import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmationCode: Yup.string().when('isConfirmed', {
    is: true,
    then: Yup.string().required('Confirmation code is required'),
  }),
});

function Login() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', values);
      console.log('Login successful:', response.data);
      setIsConfirmed(true); // Show confirmation input after successful login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/confirm', { confirmPassword: confirmationCode });
      console.log('Confirmation successful:', response.data);
      // Handle successful confirmation (e.g., redirect user to dashboard)
    } catch (error) {
      console.error('Confirmation error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '', confirmationCode: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" className="submit-button">Login</button>

            {isConfirmed && (
              <div className="form-group">
                <label htmlFor="confirmationCode">Confirmation Code</label>
                <Field name="confirmationCode" type="number" />
                <ErrorMessage name="confirmationCode" component="div" className="error" />
                <button type="button" onClick={handleConfirm} disabled={!confirmationCode}>Confirm</button>
              </div>
            )}

            <div className="form-links">
              <NavLink to='/register'>You don't have an account?</NavLink>
              <NavLink>Reset password</NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
