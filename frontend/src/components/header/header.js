import React, { Component } from "react";

import jwt_decode from "jwt-decode";

// Property History and Match can't use from external Tab route you can use wtihRouter for this
import { withRouter } from "react-router";

import "./header.css";

import { connect } from "react-redux";
import * as Login_actions from "./../../actions/login.action";
import * as App_actions from './../../actions/app.action'

class header extends Component {
  userLogin() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.email;
    } catch (err) {
      localStorage.clear();
    }
  }

  // componentDidMount(){
  //   this.userLogin();
  // }

  render() {
    return (
      <div>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light header_main">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link btn_bugermenu_header"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
          <form className="form-inline ml-3 search">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <span className="hidden-xs">{this.userLogin()}</span>
              </a>

              <ul className="dropdown-menu dropdown_menu_show">
                {/* User image */}
                <li className="user-header">
                  
                    
                    <div className="container-dropdown-user container-img">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/menu_banner.jpg`}
                      alt="Test1"
                      className="brand-image img-circle elevation-3"
                      style={{ opacity: ".8" , width: "80px" , height: "80px"}}
                    />
                    </div>
                  
                  
                  <div
                    className="container-dropdown-user"
                    style={{ paddingTop: "10px" }}
                  >
                    <div className="container-text">
                      <span className="text">{this.userLogin()}</span>
                    </div>
                    <div className="container-button">
                      <button
                        className="btn-signout"
                        onClick={() => {
                          localStorage.clear();
                          this.props.history.push("/login");
                          
                          this.props.appReducer.app.forceUpdate();
                        }}
                      >
                        Signout
                      </button>
                    </div>
                  </div>
                </li>
                {/* Menu Body */}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ appReducer, loginReducer }) => ({
  appReducer,
  loginReducer,
});

const mapDispatchToProps = {
  ...Login_actions,...App_actions
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));
