import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetBlogCategoryID, SetBlogDesc, SetBlogImage, SetBlogList, SetBlogName} from "../redux/state-slice/blogSlice";
import {SetBlogImageList} from "../redux/state-slice/uploadSlice";
const AxiosHeader={headers:{"token":getToken()}}




//BlogList
export async function BlogListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllBlogs";

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetBlogList(res.data['data']))
            } else {
                store.dispatch(SetBlogList([]))
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





//Create Blog
export async function CreateBlogRequest(blogName,Description,categoryID,Images) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateBlog"
        let PostBody = {
            BlogName: blogName,
            CategoryID: categoryID,
            description: Description,
            images: Images,
        }
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200){
            if (res.data['status'] === "success") {
                store.dispatch(SetBlogImageList([]))
                SuccessToast("Blog Create Success");
                return true;
            }
            else if(res.data['status'] === "fail") {
                if(res.data['data']['keyPattern']['BlogName']===1){
                    ErrorToast("Blog Name Already Exist")
                    return false;
                }
            }else{
                ErrorToast("Something Went Wrong")
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
        return false;
    }
}





//Delete Blog
export async function DeleteBlogRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteBlog/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Blog Delete Success");
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




export async function GetBlogRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetABlog/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let blog = res.data['data'][0];
            store.dispatch(SetBlogName(blog['BlogName']));
            store.dispatch(SetBlogDesc(blog['description']));
            store.dispatch(SetBlogCategoryID(blog['CategoryID']));
            store.dispatch(SetBlogImage(blog['images']));
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








//Update Blog
export async function UpdateBlogRequest(blogName,Description,categoryID,Images, ObjectID) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/UpdateBlog/"+ObjectID;
        let PostBody = {
            BlogName: blogName,
            CategoryID: categoryID,
            description: Description,
            images: Images,
        }
        const res = await axios.put(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200){
            if (res.data['status'] === "success") {
                store.dispatch(SetBlogImage([]))
                SuccessToast("Blog Update Success");
                return true;
            }
            else if(res.data['status'] === "fail") {
                if(res.data['data']['keyPattern']['BlogName']===1){
                    ErrorToast("Blog Name Already Exist")
                    return false;
                }
            }else{
                ErrorToast("Something Went Wrong")
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
        return false;
    }
}






