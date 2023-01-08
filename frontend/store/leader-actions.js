import { leaderActions } from "./leader-slice";

const BACKEND_URL = "https://unitify-api.chenpan.ca";

export const getMonthlyLeaderboard = (user) => {
  return async (dispatch) => {
    try {
      const leaderboard = await fetch(
        `${BACKEND_URL}/monthlyLeaderboard?startIndex=0&endIndex=20`
      );
      let leaderboardJson = await leaderboard.json();
      if (leaderboardJson.status === 200) {
        dispatch(leaderActions.sIsMonth(true));
        if (leaderboardJson.data.length > 0) {
          dispatch(leaderActions.sChampSig(leaderboardJson.data[0]));

          const leaderboardList = leaderboardJson.data.map((lead) => {
            return lead.userId;
          });

          const request = new Request(`${BACKEND_URL}/getLatestUsersStatus`, {
            method: "POST",
            body: JSON.stringify({
              userIds: leaderboardList,
            }),
            headers: {
              Accept: "application/json, text/plain, /",
              "Content-Type": "application/json",
            },
          });

          const resp = await fetch(request);
          let respJson = await resp.json();

          if (respJson.status === 200) {
            for (let i = 0; i < leaderboardJson.data.length; i++) {
              respJson.data[i].monthlyMiles =
                leaderboardJson.data[i].monthlyMiles;
            }
            dispatch(leaderActions.sBoard(respJson.data));
          }
        } else {
          dispatch(leaderActions.sChampSig(null));
          dispatch(leaderActions.sBoard([]));
        }
      }
    } catch (error) {
      console.log("getMonthlyLeaderboard: something is wrong.");
    }
  };
};

export const getDailyLeaderboard = (user) => {
  return async (dispatch) => {
    try {
      const leaderboard = await fetch(
        `${BACKEND_URL}/dailyLeaderboard?startIndex=0&endIndex=20`
      );
      let leaderboardJson = await leaderboard.json();
      console.log("WEEK LEADERBORD: ", leaderboardJson);

      if (leaderboardJson.status === 200) {
        dispatch(leaderActions.sIsMonth(false));
        if (leaderboardJson.data.length > 0) {
          dispatch(leaderActions.sChampSig(leaderboardJson.data[0]));

          const leaderboardList = leaderboardJson.data.map((lead) => {
            return lead.userId;
          });

          const request = new Request(`${BACKEND_URL}/getLatestUsersStatus`, {
            method: "POST",
            body: JSON.stringify({
              userIds: leaderboardList,
            }),
            headers: {
              Accept: "application/json, text/plain, /",
              "Content-Type": "application/json",
            },
          });

          const resp = await fetch(request);
          let respJson = await resp.json();

          if (respJson.status === 200) {
            dispatch(leaderActions.sBoard(respJson.data));
            for (let i = 0; i < leaderboardJson.data.length; i++) {
              respJson.data[i].dailyMiles = leaderboardJson.data[i].dailyMiles;
            }
          }
        } else {
          dispatch(leaderActions.sChampSig(null));
          dispatch(leaderActions.sBoard([]));
        }
      }
    } catch (error) {
      console.log("getDailyLeaderboard: something is wrong.");
      console.log(error);
    }
  };
};
