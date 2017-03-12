import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { IndexLink, Link } from 'react-router';

import { makeRequest, checkStatusJSON } from '../../api'

export default class RouteShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route_id: props.routeParams.id,
      route: null
    };
  }
  
  componentWillMount() {
    this.fetchRoute()
  }
  
  fetchRoute() {
    return makeRequest('/api/routes/' + this.state.route_id)
      .then(checkStatusJSON)
      .then( (route) => {
        this.setState({
          route: route
        })
      })
      .catch( (ex) => {
        this.setState({
          route: null
        })
      })
  }
  
  renderRoute = (route) => {
    let name = route.name && ( <div className="name">{route.name}</div> )
    let grade = route.grade && ( <div className="route-info">Grade: {route.grade}</div> )
    let setter = route.setter && ( <div className="route-info">Setter: {route.setter}</div> )
    let type = route.type && ( <div className="route-info">Type: {route.type}</div> )
    let info = route.info && ( <div className="route-info">Info: {route.info}</div> )
    
    let averageRating = ( <div className="rating-info">Avg Rating: 4.5/5</div> )
    let numberOfReviews = ( <div className="rating-info">11 Reviews</div> )
    
    return (
      <Row>
        <Col smOffset={1} sm={10} className="route">
          <Row>
            <Col sm={4}>
              <Image responsive src={"https://s3.us-east-2.amazonaws.com/climbon-uploads/F62D722C-6BBA-473B-BDC4-1ED97685984A_profile.jpeg"} />
            </Col>
            <Col sm={4}>
              {name}
              {grade}
              {setter}
              {type}
              {info}
            </Col>
            <Col sm={4}>
              {averageRating}
              {numberOfReviews}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  
  render() {
    if (!this.state.route) {
      return null
    }
    
    return (
      <Grid className="page-routes">
        {this.renderRoute(this.state.route)}
      </Grid>
    );
  }
}
