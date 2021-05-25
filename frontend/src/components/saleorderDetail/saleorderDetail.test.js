import React from "react";
import { shallow } from "enzyme";
import SaleorderDetail from "./saleorderDetail";

describe("SaleorderDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SaleorderDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
