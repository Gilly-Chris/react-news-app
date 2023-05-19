import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import nullImage from "../../images/nullimage.png";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import { baseUrl } from '../../utils/constants';
import PubSub from 'pubsub-js';
import './Auth.css';


export default function Register(props) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(nullImage);
  const [validationError, setValidationError] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  const changeHandler = (event) => {
    setImage(event.target.files[0])
  }

  useEffect(() => {
    if (!image) {
      setPreview(nullImage)
      return
     }
    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {'content-type': 'multipart/form-data'},
    }

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)
    formData.append('image', image)

    setLoading(true)
    axios.post(baseUrl + 'register', formData, config)
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
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
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
    return (
      <div className="container py-5 login-section">
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
                <h4 className="card-title">Create Account</h4>
                <p className='info-text'>Required fields are marked with <span className='text-danger'>*</span></p>
                <hr />
                <div className="form-wrapper">
                  <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="my-3">
                      <Form.Label>Name<span className='text-danger'> *</span></Form.Label>
                      <Form.Control type="email" value={name} onChange={(event) => setName(event.target.value)}/>
                  </Form.Group>
                  <Form.Group className="my-3">
                      <Form.Label>Email<span className='text-danger'> *</span></Form.Label>
                      <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                  </Form.Group>
                  <Row className='align-items-center'>
                    <Col sm={12} md={8}>
                    <Form.Group className="my-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" onChange={changeHandler} name='image'/>
                    </Form.Group>
                    </Col>
                    <Col sm={4} md={4}>
                      <img src={preview} alt="preview" className='img-preview'></img>
                    </Col>
                  </Row>
                  <Form.Group className="my-3">
                      <Form.Label>Password<span className='text-danger'> *</span></Form.Label>
                      <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                  </Form.Group>
                  <Form.Group className="my-3">
                      <Form.Label>Confirm Password<span className='text-danger'> *</span></Form.Label>
                      <Form.Control type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)}/>
                  </Form.Group>

                  <Button variant="primary" type="submit" className='mt-4'>
                        Register
                  </Button>
                </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className='d-flex justify-content-end align-items-center py-4'>
                <Button variant='primary' onClick={ (e) =>  props.setAction('login') } size='sm'>Already have an account</Button>
            </div>
      </div>
    )
   }
}