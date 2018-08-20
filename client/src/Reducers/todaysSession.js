import { FETCH_TODAY } from "../Actions/types";

export default function(state = null, action){
    switch(action.type){
        case FETCH_TODAY:
            return action.payload || false;
        default:
            return state;
    }
}