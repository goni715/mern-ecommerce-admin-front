import {createSlice} from "@reduxjs/toolkit";

export const orderSlice=createSlice({
    name:'order',
    initialState:{
        List:[],
        MonthlyOrderCount:[],
        MonthlyOrderIncome:[],
        YearlyOrderCount:"",
        YearlyTotalIncome:"",
        SingleOrder:[],
        SingleOrderItems:[]
    },
    reducers:{
        SetOrderList:(state,action)=>{
            state.List=action.payload
        },
        SetOrderProductsDetails:(state,action)=>{
            state.OrderProductsDetails=action.payload
        },
        SetOrderProducts:(state,action)=>{
            state.OrderProducts=action.payload
        },
        SetOrderProductBrand:(state,action)=>{
            state.OrderProductBrand=action.payload
        },
        SetOrderProductColor:(state,action)=>{
            state.OrderProductColor=action.payload
        },
        SetMonthlyOrderCount:(state,action)=>{
            state.MonthlyOrderCount=action.payload
        },
        SetMonthlyOrderIncome:(state,action)=>{
            state.MonthlyOrderIncome=action.payload
        },
        SetYearlyOrderCount:(state,action)=>{
            state.YearlyOrderCount=action.payload
        },
        SetYearlyTotalIncome:(state,action)=>{
            state.YearlyTotalIncome=action.payload
        },
        SetSingleOrder:(state,action)=>{
            state.SingleOrder=action.payload
        },
        SetSingleOrderItems:(state,action)=>{
            state.SingleOrderItems=action.payload
        },
    }
})
export  const {SetOrderList, SetOrderProducts, SetOrderProductsDetails, SetOrderProductBrand, SetOrderProductColor, SetMonthlyOrderCount, SetMonthlyOrderIncome, SetYearlyOrderCount, SetYearlyTotalIncome, SetSingleOrder, SetSingleOrderItems}=orderSlice.actions;
export const selectOrderList = (state) => state.order.List;
export const selectMonthlyOrderCount = (state) => state.order.MonthlyOrderCount;
export const selectMonthlyOrderIncome = (state) => state.order.MonthlyOrderIncome;
export const selectYearlyOrderCount = (state) => state.order.YearlyOrderCount;
export const selectYearlyTotalIncome = (state) => state.order.YearlyTotalIncome;
export const selectSingleOrder = (state) => state.order.SingleOrder;
export const selectSingleOrderItems = (state) => state.order.SingleOrderItems;

export const orderSliceReducer = orderSlice.reducer;
