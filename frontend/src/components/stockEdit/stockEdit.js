import React, { Component } from "react";

class StockEdit extends Component {


  render() {
    return (
      <div className="content-wrapper">StockEdit{this.props.match.params.id}</div>
    )
  }
}

export default StockEdit;
