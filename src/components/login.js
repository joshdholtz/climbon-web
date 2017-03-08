import React, { Component } from 'react';
import { Alert, Form, FormControl, Button, FormGroup, Row, Col, ControlLabel, Image } from 'react-bootstrap';

import { makeRequest, checkStatusJSON } from '../api'
import auth from '../auth'

import logo from '../images/logo.png'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      badAuth: false
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  onUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  submit = (event) => {
    event.preventDefault();
    
    auth.login(this.state.username, this.state.password, function(success) {
      if (success) {
        this.props.onLoginChange(true)
        this.context.router.push('home')
      } else {
        this.setState({badAuth: true})
      }
    }.bind(this))
  }

  loginAlert() {
    return (
      <Alert bsStyle="danger">
        <h4>Invalid email/password combination</h4>
      </Alert>
    )
  }

  render() {
    return (
      <div>
        {this.state.badAuth ? this.loginAlert() : null}
        <Form  horizontal onSubmit={this.submit}>
          <Row>
            <Col smOffset={6} sm={2}>
              <Image src={logo} className="login-image" responsive />
            </Col>
          </Row>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Username
            </Col>
            <Col sm={6}>
              <FormControl type="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Password
            </Col>
            <Col sm={6}>
              <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={6}>
              <Button type="submit">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
