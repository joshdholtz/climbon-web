import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLink, Link } from 'react-router';

import { makeRequest, checkStatusJSON } from './api'
import auth from './auth'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    auth.checkSession(function(success) {
      if (success) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    }.bind(this))
  }
  
  footer() {
    return (
      <footer className="text-center">
          <div className="footer-above">
              <div className="container">
                  <div className="row">
                      <div className="footer-col col-md-4">
                          <h3>Location</h3>
                          <p>Somewhere On<br/>
                              The Internet
                          </p>
                      </div>
                      <div className="footer-col col-md-4">
                          <h3>Around the Web</h3>
                          <ul className="list-inline">
                              <li>
                                  <a href="https://www.facebook.com/GetClimbOn/" className="btn-social btn-outline"><i className="fa fa-fw fa-facebook"></i></a>
                              </li>
                              <li>
                                  <a href="https://twitter.com/GetClimbOn" className="btn-social btn-outline"><i className="fa fa-fw fa-twitter"></i></a>
                              </li>
                              <li>
                                  <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-instagram"></i></a>
                              </li>
                              <li>
                                  <a href="#" className="btn-social btn-outline"><i className="fa fa-fw fa-youtube"></i></a>
                              </li>
                          </ul>
                      </div>
                      <div className="footer-col col-md-4">
                          <h3>About ClimbOn</h3>
                          <p>ClimbOn is a tool and community for journaling and reviewing climbing routes.</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="footer-below">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          Copyright &copy; ClimbOn 2017
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    )
  }
  
  render() {
    return (
      <div>
        <Navbar collapseOnSelect fixedTop className="navbar-custom">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">ClimbOn</a>
            </Navbar.Brand>
            <Navbar.Toggle>
              Menu
            </Navbar.Toggle>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Gyms</NavItem>
              <NavItem eventKey={2} href="#">Routes</NavItem>
              <NavItem eventKey={2} href="#">Reviews</NavItem>
            </Nav>
            {this.renderRightNav(this.state.loggedIn)}
          </Navbar.Collapse>
        </Navbar>
        <div className="root-content">
          {this.props.children && React.cloneElement(this.props.children, {
            onLoginChange: this.handleLogin
          })}
        </div>
        {this.footer()}
      </div>
    );
  }
  
  renderRightNav = (isLoggedIn) => {
    if (isLoggedIn) {
      return (
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="home">Home</Link>
          </NavItem>
          <NavItem eventKey={2} onClick={ () => { this.handleLogout() } }>Logout</NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="login">Login</Link>
          </NavItem>
          <NavItem eventKey={2} href="#">Sign Up</NavItem>
        </Nav>
      )
    }
  }
  
  handleLogout() {
    auth.logout(() => {
      this.handleLogin(false)
      this.context.router.push('/')
    })
  }
  
  handleLogin = (isLoggedIn) => {
    this.setState({loggedIn: isLoggedIn})
  }
}

export default App;
