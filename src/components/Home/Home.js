import React, { Component, CSSProperties } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import NewsCard from "../NewsCard/NewsCard";
import { BounceLoader } from "react-spinners";
import Filter from "./Filter";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "../../utils/constants";
import Swal from "sweetalert2";
import './Home.css'
import NewsCard2 from "../NewsCard/NewsCard2";
import NewsCard3 from "../NewsCard/NewsCard3";
import InfiniteScroll from "react-infinite-scroll-component";


export default class Home extends Component {
    state = {
        isLoading: false,
        alreadyMounded: false,
        loadingMore: false,
        loaded_news: [],
        page: 1,
        q: '',
        category: '',
        source: '',
        from: '',
        to: ''
    }

    componentDidMount() {
        this.loadNews(null)
    }

    loadNews = (data) => {
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
        }
            
        const formData = new FormData()
        formData.append('_method', 'POST');
        if(data !== null) {
            formData.append('q', data.search);
            formData.append('category', data.category);
            formData.append('source', data.source);
            formData.append('from', data.from);
            formData.append('to', data.to);
        }
        formData.append('page', 1)
        
        this.setState({isLoading: true})
        this.props.setProgress(15)
        axios.post(baseUrl + 'news', formData, config)
            .then(({data}) => {
                console.log(data)
                if(data.status == 200) {
                    this.props.setProgress(70)
                    this.setState({loaded_news: data.news, isLoading: false})
                    this.props.setProgress(100)
                } else {
                    this.setState({isLoading: false})
                    this.props.setProgress(0)
                    console.log(data)
                    Swal.fire({
                        title: "Oops..",
                        text: "Sorry, we ecountered an error.",
                        icon:"error"
                    })
                }
            }).catch(({response}) => {
                this.setState({isLoading: false})
                this.props.setProgress(0)
                console.log(response)
         })
    }

    loadMoreNews = () => {
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
        }

        const formData = new FormData()
        formData.append('_method', 'POST');
        formData.append('q', this.state.q);
        formData.append('category', this.state.category);
        formData.append('source', this.state.source);
        formData.append('from', this.state.from);
        formData.append('to', this.state.to);
        formData.append('page', this.state.page + 1)

        console.log("loading more at page:", this.state.page + 1)

        this.props.setProgress(15)
        axios.post(baseUrl + 'news', formData, config)
            .then(({data}) => {
                if(data.status == 200) {
                    this.props.setProgress(70)
                    this.updateNewsList(data.news)
                    this.props.setProgress(100)
                } else {
                    this.props.setProgress(0)
                    Swal.fire({
                        title: "Oops..",
                        text: "Sorry, we ecountered an error.",
                        icon:"error"
                    })
                }
            }).catch(({response}) => {
                this.props.setProgress(0)
                console.log(response)
         })
    }

    updateNewsList = (more_news) => {
        let current_news = this.state.loaded_news;
        this.setState({loaded_news: current_news.concat(more_news), page: this.state.page + 1})
    }

    onFilterNews = (data) => {
        this.setState({q: data.search, category: data.category, source: data.source, from: data.from, to: data.to, page: 1})
        this.loadNews(data)
        setTimeout(() => {
            let feed_top = document.getElementById('feed-top');
            window.scrollTo({top: feed_top.offsetTop - 115, left: 0, behavior: 'smooth' });
        }, 20);
    }

    render() {
        let loaded_news = this.state.loaded_news

        return (
            <section className="home-section">
                 <Filter onFilter={(values) => this.onFilterNews(values)} />

                 {this.state.isLoading ? 
                    <div className="loader">
                        <div className="loading-icon">
                            <BounceLoader
                                loading={this.state.isLoading}
                                color={'#334ebc'}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            {/* <span className="loading-word mt-4">Preparing News..</span> */}
                        </div>
                    </div> : null} 
                 <Container className="px-md-5 feed-wrapper">
                    <Row className="justify-content-center w-100">
                        <Col md={9} lg={6} xs={12} className="feed-col px-md-4">
                            <div id="feed-top"></div>
                            
                            <InfiniteScroll
                                    dataLength={ this.state.loaded_news.length }
                                    next={ () => this.loadMoreNews() } //To put endMessage and loader to the top.
                                    hasMore={true}
                                    loader={ 
                                    <BounceLoader
                                        loading={this.state.isLoading}
                                        color={'#334ebc'}
                                        size={60}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /> }
                                >
                                    {/* Return different layouts based on the news source. Here I differentiate between news sources 
                                        by checking whether certain entries in the json object are present or not. For instance, only news from 
                                        New York Times containes the 'abstract' key */}
                                {loaded_news.map(news => {
                                    if(news.abstract !== undefined) {
                                        return <NewsCard2 
                                                    key={ uuidv4() }
                                                    news={news}/>
                                    } else if(news.id !== undefined) {
                                        return <NewsCard3 
                                                key={ uuidv4() }
                                                news={news}/>
                                    } else {
                                        return <NewsCard 
                                                key={ uuidv4() }
                                                news={news}/>
                                    }
                                })}
                            </InfiniteScroll>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}