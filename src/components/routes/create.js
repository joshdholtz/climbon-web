import React, { Component } from 'react';
import { Alert, Form, FormControl, Button, FormGroup, Row, Col, ControlLabel, Image } from 'react-bootstrap';

import { makeRequest, checkStatusJSON } from '../../api'
import auth from '../../auth'

import { makeValueLink } from '../../helpers'

export default class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      type: '',
      grade: '',
      setter: '',
      location_id: null
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  submit = (event) => {
    event.preventDefault();
    
    makeRequest('/api/routes', {
      method: 'POST',
      body: {
        name: this.state.name,
        info: this.state.info,
        type: this.state.type,
        grade: this.state.grade,
        setter: this.state.setter,
        location_id: this.state.location_id
      }})
      .then(checkStatusJSON)
      .then( (json) => {
        if(json.id) {
          console.log("we created a thing", json)
        } else {
          console.log("error in success")
        }
      })
      .catch( (ex) => {
        console.log("straight up error")
      })
  }

  alert() {
    return (
      <Alert bsStyle="danger">
        <h4>Invalid email/password combination</h4>
      </Alert>
    )
  }

  renderInput(label, placeholder, stateName) {
    return (
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
          {label}
        </Col>
        <Col sm={6}>
          <FormControl type="text" placeholder={placeholder} valueLink={makeValueLink(this, stateName)}/>
        </Col>
      </FormGroup>
    )
  }

  render() {
    return (
      <div>
        <Form  horizontal onSubmit={this.submit}>
        
          {this.renderInput('Route Name', 'Route Name', 'name')}
          {this.renderInput('Info', 'Info', 'info')}
          {this.renderInput('Type', 'Type', 'type')}
          {this.renderInput('Grade', 'Grade', 'grade')}
          {this.renderInput('Setter Name', 'Setter Name', 'setter')}
          {this.renderInput('Location ID', 'Location ID', 'location_id')}

          <FormGroup>
            <Col smOffset={4} sm={6}>
              <Button type="submit">
                Create
              </Button>
            </Col>
          </FormGroup>
          
        </Form>
      </div>
    );
  }
}
