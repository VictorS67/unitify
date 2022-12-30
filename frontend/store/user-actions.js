import { userActions } from "./user-slice";

const BACKEND_URL = "https://unitify-api.chenpan.ca";

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const request = new Request(`${BACKEND_URL}/auth`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    Accept: "application/json, text/plain, /",
                    "Content-Type": "application/json"
                }
            });

            const resp = await fetch(request);
            let respJson = await resp.json();

            if (respJson.status === 200) {
                console.log(respJson);
                dispatch(userActions.login(respJson.user));
            }
        } catch (error) {
            console.log("loginUser: Something went wrong");
        }
    }
}

export const getUser = () => {
    return async (dispatch) => {
        try {
            dispatch(userActions.checkAutoLogin());

            const resp = await fetch(`${BACKEND_URL}/user`);
            let respJson = await resp.json();

            if (respJson.status === 200) {
                console.log(respJson);
                dispatch(userActions.login(respJson.user));
            }
        } catch (error) {
            console.log("getUser: Something went wrong");
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            const request = new Request(`${BACKEND_URL}/logout`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json, text/plain, /",
                    "Content-Type": "application/json"
                }
            });

            const resp = await fetch(request);
            let respJson = await resp.json();

            if (respJson.status === 200) {
                console.log(respJson);
                dispatch(userActions.logout());
            }
        } catch (error) {
            console.log("logoutUser: Something went wrong");
        }
    }
}

export const signupUser = (username, email, password, confirmedPassword) => {
    return async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const request = new Request(`${BACKEND_URL}/signup`, {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        confirmedPassword: confirmedPassword
                    }),
                    headers: {
                        Accept: "application/json, text/plain, /",
                        "Content-Type": "application/json"
                    }
                });
    
                const resp = await fetch(request);
                let respJson = await resp.json();
    
                resolve(respJson);
            } catch (error) {
                console.log("signupUser: Something went wrong");
                reject(error);
            }
        });
    }
}
