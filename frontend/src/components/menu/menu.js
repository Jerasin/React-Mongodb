import React, { Component } from "react";
import { withRouter } from "react-router";
import "./menu.css";
class menu extends Component {
  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="#" className="brand-link">
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
           
              <p
                className="nav-link btn_bugermenu_menu"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </p>
              
          </a>

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
                    <p>Stock</p>
                  </a>
                </li>

                <li
                  className="nav-item"
                  onClick={(e) => {
                    this.props.history.push("/user");
                  }}
                >
                  <a className="nav-link">
                    <i className="fas fa-users icon nav-icon" />
                    <p>Stock</p>
                  </a>
                </li>
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
