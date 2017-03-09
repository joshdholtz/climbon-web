import React, { Component } from 'react';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';

export default class Routes extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4}>Routes</Col>
          <Col sm={4}>B</Col>
          <Col sm={4}>C</Col>
        </Row>
      </Grid>
    );
  }
}
