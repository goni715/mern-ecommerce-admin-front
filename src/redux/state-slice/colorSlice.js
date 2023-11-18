import {createSlice} from "@reduxjs/toolkit";

export const colorSlice=createSlice({
    name:'color',
    initialState:{
        List:[],
        ColorName:""
    },
    reducers:{
        SetColorList:(state,action)=>{
            state.List=action.payload
        },
        SetColorName:(state,action)=>{
            state.ColorName=action.payload
        }
    }
})
export  const {SetColorList,SetColorName}=colorSlice.actions;

export const selectColorList = (state) => state.color.List;
export const selectColorName = (state) => state.color.ColorName;

export const colorSliceReducer = colorSlice.reducer;
