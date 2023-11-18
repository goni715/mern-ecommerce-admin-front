import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {
    SetMonthlyOrderCount,
    SetMonthlyOrderIncome,
    SetYearlyOrderCount, SetYearlyTotalIncome
} from "../redux/state-slice/orderSlice";
import {ErrorToast} from "../helper/ValidationHelper";









export async function GetMonthlyOrderIncomeRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/getMonthWiseOrderIncome";

        const res = await axios.get(URL)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetMonthlyOrderIncome(res.data['data']));
            }else {
                store.dispatch(SetMonthlyOrderIncome([]))
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}










//MonthlyOrderCount
export async function GetMonthlyOrdersCountRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/getMonthWiseOrderCount";

        const res = await axios.get(URL);
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetMonthlyOrderCount(res.data['data']))
            } else {
                store.dispatch(SetMonthlyOrderCount([]))
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}







//Get Yearly Total Order & Total Income
export async function GetYearlyOrdersRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/getYearlyTotalOrders";

        const res = await axios.get(URL)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetYearlyOrderCount(res.data['data'][0]['count']));
                store.dispatch(SetYearlyTotalIncome(res.data['data'][0]['amount']));
            } else {
                store.dispatch(SetYearlyOrderCount(""));
                store.dispatch(SetYearlyTotalIncome(""));
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}






