import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { reducer as toastrReducer } from 'react-redux-toastr';

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    //Обязательно указываем последним!
    toastr: toastrReducer
})