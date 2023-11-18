import {createSlice} from "@reduxjs/toolkit";

export const enquirySlice=createSlice({
    name:'enquiry',
    initialState:{
        List:[],
        name:"",
        email:"",
        mobile: "",
        comment: "",
        status:""
    },
    reducers:{
        SetEnquiryList:(state,action)=>{
            state.List=action.payload
        },
        SetEnquiryName:(state,action)=>{
            state.name=action.payload
        },
        SetEnquiryEmail:(state,action)=>{
            state.email=action.payload
        },
        SetEnquiryMobile:(state,action)=>{
            state.mobile=action.payload
        },
        SetEnquiryComment:(state,action)=>{
            state.comment=action.payload
        },
        SetEnquiryStatus:(state,action)=>{
            state.status=action.payload
        },
    }
})
export  const {SetEnquiryList, SetEnquiryName, SetEnquiryEmail, SetEnquiryMobile, SetEnquiryComment, SetEnquiryStatus}=enquirySlice.actions;
export const selectEnquiryList = (state) => state.enquiry.List;
export const selectEnquiryName = (state) => state.enquiry.name;
export const selectEnquiryEmail = (state) => state.enquiry.email;
export const selectEnquiryMobile = (state) => state.enquiry.mobile;
export const selectEnquiryComment = (state) => state.enquiry.comment;
export const selectEnquiryStatus = (state) => state.enquiry.status;

export const enquirySliceReducer = enquirySlice.reducer;
