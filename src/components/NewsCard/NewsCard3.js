import React from 'react'
import './NewsCard.css'
import nullImage from '../../images/profile.jpg'
import { Card, Badge, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function NewsCard3(props) {

    return (
        <Card className='card-2 mt-4'>
          <Card.Body>
            <Card.Title>{props.news.webTitle}</Card.Title>
          </Card.Body>
          <div className='info-wrapper'>
            <p className='key'>Headline</p>
                <div className='reference mb-2'>
                    <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Type:</span>
                                <span className='value'>{props.news.type}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Published:</span>
                                <span className='value'>{props.news.webPublicationDate}</span>
                            </div>
                      </div>
                </div>
            <p className='key'>News Details</p>
                <div className="reference">
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Section ID:</span>
                                <span className='value'>{props.news.sectionId}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Section Name:</span>
                                <span className='value'>{props.news.sectionName}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Piller ID:</span>
                                <span className='value'>{props.news.pillarId}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Piller Name:</span>
                                <span className='value'>{props.news.pillarName}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className='item'>
                        <span className='title'>Source:</span>
                        <span className='value'>The Guardian News</span>
                     </div>
                </div>
          </div>
          <Card.Body>
              <Button variant="primary" className='news-btn' onClick={() => window.open(props.news.webUrl, '_blank')}>Read more →</Button>
          </Card.Body>
        </Card>
    )
}