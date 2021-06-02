import React, { Component } from "react";
import * as actions from "./../../actions/stock.action";
import { connect } from "react-redux";
import "./stock.css";
import { imageUrl , limit } from "./../../Constatns";

import jwt_decode from "jwt-decode";
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

  constructor(props) {
    super(props);
    this.state = {
      serachPage: null,
    };
  }

  componentDidMount() {
    this.props.getProducts({ page: 1, limit: 5 });
  }

  serachPage(page , limit) {
    try {
      const { isGetStock, isFetching , isError } = this.props.stockReducer;
      if(isError) localStorage.removeItem("localStorageID");
      let lenthPage = Math.ceil(isGetStock.lenthData / limit);
      if (page > lenthPage || page === null || !page || page !== 0 || typeof(page) !== "number")
        return alert("Not you serach Page"); 
      this.props.getProducts({ page: page, limit: limit });
    } catch (err) {
      alert(err);
      localStorage.clear()
    }
  }

  checkRole() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.userRole;
    } catch (err) {
      localStorage.clear();
    }
  }

  menuIndex() {
    try {
      const { isGetStock, isFetching } = this.props.stockReducer;
      if (isGetStock != null && isGetStock.status != "401" && !isFetching) {
        return (
          <div className="ul-flex">
            {isGetStock.after > 0 && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.props.getProducts({ page: isGetStock.after, limit: limit });
                  }}
                >
                  {/* {data.product_Code} */}
                  {isGetStock.after}
                </b>
              </li>
            )}

            <li className="page-item">
              <b className="page-link btn-now ">
                {/* {data.product_Code} */}
                {isGetStock.now}
              </b>
            </li>

            {isGetStock.next <= isGetStock.last && isGetStock.next != isGetStock.now && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.props.getProducts({ page: isGetStock.next, limit: limit });
                  }}
                >
                  {/* {data.product_Code} */}
                  {isGetStock.next}
                </b>
              </li>
            )}

            {isGetStock.last != isGetStock.next &&
              isGetStock.last != isGetStock.now &&
              isGetStock.last > isGetStock.now && (
                <li className="page-item">
                  <b
                    className="page-link"
                    onClick={() => {
                      this.props.getProducts({ page: isGetStock.last, limit: limit });
                    }}
                  >
                    {/* {data.product_Code} */}
                    {isGetStock.last}
                  </b>
                </li>
              )}
          </div>
        );
      }
    } catch (err) {
      alert(err);
    }
  }

  renderRows = () => {
    try {
      const { isGetStock,idEditStock,isAddStock, isFetching ,isError } = this.props.stockReducer;
      if(isError) return localStorage.clear()
      if (isGetStock === null  ) return;
      if(isGetStock.status === 401) return;
      // console.log(isGetStock === null && isFetching)
      return isGetStock.result.map((data) => (
        <tr key={data._id}>
          {this.checkRole() === "admin" && (
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
          )}
          <td>{data.product_Code}</td>
          <td>{data.product_Name}</td>
          <td>{data.product_Price}</td>
          <td>{data.product_Stock}</td>
          <td className="data_Image">
            {data.product_Image !== null && data.product_Image !=="null" ?
              <img
                className="image"
                alt=""
                src={`${imageUrl}/images/${
                  data.product_Image
                }?dummy=${Math.random()}`}
              /> :  <img
              src={`${process.env.PUBLIC_URL}/images/no_image.jpg`}
              alt="Test1"
              className="image"
            />
            }
          
    
          </td>
          <td>{data.update_time.split("T")[0]}</td>
        </tr>
      ));
    } catch (err) {
      localStorage.clear()
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
                  <li className="breadcrumb-item active">Warehouse</li>
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
                  <div className="row">
                    {/* /.col */}
                    <div className="col-12">
                      {this.checkRole() === "admin" && (
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
                      )}
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
                            {this.checkRole() === "admin" && <th>Status</th>}
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

                  <nav aria-label="..." className="main-nav">
                    <ul className="pagination nav-start">{this.menuIndex()}</ul>
                    <ul className="pagination nav-end">
                      <label className="SerachPage-label">SerachPage:</label>
                      <input
                        type="text"
                        className="nav-input"
                        name="serachPage"
                        onChange={(e) => {
                          this.setState({ serachPage: e.target.value });
                          
                        }}
                      />
                      <button
                        className="btn-select"
                        onClick={() => {
                          this.serachPage(this.state.serachPage , limit);
                        }}
                      >
                        Select
                      </button>
                    </ul>
                  </nav>

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

const mapStateToProps = ({ stockReducer, loginReducer }) => ({
  stockReducer,
  loginReducer,
});

const mapDispatchToProps = {
  // From to import * as actions
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
