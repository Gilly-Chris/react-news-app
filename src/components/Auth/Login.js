import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import { baseUrl } from '../../utils/constants';
import PubSub from 'pubsub-js';
import './Auth.css';


export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {'content-type': 'multipart/form-data'},
    }

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('email', email)
    formData.append('password', password)

    setLoading(true)
    axios.post(baseUrl + 'login', formData, config)
      .then(({data}) => {
        if(data.status == 200) {
          setValidationError('')
          clearInput()
          PubSub.publish('loggedIn', {value: data})
        } else {
          setValidationError(data.message)
        }
        setLoading(false)
      }).catch(({response}) => {
        console.log(response)
        setLoading(false)
         Swal.fire({
            title: "Oops..",
            text: "Something went wrong. Please try again.",
            icon:"error"
          })
      })
  }

   const clearInput = () => {
      setEmail('')
      setPassword('')
   }

  if(loading) {
    return (
      <div className='loading-view'>
        <div className='wrapper'>
          <ClipLoader
              loading={loading}
              color={'#334ebc'}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
        </div>
    </div>
    )
  } else {
     return <div className="container py-5 login-section">
          {
            validationError !== '' ? 
                <Alert key='danger' variant='danger'>
                  {validationError}
                </Alert>
            : null
            } 
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  <p className='info-text'>Required fields are marked with <span className='text-danger'>*</span></p>
                  <hr />
                  <div className="form-wrapper">
                    {/* {
                      Object.keys(validationError).length > 0 && (
                        <div className="row">
                          <div className="col-12">
                            <div className="alert alert-danger">
                              <ul className="mb-0">
                                {
                                  Object.entries(validationError).map(([key, value])=>(
                                    <li key={key}>{value}</li>   
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    } */}
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="my-3" controlId="formBasicEmail">
                        <Form.Label>Email<span className='text-danger'> *</span></Form.Label>
                        <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="my-3" controlId="formBasicPassword">
                      <Form.Label>Password<span className='text-danger'> *</span></Form.Label>
                      <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-4'>
                      Login
                    </Button>
                  </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end align-items-center py-4'>
                  <Button variant='primary' onClick={ (e) => props.setAction('register') } size='sm'>Don't have an account</Button>
              </div>
      </div>
  }
}