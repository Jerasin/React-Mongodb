import React, { Component } from "react";
import Footer from "./components/footer";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Menu from "./components/menu/menu";
import Register from "./components/register/register";
import Stock from "./components/stock/stock";
import StockCreate from "./components/stockCreate";
import StockEdit from "./components/stockEdit";

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

const isLogin = () => {
  const token = localStorage.getItem("localStorageID");
  if (typeof token === "string") {
    return token;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
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
  componentDidMount() {
    this.props.setApp(this);
    console.log(typeof localStorage.getItem("localStorageID"));
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
