import {createSlice} from "@reduxjs/toolkit";

export const productCategorySlice=createSlice({
    name:'productCategory',
    initialState:{
        List:[],
        CategoryName:""
    },
    reducers:{
        SetProductCategoryList:(state,action)=>{
            state.List=action.payload
        },
        SetCategoryName:(state,action)=>{
            state.CategoryName=action.payload
        }
    }
})
export  const {SetProductCategoryList, SetCategoryName}=productCategorySlice.actions;
export const selectProductCategoryList = (state) => state.productCategory.List;
export const selectCategoryName = (state) => state.productCategory.CategoryName;
export const productCategorySliceReducer = productCategorySlice.reducer;
