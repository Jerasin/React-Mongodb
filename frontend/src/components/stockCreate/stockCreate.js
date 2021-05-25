import React, { Component } from "react";
import "./stockCreate.css";

import { connect } from "react-redux";

import jwt_decode from "jwt-decode";

import { withRouter } from "react-router";

import { addProduct } from "./../../actions/stock.action";
import * as actions from "./../../actions/login.action";

class StockCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_Code: 0,
      product_Name: null,
      product_Price: 0,
      product_Stock: 0,
      product_Image: null,
      create_by: null,
      update_by: null,
    };
  }

  userLogCreate() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.email;
    } catch (err) {
      localStorage.clear();
    }
  }

  isProductCodeDulipcate = () => {
    return (
      <div className="alert alert-danger alert-dismissible">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          ×
        </button>
        <h5>
          <i className="icon fas fa-ban" /> ProductCode Duplicate!
        </h5>
      </div>
    );
  };

  isCheck = () => {
    if (
      this.state.product_Code >= 0 &&
      this.state.product_Code &&
      this.state.product_Stock >= 0 &&
      this.state.product_Stock &&
      this.state.product_Price >= 0 &&
      this.state.product_Price &&
      this.state.product_Name != null &&
      this.state.product_Name != ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Create Product</h3>
          </div>

          {/* /.card-header */}
          {/* form start */}
          <form>
            <div className="card-body">
              <div className="form-group">
                <label>Product Code </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  name="product_Code"
                  id="product_Code"
                  placeholder="Enter Product Code"
                  onChange={(e) => {
                    this.setState({ product_Code: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_Name"
                  id="product_Name"
                  placeholder="Enter Product Name"
                  onChange={(e) => {
                    this.setState({ product_Name: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  name="product_Price"
                  id="product_Price"
                  placeholder="Enter Product Price"
                  onChange={(e) => {
                    this.setState({ product_Price: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label>Product Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="product_Stock"
                  min={0}
                  id="product_Stock"
                  placeholder="Enter Product Stock"
                  onChange={(e) => {
                    this.setState({ product_Stock: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputFile">Product Image</label>
                <div className="input-group">
                  <div className="custom-file file">
                    <input
                      type="file"
                      className="form-control file_input"
                      name="product_Image"
                      id="product_Image"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        this.setState({ product_Image: e.target.files[0] });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Popup Error */}
            </div>

            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="summit"
                disabled={this.isCheck()}
                className="btn btn-primary btn-submit"
                onClick={(e) => {
                  e.preventDefault();

                  const formData = new FormData();
                  formData.append("product_Code", this.state.product_Code);
                  formData.append("product_Name", this.state.product_Name);
                  formData.append("product_Price", this.state.product_Price);
                  formData.append("product_Stock", this.state.product_Stock);
                  formData.append("product_Image", this.state.product_Image);
                  formData.append("create_by", this.userLogCreate());

                  this.props.addProduct(this.props.history, formData);
                }}
              >
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.history.push("/stock");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stockReducer, loginReducer) => ({
  stockReducer,
  loginReducer,
});

const mapDispatchToProps = {
  addProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StockCreate));
