import React, { Component } from "react";
import { page, limit } from "./../../Constatns";
import * as actions from "./../../actions/user.action";
import { connect } from "react-redux";
class User extends Component {
  componentDidMount() {
    this.props.getUsers({ page: page, limit: limit });
  }

  serachPage(page, limit) {
    try {
      const { isGet, isFetching, isError } = this.props.userReducer;
      if (isError) localStorage.removeItem("localStorageID");
      let lenthPage = Math.ceil(isGet.lenthData / limit);
      if (page > lenthPage || page === null || !page || page === 0 || typeof(page) !== "number")
        return alert("Not you serach Page");
      this.props.getUsers({ page: page, limit: limit });
    } catch (err) {
      alert(err);
      localStorage.clear();
    }
  }

  menuIndex() {
    try {
      const { isGet, isFetching } = this.props.userReducer;
      if (isGet != null && isGet.status != "401" && !isFetching) {
        return (
          <div className="ul-flex">
            {isGet.after > 0 && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.props.getUsers({ page: isGet.after, limit: limit });
                  }}
                >
                  {isGet.after}
                </b>
              </li>
            )}

            <li className="page-item">
              <b className="page-link btn-now ">{isGet.now}</b>
            </li>

            {isGet.next <= isGet.last && isGet.next != isGet.now && (
              <li className="page-item">
                <b
                  className="page-link"
                  onClick={() => {
                    this.props.getUsers({ page: isGet.next, limit: limit });
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
                      this.props.getProducts({
                        page: isGet.last,
                        limit: limit,
                      });
                    }}
                  >
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

  renderRows = () => {
    try {
      const { isGet, isFetching } = this.props.userReducer;

      if (isGet === null) return;
      if (isGet.status === 401) return;
      if (isGet.lenthdata === 0) return this.props.history.push("/stock");
      // console.log(isGetStock === null && isFetching)
      return isGet.result.map((data) => (
        <tr key={data._id}>
          <td>{data.user_Code}</td>
          <td>{data.email}</td>
          <td>{data.userRole}</td>
          <td>{data.create_date.split("T")[0]}</td>
          <td>{data.update_date.split("T")[0]}</td>
          <td>
            <button
              className="btn btn-primary btn-edit"
              onClick={() => {
                this.props.history.push(`/user-edit/${data.user_Code}`);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      ));
    } catch (err) {
      console.log("map error");
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
                <h1>Users List</h1>
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
                            <th>User Code</th>
                            <th>email</th>
                            <th>User Role</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th>User Edit</th>
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
                          let numberSerachPage = parseInt(
                            this.state.serachPage
                          );

                          this.serachPage(numberSerachPage, limit);
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

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = {
  // From to import * as actions
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
