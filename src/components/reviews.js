import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import { makeRequest, checkStatusJSON } from '../api'

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }
  
  componentWillMount() {
    this.fetchReviews()
  }
  
  fetchReviews() {
    return makeRequest('/api/reviews')
      .then(checkStatusJSON)
      .then( (reviews) => {
        this.setState({
          reviews: reviews
        })
      })
      .catch( (ex) => {
        this.setState({
          reviews: []
        })
      })
  }
  
  renderReview = (review) => {
    let title = review.title && ( <div className="title">{review.title}</div> )
    let rating = review.rating && ( <div className="review-info">Rating: {review.rating}</div> )
    let suggestedGrade = review.suggested_grade && ( <div className="review-info">Suggested Grade: {review.suggested_grade}</div> )
    
    return (
      <Row>
        <Col smOffset={1} sm={10} className="review">
          <Row>
            <Col sm={4}>
              <Image responsive src={"https://akamai-anprod.active.com/godleypark/servlet/downloadFile.sdi?uploadedfile_id=262"} />
            </Col>
            <Col sm={8}>
              {title}
              {rating}
              {suggestedGrade}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  
  render() {
    return (
      <Grid className="page-reviews">
        {
          this.state.reviews.map((review) => {
             return this.renderReview(review)
          })
        }
      </Grid>
    );
  }
}
