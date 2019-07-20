import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";

import { Container, styles } from "../Container";

it("exports a styles object", () => {
  expect(typeof styles).toBe("object");
});

it("renders succesfully without children", () => {
  const rendered = renderer.create(<Container />).toJSON();
  expect(rendered).toBeTruthy();
});

it("renders children props", () => {
  const rendered = renderer
    .create(
      <Container>
        <View />
      </Container>
    )
    .toJSON();
  expect(rendered).toMatchSnapshot();
});

it("uses the specified background color if provided", () => {
  const rendered = renderer
    .create(<Container backgroundColor="red" />)
    .toJSON();
  expect(rendered).toMatchSnapshot();
});
