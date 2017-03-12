import React, { Component } from 'react';
import { Alert, Form, FormControl, Button, FormGroup, Row, Col, ControlLabel, Image } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker'

import { makeRequest, checkStatusJSON } from '../../api'
import auth from '../../auth'

import { makeValue, makeOnChange } from '../../helpers'

// TODO: Use this - https://github.com/rkit/react-select2-wrapper

export default class RouteCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      type: '',
      grade: '',
      setter: '',
      setAtDate: null,
      setAtDateFormatted: null,
      location_id: null,
      locations: []
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    this.fetchLocations()
  }
  
  fetchLocations() {
    return makeRequest('/api/locations')
      .then(checkStatusJSON)
      .then( (locations) => {
        this.setState({
          locations: locations
        })
      })
      .catch( (ex) => {
        this.setState({
          locations: null
        })
      })
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
        set_at: this.state.setAtDateFormatted,
        location_id: this.state.location_id
      }})
      .then(checkStatusJSON)
      .then( (route) => {
        if(route.id) {
          this.context.router.push('routes/' + route.id)
        } else {
          // TODO: Fix this later, bruh
          alert("Could not create")
        }
      })
      .catch( (ex) => {
        // TODO: Fix this later, bruh
        alert("Could not create")
      })
  }

  alert() {
    return (
      <Alert bsStyle="danger">
        <h4>Invalid email/password combination</h4>
      </Alert>
    )
  }
  
  handleSetAtChange = (value, formattedValue) => {
    this.setState({
      setAtDate: value,
      setAtDateFormatted: formattedValue
    })
  }

  renderInput(label, placeholder, stateName) {
    return (
      <FormGroup controlId={"formHorizontal" + stateName}>
        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
          {label}
        </Col>
        <Col sm={6}>
          <FormControl type="text" placeholder={placeholder} value={makeValue(this, stateName)} onChange={makeOnChange(this, stateName)}/>
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

          <FormGroup controlId="formControlsSetAt">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              <ControlLabel>Set At</ControlLabel>
            </Col>
            <Col sm={6}>
              <DatePicker dateFormat={"YYYY-MM-DD"} value={this.state.setAtDate} onChange={this.handleSetAtChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              <ControlLabel>Locations</ControlLabel>
            </Col>
            <Col sm={6}>
              <FormControl componentClass="select" placeholder="-" onChange={makeOnChange(this, 'location_id')}>
                <option key={0} value={null}>-</option>
                {
                  this.state.locations.map((location) => {
                     return (
                       <option key={location.id} value={location.id}>{location.name}</option>
                     )
                  })
                }
              </FormControl>
            </Col>
          </FormGroup>

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
