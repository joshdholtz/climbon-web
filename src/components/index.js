import React, { Component } from 'react';

import logo from '../images/logo.png'

export default class Index extends Component {
  render() {
    return (
      <div>
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <img className="img-responsive" src={logo} alt=""/>
                        <div className="intro-text">
                            <span className="name">Climb On</span>
                            <hr className="star-light"/>
                            <span className="skills">Climbing Journal - Review Routes - Analyze Data</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <section id="features">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2>Features</h2>
                        <hr className="star-primary"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3>Climbing Journal</h3>
                        <p>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3>Review Routes</h3>
                        <p>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3>Analyze Data</h3>
                        <p>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something<br/>
                          Something something something something
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }
}
