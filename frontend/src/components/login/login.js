import React, { Component } from "react";
import { Link } from "react-router-dom";

import {login} from './../../actions/login.action';

import {connect} from 'react-redux'
class Login extends Component {

  constructor(props) {
     super(props);
    this.state = {
      email: null,
      password: null,
    }
  }

  // componentDidMount(){
  //   this.props.autoLogin();
  // }

  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html">
              <b>StockSystem</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div
              style={{ background: "whitesmoke", borderRadius: "10px" }}
              className="card-body login-card-body"
            >
              <p className="login-box-msg">Sign in to start your session</p>
              <form>
              {/* <span>#Debug {JSON.stringify(this.state)}</span> */}
                <div className="input-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e)=>{
                      this.setState({email: e.target.value})
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e)=>{
                      this.setState({password: e.target.value})
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>

                {/* Login */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-12">
                    <button onClick={()=>{
                      this.props.login(this.props.history,this.state)
                      // alert(JSON.stringify(this.state))
                    }} type="submit" className="btn btn-primary  btn-block"
                    disabled = {this.props.loginReducer.isFetching}
                    >
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
                
                {/* Back to Register Page  */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-light btn-block btn-flat"
                      style={{ marginTop: "16px" }} 
                      onClick={() => {
                        this.props.history.push("/register");
                      }}
                    >
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer}) => ({
  loginReducer
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)