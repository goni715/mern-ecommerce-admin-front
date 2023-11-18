import {createSlice} from "@reduxjs/toolkit";

export const customerSlice=createSlice({
    name:'customer',
    initialState:{
        List:[],
    },
    reducers:{
        SetCustomerList:(state,action)=>{
            state.List=action.payload
        }
    }
})
export  const {SetCustomerList}=customerSlice.actions;
export const selectCustomerList = (state) => state.customer.List;
export const customerSliceReducer = customerSlice.reducer;
