
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetColorList, SetColorName} from "../redux/state-slice/colorSlice";
const AxiosHeader={headers:{"token":getToken()}}




//CreateBrand
export async function CreateColorRequest(colorName) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateColor"
        let PostBody = {ColorName:colorName};
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Color Create Success");
            return true;
        }
        else if(result.status === 200 && result.data['status'] === "fail") {
            if(result.data['data']['keyPattern']['ColorName']===1){
                ErrorToast("Color Name Already Exist")
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





//ColorList
export async function ColorListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllColor";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetColorList(res.data['data']))
            } else {
                store.dispatch(SetColorList([]))
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







export async function GetColorRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetColor/"+ObjectID;
        const res = await axios.get(URL)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let ColorData=res.data['data'][0];
            store.dispatch(SetColorName(ColorData['ColorName']));
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







//Update Color
export async function UpdateColorRequest(colorName,ObjectID) {
    try {
        store.dispatch(ShowLoader())

        let URL = BaseURL+"/UpdateColor/"+ObjectID;
        let PostBody = {ColorName:colorName};
        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['ColorName'] === 1){
                    ErrorToast("This Color Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Color Update Success");
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
export async function DeleteColorRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteColor/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failed! This Color is "+result.data['data'])
            return  false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Color Delete Success");
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





