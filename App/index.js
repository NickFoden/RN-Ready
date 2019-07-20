import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import Navigator from "./config/routes";
import { AlertProvider } from "./components/Alert";
import configureStore from "./config/store";

export default class extends Component {
  constructor(props) {
    super(props);
    const { store, persistor } = configureStore();
    this.state = {
      store,
      persistor
    };
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <PersistGate persistor={this.state.persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#4F6D7A" }}>
            <AlertProvider>
              <Navigator onNavigationStateChange={null} />
            </AlertProvider>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
