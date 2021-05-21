import React from "react";
import { shallow } from "enzyme";
import Sell from "./sell";

describe("Sell", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Sell />);
    expect(wrapper).toMatchSnapshot();
  });
});
