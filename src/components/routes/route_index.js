import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { IndexLink, Link } from 'react-router';

import { makeRequest, checkStatusJSON } from '../../api'

export default class RouteIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
  }
  
  static contextTypes = {
    router: React.PropTypes.object
  }
  
  componentWillMount() {
    this.fetchRoutes()
  }
  
  fetchRoutes() {
    return makeRequest('/api/routes')
      .then(checkStatusJSON)
      .then( (routes) => {
        this.setState({
          routes: routes
        })
      })
      .catch( (ex) => {
        this.setState({
          locations: []
        })
      })
  }
  
  goToRoute = (route) => {
    this.context.router.push('routes/' + route.id)
  }
  
  renderRoute = (route) => {
    let name = route.name && ( <div className="name">{route.name}</div> )
    let grade = route.grade && ( <div className="route-info">Grade: {route.grade}</div> )
    let setter = route.setter && ( <div className="route-info">Setter: {route.setter}</div> )
    let type = route.type && ( <div className="route-info">Type: {route.type}</div> )
    let info = route.info && ( <div className="route-info">Info: {route.info}</div> )
    
    let images = route.images || []
    let image = images.length > 0 ? ( <Image responsive src={images[0]} /> ) : null
    
    let averageRating = ( <div className="rating-info">Avg Rating: 4.5/5</div> )
    let numberOfReviews = ( <div className="rating-info">11 Reviews</div> )
    
    return (
      <Row key={route.id} onClick={ () => { this.goToRoute(route) } }>
        <Col smOffset={1} sm={10} className="route">
          <Row>
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
            <Col sm={4}>
              {image}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  
  render() {
    return (
      <Grid className="page-routes">
        <Row>
          <Col smOffset={1} sm={10}>
            <div>
              <Link to="routes/create" className="btn btn-primary">Create Route</Link>
            </div>
          </Col>
        </Row>
        {
          this.state.routes.map((route) => {
             return this.renderRoute(route)
          })
        }
      </Grid>
    );
  }
}
