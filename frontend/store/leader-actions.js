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

          const leaderboardList = [];
          for (let index = 0; index < leaderboardJson.data.length; index++) {
            let leader = leaderboardJson.data[index];
            const resp = await fetch(
              `${BACKEND_URL}/getLastestUserStatus/${leader.userId}`
            );
            let respJson = await resp.json();

            if (respJson.status === 200) {
              leader["likeNumber"] = respJson.data.likeNumber;
              leader["isLiked"] = user.whoILiked.includes(leader.userId);
            }
            leaderboardList.push(leader);
          }
          dispatch(leaderActions.sBoard(leaderboardList));
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

          const leaderboardList = [];
          for (let index = 0; index < leaderboardJson.data.length; index++) {
            let leader = leaderboardJson.data[index];
            const resp = await fetch(
              `${BACKEND_URL}/getLastestUserStatus/${leader.userId}`
            );
            let respJson = await resp.json();

            if (respJson.status === 200) {
              leader["likeNumber"] = respJson.data.likeNumber;
              leader["isLiked"] = user.whoILiked.includes(leader.userId);
            }
            leaderboardList.push(leader);
          }
          dispatch(leaderActions.sBoard(leaderboardList));
        } else {
          dispatch(leaderActions.sChampSig(null));
          dispatch(leaderActions.sBoard([]));
        }
      }
    } catch (error) {
      console.log("getDailyLeaderboard: something is wrong.");
    }
  };
};
