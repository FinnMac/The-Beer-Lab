// auth/Login.js

// v 1.0
// Finn McCarthy
// This file is what the client will see when logging in

import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { login} from '../../actions/authActions';
import './css/auth.css';
import useDocumentTitle from '../../useDocumentTitle';

const Login = ({ login, isAuthenticated }) => {
  useDocumentTitle(`The Beer Lab | Login`)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  });

  const { email, password, errors } = formData;

  const onChange = e => setFormData(
    { ...formData, [e.target.name]: e.target.value }
  );

  // on Sumbit
  const onSubmit = async (e) => {
   
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    // Validation of inputs

    if (email === '') {
      setFormData({ ...formData, errors: { email: '* Email is required' } });
      return;
    }

    if (password === '') {
      setFormData({ ...formData, errors: { password: '* Password is required' } });
      return;
    }
    const user = { email, password }
    // Call the login function and login the user
    login(user);
    
  };

  if (isAuthenticated == true) {
    return <Navigate to='/' />
  }

  return (
    <Fragment>
    <div className="row justify-content-center pt-5">
        <div className="col-12 col-lg-6">
            <div className="container login-page p-5">
        <span><h1 className='mb-3 text-center'>Login</h1></span>
          <form onSubmit={e => onSubmit(e)}>
            <div className='mb-1'>
              <label htmlFor='email'>Email</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.email })}
                id='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
              {errors.email && <div className='invalid-feedback'>
                {errors.email}</div>}
            </div>
            <div className='mb-1 pb-5'>
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                className={classnames('form-control', { 'is-invalid': errors.password })}
                id='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
              {errors.password && <div className='invalid-feedback'>
                {errors.password}</div>}
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' value='Login' className='add-btn btn btn-custom' />
            </div>
          </form>
          <label className='m-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </label>
        </div>

      </div>
      </div>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
