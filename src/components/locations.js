import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { makeRequest, checkStatusJSON } from '../api'

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
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
          locations: []
        })
      })
  }
  
  renderLocation = (location) => {
    let name = location.name && ( <div className="name">{location.name}</div> )
    let address1 = location.address1 && ( <div className="address">{location.address1}</div> )
    let address2 = location.address2 && ( <div className="address">{location.address2}</div> )
    
    let cityStateZip = location.city  && location.state && location.zip && (
      <div className="address">{ location.city + ", " + location.state + " " + location.zip }</div>
    )
    
    let website = location.website && ( 
      <div className="website" >
        <a target="_blank" href={location.website}>{location.website}</a>
      </div>
    )
    
    return (
      <Row>
        <Col smOffset={1} sm={10} className="location">
          <Row>
            <Col sm={4}>
              <Image responsive src={"https://akamai-anprod.active.com/godleypark/servlet/downloadFile.sdi?uploadedfile_id=262"} />
            </Col>
            <Col sm={8}>
              {name}
              {address1}
              {address2}
              {cityStateZip}
              {website}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  
  render() {
    return (
      <Grid className="page-locations">
        {
          this.state.locations.map((location) => {
             return this.renderLocation(location)
          })
        }
      </Grid>
    );
  }
}
