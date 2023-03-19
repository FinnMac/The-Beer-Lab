import React from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { HashLink} from 'react-router-hash-link'
import { connect } from 'react-redux';
import logo from './images/beer-lab-logo.png'
import './css/nav.css';

const Header = ({ logout,isAuthenticated }) => {
  
  return (
    <nav className="navbar navbar-custom navbar-expand-lg navbar-toggleable-lg navbar-dark box-shadow">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} width="100" height="40"  className="d-block" alt="site-logo"/>
            </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-lg-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1" style={{textAlign: "center!important"}}>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to="/brews" >Brews</Link>
                        </li>
                        <li className="nav-item">
                        <HashLink className="nav-link text-light" to='/#about'>About</HashLink>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to='/contact'>Contact</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                              {isAuthenticated ? (
                                
                                <><li className="nav-item">
                                <Link className="nav-link text-light" to="/profile">Profile</Link>
                              </li><li className="nav-item">
                                  <Link onClick={logout} className="nav-link text-light" to="#!">Logout</Link>
                                </li></>) : (
                                <><li className="nav-item">
                  <Link className="nav-link text-light" to="/login">Login</Link>
                </li><li className="nav-item">
                    <Link className="nav-link text-light" to="/register">Register</Link>
                  </li></>
                                )}
                            </ul>
                </div>
            </div>
        </nav>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  logout: state.auth.logout,
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{ logout})(Header);