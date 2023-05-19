import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { sources, categories } from '../../utils/constants';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import { BounceLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import CloseIcon from '../../images/icon-close.png'
import './Home.css'

export default function(props) {
    const emptyValue = ''
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [category, setCategory] = useState('')
    const [source, setSource] = useState('')
    const [categories, setCategories] = useState([])
    const [sources, setSources] = useState([])
    const [visible, setVisible] = useState(true)

    let token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
    }

    useEffect(() => {
        axios.get(baseUrl + 'my_filters', config)
            .then(({data}) => {
                console.log("loading filter parameters")
                setCategories(data.categories)
                setSources(data.sources)
                setLoading(false)
            }).catch(({response}) => {
                console.log(response)
                setLoading(false)
                Swal.fire({
                    title: "Oops..",
                    text: "There was an loading categories and sources.",
                    icon:"error"
                  })
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        let filterData = {
            search: search,
            category: category,
            source: source,
            from: from,
            to: to
        }

        props.onFilter(filterData)
    }

    if(visible) {
        return (
            <div className='filter-section'>
            <div className='section-wrapper'>
                { loading ? <BounceLoader
                                loading={loading}
                                color={'#334ebc'}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : null}
                <Container>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                       <Row className='row-wrapper'>
                           <Col lg={9} md={12} sm={12}>
                                <Row>
                                    <Col lg={2} md={6} sm={12}>
                                        <Form.Group className="my-2">
                                            <Form.Label>Keywords</Form.Label>
                                            <Form.Control type="text" size='sm' placeholder='Search...' value={search}
                                            onChange={(event) => setSearch(event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2} md={6} sm={12}>
                                        <Form.Group className="my-2">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select size='sm' onChange={(event) => setCategory(event.target.value)}>
                                                <option value={emptyValue}>Select category</option>
                                                {
                                                    Object.values(categories).map(cat => 
                                                        <option value={cat.name} selected={category === cat.name}>{cat.name}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2} md={6} sm={12}>
                                        <Form.Group className="my-2">
                                            <Form.Label>Source</Form.Label>
                                            <Form.Select size='sm' onChange={(event) => setSource(event.target.value)}>
                                                <option value={emptyValue} >Select Source</option>
                                                {
                                                    Object.values(sources).map(src => 
                                                        <option value={src.name} selected={source === src.name}>{src.name}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2} md={6} sm={12}>
                                        <Form.Group className="my-2">
                                            <Form.Label>From</Form.Label>
                                            <Form.Control type="date" size='sm' name='from' value={from} onChange={(event) => setFrom(event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2} md={6} sm={12}>
                                        <Form.Group className="my-2">
                                            <Form.Label>To</Form.Label>
                                            <Form.Control type="date" size='sm' name='to' value={to} onChange={(event) => setTo(event.target.value)}/>
                                        </Form.Group> 
                                    </Col>
                                </Row>
                           </Col>
                           <Col lg={2} md={6} sm={12} className='d-flex justify-content-center align-items-center'>
                             <Button variant="primary" type="submit" className='filter-btn' size='sm'>
                                Filter
                             </Button>
                           </Col>
                       </Row>
                    </Form>
                </Container>
            </div>
            <img src={CloseIcon} className='close-button' onClick={() => setVisible(false)}></img>
        </div>
        )
    } else {
        return <button className='show-filter' onClick={() => setVisible(true)}>Filter</button>
    }
}