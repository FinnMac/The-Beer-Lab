import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const MainHead = ({isAuthenticated}) => {
      return (<div id="sect1" className="position-relative w-100">
                    <div className="sect1-overlay position-absolute text-white d-flex flex-column align-items-center justify-content-center">
                        <div className="container">
                            <h1 className="mb-4 font-weight-bold text-center">Have a drink with us, here<br />at The Beer Lab</h1>
                            <p className="mb-5 text-center">The Beer Lab is a educational resource dedicated to the ancient art of brewing.<br/>
                                                            We provide brew-it-yourself guides showcasing a range of diffrent beer, cider and wine styles. </p>
                            {isAuthenticated ? (null) : (
                            <><p className="mb-5 text-center">Intrested in becoming a member? Get started below </p><div className="text-center">
                <ul>

                  <Link id="filled" className="get-started btn px-5 py-3 text-white mt-3 mt-sm-0 mx-1" to="login">Get Started</Link>


                </ul>
              </div></>)}
                        </div>
                    </div>
                </div>)
    }

MainHead.propTypes = {
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps)(MainHead);