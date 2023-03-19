// src/components/pages/AddSerice.js

// v 1.0
// Finn McCarthy

// This file displays the Add service page to the user
// allows the user to add a service

import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { addBrew } from '../../actions/brewActions';
import '../../actions/authActions';
import classnames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import useDocumentTitle from '../../useDocumentTitle';

const AddBrew = ({ addBrew, isAdmin }) => {
  useDocumentTitle(`The Beer Lab | Add Brew`)

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

  const navigate = useNavigate();

  const onChange = e => setFormData(
    {...formData, [e.target.name]: e.target.value}
  );
  
  const onFile = e => setFormData(
    {...formData, [e.target.name]: e.target.files[0]},
    console.log(e.target.files[0])
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

    if (ingredients === ''){
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

    const formAdd = new FormData();
    formAdd.append("BREW_id", uuidv1());
    formAdd.append('name', name);
    formAdd.append('start', start);
    formAdd.append('end', end);
    formAdd.append('ingredients', ingredients);
    formAdd.append('notes', notes);
    formAdd.append('original', original);
    formAdd.append('final', final);
    addBrew(formAdd);
    

    // redirect to services page
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
      <span><h1 className='mb-3 text-center'>Add</h1></span>
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

AddBrew.propTypes = {
  addBrew: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
})

export default connect(mapStateToProps, {addBrew})(AddBrew);