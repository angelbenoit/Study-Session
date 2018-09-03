import axios from 'axios';
import { FETCH_USER, FETCH_TODAY } from "./types";

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");
    console.log("updating user data");
    dispatch({ type: FETCH_USER, payload: res.data });
};

/*
    getTodaysSession will go through the session list from the user api
    and will only filter it out to today's date.
    Additionally, there will be two arrays (complete, and incomplete)
    and they will depend on the "complete" property in each object.
    Default value for current will be an empty object and if there's
    still space in the incomplete array, the last value in that array
    will be popped into the current object
*/
export const getTodaysSession = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");
    const data = res.data.sessions;

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    /*
        totalDate will create a string in mm/dd/yyyy to compare all the dates in
        the api(which are strings). The api has sessions array which is made up of objects.
        each one contains the information about the session, which includes date
    */
    const totalDate = `${month}/${day < 10 ? `0${day}` : day}/${year}`;

    //fill out complete and incomplete array to include in the state
    const complete = [];
    const incomplete = [];
    let current = {};
    //this for loop compares the dates, and inside the if state,
    //fill in the complete and incomplete array
    if(data){
        for (let i = 0; i < data.length; i++) {
            if (data[i] && data[i].date === totalDate) {
                if (data[i].complete)
                    complete.push(data[i]);
                else
                    incomplete.push(data[i]);
            }
        }

        //if theres anything in the incomplete array
        if(incomplete.length){
            current = incomplete.pop();
        }

        const sessions = {
            current,
            completed: complete,
            incompleted: incomplete
        }

        console.log("updating sesions", sessions)

        dispatch({ type: FETCH_TODAY, payload: sessions });
    }
};