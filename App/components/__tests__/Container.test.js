import React from "react";
import renderer from "react-test-renderer";

import { Container, styles } from "../Container";

it("exports a styles object", () => {
  expect(typeof styles).toBe("object");
});

it("renders succesfully without children", () => {
  const rendered = renderer.create(<Container />).toJSON();
  expect(rendered).toBeTruthy();
});
