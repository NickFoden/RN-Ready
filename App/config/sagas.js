import { delay, takeEvery, call, put, select } from "redux-saga/effects";
import {
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  SWAP_CURRENCY,
  CONVERSION_RESULT,
  CONVERSION_ERROR
} from "../actions/currencies";

const requestTimeout = (time, promise) => {
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject(
          new Error("Request has timed out you have a slow internet connection")
        ),
      time
    );
    promise.then(resolve, reject);
  });
};
export const getLatestRate = currency => {
  requestTimeout(
    2000,
    fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`)
  );
};

export const fetchLatestConversionRates = function*({ currency }) {
  const { connected, hasCheckedStatus } = yield select(state => state.network);

  if (!connected && hasCheckedStatus) {
    console.log("Not connected");
    yield put({
      type: CONVERSION_ERROR,
      error:
        "Not connected to the internet. Conversion rate may be out of date or unavailable"
    });
    return;
  }

  try {
    let usedCurrency = currency;
    if (usedCurrency === undefined) {
      usedCurrency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRate, usedCurrency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (error) {
    yield put({ type: CONVERSION_ERROR, error: error.message });
  }
};

const clearConversionError = function*() {
  const DELAY_SECONDS = 4;
  const error = yield select(state => state.currencies.error);
  if (error) {
    yield delay(DELAY_SECONDS * 1000);
    yield put({ type: CONVERSION_ERROR, error: null });
  }
};

const rootSaga = function*() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CONVERSION_ERROR, clearConversionError);
};

export default rootSaga;
