
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import {
    SetEnquiryComment,
    SetEnquiryEmail,
    SetEnquiryList,
    SetEnquiryMobile,
    SetEnquiryName, SetEnquiryStatus
} from "../redux/state-slice/enquirySlice";

const AxiosHeader={headers:{"token":getToken()}}



//Enquiries
export async function EnquiryListRequest() {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllEnquiry";
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetEnquiryList(res.data['data']))
            } else {
                store.dispatch(SetEnquiryList([]))
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




export async function GetEnquiryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetEnquiry/"+ObjectID;
        const res = await axios.get(URL)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let enquiry = res.data['data'][0];
            store.dispatch(SetEnquiryName(enquiry['name']));
            store.dispatch(SetEnquiryEmail(enquiry['email']));
            store.dispatch(SetEnquiryMobile(enquiry['mobile']));
            store.dispatch(SetEnquiryComment(enquiry['comment']));
            store.dispatch(SetEnquiryStatus(enquiry['status']));

            //console.log(res.data['data'][0]);
            return  true;
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




//Update Enquiry
export async function UpdateEnquiryRequest(Status,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateEnquiry/"+ObjectID;
        let PostBody = {status:Status};
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





//Delete Enquiry
export async function DeleteEnquiryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteEnquiry/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Enquiry Delete Success");
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

