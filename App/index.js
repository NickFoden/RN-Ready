import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";

import Navigator from "./config/routes";
import { AlertProvider } from "./components/Alert";
import store from "./config/store";

export default () => (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#4F6D7A" }}>
      <AlertProvider>
        <Navigator onNavigationStateChange={null} />
      </AlertProvider>
    </SafeAreaView>
  </Provider>
);
