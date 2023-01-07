import { async } from "q";
import { userActions } from "./user-slice";

const BACKEND_URL = "https://unitify-api.chenpan.ca";

export const loginUser = (username, password) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/auth`, {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        if (respJson.status === 200) {
          console.log(respJson);
          dispatch(userActions.login(respJson.user));

          const latestUserStatusResp = await fetch(
            `${BACKEND_URL}/getLastestUserStatus/${respJson.user._id}`
          );
          let latestUserStatusRespJson = await latestUserStatusResp.json();
          console.log("GET getLastestUserStatus", latestUserStatusRespJson);

          if (latestUserStatusRespJson.status === 200) {
            dispatch(
              userActions.updateLatestUser(latestUserStatusRespJson.data)
            );
          }
        }
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("loginUser: Something went wrong");
        reject(error);
      }
    });
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      dispatch(userActions.checkAutoLogin());

      const resp = await fetch(`${BACKEND_URL}/user`);
      let respJson = await resp.json();

      if (respJson.status === 200) {
        console.log("GET USER", respJson);
        dispatch(userActions.login(respJson.user));

        const latestUserStatusResp = await fetch(
          `${BACKEND_URL}/getLastestUserStatus/${respJson.user._id}`
        );

        let latestUserStatusRespJson = await latestUserStatusResp.json();
        console.log("GET getLastestUserStatus", latestUserStatusRespJson);

        if (latestUserStatusRespJson.status === 200) {
          dispatch(userActions.updateLatestUser(latestUserStatusRespJson.data));
        }
      }
    } catch (error) {
      console.log("getUser: Something went wrong");
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const request = new Request(`${BACKEND_URL}/logout`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
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
  };
};

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
            confirmedPassword: confirmedPassword,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log("result: ", respJson);
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("signupUser: Something went wrong");
        reject(error);
      }
    });
  };
};

export const changeEmail = (userID, newEmail) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/updateEmail`, {
          method: "PUT",
          body: JSON.stringify({
            userId: userID,
            newEmail: newEmail,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log(respJson);
        if (respJson.status === 200) {
          dispatch(userActions.changeEmail(newEmail));
        }
        console.log(respJson);
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("logoutUser: Something went wrong");
        reject(error);
      }
    });
  };
};

export const changeChampionSignature = (userID, championSignature) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/championSignature`, {
          method: "PUT",
          body: JSON.stringify({
            userId: userID,
            championSignature: championSignature,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log(respJson);
        if (respJson.status === 200) {
          dispatch(userActions.changeChampionSignature(championSignature));
        }

        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("changeChampionSignature: Something went wrong");
        reject(error);
      }
    });
  };
};

export const changePassword = (
  userID,
  oldPassword,
  newPassword,
  newPasswordAgain
) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/changePassword`, {
          method: "PUT",
          body: JSON.stringify({
            userId: userID,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmedNewPassword: newPasswordAgain,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log(respJson);
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("changePassword: Something went wrong");
        reject(error);
      }
    });
  };
};

export const getLikeNumber = (userID) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${BACKEND_URL}/likeNumber/${userID}`);
      let respJson = await resp.json();

      console.log("GET LIKE NUMBER", respJson);

      if (respJson.status === 200) {
        console.log("SUCCESS", respJson);
        // dispatch(userActions.login(respJson.user));
        // dispatch(userActions,sLikeNumber());
      }
    } catch (error) {
      console.log("likeNumber: Something went wrong");
    }
  };
};

export const getLatestUserStatus = (userID) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${BACKEND_URL}/getLastestUserStatus/${userID}`);
      let respJson = await resp.json();

      console.log("GET LATEST USER STATUS", respJson);

      if (respJson.status === 200) {
        console.log("SUCCESS", respJson);
        // dispatch(userActions.login(respJson.user));
        dispatch(userActions.updateLatestUser(respJson.data));
      }
    } catch (error) {
      console.log("lastestUserStatus: Something went wrong");
    }
  };
};

export const getHistoryMiles = (userId) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${BACKEND_URL}/historyMiles/${userId}`);
      let respJson = await resp.json();

      console.log("GET History Miles", respJson);

      // if (respJson.status === 200) {
      //     console.log("SUCCESS", respJson);
      //     // dispatch(userActions.login(respJson.user));
      //     dispatch(userActions.updateLatestUser(respJson.data));
      // }
    } catch (error) {
      console.log("lastestUserStatus: Something went wrong");
    }
  };
};

export const likeUser = (userId, likedUserId) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/like`, {
          method: "PUT",
          body: JSON.stringify({
            userId: userId,
            likedUserId: likedUserId,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log(respJson);
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("likeUser: Something went wrong");
        reject(error);
      }
    });
  };
};

export const unlikeUser = (userId, unlikedUserId) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(`${BACKEND_URL}/unlike`, {
          method: "PUT",
          body: JSON.stringify({
            userId: userId,
            unlikedUserId: unlikedUserId,
          }),
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        });

        const resp = await fetch(request);
        let respJson = await resp.json();

        console.log(respJson);
        resolve(
          JSON.stringify({
            message: respJson.message,
            status: respJson.status,
          })
        );
      } catch (error) {
        console.log("unlikeUser: Something went wrong");
        reject(error);
      }
    });
  };
};

export const getMyStatus = (userID) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${BACKEND_URL}/getMyStatus/${userID}`);
      let respJson = await resp.json();

      console.log("GET MY STATUS", respJson);

      if (respJson.status === 200) {
        console.log("SUCCESS", respJson);
        // dispatch(userActions.login(respJson.user));
        dispatch(userActions.updateLatestUser(respJson.data));
      }
    } catch (error) {
      console.log("getMyStatus: Something went wrong");
    }
  };
};

export const updateNotificationToken = (userId, notificationToken) => {
  return async (dispatch) => {
    try {
      const request = new Request(`${BACKEND_URL}/notificationToken`, {
        method: "PUT",
        body: JSON.stringify({
          userId: userId,
          notificationToken: notificationToken,
        }),
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      });

      const resp = await fetch(request);
      let respJson = await resp.json();

      console.log(respJson);
      if (respJson.status === 200) {
        dispatch(userActions.sendToken());
      }
    } catch (error) {
      console.log("updateNotificationToken: Something went wrong");
    }
  };
};

export const addMiles = (userId, miles) => {
  return async (dispatch) => {
    try {
      const request = new Request(`${BACKEND_URL}/miles`, {
        method: "PUT",
        body: JSON.stringify({
          userId: userId,
          miles: miles,
        }),
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      });

      const resp = await fetch(request);
      let respJson = await resp.json();

      console.log(respJson);
      if (respJson.status === 200) {
        dispatch(userActions.addMiles(miles));
      }
    } catch (error) {
      console.log("addMiles: Something went wrong");
    }
  };
};
