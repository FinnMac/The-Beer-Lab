// src/components/pages/Services.js

// v 1.0
// Finn McCarthy

// This file displays the Services page to the user

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleBrew from './SingleBrew';
import { getBrews, getTitleASC} from '../../actions/brewActions';
import { postToken } from '../../actions/apiActions';
import '../../actions/authActions';
import { Link } from 'react-router-dom';
import '../global.css';
import './css/SingleService.css';
import useDocumentTitle from '../../useDocumentTitle';

const Brews = ({ getBrews, postToken, brews, hydrometer,isAdmin,getTitleASC }) => {
  useDocumentTitle(`The Beer Lab | Brews`)

  useEffect(() => {
    getBrews();
    postToken();
}, [getBrews, postToken]);

  return (<div className="container beer-page p-2">
    <div className="row justify-content-center">
      <span><h1 className='mb-3 text-center'>Brews</h1></span>
      <p1 className='mb-3 text-center'>Here you'll find our past brews with all you'll need to recreate them yourself.<br/>
        The bottom of the page contains a sneak peak at what we're brewing currently</p1>

      {isAdmin?(<span><Link to='/brews/add'><button type="button" className="add-btn btn btn-custom mx-3 mt-3">Add Brew</button></Link></span>):null}
      <div className="dropdown">
  <button className="add-btn btn btn-custom btn mx-3 mt-3 dropdown-toggle" type="button" id="dropdownMenuServices" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filters
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuServices">
    <button className="dropdown-item" onClick={e => getTitleASC(e)}>Title: A-Z </button>
  </div>
</div>
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
    <span><h1 className='mb-3 pt-4'>Currently brewing</h1></span>
    <div className="d-flex flex-column container">
        <div className="col-md-6 col-xl-4 p-3">
        <div className="card rapt-card">
  <div className="card-body text-center">
  <h5 className="card-title justify-content-between p-1">{hydrometer.deviceType}</h5>
<br/>
<strong>Temp</strong>: {hydrometer.temperature}<br/>
<strong>Gravity</strong>: {hydrometer.gravity}<br/>
<strong>Battery</strong>: {hydrometer.battery}
            </div>
            </div>
        </div>
        </div>
    </div>
      )
}

// Define the props that our components will get.
Brews.propTypes = {
  getBrews: PropTypes.func.isRequired,
  postToken: PropTypes.func.isRequired,
  brews: PropTypes.array.isRequired,
  hydrometer: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  getTitleASC: PropTypes.func.isRequired
}

// map our state to props.
const mapStateToProps = state => ({
  getBrews: state.brew.getBrews,
  postToken: state.api.postToken,
  brews: state.brew.brews,
  hydrometer: state.api.hydrometer,
  isAdmin: state.auth.isAdmin

})


export default connect(mapStateToProps,{ getBrews,postToken,getTitleASC })(Brews);
