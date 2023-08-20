import { useDispatch } from 'react-redux';
import { rootActions } from "@/store/root-actions";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(rootActions, dispatch);
}