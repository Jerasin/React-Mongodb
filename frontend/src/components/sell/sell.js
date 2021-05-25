import React, { Component } from "react";
import "./sell.css";
import { imageUrl, limit, page } from "./../../Constatns";
import * as stock_Actions from "./../../actions/stock.action";
import * as saleorder_Actions from "./../../actions/saleorder.action";
import * as saleorderlist_Actions from "../../actions/saleorderlist.action";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serachPage_OnFetch: null,
      serachPage_Onpage: null,
      shopArrary: [],
      disabled: [],
      value: { qty: null },
      document_Id: { document_Number: null },
      totalPrice: 0,
      indexPage: {
        page: 1,
        limit: limit,
      },
      check_Focus_Input: null,
      btnCheck: true,
    };
  }

  componentDidMount() {
    this.props.getProducts({ page: 1, limit: limit });
  }

  genDocumentId = () => {
    let randon_Id = Math.floor(Math.random() * 10000001);
    this.setState({ document_Id: { document_Number: randon_Id } });
  };

  userLogCreate() {
    try {
      let token = localStorage.getItem("localStorageID");
      let decoded = jwt_decode(token);
      return decoded.email;
    } catch (err) {
      localStorage.clear();
    }
  }

  serachPage(page) {
    try {
      const { isGetStock, isFetching } = this.props.stockReducer;
      if (page > isGetStock.lenthData || page === null || !page)
        return alert("Not you serach Page");
      this.props.getProducts({ page: page, limit: limit });
    } catch (err) {
      alert(err);
    }
  }

  userLogin() {
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
                    this.props.getProducts({
                      page: isGetStock.after,
                      limit: limit,
                    });
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

            {isGetStock.next <= isGetStock.last &&
              isGetStock.next != isGetStock.now && (
                <li className="page-item">
                  <b
                    className="page-link"
                    onClick={() => {
                      this.props.getProducts({
                        page: isGetStock.next,
                        limit: limit,
                      });
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
                      this.props.getProducts({
                        page: isGetStock.last,
                        limit: limit,
                      });
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

  menu_shopArrary() {
    try {
      const lenth_shopArrary = this.state.shopArrary.length;
      if (lenth_shopArrary === 0) return;
      let start = (page - 1) * limit;
      let end = page * limit;
      let allPage = Math.ceil(lenth_shopArrary / limit);
      // let allPage = Math.ceil(lenth_shopArrary / limit);

      const next = this.state.indexPage.page + 1;

      const now = this.state.indexPage.page;

      const after = this.state.indexPage.page - 1;

      const last = allPage;

      return (
        <div className="ul-flex">
          {after > 0 && (
            <li className="page-item">
              <b
                className="page-link"
                onClick={(e) => {
                  let downPage = this.state.indexPage.page - 1;
                  this.setState({
                    indexPage: { page: downPage },
                  });
                }}
              >
                {/* {data.product_Code} */}
                {after}
              </b>
            </li>
          )}

          <li className="page-item">
            <b className="page-link btn-now ">
              {/* {data.product_Code} */}
              {now}
            </b>
          </li>

          {next <= last && next != now && (
            <li className="page-item">
              <b
                className="page-link"
                onClick={(e) => {
                  let upperPage = this.state.indexPage.page + 1;
                  this.setState({
                    indexPage: { page: upperPage },
                  });
                }}
              >
                {/* {data.product_Code} */}
                {next}
              </b>
            </li>
          )}

          {last != next && last != now && last > now && (
            <li className="page-item">
              <b
                className="page-link"
                // onClick={() => {
                //   this.props.getProducts({
                //     page: isGetStock.last,
                //     limit: limit,
                //   });
                // }}
              >
                {/* {data.product_Code} */}
                {last}
              </b>
            </li>
          )}
        </div>
      );
    } catch (err) {
      alert(err);
    }
  }

  onClickSetSell(data) {
    let qty = { ...data, ...this.state.value };
    this.setState({ shopArrary: [...this.state.shopArrary, qty] });
    this.setState({ value: { qty: null } });
  }

  createSo = () => {
    this.state.shopArrary.map((data) => {
      const formData = new FormData();
      formData.append("product_Code", data.product_Code);
      formData.append("product_Name", data.product_Name);
      formData.append("product_Price", data.product_Price);
      formData.append("qty", data.qty);
      formData.append("document_Number", data.document_Number);
      formData.append("create_by", this.userLogCreate());
      this.props.add_SaleOrder(formData);
    });
  };

  reCalStock = () => {
    this.state.shopArrary.map((data) => {
      let result = data.product_Stock - data.qty;

      const formData = new FormData();
      formData.append("product_Code", data.product_Code);
      formData.append("product_Name", data.product_Name);
      formData.append("product_Price", data.product_Price);
      formData.append("product_Stock", result);
      formData.append("document_Number", data.document_Number);
      this.props.update_SaleOrder(this.props.history, formData);
    });
  };

  saleOrderList = () => {
    const formData = new FormData();
    formData.append("document_Number", this.state.document_Id.document_Number);
    formData.append("grand_total", this.state.totalPrice);
    formData.append("sku", this.state.shopArrary.length);
    formData.append("create_by", this.userLogCreate());
    this.props.create_SaleOrderList(formData);
  };

  onSave = async () => {
    await this.createSo();
    await this.reCalStock();
    await this.saleOrderList();
  };

  onChangeSetUnit(e, data) {
    this.check_Focus_Input(data);
    this.genDocumentId();
    let qty = parseInt(e.target.value);
    this.setState({
      value: { qty: qty },
    });
  }

  check_Focus_Input = (data) => {
    this.setState({
      check_Focus_Input: data.product_Code,
    });
  };

  renderRows = () => {
    try {
      const {
        isGetStock,
        idEditStock,
        isAddStock,
        isFetching,
      } = this.props.stockReducer;

      if (isGetStock === null) return;
      return isGetStock.result.map((data) => (
        <tr key={data._id}>
          <td>
            <input
              className="shop_product_sell"
              type="number"
              min="0"
              disabled={this.state.disabled.indexOf(data.product_Code) !== -1}
              name="shop_product_sell"
              id={data.product_Code}
              style={{ maxWidth: "50px" }}
              onChange={(e) => {
                this.setState({
                  btnCheck: true,
                });
                console.log(this.state.check_Focus_Input);
                if (e.target.value > data.product_Stock) {
                  alert("Stock ไม่พอ");
                  e.target.value = data.product_Stock;
                }
                this.onChangeSetUnit(e, data);
              }}
            />
            <button
              id={data.product_Code}
              key={data.product_Code}
              className="btn btn-primary btn-add"
              disabled={this.state.disabled.indexOf(data.product_Code) !== -1}
              onClick={(e) => {
                console.log(data.product_Code);
                console.log(this.state.check_Focus_Input);
                console.log(this.state.value.qty);
                if (!this.state.value.qty) return alert("Please Select");
                if (data.product_Code !== this.state.check_Focus_Input)
                  return alert("กรุณาเลือกจำนวนสินค้า");

                this.onClickSetSell(data);
                this.setState({
                  disabled: [...this.state.disabled, data.product_Code],
                });
              }}
            >
              Add
            </button>
          </td>
          <td>{data.product_Code}</td>
          <td>{data.product_Name}</td>
          <td>{data.product_Price}</td>
          <td>{data.product_Stock}</td>
          <td className="data_Image">
            {data.product_Image != null && data.product_Image != "null" ? (
              <img
                className="image"
                alt=""
                src={`${imageUrl}/images/${
                  data.product_Image
                }?dummy=${Math.random()}`}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/no_image.jpg`}
                alt=""
                className="image"
              />
            )}
          </td>
        </tr>
      ));
    } catch (err) {
      console.log("map error");
      alert(err);
    }
  };

  deleteListProduct = (value) => {
    // สร้างตัวแปรรับ loop หาค่า value ของ obj product_Code ที่ตรงกับ Parameter ที่รับเข้ามา
    const search = (obj) => obj.product_Code === value;

    // เอาค่า value ที่ loop ได้มาหา index ของค่าที่ obj ที่ต้องการ
    let index = this.state.shopArrary.findIndex(search);
    let getClassname = this.state.shopArrary.find(search);
    let changeTypeClassname = getClassname.product_Code.toString();
    this.state.shopArrary.splice(index, 1);
    this.state.disabled.splice(index, 1);
    this.setState({ qty: null });

    let shop_product_sell = document.getElementById(changeTypeClassname);
    shop_product_sell.value = "";
    this.forceUpdate();
  };

  totalPrice = () => {
    if (this.state.shopArrary && this.state.shopArrary.length > 0) {
      let doc_Running = this.state.document_Id;
      let masterData = this.state.shopArrary.map((data) => ({
        ...data,
        ...doc_Running,
      }));
      this.setState({ shopArrary: masterData });

      let grandTotal = this.state.shopArrary.map((data) => {
        return data.product_Price * data.qty;
      });

      let arraryTotal = [];
      arraryTotal.push(...grandTotal);

      let Total = grandTotal.reduce(myFunc);
      function myFunc(total, num) {
        return total + num;
      }

      return this.setState({
        totalPrice: Total,
      });
    }

    alert("Please Select Product");
  };

  renderShop = () => {
    try {
      if (this.state.shopArrary === null) return;
      let indexStart = (this.state.indexPage.page - 1) * limit;
      let indexEnd = this.state.indexPage.page * limit;
      return this.state.shopArrary.slice(indexStart, indexEnd).map((data) => (
        <tr key={data._id}>
          <td>
            <button
              className="btn btn-primary btn-delete"
              onClick={(e) => {
                // This is use Array.prototype.findIndex()
                this.deleteListProduct(data.product_Code);
              }}
            >
              Delete
            </button>
          </td>
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

  render() {
    return (
      <div className="content-wrapper contrainer-flex">
        <div className="content-flexbox1">
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  {/* /.card-header */}
                  <div className="table-responsive tablet_1">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          {this.userLogin() === "admin" && <th>Status</th>}
                          <th>Product Code</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>Stock</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderRows()}</tbody>
                    </table>
                  </div>

                  <nav aria-label="..." className="main-nav">
                    <ul className="pagination nav-start">
                      <button
                        disabled={
                          !this.state.totalPrice || this.state.btnCheck === true
                        }
                        className="btn btn-primary btn-save"
                        onClick={(e) => {
                          this.onSave();
                        }}
                      >
                        SAVE
                      </button>

                      <button
                        className="btn btn-block btn-warning btn-cal"
                        onClick={(e) => {
                          this.totalPrice();
                          this.setState({
                            btnCheck: false,
                          });
                        }}
                      >
                        Cal
                      </button>
                    </ul>

                    <ul className="pagination nav-start">
                      <label>Total:</label>
                      <p style={{ marginLeft: "5px" }}>
                        {this.state.totalPrice}
                      </p>
                    </ul>

                    {/* {console.log(this.state.shopArrary)} */}
                    <ul className="pagination nav-end">
                      <label className="SerachPage-label">Page:</label>
                      <div style={{ marginRight: "2px" }}>
                        {this.menuIndex()}
                      </div>
                      <input
                        type="text"
                        className="nav-input"
                        name="serachPage"
                        onChange={(e) => {
                          this.setState({ serachPage_OnFetch: e.target.value });
                          // this.setState({
                          //   btnCheck: true
                          // })
                        }}
                      />

                      <button
                        className="btn-select"
                        onClick={() => {
                          this.serachPage(this.state.serachPage_OnFetch);
                        }}
                      >
                        Select
                      </button>
                    </ul>
                  </nav>
                  {/* {console.log(this.state.disabled)} */}

                  {/* /.card-body */}
                </div>

                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}

          {/* /.content */}
        </div>

        <div className="content-flexbox2">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive tablet_2">
                    <table
                      id="example2"
                      className="table table-bordered table-hover "
                    >
                      <thead>
                        <tr>
                          <th>Delete</th>
                          <th>Product Code</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>QTY</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderShop()}</tbody>
                    </table>
                  </div>

                  <nav aria-label="..." className="main-nav">
                    <ul className="pagination nav-start">
                      {this.menu_shopArrary()}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  stockReducer,
  loginReducer,
  saleorderReducer,
  saleorderlistReducer,
}) => ({
  stockReducer,
  loginReducer,
  saleorderReducer,
  saleorderlistReducer,
});

const mapDispatchToProps = {
  // From to import * as actions
  ...stock_Actions,
  ...saleorder_Actions,
  ...saleorderlist_Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sell));
