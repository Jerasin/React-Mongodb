import React, { Component } from "react";
import { withRouter } from "react-router";
import "./menu.css";
import jwt_decode from "jwt-decode";
class menu extends Component {

  userLogin() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.userRole;
    }catch(err){
      localStorage.clear();
    }
  }

  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <div className="brand-link">
            <img
              src={`${process.env.PUBLIC_URL}/images/menu_banner.jpg`}
              alt="Test1"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">ShopSystem</span>
              <p
                className="nav-link btn_bugermenu_menu"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </p>
              
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                <li
                  className="nav-item"
                  onClick={(e) => {
                    this.props.history.push("/stock");
                  }}
                >
                  <a className="nav-link">
                    <i className="fas fa-warehouse icon  " />
                    <p>Warehouse</p>
                  </a>
                </li>

                <li
                  className="nav-item"
                  onClick={(e) => {
                    this.props.history.push("/sell");
                  }}
                >
                  <a className="nav-link">
                    <i className="fas fa-money-bill icon nav-icon" />
                    <p>Sell</p>
                  </a>
                </li>

                {this.userLogin() === "admin" &&<li
                  className="nav-item"
                  onClick={(e) => {
                    this.props.history.push("/user");
                  }}
                >
                  <a className="nav-link">
                    <i className="fas fa-users icon nav-icon" />
                    <p>User</p>
                  </a>
                </li>}
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}

export default withRouter(menu);
