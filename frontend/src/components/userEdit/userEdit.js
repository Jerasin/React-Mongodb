import React, { Component } from "react";
import { connect } from "react-redux";
// import Select from "react-select";
import * as actions from "./../../actions/user.action";

const options = [
  { value: "admin", label: "admin" },
  { value: "user", label: "user" },
];

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_Code: "",
      email: "",
      userRole: "",
      create_date: "",
      update_date: "",
      newRole: { userRole: "" },
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userReducer === null) return;
    if (nextProps.userReducer.isGetById === null) return;

    if (nextProps.userReducer.isGetById.status === 401) localStorage.clear();
    if (nextProps.userReducer.isGetById === 404)
      return this.props.history.goBack();
    this.setState({
      user_Code: nextProps.userReducer.isGetById.result[0].user_Code,
      email: nextProps.userReducer.isGetById.result[0].email,
      userRole: nextProps.userReducer.isGetById.result[0].userRole,
      newRole: { userRole: nextProps.userReducer.isGetById.result[0].userRole },
      create_date: nextProps.userReducer.isGetById.result[0].create_date,
      update_date: nextProps.userReducer.isGetById.result[0].update_date,
    });
  }

  isFetchingData = () => {
    const { newRole } = this.state;

    try {
      return (
        <form>
          <div className="card-body">
            <div className="form-group">
              <label>User Code </label>
              <input
                type="text"
                className="form-control"
                name="user_Code"
                id="user_Code"
                disabled={true}
                value={this.state.user_Code}
                onChange={(e) => {
                  this.setState({ user_Code: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                disabled={true}
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <label>User Role</label>
              <select
                value={newRole.userRole}
                className="form-control"
                name="userRole"
                id="userRole"
                onChange={(e) => {
                  this.setState({
                    newRole: { userRole: e.target.value },
                  });
                }}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>

              {console.log(this.state.newRole)}
            </div>

            <div className="form-group">
              <label>Create Date</label>
              <input
                type="text"
                className="form-control"
                name="create_date"
                id="create_date"
                disabled={true}
                value={this.state.create_date.split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Create Date</label>
              <input
                type="text"
                className="form-control"
                name="update_date"
                id="update_date"
                disabled={true}
                value={this.state.update_date.split("T")[0]}
              />
            </div>
          </div>

          {/* /.card-body */}
          <div className="card-footer">
            <button
              type="summit"
              // disabled={this.isCheck()}
              className="btn btn-primary btn-submit"
              onClick={(e) => {
                e.preventDefault();

                this.props.updateUser(
                  this.props.match.params.id,
                  this.state.newRole
                );
                
                this.props.history.goBack();
              }}
            >
              Update
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                this.props.history.goBack();
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
            <h3 className="card-title">Edit User</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          {this.isFetchingData()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
