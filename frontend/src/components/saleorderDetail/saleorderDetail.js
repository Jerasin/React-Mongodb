import React, { Component } from "react";

import * as actions from "./../../actions/saleorderdetail.action";
import { connect } from "react-redux";
import {limit} from './../../Constatns'

class SaleorderDetail extends Component {

constructor(props) {
   super(props);
  this.state = ({
    serachPage: null,
  })
}
componentDidMount(){
  this.props.GetSaleOrderDetail(this.props.match.params.id ,{page: 1 , limit: limit});

}


renderRows = () => {
  try {
    const { isGet,isFetching} = this.props.saleorderdetailReducer;

    if (isGet === null  ) return;
    if(isGet.status === 404){
     return this.props.history.goBack();
    }
    // console.log(isGet.lenthData)
    return isGet.result.map((data) => (
      <tr key={data._id}>

        <td>{data.product_Code}</td>
        <td>{data.product_Name}</td>
        <td>{data.product_Price}</td>
        <td>{data.qty}</td>
      
      </tr>
    ));
  } catch (err) {
    console.log("map error");
    alert(err);
  }
};


serachPage(page ,limit) {
  try {
    const { isGet, isFetching } = this.props.saleorderdetailReducer;
    let lenthPage = Math.ceil(isGet.lenthData / limit);
    if (page > lenthPage || page === null || !page)
      return alert("Not you serach Page");
    this.props.GetSaleOrderDetail({ page: page, limit: limit });
  } catch (err) {
    alert(err);
  }
}


menuIndex() {
  try {
    const { isGet, isFetching } = this.props.saleorderdetailReducer;
    if (isGet != null && isGet.status != "401" && !isFetching) {
      return (
        <div className="ul-flex">
          {isGet.after > 0 && (
            <li className="page-item">
              <b
                className="page-link"
                onClick={() => {
                  this.props.GetSaleOrderDetail({ page: isGet.after, limit: limit });
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
                  this.props.GetSaleOrderDetail({ page: isGet.next, limit: limit });
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
                    this.props.GetSaleOrderDetail({ page: isGet.last, limit: limit
                     });
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


  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Sale Order: {this.props.match.params.id}</h1>
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
                  {/* /.card-header */}
                  <div className="card-body card_body">
                    <div className="table-responsive">
                      <table
                        id="example2"
                        className="table table-bordered table-hover test-table"
                      >
                        <thead>
                          <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderRows()}</tbody>
                      </table>
                    </div>
                  </div>

                  <nav aria-label="..." className="main-nav">
                    <ul className="pagination nav-start">
                      

                      <button
                        className="btn btn-block btn-warning btn-cal"
                        onClick={(e) => {
                          this.props.history.goBack();
                        }}
                      >
                        Back
                      </button>
                    </ul>
                    </nav>

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
const mapStateToProps = ({ saleorderdetailReducer}) => ({
  saleorderdetailReducer
});

const mapDispatchToProps = {
  // From to import * as actions
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleorderDetail);

