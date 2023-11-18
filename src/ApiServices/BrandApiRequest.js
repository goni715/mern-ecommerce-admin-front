
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetBrandList, SetBrandName} from "../redux/state-slice/brandSlice";
const AxiosHeader={headers:{"token":getToken()}}




//CreateBrand
export async function CreateBrandRequest(brandName) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateBrand"
        let PostBody = {BrandName:brandName};
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())

        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Brand Create Success");
            return true;
        }
        else if(result.status === 200 && result.data['status'] === "fail") {
            if(result.data['data']['keyPattern']['BrandName']===1){
                ErrorToast("Brand Name Already Exist")
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





//BrandList
export async function BrandListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllBrand";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetBrandList(res.data['data']))
            } else {
                store.dispatch(SetBrandList([]))
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



//Get a Brand
export async function GetBrandRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetBrand/"+ObjectID;
        const res = await axios.get(URL)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let BrandData=res.data['data'][0];
            store.dispatch(SetBrandName(BrandData['BrandName']));
            return BrandData;
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




//Update Brand
export async function UpdateBrandRequest(brandName,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateBrand/"+ObjectID;
        let PostBody = {BrandName:brandName};
        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['BrandName'] === 1){
                    ErrorToast("This Brand Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Brand Name Update Success");
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





//Delete Brand
export async function DeleteBrandRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteBrand/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failed! This Brand is "+result.data['data'])
            return  false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Brand Delete Success");
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



