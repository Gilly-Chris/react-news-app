import React from 'react'
import './NewsCard.css'
import nullImage from '../../images/profile.jpg'
import { Card, Badge, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { mutlimedia_prefix } from '../../utils/constants';

export default function NewsCard2(props) {

    return (
        <Card className='card-2 mt-4'>
          <Card.Body>
            <Card.Title>{props.news.abstract}</Card.Title>
            <h6 className='snipet'>{props.news.snippet}</h6>
            <Card.Text>
                {props.news.lead_paragraph}
            </Card.Text>
          </Card.Body>
          <div className='info-wrapper'>
            <p className='key'>Media</p>
            <div className='media-wrapper'>
                {
                    props.news.multimedia.slice(0, 4).map(image => 
                        <img src={mutlimedia_prefix + image.url}></img>
                        )
                }
            </div>
            <p className='key'>Headline</p>
                <div className='reference mb-2'>
                    <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Source:</span>
                                <span className='value'>{props.news.source}</span>
                            </div>
                      </div>
                </div>
                <div className='reference mb-2'>
                    <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Main Headline:</span>
                                <span className='value'>{props.news.headline.main}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Headline Kicker:</span>
                                <span className='value'>{props.news.headline.kicker}</span>
                            </div>
                      </div>
                </div>
            <p className='key'>Keywords</p>
                <div className='keyword-list mb-2'>
                    {props.news.keywords.map(keyword => 
                             <span>{keyword.value}</span>
                        )} 
                </div>
            <p className='key'>News Details</p>
                <div className="reference">
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Author:</span>
                                <span className='value'>{props.news.byline.original}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Source:</span>
                                <span className='value'>{props.news.source}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Document Type:</span>
                                <span className='value'>{props.news.document_type}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>News Desk:</span>
                                <span className='value'>{props.news.news_desk}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Section Name:</span>
                                <span className='value'>{props.news.section_name}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Sub Section Name:</span>
                                <span className='value'>{props.news.subsection_name}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Type of Material:</span>
                                <span className='value'>{props.news.type_of_material}</span>
                            </div>
                         <div className='bar'></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className='item'>
                                <span className='title'>Published date:</span>
                                <span className='value'>{props.news.pub_date}</span>
                            </div>
                      </div>
                </div>
          </div>
          <Card.Body>
              <Button variant="primary" className='news-btn' onClick={() => window.open(props.news.web_url, '_blank')}>Read more →</Button>
          </Card.Body>
        </Card>
    )
}