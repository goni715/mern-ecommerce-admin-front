
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import {SetCategoryName, SetProductCategoryList} from "../redux/state-slice/productCategorySlice";
const AxiosHeader={headers:{"token":getToken()}}





//Create Product Category
export async function CreateProductCategoryRequest(categoryName) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateProductCategory"
        let PostBody = {CategoryName:categoryName};
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())

        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Category Create Success");
            return true;
        }
        else if(result.status === 200 && result.data['status'] === "fail") {
            if(result.data['data']['keyPattern']['CategoryName']===1){
                ErrorToast("Category Name Already Exist")
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




//Product Category List
export async function ProductCategoryListRequest() {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllProductCategory";
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetProductCategoryList(res.data['data']))
            } else {
                store.dispatch(SetProductCategoryList([]))
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




//SelectCategoryById
export async function GetProductCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetProductCategory/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let CategoryData=res.data['data'][0];
            store.dispatch(SetCategoryName(CategoryData['CategoryName']));
            return  true;
        } else {
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







//UpdateCategory
export async function UpdateCategoryRequest(categoryName,ObjectID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/UpdateProductCategory/"+ObjectID;
        let PostBody = {CategoryName:categoryName};
        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['CategoryName'] === 1){
                    ErrorToast("This Category Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Category Name Update Success");
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






export async function DeleteProductCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteProductCategory/"+ObjectID;
        let result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failled! This Category is "+result.data['data'])
            return false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Category Delete Success");
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




