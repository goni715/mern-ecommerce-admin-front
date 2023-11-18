import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import axios from "axios";
import {SetBlogImageList, SetProductImageList} from "../redux/state-slice/uploadSlice";
import {SetProductImage} from "../redux/state-slice/productSlice";
import {SetBlogImage} from "../redux/state-slice/blogSlice";
const AxiosHeader={headers:{"Content-Type": "multipart/form-data"}}



//Upload Single Product Image
export async function UploadRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
                store.dispatch(SetProductImageList([res.data['data']]))
                //SuccessToast("Upload Success");
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



//Delete Single Product Image
export async function DeleteImageRequest(PublicID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteImage";
        let PostBody = {public_id:PublicID};
        const res = await axios.post(URL,PostBody)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            //SuccessToast("Image Delete Success");
            store.dispatch(SetProductImageList([]));
            return true;
        }
        else {
            ErrorToast("Delete Fail, Try Again");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}






//Upload Multiple Image
export async function UploadMultipleImageRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadMultipleImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetProductImageList([res.data['data']]))
            SuccessToast("Upload Success");
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}











/*----------------------------------- Product Image Upload Part ----------------------------------------------------------------*/

/*----------------------------------- Product Image Upload Part ----------------------------------------------------------------*/



//Upload Multiple Product Image
export async function UploadProductImageRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadMultipleImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetProductImageList(res.data['data']))
            //SuccessToast("Upload Success");
            return true;
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}







//Delete Blog Image
export async function DeleteProductImageRequest(PublicID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteImage";
        let PostBody = {public_id:PublicID};
        const res = await axios.post(URL,PostBody)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            //SuccessToast("Image Delete Success");
            return true;
        }
        else {
            ErrorToast("Delete Fail, Try Again");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}









//Upload Update Multiple Product Image
export async function UploadUpdateProductImageRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadMultipleImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetProductImage(res.data['data']))
            //SuccessToast("Upload Success");
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function DeleteUpdateProductImageRequest(PublicID, ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteProductImage/"+ObjectID;
        let PostBody = {public_id:PublicID};
        const res = await axios.put(URL,PostBody, {headers:{"token":getToken()}})
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            //SuccessToast("Image Delete Success");
           // SuccessToast(res.data['result']);
            return res;
        }
        else {
            ErrorToast("Delete Fail, Try Again");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}








/*----------------------------------- Blog Image Upload Part ----------------------------------------------------------------*/

/*----------------------------------- Blog Image Upload Part ----------------------------------------------------------------*/


//Upload Multiple Blog Image
export async function UploadBlogImageRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadMultipleImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetBlogImageList(res.data['data']))
            //SuccessToast("Upload Success");
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}






//Delete Blog Image

export async function DeleteBlogImageRequest(PublicID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteImage";
        let PostBody = {public_id:PublicID};
        const res = await axios.post(URL,PostBody)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            //SuccessToast("Image Delete Success");
            return true;
        }
        else {
            ErrorToast("Delete Fail, Try Again");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}








//Upload Update Multiple Blog Image
export async function UploadUpdateBlogImageRequest(FormData) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/uploadMultipleImage";

        const res = await axios.post(URL, FormData, AxiosHeader)
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetBlogImage(res.data['data']))
            //SuccessToast("Upload Success");
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}





//Delete Blog Image

export async function DeleteUpdateBlogImageRequest(PublicID, ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteBlogImage/"+ObjectID;
        let PostBody = {public_id:PublicID};
        const res = await axios.put(URL,PostBody, {headers:{"token":getToken()}})
        store.dispatch(HideLoader());

        if(res.status === 200 && res.data['status'] === "success") {
            //SuccessToast("Image Delete Success");
            //SuccessToast(res.data['result']);
            return res;
        }
        else {
            ErrorToast("Delete Fail, Try Again");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

