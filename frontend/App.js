import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store/store";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";

function App() {

    return (
        <Provider store={store}>
            <Map />
        </Provider>
    );
}

export default App;
