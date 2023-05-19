import React, { Component } from "react";
import './App.css';
import { v4 as uuidv4 } from "uuid";
import Header from './components/Header/Header';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Settings from "./components/Settings/Settings";
import PubSub from "pubsub-js";

export default class App extends Component {
  state = {
    progress: 0,
    token: null,
  }

  componentDidMount() {
    // check if user is already logged in
    this.setState({token: JSON.parse(localStorage.getItem('token'))})

    PubSub.subscribe('loggedIn', (topic, data) => {
      console.log(data.value.token, data.value.user)
      localStorage.setItem('token', JSON.stringify(data.value.token));
       localStorage.setItem('user', JSON.stringify(data.value.user));
       this.setState({token: data.value.token})
    });

    PubSub.subscribe('loggedOut', () => {
      this.setState({token: null})
      localStorage.clear()
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('loggedIn')
    PubSub.unsubscribe('loggedOut')
  }

  updateToken = (newToken) => {
    this.state.token = newToken
  }

  setProgress = (value) => {
    this.setState({progress: value})
  }

  render() {
    if (!this.state.token) {
      return <Auth />
    } else {
      return (
        <Router>
          { this.state.token !== null ? <Header /> : null}
          <LoadingBar color="#005abb" height={3} progress={this.state.progress} />
          <Routes>
            <Route exact key={uuidv4()} path="/" element={ <Home setProgress={this.setProgress}/>}/>
            <Route key={uuidv4()} path="/settings" element={ <Settings />}/>
          </Routes>
       </Router>
      )
    }
  }
}