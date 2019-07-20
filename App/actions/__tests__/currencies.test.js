import { getInitialConversion, changeCurrencyAmount } from "../currencies";

describe("getInitialConversion", () => {
  it("Creates properly formatted action", () => {
    // const expected = { type: "GET_INITIAL_CONVERSION" };
    // const actual = getInitialConversion();
    // expect(actual).toEqual(expected);
    expect(getInitialConversion()).toMatchSnapshot();
  });
});

describe("changeCurrencyAmount", () => {
  it("creates an action with amount of 100", () => {
    // const expected = {
    //   type: "CHANGE_CURRENCY_AMOUNT",
    //   amount: 100
    // };
    // const actual = changeCurrencyAmount(100);
    // expect(actual).toEqual(expected);
    expect(changeCurrencyAmount(100)).toMatchSnapshot();
  });
  it("Converts a string to a float", () => {
    // const expected = {
    //   type: "CHANGE_CURRENCY_AMOUNT",
    //   amount: 100
    // };
    // const actual = changeCurrencyAmount("100");
    // expect(actual).toEqual(expected);
    expect(changeCurrencyAmount("100")).toMatchSnapshot();
  });
});
