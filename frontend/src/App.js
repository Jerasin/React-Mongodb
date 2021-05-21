import React, { Component } from "react";
import Footer from "./components/footer";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Menu from "./components/menu/menu";
import Register from "./components/register/register";
import Stock from "./components/stock/stock";
import StockCreate from "./components/stockCreate";
import StockEdit from "./components/stockEdit";
import jwt_decode from "jwt-decode";

import { connect } from "react-redux";
import { setApp } from "./actions/app.action";
import { autoLogin } from "./actions/login.action";

import { storeState } from "./index";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Sell from "./components/sell/sell";

const isLogin = () => {
  try {
    let tokenBro = localStorage.getItem("localStorageID");
    if (tokenBro === null) return false;
    return true;
  } catch (err) {
    localStorage.clear();
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> :<Redirect to="/login" />  }
    />
  );
};


const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Redirect to="/stock" /> : <Component {...props} />
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLogin: false,
    };
  }

  checkLogin() {
    if (localStorage.getItem("localStorageID")) {
      return this.setState({
        checkLogin: true,
      });
    }
    return this.setState({
      checkLogin: false,
    });
  }

  componentDidMount() {
    this.props.setApp(this);
    
  }
  

  // Function help path to login
  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <Router>
        {isLogin() && <Header />}
        {isLogin() && <Menu />}
        
        {console.log(this.state.checkLogin)}
        {/* ไม่รองรับ history.push

        <Route path="/" exact>
          <this.redirectToLogin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route> */}
        {/* Use Switch because you set Route path="*" .this process all Check loop
        in Route Tag from top to bottom */}
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/stock" component={Stock} />
          <PrivateRoute path="/stock-create" component={StockCreate} />
          <PrivateRoute path="/stock-edit/:id" component={StockEdit} />
          <PrivateRoute path="/sell" component={Sell} />
          {/* Case  Path Other is  have't Route */}
          <Route path="*" exact component={this.redirectToLogin} />
          <Route path="/" exact component={this.redirectToLogin} />
        </Switch>

        {isLogin() && <Footer />}
      </Router>
    );
  }
}

const mapStateToProps = (appReducer, loginReducer) => ({
  appReducer,
  loginReducer,
});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
