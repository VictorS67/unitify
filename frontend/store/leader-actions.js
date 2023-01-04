import { leaderActions } from "./leader-slice";

const BACKEND_URL = "https://unitify-api.chenpan.ca";

export const getMonthlyLeaderboard = () =>{
    return async(dispatch) =>{
        try{
            const users = await fetch(`${BACKEND_URL}/monthlyLeaderboard?startIndex=0&endIndex=20`);
            let userJson = await users.json();
            if (userJson.status === 200){
                if(userJson.data.length > 0){
                    dispatch(leaderActions.sChampSig(userJson.data[0]));
                }
                if(userJson.data.length > 1){
                    console.log("1");
                    dispatch(leaderActions.sMonthlyBoard(userJson.data.slice(1)));
                    
                }
                
            }
        } catch(error){

        }
    }
}

export const getWeeklyLeaderboard = () =>{
    return async(dispatch) =>{
        try{
            const users = await fetch(`${BACKEND_URL}/leaderboard?startIndex=0&endIndex=20`);
            let userJson = await users.json();
            if (userJson.status === 200){
                if(userJson.data.length > 0){
                    dispatch(leaderActions.sWeekChampSig(userJson.data[0]));
                }
                if(userJson.data.length > 1){
                    dispatch(leaderActions.sWeeklyboard(userJson.data.slice(1)));
                }
                
            }
        } catch(error){

        }
    }
}