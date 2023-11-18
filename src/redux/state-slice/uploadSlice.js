import {createSlice} from "@reduxjs/toolkit";

export const uploadSlice=createSlice({
    name:'upload',
    initialState:{
        ProductImageList:[],
        BlogImageList:[],

    },
    reducers:{
        SetProductImageList:(state,action)=>{
            state.ProductImageList=action.payload
        },
        SetBlogImageList:(state,action)=>{
            state.BlogImageList=action.payload
        },
    }
})
export  const {SetProductImageList, SetBlogImageList}=uploadSlice.actions;
export const selectProductImageList = (state) => state.upload.ProductImageList;
export const selectBlogImageList = (state) => state.upload.BlogImageList;
export const uploadSliceReducer = uploadSlice.reducer;
