import {createSlice} from "@reduxjs/toolkit";

export const blogCategorySlice=createSlice({
    name:'blogCategory',
    initialState:{
        List:[],
        CategoryName:""
    },
    reducers:{
        SetBlogCategoryList:(state,action)=>{
            state.List=action.payload
        },
        SetBlogCategoryName:(state,action)=>{
            state.CategoryName=action.payload
        }
    }
})
export  const {SetBlogCategoryList, SetBlogCategoryName}=blogCategorySlice.actions;

export const selectBlogCategoryList = (state) => state.blogCategory.List;
export const selectBlogCategoryName = (state) => state.blogCategory.CategoryName;

export const blogCategorySliceReducer = blogCategorySlice.reducer;
