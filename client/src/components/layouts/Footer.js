import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types';
import './css/nav.css';
import twitter from './images/twitter.svg';
import facebook from './images/facebook.svg';
import instagram from './images/instagram.svg';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';

// JavaScript date object
const date = new Date();

const Footer = ({logout, isAuthenticated}) => {
  return (
    <footer className='footer-custom p-2'>

      <div className='container'>
        <div className='row text-center'>
          <div className='col mt-5'>
            <h3 >Get updates on everything going<br />
              down at The Beer Lab</h3>
            <br />
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className='col-auto'>
                  <input className="form-control" type="text" placeholder="Email Address" />
                </div>
                <div className='col-auto'>
                  <button type="submit" class="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div></div>
            </form>
          </div>
          <div className='col-md-4 mt-5'>
            <div className='row'>
              <h5>Navigation</h5>

              <div className='list-unstyled d-flex justify-content-center'>
                <ul>
                  <li className="list-unstyled d-flex justify-content-center">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="list-unstyled">
                    <Link className="nav-link" to="/brews">Brews</Link>
                  </li>
                  <li className="list-unstyled">
                    <HashLink className="nav-link" to="/#about">About</HashLink>
                  </li>
                  {isAuthenticated ? (
                  <><li className="list-unstyled">
                      <Link className="nav-link text-light" to="/profile">Profile</Link>
                    </li>
                    <li className="list-unstyled">
                        <Link onClick={logout} className="nav-link text-light" to="#!">Logout</Link>
                    </li></>) : (
                  <><li className="list-unstyled">
                        <Link className="nav-link text-light" to="/login">Login</Link>
                    </li>
                    <li className="list-unstyled">
                        <Link className="nav-link text-light" to="/register">Register</Link>
                    </li></>
                  )}
                </ul>
              </div>
              <div className="list-unstyled d-flex justify-content-center">
                <a href="https://facebook.com/">
                  <img width='60' height='50' src={facebook} alt="facebook logo" /></a>
                <a href="https://instagram.com/">
                  <img width='60' height='50' src={instagram} alt="instagram logo" /></a>
                <a href="https://twitter.com/">
                  <img width='60' height='50' src={twitter} alt="twitter logo" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <p className='py-2 ml-3 text-white'>
          <h5>Copyright {String.fromCharCode(169)}
            {' ' + date.getFullYear()} The Brew Lab</h5>
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  logout: state.auth.logout,
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{ logout})(Footer);