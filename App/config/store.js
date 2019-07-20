import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "../reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["network"]
};

const persistReducer = persistCombineReducers(persistConfig, reducer);

const configureStore = () => {
  const store = createStore(persistReducer, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
