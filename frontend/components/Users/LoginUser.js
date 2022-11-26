import React from "react";

import Card from "../UI/Card";

const LoginUser = props => {

    const loginUserHandler = (event) => {
        event.preventDefault();
    }

    return (
        <Card>
            <form onSubmit={loginUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" text="text" />
                <label htmlFor="password">Password</label>
                <input id="password" text="text" />
                <button type="submit">Login</button>
            </form>
        </Card>
    )
};

export default LoginUser;