import React, {Component} from 'react'
import { Container, Col, Row, Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BounceLoader } from 'react-spinners';
import { baseUrl } from '../../utils/constants';
import PubSub from 'pubsub-js';
import './Settings.css'


export default class Settings extends Component {

    state = {
        user: null,
        categories: null,
        souces: null,
        loading: true,
    }

    componentDidMount() {
        let userData = JSON.parse(localStorage.getItem('user'))
        this.setState({user: userData})
        this.loadComponents()
    }

    loadComponents = () => {
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
        }

        axios.get(baseUrl + 'filter_parameters', config)
            .then(({data}) => {
                this.setState({categories: data.categories, sources: data.sources, loading: false})
            }).catch(({response}) => {
                console.log(response)
                this.setState({loading: false})
                Swal.fire({
                    title: "Oops..",
                    text: "There was an loading categories and sources.",
                    icon:"error"
                  })
            })
    }

    logout = (event) => {
        event.preventDefault();
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
        }

        axios.get(baseUrl + 'logout', config)
        .then(({data}) => {
            if(data.status == 200) {
                PubSub.publish('loggedOut', {value: 'loggedOut'})
            }
        }).catch(({response}) => {
            console.log(response)
            Swal.fire({
                title: "Oops..",
                text: "Something went wrong.",
                icon:"error"
              })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let selectedCategories = this.state.categories.filter(cat => cat.selected).map(item => item.id)
        let selectedSources = this.state.sources.filter(source => source.selected).map(item => item.id)
        if(selectedCategories.length <= 4) {
            Swal.fire({
                title: "Oops..",
                text: "Please select at least 5 categories",
                icon:"error"
              })
            return
        }
        if(selectedSources.length < 1) {
            Swal.fire({
                title: "Oops..",
                text: "Please, You must have at least 1 News source",
                icon:"error"
              })
            return
        }
       
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
        }

        const formData = new FormData()
        formData.append('_method', 'POST');
        formData.append('categories', selectedCategories.join(','))
        formData.append('sources', selectedSources.join(','))

        axios.post(baseUrl + 'update_settings', formData, config)
        .then(({data}) => {
            if(data.status == 200) {
                Swal.fire({
                    title: "Yeee..",
                    text: "Your Preferences have been updated",
                    icon:"success"
                  })
            }
        }).catch(({response}) => {
            console.log(response)
            Swal.fire({
                title: "Oops..",
                text: "Something went wrong.",
                icon:"error"
              })
        })
    }

    handleCategoryChange = (category) => {
        let list = this.state.categories.map(cat => {
            if(cat.id === category.id) {
                cat.selected = !cat.selected
                return cat
            } else {
                return cat
            }
        })
        this.setState({categories: list})
    }

    handleSourceChange = (source) => {
       let list = this.state.sources.map(src => {
        if(src.id === source.id) {
            src.selected = !src.selected
            return src
        } else { return src }
       })
       this.setState({sources: list})
    }

    componentDidUpdate(oldVal, newVal) {
        // console.log(this.state.categories)
    }


    render() {
        let categories = this.state.categories
        let sources = this.state.sources

        return (
            <div className='py-5 settings-section'>
                <div className='row justify-content-center w-100'>
                    <Col lg={6} md={12} sm={12}>
                        <Container>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <Card className='setting-card px-md-4'>
                                    <Card.Body>
                                        <div className='img-wrapper'>
                                            <img src={this.state.user && this.state.user.image}></img>
                                        </div>
                                        <Card.Title>{this.state.user && this.state.user.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{this.state.user && this.state.user.email}</Card.Subtitle>
                                        <h5 className='mt-3 text-white text-center'>My Preferences </h5>
                                        <p className='text-white text-sm text-center'>You will be able to see and filter news only from your selected categories and sources</p>
                                        <Row className='w-100 mt-5 mb-4'>
                                            <Col md={6} sm={12}>
                                            <h6 className='text-white'>Categories</h6>
                                                <div className='form-wrapper'>
                                                    {
                                                        categories && categories.map((category) => 
                                                            <Form.Check 
                                                                key={category.id}
                                                                type='checkbox'
                                                                id={category.id}
                                                                label={category.name}
                                                                name={category.name}
                                                                value={category.selected}
                                                                checked={category.selected}
                                                                onChange={(e) => this.handleCategoryChange(category)}
                                                            />
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                            <Col md={6} sm={12}>
                                            <h6 className='text-white'>Sources</h6>
                                                <div className='form-wrapper'>
                                                    {
                                                        sources && sources.map((source) => 
                                                            <Form.Check 
                                                                key={source.id}
                                                                type='checkbox'
                                                                id={source.id}
                                                                name={source.name}
                                                                label={source.name}
                                                                value={source.selected}
                                                                checked={source.selected}
                                                                onChange={() => this.handleSourceChange(source)}
                                                            />
                                                            )
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    <div className='d-flex justify-content-between'>
                                            <div>
                                                <Button variant="primary" className='mt-4 mr-4' type='submit' size='sm'>
                                                        Save Settings
                                                </Button>
                                            </div>
                                            <div>
                                                <Button variant="secondary" className='mt-4' onClick={(e) => this.logout(e)} size='sm'>
                                                    Logout
                                                </Button>
                                            </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                            </Form>
                        </Container>
                    </Col>
                </div>
            </div>
        )
    }
}