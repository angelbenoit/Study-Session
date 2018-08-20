import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer';
import today from './todaysSession';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    today: today
})