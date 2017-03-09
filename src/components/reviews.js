import React, { Component } from 'react';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';

export default class Reviews extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={4}>Reviews</Col>
          <Col sm={4}>B</Col>
          <Col sm={4}>C</Col>
        </Row>
      </Grid>
    );
  }
}
