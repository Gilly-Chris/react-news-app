import React, {Component} from 'react';
import { v4 as uuidv4 } from "uuid";
import { Container, Navbar, Nav} from 'react-bootstrap';
import { navs } from '../../utils/constants';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css'

export default class Header extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.setState({user: JSON.parse(localStorage.getItem('user'))})
  }

  render() {
    return (
     <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='navbar' fixed='top'>
        <Container>
          <Navbar.Brand href="#home">
            <div className='profile-wrapper'>
                  { this.state.user === null ? <img src={require('../../images/profile.jpg')}></img> : <img src={this.state.user.image}></img>}
                  { this.state.user && <span>{this.state.user.name}</span>}
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {
                navs.map(nav => 
                  <LinkContainer to={nav.page} key={uuidv4()}>
                    <Nav.Link className="ml-2">{nav.nav}</Nav.Link>
                  </LinkContainer>                
                  )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     </>
    );
  }
}