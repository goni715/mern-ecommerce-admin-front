import {createSlice} from "@reduxjs/toolkit";

export const brandSlice=createSlice({
    name:'brand',
    initialState:{
        List:[],
        BrandName:""
    },
    reducers:{
        SetBrandList:(state,action)=>{
            state.List=action.payload
        },
        SetBrandName:(state,action)=>{
            state.BrandName=action.payload
        }
    }
})
export  const {SetBrandList, SetBrandName}=brandSlice.actions;
export const selectBrandList = (state) => state.brand.List;
export const selectBrandName = (state) => state.brand.BrandName;
export const brandSliceReducer = brandSlice.reducer;
