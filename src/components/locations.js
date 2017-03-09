import React, { Component } from 'react';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      badAuth: false
    };
  }
  
  render() {
    return (
      <Grid className="page-locations">
        <Row>
          <Col smOffset={3} sm={6} className="location">
            <Row>
              <Col sm={6}>Map</Col>
              <Col sm={6}>Location Name</Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
