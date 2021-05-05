import React, { Component } from "react";
import * as actions from "./../../actions/stock.action";
import { connect } from "react-redux";
import "./stock.css";
import { imageUrl } from "./../../Constatns";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
class Stock extends Component {
  // dummyData = [
  //   { data1: "xxx", data2: "xxx", data3: "xxx", data4: "xxx", data5: "xxx" },
  //   { data1: "xxx", data2: "xxx", data3: "xxx", data4: "xxx", data5: "xxx" },
  //   { data1: "xxx", data2: "xxx", data3: "xxx", data4: "xxx", data5: "xxx" },
  //   { data1: "xxx", data2: "xxx", data3: "xxx", data4: "xxx", data5: "xxx" },
  //   { data1: "xxx", data2: "xxx", data3: "xxx", data4: "xxx", data5: "xxx" },
  // ];

  componentDidMount() {
    this.props.getProducts();
  }

  renderRows = () => {
    try {
      const { result, isFetching } = this.props.stockReducer;
      if (result != null && result.status != "401" && !isFetching) {
        
          return result.map((data) => ( 
            <tr key={data._id}>
              <td>
                <button
                  className="btn btn-primary btn-edit"
                  onClick={() => {
                    this.props.history.push(`/stock-edit/${data._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary btn-delete"
                  onClick={(e) => {
                    this.props.deleteProduct(data._id);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>{data.product_Code}</td>
              <td>{data.product_Name}</td>
              <td>{data.product_Price}</td>
              <td>{data.product_Stock}</td>
              <td className="data_Image">
                { data.product_Image ?
                  <img
                    className="image" alt=""
                    src={`${imageUrl}/images/${
                      data.product_Image
                    }?dummy=${Math.random()}`}
                  /> : <img style={{borderImage: "10px"}} src="./../../../public/images/react_js_logo.jpg"/>
                }
              </td>
              <td>{data.update_time.split("T")[0]}</td>
            </tr>
          ));
      }
    } catch (err) {
      console.log("map error")
       alert(err);
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Stock</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">DataTables</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      DataTable with minimal features &amp; hover style
                    </h3>
                  </div>

                  <div className="row">
                    {/* /.col */}
                    <div className="col-12">
                      <button
                        style={{ marginBottom: "5px" }}
                        type="submit"
                        className="btn btn-primary  btn_create "
                        onClick={() => {
                          this.props.history.push("/stock-create");
                        }}
                      >
                        Create Product
                      </button>
                    </div>
                    {/* /.col */}
                  </div>

                  {/* /.card-header */}
                  <div className="card-body card_body">
                    <div className="table-responsive">
                      <table
                        id="example2"
                        className="table table-bordered table-hover test-table"
                      >
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Stock</th>
                            <th>Image</th>
                            <th>Update</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderRows()}</tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = ({ stockReducer , loginReducer }) => ({
  stockReducer, loginReducer
});

const mapDispatchToProps = {
  // From to import * as actions
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
