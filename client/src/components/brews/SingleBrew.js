// src/components/pages/SingleService.js

// v 1.0
// Finn McCarthy

// This file displays a single service on the services page to the user

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteBrew } from '../../actions/brewActions';
import '../../actions/authActions';
import './css/SingleService.css';
const SingleBrew = ({ brew, deleteBrew, isAdmin }) => {
  const { name, start, end, ingredients, notes, original, final } = brew

  return (<div className="col-12 col-md-6 col-xl-4 p-2 m-2">
  <div className="card brew-card" id={`card-${brew.BREW_id}`}>
  <h5 className="card-title justify-content-between p-2">{name} {isAdmin ? (
              <span>
                <FaTimes
                  onClick={e => deleteBrew(brew.BREW_id)}
                  style={{ cursor: 'pointer', float: 'right', color: 'darkred', marginLeft: '10px' }} />
                <Link  to={`/brews/edit/${brew.BREW_id}`} >
                  <FaPencilAlt className='text' style={{ cursor: 'pointer', float: 'right', color: 'darkred' }} />
                </Link></span>
            ) : null}</h5>
      <div className="card-body">
        <div className='row'>
        <div className='col-6'>
        <b>Start</b>: {start}<br/>
        <b>End</b>: {end}
        </div>
        <div className='col-6'>
        <b>Original Gravity</b>: {original}<br/>
      <b>Final Gravity</b>: {final}<br/><br/>
      </div>
      <hr/>
          <div className='col-6'>
        <b>Ingredients</b><br/><pre>{ingredients}</pre>
        </div>
        <div className='col-6'>
        <b>Tasting Notes</b><br/><pre>{notes}</pre>
        </div>
      </div>
                    
                      </div>
</div>
                  </div>)
}

SingleBrew.propTypes = {
  brew: PropTypes.object.isRequired,
  deleteBrew: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
})
export default connect(mapStateToProps, { deleteBrew })(SingleBrew);