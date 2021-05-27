import React, { Component } from "react";

//Axios เป็น JavaScript libary สำหรับ http request ใช้สำหรับเชื่อมต่อกับ API Service เพื่อการรับส่งข้อมูลแบบ RESTful API โดยที่เจ้า axios จะทำหน้าที่เป็นตัวกลางในการจัดการทั้ง method, data, headers, security และอื่นๆ ส่วน  httpClient จะช่วยจัดการ Endpoint ให้สั้นลง
import { httpClient } from "./../../utils/HttpClient";

//  import Config port server
import { apiUrl, server } from "./../../Constatns";

import { connect } from "react-redux";
import { register, reset } from "../../actions/register.action";
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      userRole: "user",
    };
  }

  onClickRegister = () => {
    // ใส่ ENDPOINT เต็ม
    // Axios.post(apiUrl + server.REGISTER_URL, this.state).then((response) => {
    //   alert(JSON.stringify(response.data));
    // });
    // ทำ httpClient ใส่เฉพาะ Route
    // httpClient.post(server.REGISTER_URL , this.state).then((response) =>{
    //   alert("Ok")
    // }).catch((error) =>{
    //   alert(JSON.stringify(error))
    // })
    // alert(JSON.stringify(this.state))
  };

  showError = () => {
    return (
      <div className="alert alert-danger alert-dismissible">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        ></button>
        <h5>
          <i className="icon fas fa-ban" /> Error!
        </h5>
        Incorrect information
      </div>
    );
    return;
  };

  showSuccess = () => {
    return (
      <div className="alert alert-success alert-dismissible">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        ></button>
        <h5>
          <i className="icon fas fa-check" /> Register Success
        </h5>
      </div>
    );
  };

  showDuplicate = () => {
    return (
      <div className="alert alert-danger ">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        ></button>
        <h5>
          <i className="icon fas fa-ban" /> Duplicate!!
        </h5>
      </div>
    );
  };

  isVadidation = () => {
    let regularEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (this.state.email && this.state.password) {
      if (regularEmail.test(this.state.email))
        return this.props.register(this.props.history, this.state);
    }

    alert("Please Check Email and Password");
  };

  render() {
    const { result, isError, isDuplicate } = this.props.registerReducer;

    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html">
              <b>Register</b>
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
                <div className="input-group mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
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
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>

                {isError && this.showError()}

                {result && this.showSuccess()}

                {/*  logic alert แบบแรก  */}
                {/* {this.props.registerReducer.isDuplicate && this.showDuplicate()} */}

                {/* logic alert แบบสองเรียกว่า Ternery condition */}
                {isDuplicate && this.showDuplicate()}

                {/* Register */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.isVadidation();
                        
                      }}
                      type="button"
                      disabled={this.props.registerReducer.result === "OK"}
                      className="btn btn-primary btn-block"
                    >
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>

                {/* Back to Login Page   */}
                <div className="row">
                  {/* /.col */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-light btn-block btn-flat"
                      style={{ marginTop: "16px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.reset(this.props.history, this.state);
                      }}
                    >
                      Cancel
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

const mapStateToProps = ({ registerReducer }) => ({
  registerReducer,
});

const mapDispatchToProps = {
  register,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
