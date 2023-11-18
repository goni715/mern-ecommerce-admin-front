import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {
    SetOrderList,
    SetSingleOrder, SetSingleOrderItems
} from "../redux/state-slice/orderSlice";
const AxiosHeader={headers:{"token":getToken()}}




//BlogList
export async function GetAllOrdersRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllOrders";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetOrderList(res.data['data']));
            } else {
                store.dispatch(SetOrderList([]))
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




export async function GetSingleOrderRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetSingleOrder/"+ObjectID;
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetSingleOrder(res.data['data']))
                store.dispatch(SetSingleOrderItems(res.data['data'][0]['orderItems']))
            } else {
                store.dispatch(SetSingleOrder([]));
                store.dispatch(SetSingleOrderItems([]));
            }
            return true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}





//Update Order Status
export async function UpdateOrderStatusRequest(Status,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateOrderStatus/"+ObjectID;
        let PostBody = {orderStatus:Status};
        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Status Update Success")
                return true;
            }
            else{
                ErrorToast("Request Fail! Try Again");
                return true;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())

        ErrorToast("Something Went Wrong")
        return false;
    }
}








//Delete Order
export async function DeleteOrderRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteOrder/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Order Delete Success");
            return true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}






