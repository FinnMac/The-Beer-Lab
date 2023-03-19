
// src/components/pages/Home.js

// v 1.0
// Finn McCarthy

// This file displays the Home page to the user
import { BrowserView, MobileView } from 'react-device-detect';
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleBrew from '../brews/SingleBrew';
import { get3newest } from '../../actions/brewActions';
import '../../actions/authActions';
import './css/layout.css';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../useDocumentTitle';

const Home = ({ get3newest, brews }) => {
    useDocumentTitle(`The Beer Lab | Home`)

    useEffect(() => {
        get3newest();
    }, [get3newest]);

    return (<Fragment>
        <div className="container cont-img">
            <section>
                <div id="brews">
                    <div className="container beer-page p-2">
                        <span><h1 className='mb-3 text-center'><Link to="/brews">Brews</Link></h1></span>
                        <div className="d-flex flex-column container">
                            <div className="row pt-4">
                                <div className="card-group">
                                    {
                                        brews.map(brew => (
                                            <SingleBrew key={brew.BREW_id} brew={brew} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br/>
            <section>
                <div id="about">
                    <h1 className="text-center m-3">About</h1>
                    <div className="row">
                        <div className="col-sm-12 col-xl-6">
                            <img src="https://assets-prd.punchdrink.com/wp-content/uploads/2015/03/barrel-beer1.jpg" />
                        </div>
                        <div className="col-sm-12 col-xl-6">
                            <div className="p-3">
                                <p>
                                The Beer Lab project is a recent initiative that was launched in 2022 with the goal of demystifying the process of brewing beer and making it more accessible to a broader audience. The project aims to showcase the process of beer-making from start to finish, with the hope that people will be able to understand and appreciate the science and artistry behind this beloved beverage.

The project is centered around the idea of creating a hands-on experience that can be enjoyed by everyone, regardless of their level of knowledge or expertise. By showcasing the process of brewing beer, the Beer Lab project hopes to not only educate people about the science behind beer-making but also to foster a greater appreciation for the skill and dedication that goes into producing this complex and delicious beverage.</p>
                                <h4 className="my-2 text-center">Goals</h4>
                                <p>
                                One of the main goals of the Beer Lab project is to break down the barriers that often exist between people and the craft beer industry. By making the process of beer-making more accessible and understandable, the project hopes to encourage people to experiment with different types of beer and to develop a deeper appreciation for the diversity and complexity of this industry.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row"> 
                            <MobileView>
                            <div className="col-sm-12 col-xl-6">
                                <img src="https://www.yellowstonerecovery.com/wp-content/uploads/close-up-of-bottles-with-lids-750x400.jpg" />
                            </div>
                            </MobileView>
                        <div className="col-sm-12 col-xl-6">
                            <div className="p-3">
                                <h4 className="my-2 text-center">Features</h4>
                                <p>
                                    Membership benifits to 'The Beer Lab' include:
                                </p>
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header m-1" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                Mentoring
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">The ability to talk to our head brewer for tips and advice</div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header m-1" id="flush-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                Forum access
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">Access to the beer lab forum. A place to share and learn about beer, among other things</div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header m-1" id="flush-headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                Our magaizine, 'Brew Report'
                                            </button>
                                        </h2>
                                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">'Brew Report' features helpful tips and tricks from brewers from around the globe</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="col-sm-12 col-xl-6">
                                <BrowserView>
                                    <img src="https://www.yellowstonerecovery.com/wp-content/uploads/close-up-of-bottles-with-lids-750x400.jpg" />
                                </BrowserView></div>
                    </div>
                </div>
            </section>
        </div></Fragment>
    )
}

// Define the props that our components will get.
Home.propTypes = {
    get3newest: PropTypes.func.isRequired,
    brews: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired
}

// map our state to props.
const mapStateToProps = state => ({
    get3newest: state.brew.get3newest,
    brews: state.brew.brews,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, { get3newest })(Home);