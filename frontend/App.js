import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import Foreground from "./Foreground";
import Background from "./Background";
import Notification from "./Notification";

function App() {
  return (
    <Provider store={store}>
      <Foreground />
      <Background />
      <Notification />
    </Provider>
  );
}

export default App;
