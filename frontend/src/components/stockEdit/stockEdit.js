import React, { Component } from "react";

import { connect } from "react-redux";

import { imageUrl } from "./../../Constatns";

import jwt_decode from "jwt-decode";

import * as actions from "./../../actions/stock.action";
class StockEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_Code: "",
      product_Name: "",
      product_Price: "",
      product_Stock: "",
      product_Image: "",
    };
  }

  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps === null) return;
    if (nextProps.stockReducer.isEditStock === null) return;
    if (nextProps.stockReducer.isEditStock.status === 401) localStorage.clear();
    if (nextProps.stockReducer.isEditStock.status === 404)
      return this.props.history.goBack();
    this.setState({
      product_Code: nextProps.stockReducer.isEditStock.result_id.product_Code,
      product_Name: nextProps.stockReducer.isEditStock.result_id.product_Name,
      product_Price: nextProps.stockReducer.isEditStock.result_id.product_Price,
      product_Stock: nextProps.stockReducer.isEditStock.result_id.product_Stock,
      product_Image: nextProps.stockReducer.isEditStock.result_id.product_Image,
    });
  }

  userLogUpdate() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.email;
    } catch (err) {
      localStorage.clear();
    }
  }

  isFetchingData = () => {
    try {
      return (
        <form>
          <div className="card-body">
            <div className="form-group">
              <label>Product Code </label>
              <input
                type="text"
                className="form-control"
                name="product_Code"
                id="product_Code"
                disabled
                placeholder="Enter Product Code"
                value={this.state.product_Code}
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
                value={this.state.product_Name}
                onChange={(e) => {
                  this.setState({ product_Name: e.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <label>Product Price</label>
              <input
                type="number"
                className="form-control"
                name="product_Price"
                id="product_Price"
                placeholder="Enter Product Price"
                value={this.state.product_Price}
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
                id="product_Stock"
                placeholder="Enter Product Stock"
                value={this.state.product_Stock}
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
                    // value={this.state.product_Image}
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
              // disabled={this.isCheck()}
              className="btn btn-primary btn-submit"
              onClick={(e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append("product_Code", this.state.product_Code);
                formData.append("product_Name", this.state.product_Name);
                formData.append("product_Price", this.state.product_Price);
                formData.append("product_Stock", this.state.product_Stock);
                formData.append("product_Image", this.state.product_Image);
                formData.append("update_by", this.userLogUpdate());

                this.props.updateProduct(
                  this.props.history,
                  this.props.match.params.id,
                  formData
                );
                // this.props.history.push("/stock");
                this.props.history.goBack();
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
      );
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Edit Product</h3>
          </div>
          {/* /.card-header */}

          {/* form start */}
          {this.isFetchingData()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer }) => ({
  stockReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockEdit);
