// /auth/Register.js


// v 1.0
// Finn McCarthy
// This file is what the client will see when registering

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import classnames from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/auth.css'
import useDocumentTitle from '../../useDocumentTitle';

const Register = ({ register, isAuthenticated }) => {
  useDocumentTitle(`The Beer Lab | Register`)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordCompare: '',
    errors: {}
  });

  const { name, email, password, passwordCompare, errors } = formData;
  const onChange = e => setFormData(
    { ...formData, [e.target.name]: e.target.value }
  );

  // On Submit
  const onSubmit = async (e) => {
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();

    // Validation

    // Check for name
    if (name === '') {
      setFormData({ ...formData, errors: { name: '* Name is required' } });
      return;
    }
    // Check for email
    if (email === '') {
      setFormData({ ...formData, errors: { email: '* Email is required' } });
      return;
    }
    // Check for password
    if (password === '') {
      setFormData({ ...formData, errors: { password: '* Password is required' } });
      return;
    }
    // Check for password compare
    if (passwordCompare === '') {
      setFormData({ ...formData, errors: { passwordCompare: '* You did not comfirm your password' } });
      return;
    }
    if (password !== passwordCompare) {
      setFormData({ ...formData, errors: { password: '* Passwords do not match!' } });
      return;
    }
    // create a newUser object
    const newUser = {
      name,
      email,
      password
    }
    // register the newUser
    register(newUser);
  };

  // redirect to home
  if (isAuthenticated) {
    return <Navigate to='/' />
  }


  // Copy our form.
  return (
    <Fragment>
<div className="row justify-content-center pt-5">
        <div className="col-12 col-lg-6">
        <div className="container login-page p-5">
        <span><h1 className='mb-3 text-center'>Register</h1></span>
          <form onSubmit={e => onSubmit(e)}>
            <div className='mb-1'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className={classnames('form-control', { 'is-invalid': errors.name })}
                id='name'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
              {errors.name && <div className='invalid-feedback'>
                {errors.name}</div>}
            </div>
            <div className='mb-1'>
              <label htmlFor='email'>Email</label>
              <input
                type="email"
                className={classnames('form-control', { 'is-invalid': errors.email })}
                id='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
              {errors.email && <div className='invalid-feedback'>
                {errors.email}</div>}
            </div>
            <div className='mb-1'>
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                className={classnames('form-control', { 'is-invalid': errors.password })}
                id='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
              {errors.password && <div className='invalid-feedback'>
                {errors.password}</div>}
            </div>
            <div className='mb-1 pb-5'>
              <label htmlFor='passwordCompare'>Repeat Password</label>
              <input
                type="password"
                className={classnames('form-control', { 'is-invalid': errors.passwordCompare })}
                id='passwordCompare'
                placeholder='passwordCompare'
                name='passwordCompare'
                value={passwordCompare}
                onChange={(e) => onChange(e)}
              />
              {errors.passwordCompare && <div className='invalid-feedback'>
                {errors.passwordCompare}</div>}
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' value='Register' className='add-btn btn btn-custom' />
            </div>
          </form>
          <label className='m-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </label>
        </div>
        </div>
      </div>
    </Fragment>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);
