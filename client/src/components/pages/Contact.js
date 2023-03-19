import React,{Fragment, useState} from "react";
import { connect } from 'react-redux';
import { sendEmail} from '../../actions/apiActions'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import useDocumentTitle from "../../useDocumentTitle";

const Contact = ({sendEmail}) => {
  useDocumentTitle(`The Beer Lab | Contact`)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject:'',
    message: '',
    errors: {}
  });

  const { name,email,subject,message,errors } = formData;

  const onChange = e => setFormData(
    { ...formData, [e.target.name]: e.target.value }
  );

  // on Sumbit
  const onSubmit = async (e) => {
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    // Validation of inputs


    if (name === '') {
        setFormData({ ...formData, errors: { name: '* Name is required' } });
        return;
      }

    if (email === '') {
      setFormData({ ...formData, errors: { email: '* Email is required' } });
      return;
    }

    if (subject === '') {
      setFormData({ ...formData, errors: { subject: '* Subject is required' } });
      return;
    }

    if (message === '') {
      setFormData({ ...formData, errors: { message: '* Message is required' } });
      return;
    }

    const emailData = { 
      to: 'finnhenrymac@gmail.com',
      from: 'finnhenrymac@gmail.com',
      subject: subject,
      html: `<h1>${name}</h1>
            Email: ${email}
             says ${message}` }
      console.log(emailData)
    sendEmail(emailData);
    return setFormData({ ...formData, name: '', email:'', subject:'', message: ''});

  };
    return (
<Fragment>
    <div className="row justify-content-center pt-5">
        <div className="col-12 col-lg-6">
            <div className="container login-page p-5">
        <span><h1 className='mb-3 text-center'>Contact</h1></span>
          <form onSubmit={e => onSubmit(e)}>
          <div className='mb-1'>
              <label htmlFor='name'>Name</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.name })}
                id='name'
                placeholder='Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
              {errors.name && <div className='invalid-feedback'>
                {errors.name}</div>}
            </div>
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
            <div className='mb-1'>
              <label htmlFor='subject'>Subject</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.subject })}
                id='subject'
                placeholder='Subject'
                name='subject'
                value={subject}
                onChange={e => onChange(e)}
              />
              {errors.subject && <div className='invalid-feedback'>
                {errors.subject}</div>}
            </div>
            <div className='mb-1 pb-5'>
              <label htmlFor='message'>Message</label>
              <textarea
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.message })}
                id='message'
                placeholder='Message'
                name='message'
                value={message}
                onChange={e => onChange(e)}
              />
              {errors.message && <div className='invalid-feedback'>
                {errors.message}</div>}
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' value='Contact' className='add-btn btn btn-custom' />
            </div>
          </form>
        </div>

      </div>
      </div>
    </Fragment>
    )
}

Contact.propTypes = {
    sendEmail: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    sendEmail: state.api.sendEmail
})
export default connect(mapStateToProps,{sendEmail})(Contact);