import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetBlogCategoryList, SetBlogCategoryName} from "../redux/state-slice/blogCategorySlice";
const AxiosHeader={headers:{"token":getToken()}}








//Create Blog Category
export async function CreateBlogCategoryRequest(categoryName) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateBlogCategory"
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







//Blog Category List
export async function BlogCategoryListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllBlogCategory";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetBlogCategoryList(res.data['data']))
            } else {
                store.dispatch(SetBlogCategoryList([]))
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









export async function GetBlogCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetBlogCategory/"+ObjectID;
        const res = await axios.get(URL)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let CategoryData=res.data['data'][0];
            store.dispatch(SetBlogCategoryName(CategoryData['CategoryName']));
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








//UpdateCategory
export async function UpdateBlogCategoryRequest(categoryName,ObjectID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/UpdateBlogCategory/"+ObjectID;
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







//Delete Blog Category
export async function DeleteBlogCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteBlogCategory/"+ObjectID;
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







