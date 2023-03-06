import { ActionReducerMapBuilder, createAsyncThunk, createSlice, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { AnyIfEmpty } from "react-redux";
import { RootState } from "../index";
// import { toggleScrollbar } from "../members/membersSlice";

interface IState{
    darkMode: boolean; 
}

const initialState = {
    darkMode : JSON.parse(window.localStorage.getItem('darkMode')|| "false") 
} as IState

const globalsSlice = createSlice({
    name: 'globals',
    initialState,
    reducers : {
        toggleDarkMode: (state) : void => {
           state.darkMode = !state.darkMode
           
        //    // console.log(state.darkMode)
        }
    }
})

export const {toggleDarkMode} =  globalsSlice.actions;
export const selectDarkMode = (state : RootState) => state.globals.darkMode;
export default globalsSlice.reducer;
