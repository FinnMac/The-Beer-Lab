// src/components/brews/EditService.js

// v 1.0
// Finn McCarthy

// This file displays the Edit service page to the user
// allows the user to edit a service

import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { updateBrew, getBrew, addBrew } from '../../actions/brewActions';
import '../../actions/authActions';
import useDocumentTitle from '../../useDocumentTitle';

const EditBrew = ({ brew, getBrew, updateBrew, isAdmin }) => {
  useDocumentTitle(`The Beer Lab | Edit Brew`)

  const [formData, setFormData] = useState({
    name: '',
    start:'',
    end: '',
    ingredients: '',
    notes: '',
    original: '',
    final:'',
    errors: {}
  });

  const { name, start, end, ingredients, notes, original, final, errors } = formData;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBrew(id);
    setFormData({
      name: brew.name,
      start: brew.start,
      end: brew.end,
      ingredients: brew.ingredients,
      notes: brew.notes,
      original: brew.original,
      final: brew.final,
      errors
    });
  }, [getBrew, id, brew.name, brew.start, brew.end, brew.ingredients, brew.notes, brew.original, brew.final]);

  const onChange = e => setFormData(
    {...formData, [e.target.name]: e.target.value}
  );

  const onSubmit = async(e) =>{
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();

    // Validation

    if (name === ''){
      setFormData({...formData, errors: {name: 'Name is required'}});
      return;
    }

    if (start === ''){
      setFormData({...formData, errors: {start: 'Start date is required'}});
      return;
    }

    if (end === ''){
      setFormData({...formData, errors: {end: 'End date is required'}});
      return;
    }

    if (ingredients == ''){
      setFormData({...formData, errors: {ingredients: 'Ingredients list is required'}});
      return;
    }

    if (notes === ''){
      setFormData({...formData, errors: {notes: 'Tasting notes is required'}});
      return;
    }

    if (original === ''){
      setFormData({...formData, errors: {original: 'Original gravity is required'}});
      return;
    }

    if (final === ''){
      setFormData({...formData, errors: {final: 'Final gravity is required'}});
      return;
    }

    const editData = new FormData();
    editData.append("BREW_id", id);
    editData.append('name', name);
    editData.append('start', start);
    editData.append('end', end);
    editData.append('ingredients', ingredients);
    editData.append('notes', notes);
    editData.append('original', original);
    editData.append('final', final);
    console.log(editData);
    updateBrew(editData);

    // redirect to brews page
    navigate('/brews');
  };

  if(!isAdmin){
    return <Navigate to='/' />
  }
  
  return (
    <Fragment>
    <div className="row justify-content-center pt-5">
        <div className="col-12 col-lg-6">
            <div className="container beer-page p-5">
      <span><h1 className='mb-3 text-center'>Edit</h1></span>
        </div>
        <div className='card-body-service'>
        <form onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='name'>Name</label>
            <input 
                type="text"
                className= {classnames('form-control', { 'is-invalid' : errors.name })}
                id='name'
                placeholder='Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
            />
            {errors.name && <div className='invalid-feedback'>
              {errors.name}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='start'>Start date</label>
            <input 
                type="date"
                className= {classnames('form-control', { 'is-invalid' : errors.start })}
                id='start'
                placeholder='Start date'
                name='start'
                value={start}
                onChange={e => onChange(e)}
            />
            {errors.start && <div className='invalid-feedback'>
              {errors.start}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='end'>End date</label>
            <input 
                type="date"
                className= {classnames('form-control', { 'is-invalid' : errors.end })}
                id='end'
                placeholder='End date'
                name='end'
                value={end}
                onChange={e => onChange(e)}
            />
            {errors.end && <div className='invalid-feedback'>
              {errors.end}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea 
                type="text"
                className= {classnames('form-control', { 'is-invalid' : errors.ingredients })}
                id='ingredients'
                placeholder='Ingredients'
                name='ingredients'
                value={ingredients}
                onChange={e => onChange(e)}
            />
            {errors.ingredients && <div className='invalid-feedback'>
              {errors.ingredients}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='notes'>Tasting notes</label>
            <textarea 
                type="text"
                className= {classnames('form-control', { 'is-invalid' : errors.notes })}
                id='notes'
                placeholder='Tasting notes'
                name='notes'
                value={notes}
                onChange={e => onChange(e)}
            />
            {errors.notes && <div className='invalid-feedback'>
              {errors.notes}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='original'>Original gravity</label>
            <input 
                type="number"
                className= {classnames('form-control', { 'is-invalid' : errors.original })}
                id='original'
                placeholder='Original gravity'
                name='original'
                value={original}
                onChange={e => onChange(e)}
            />
            {errors.original && <div className='invalid-feedback'>
              {errors.original}</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='final'>Final gravity</label>
            <input 
                type="number"
                className= {classnames('form-control', { 'is-invalid' : errors.final })}
                id='final'
                placeholder='Final gravity'
                name='final'
                value={final}
                onChange={e => onChange(e)}
            />
            {errors.final && <div className='invalid-feedback'>
              {errors.final}</div>}
          </div>
          <div className='d-grid gap-2'>
            <input type='submit' value='Add' className='add-btn btn btn-custom'/>
          </div>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

// Create our propTypes
EditBrew.propTypes = {
  updateBrew: PropTypes.func.isRequired,
  getBrew: PropTypes.func.isRequired,
  brew: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  brew: state.brew.brew,
  isAdmin: state.auth.isAdmin,
})

export default connect(mapStateToProps, { getBrew, updateBrew })(EditBrew);