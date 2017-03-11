import React, { Component } from 'react';
import { Alert, Form, FormControl, Button, FormGroup, Row, Col, ControlLabel, Image } from 'react-bootstrap';

import { makeRequest, checkStatusJSON } from '../api'
import auth from '../auth'

import { makeValue, makeOnChange } from '../helpers'

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
              <FormControl type="text" placeholder="Username" value={makeValue(this, 'username')} onChange={makeOnChange(this, 'username')}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Password
            </Col>
            <Col sm={6}>
              <FormControl type="password" placeholder="Password"  value={makeValue(this, 'password')} onChange={makeOnChange(this, 'password')}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={6}>
              <Button type="submit" className="co-button">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
