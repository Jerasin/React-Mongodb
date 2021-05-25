import React, { Component } from "react";
import { connect } from "react-redux";
import "./saleorderlist.css";

import * as SaleOrderList_Actions from "./../../actions/saleorderlist.action";
import jwt_decode from "jwt-decode";
class Saleorderlist extends Component {
  userLogin() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.email;
    } catch (err) {
      localStorage.clear();
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

  checkRoleToshowMenu(page) {
    if (this.checkRole() === "admin")
      return this.props.getSaleOrderLists({ page: page, limit: 5 });
    return this.props.getSaleOrderList({ page: page, limit: 5 });
  }

  menuIndex() {
    try {
      const { isGet, isFetching } = this.props.saleorderlistReducer;
      if (isGet != null && isGet.status != "401" && !isFetching) {
        return (
          <div className="ul-flex">
            {isGet.after > 0 && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.checkRoleToshowMenu(isGet.after);
                  }}
                >
                  {/* {data.product_Code} */}
                  {isGet.after}
                </b>
              </li>
            )}

            <li className="page-item">
              <b className="page-link btn-now ">
                {/* {data.product_Code} */}
                {isGet.now}
              </b>
            </li>

            {isGet.next <= isGet.last && isGet.next != isGet.now && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.checkRoleToshowMenu(isGet.next);
                  }}
                >
                  {/* {data.product_Code} */}
                  {isGet.next}
                </b>
              </li>
            )}

            {isGet.last != isGet.next &&
              isGet.last != isGet.now &&
              isGet.last > isGet.now && (
                <li className="page-item">
                  <b
                    className="page-link"
                    onClick={() => {
                      this.checkRoleToshowMenu(isGet.last);
                    }}
                  >
                    {/* {data.product_Code} */}
                    {isGet.last}
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

  componentDidMount() {
    if (this.checkRole() === "admin")
      return this.props.getSaleOrderLists({ page: 1, limit: 5 });
    this.props.getSaleOrderList({ page: 1, limit: 5, user: this.userLogin() });
  }

  renderRows = () => {
    try {
      const { isGet } = this.props.saleorderlistReducer;

      if (isGet === null) return;
      if (isGet.status === 401) return;
      return isGet.result.map((data) => (
        <tr key={data._id}>
          <td>{data.document_Number}</td>
          <td>{data.grand_total}</td>
          <td>{data.sku}</td>
          <td>{data.create_by}</td>
          <td>{data.create_time.split("T")[0]}</td>

          <td>
            <button
              className="btn btn-primary btn-edit"
              onClick={() => {
                this.props.history.push(
                  `/saleorderdetail/${data.document_Number}`
                );
              }}
            >
              Detail
            </button>
          </td>
        </tr>
      ));
    } catch (err) {
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
                <h1>SaleOrder List</h1>
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
                      {/* {this.userLogin() === "admin" && (
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
                      )} */}
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
                            <th>Document Number</th>
                            <th>Grand Total</th>
                            <th>SKU</th>
                            <th>Create By</th>
                            <th>Create Time</th>
                            <th>Show Detail</th>
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
                          this.serachPage(this.state.serachPage);
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

const mapStateToProps = ({ saleorderlistReducer, saleorderReducer }) => ({
  saleorderlistReducer,
  saleorderReducer,
});

const mapDispatchToProps = {
  // From to import * as actions
  ...SaleOrderList_Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Saleorderlist);
