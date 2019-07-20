import { runSaga } from "redux-saga";
import { fetchLatestConversionRates } from "../sagas";
import { initialState as currencyInitialState } from "../../reducers/currencies";
import { initialState as networkInitialState } from "../../reducers/network";

beforeEach(() => {
  fetch.resetMocks();
});

it("sets the conversion result on a successful response", async () => {
  const expectedResult = {
    base: "USD",
    date: "2018-05-22",
    rates: { AUD: 1.5543 }
  };

  fetch.mockResponseOnce(JSON.stringify(expectedResult));
  const dispatched = [];
  await runSaga(
    {
      dispatch: action => {
        dispatched.push(action);
      },
      getState: () => ({
        currencies: currencyInitialState,
        network: networkInitialState
      })
    },
    fetchLatestConversionRates,
    { currency: "USD" }
  ).done;
  expect(dispatched).toEqual([
    { type: "CONVERSION_RESULT", result: expectedResult }
  ]);
  expect(fetch).toHaveBeenCalled();
});
