import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import Foreground from "./Foreground";

function App() {

    return (
        <Provider store={store}>
            <Foreground />
        </Provider>
    );
}

export default App;
