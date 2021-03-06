import React, { Component } from 'react';

import logo from '../images/logo.png'

export default class Index extends Component {
  renderMailchimpEarlyAccess() {
    const hiddenInputStyle = {
      position: 'absolute',
      left: '-5000px'
    }
    
    return (
      <div className="mailchimp">
        <div id="mc_embed_signup">
          <form action="//climbonapp.us15.list-manage.com/subscribe/post?u=bd11d40eab151332ccc867ab7&amp;id=5348af74da" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
            <div className="form-info">Subscribe For Early Access Info</div>
            <input type="email" name="EMAIL" className="form-control" id="mce-EMAIL" placeholder="Your Email"/>
            <input style={hiddenInputStyle} type="text" name="b_bd11d40eab151332ccc867ab7_5348af74da" tabindex="-1" value=""/>
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="btn btn-primary"/>
          </form>
        </div>
      </div>
    )
  }
  
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
                        {this.renderMailchimpEarlyAccess()}
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
                <div className="row feature">
                    <div className="col-lg-12 text-center">
                        <h3>Climbing Journal</h3>
                        <p>
                          Log your bouldering, top rope, and sport climbs!<br/>
                          Record grade, photos, videos, and how you felt<br/>
                          about the route.<br/><br/>
                          Your jornal will be kept indefinitely and can be<br/>
                          exported by you at anytime if you would like take<br/>
                          your data somewhere else.
                        </p>
                    </div>
                </div>
                <div className="row feature">
                    <div className="col-lg-12 text-center">
                        <h3>Review Routes</h3>
                        <p>
                          Review routes set at your gym.<br/>
                          Give them a rating between 1 and 5 and<br/>
                          a suggested grade.<br/><br/>
                          Please be considerate while leaving<br/>
                          a comment for the route setter.<br/>
                          Let them know what worked and<br/>
                          what did not work.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }
}
