import {createSlice} from "@reduxjs/toolkit";

export const modalSlice=createSlice({
    name:'modal',
    initialState:{
        ProfileModalShow:false,
        ShareModalShow:false
    },
    reducers:{
        SetProfileModalShow:(state,action)=>{
            state.ProfileModalShow=action.payload
        },
        SetShareModalShow:(state,action)=>{
            state.ShareModalShow=action.payload
        }
    }
})
export  const {SetProfileModalShow, SetShareModalShow}=modalSlice.actions;

export const selectProfileModalShow = (state) => state.modal.ProfileModalShow;
export const selectShareModalShow = (state) => state.modal.ShareModalShow;

export const modalSliceReducer = modalSlice.reducer;
