import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CurrencyList from "../CurrencyList";
import { initialState as currencyInitialState } from "../../reducers/currencies";
import { initialState as themeInitialState } from "../../reducers/theme";

const mockStore = configureStore([]);
it("succesfuly render currency list", () => {
  const navigation = { state: { params: { type: "quote" } } };
  const initialState = {
    currencies: currencyInitialState,
    theme: themeInitialState
  };
  const rendered = shallow(
    <Provider store={mockStore(initialState)}>
      <CurrencyList navigation={navigation} />
    </Provider>
  );
  expect(rendered.dive()).toMatchSnapshot();
});
