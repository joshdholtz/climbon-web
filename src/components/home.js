import React, { Component } from 'react';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';

import logo from '../images/logo.png'

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4}>A</Col>
          <Col sm={4}>B</Col>
          <Col sm={4}>C</Col>
        </Row>
      </Grid>
    );
  }
}
