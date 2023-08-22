import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { api } from "./api/api";

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    //Обязательно указываем последним!
    toastr: toastrReducer
})