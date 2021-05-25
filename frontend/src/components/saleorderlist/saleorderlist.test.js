import React from "react";
import { shallow } from "enzyme";
import Saleorderlist from "./saleorderlist";

describe("Saleorderlist", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Saleorderlist />);
    expect(wrapper).toMatchSnapshot();
  });
});
