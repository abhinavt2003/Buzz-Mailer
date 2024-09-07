import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='/auth/google'>
              Login with google<i className='large material-icons'>person</i>
            </a>
          </li>
        );
      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='3'>Credits:{this.props.auth.credits}</li>,
          <li key='2'>
            <a href='/api/logout'>logout</a>
          </li>,
        ];
    }
  }
  render() {
    console.log("hi");
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper blue round'>
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className='brand-logo left'
          >
            BUSS-MAILER
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
