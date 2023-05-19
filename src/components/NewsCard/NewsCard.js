import React from 'react'
import { Card, Badge, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './NewsCard.css'

function NewsCard(props) {
    return (
        <Card className='news-card mt-4'>
          <div className='img-wrapper'>
            <Card.Img variant="top" 
               alt='img' className='feature-img' src={props.news.urlToImage}/>
               <div className='overlay'></div>
               <Badge bg='primary' className='category-badge'>{props.news.source.name}</Badge>
          </div>
          <Card.Body>
            <Card.Title>{props.news.title}</Card.Title>
            <Card.Text className='description'>
              {props.news.description}
            </Card.Text>
            <p className='mt-2 content mb-1'>
              {props.news.content}
            </p>
          </Card.Body>
           <div className='reference mb-2 px-3'>
                <div className="d-flex align-items-center">
                    <div className='item'>
                            <span className='title'>Source:</span>
                            <span className='value'>{props.news.source.name}</span>
                        </div>
                      <div className='bar'></div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className='item'>
                            <span className='title'>Author:</span>
                            <span className='value'>{props.news.author}</span>
                        </div>
                  </div>
            </div>
          <Card.Body>
            <Button variant="primary" className='news-btn' onClick={() => window.open(props.news.url, '_blank')}>Read more →</Button>
          </Card.Body>
        </Card>
      );
}

export default NewsCard;