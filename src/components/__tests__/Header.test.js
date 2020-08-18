import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import Header from "../Header";

test("Renders title correctly", async () => {
  const { getByText } = render(<Header siteTitle="Hot Potato!" />);
  expect(getByText("Hot Potato!"));
});

test("Matches previous snapshot", () => {
  const tree = renderer.create(<Header siteTitle="Hot Potato!" />).toJSON();
  expect(tree).toMatchSnapshot();
});
