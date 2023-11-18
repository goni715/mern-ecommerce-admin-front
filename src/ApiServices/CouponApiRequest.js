
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetCouponList, SetCouponName, SetDiscount, SetExpiry} from "../redux/state-slice/couponSlice";
const AxiosHeader={headers:{"token":getToken()}}




//Create Coupon
export async function CreateCouponRequest(data) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateCoupon";
        let PostBody = {
            name:data.name,
            expiry: data.expiry+"T00:00:00.000+00:00",
            discount: data.discount
        };

        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())

        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Coupon Create Success");
            return true;
        }
        else if(result.status === 200 && result.data['status'] === "fail") {
            if(result.data['data']['keyPattern']['name']===1){
                ErrorToast("Coupon Name Already Exist")
                return false;
            }
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return  false
    }
}





//Coupon List
export async function CouponListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllCoupons";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetCouponList(res.data['data']))
            } else {
                store.dispatch(SetCouponList([]))
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






export async function GetCouponRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetCoupon/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let CouponData=res.data['data'][0];
            store.dispatch(SetCouponName(CouponData['name']));
            store.dispatch(SetExpiry(CouponData['expiry']));
            store.dispatch(SetDiscount(CouponData['discount']));
            return true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return  false
    }
}






//Update Coupon
export async function UpdateCouponRequest(couponName,Expiry, Discount,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateCoupon/"+ObjectID;
        let PostBody = {
            name:couponName,
            expiry: Expiry+"T00:00:00.000+00:00",
            discount: Discount
        };


        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['name'] === 1){
                    ErrorToast("This Coupon Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Coupon Update Success");
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





//Delete Coupon
export async function DeleteCouponRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteCoupon/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Coupon Delete Success");
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









