import {createSlice} from "@reduxjs/toolkit";

export const couponSlice=createSlice({
    name:'coupon',
    initialState:{
        List:[],
        CouponName:"",
        Expiry: "",
        Discount: ""
    },
    reducers:{
        SetCouponList:(state,action)=>{
            state.List=action.payload
        },
        SetCouponName:(state,action)=>{
            state.CouponName=action.payload
        },
        SetExpiry:(state,action)=>{
            state.Expiry=action.payload
        },
        SetDiscount:(state,action)=>{
            state.Discount=action.payload
        },
    }
})
export  const {SetCouponList, SetCouponName, SetExpiry, SetDiscount}=couponSlice.actions;

export const selectCouponList = (state) => state.coupon.List;
export const selectCouponName = (state) => state.coupon.CouponName;
export const selectExpiry = (state) => state.coupon.Expiry;
export const selectDiscount = (state) => state.coupon.Discount;


export const couponSliceReducer = couponSlice.reducer;
