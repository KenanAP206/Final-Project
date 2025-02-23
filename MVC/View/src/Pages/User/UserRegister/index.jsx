import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2'

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  confirmationCode: Yup.number().when('isConfirmed', {
    is: true,
    then: Yup.string().required('Confirmation code is required'),
  }),
});

function Register() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate()
  const handleRegister = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', values);
      console.log('Registration successful:', response.data);
      setIsConfirmed(true);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Please enter the confirmation code sent to your email.',
      });
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'An error occurred while registering.',
      });
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post('http://localhost:3000/users/confirm', { 
        confirmPassword: confirmationCode,
        isFromRegister: true  
      });
      console.log('Confirmation successful');
      Swal.fire({
        icon: 'success',
        title: 'Confirmation Successful',
        text: 'Your account has been verified. Redirecting to login page...',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/login');
    } catch (error) {
      console.error('Confirmation error:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Confirmation Failed',
        text: error.response?.data?.message || 'Invalid confirmation code.',
      });
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '', confirmationCode: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            <button type="submit" className="submit-button">Register</button>

            {isConfirmed && (
              <div className="form-group">
                <label htmlFor="confirmationCode">Confirm Code</label>
                <Field
                  name="confirmationCode"
                  type="number"
                  onChange={(e) => {
                    setFieldValue('confirmationCode', e.target.value);
                    setConfirmationCode(e.target.value);
                  }}
                />
                <ErrorMessage name="confirmationCode" component="div" className="error" />
                <button type="button" onClick={handleConfirm}>Confirm</button>
              </div>
            )}

            <div className="form-links">
              <NavLink to='/login'>Already have an account?</NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;