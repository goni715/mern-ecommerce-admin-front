import {createSlice} from "@reduxjs/toolkit";

export const blogSlice=createSlice({
    name:'blog',
    initialState:{
        List:[],
        CategoryID:"",
        BlogName: "",
        BlogDesc: "",
        BlogImage:[],
    },
    reducers:{
        SetBlogList:(state,action)=>{
            state.List=action.payload
        },
        SetBlogCategoryID:(state,action)=>{
            state.CategoryID=action.payload
        },
        SetBlogName:(state,action)=>{
            state.BlogName=action.payload
        },
        SetBlogDesc:(state,action)=>{
            state.BlogDesc=action.payload
        },
        SetBlogImage:(state,action)=>{
            state.BlogImage=action.payload
        },
    }
})
export  const {SetBlogList, SetBlogImage, SetBlogCategoryID, SetBlogName, SetBlogDesc}=blogSlice.actions;
export const selectBlogList = (state) => state.blog.List;
export const selectBlogCategoryID = (state) => state.blog.CategoryID;
export const selectBlogName = (state) => state.blog.BlogName;
export const selectBlogDesc = (state) => state.blog.BlogDesc;
export const selectBlogImage = (state) => state.blog.BlogImage;

export const blogSliceReducer = blogSlice.reducer;
