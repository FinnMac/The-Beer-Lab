// auth/Login.js

// v 1.0
// Finn McCarthy
// This file is what the client will see when logging in

import React, { Fragment, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { loadUser} from '../../actions/authActions';
import './css/auth.css';
import useDocumentTitle from '../../useDocumentTitle';

const Profile = ({ loadUser, user, isAuthenticated }) => {
  useDocumentTitle(`The Beer Lab | Profile`)

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <Fragment>
    <div className="row justify-content-center pt-5">
        <div className="col-12 col-lg-6">
            <div className="container login-page p-5">
        <span><h1 className='mb-3 text-center'>Profile</h1></span>
            <div className='mb-1'>
            <div><label htmlFor='email'>Name: {user.name}</label></div>
            <div><label htmlFor='email'>Email: {user.email}</label></div>
            </div>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

Profile.propTypes = {
  loadUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  loadUser: state.auth.loadUser,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Profile);
