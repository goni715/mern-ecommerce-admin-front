
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import {
    SetBrandID,
    SetCategoryID, SetColorID, SetProductColor,
    SetProductDesc, SetProductImage,
    SetProductList,
    SetProductName,
    SetProductPrice, SetProductQuantity, SetProductTag
} from "../redux/state-slice/productSlice";
import {SetProductImageList} from "../redux/state-slice/uploadSlice";
const AxiosHeader={headers:{"token":getToken()}}



//ProductList
export async function ProductListRequest() {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllProducts/"+0;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetProductList(res.data['data']))
            } else {
                store.dispatch(SetProductList([]))
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






//CreateProduct
export async function CreateProductRequest(productName,Description,categoryID,brandID,Price,Qty,Color,Images,Tag) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CreateProduct"
        let PostBody = {
            ProductName: productName,
            CategoryID: categoryID,
            BrandID: brandID,
            description: Description,
            price: Price,
            quantity : Qty,
            color: Color,
            images: Images,
            tags: Tag
        }
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200){
            if (res.data['status'] === "success") {
                store.dispatch(SetProductImageList([]))
                SuccessToast("Product Create Success");
                return true;
            }
            else if(res.data['status'] === "fail") {
                if(res.data['data']['keyPattern']['slug']===1){
                      ErrorToast("Product Name Already Exist")
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






export async function GetProductRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAProduct/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let product = res.data['data'][0];
            store.dispatch(SetProductName(product['ProductName']));
            store.dispatch(SetProductPrice(product['price']));
            store.dispatch(SetProductQuantity(product['quantity']));
            store.dispatch(SetProductDesc(product['description']));
            store.dispatch(SetCategoryID(product['CategoryID']));
            store.dispatch(SetBrandID(product['BrandID']));
            store.dispatch(SetProductColor(product['Colors']));
            store.dispatch(SetProductTag(product['tags']));
            store.dispatch(SetProductImage(product['images']));
            store.dispatch(SetColorID(product['color']));
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





//UpdateProduct
export async function UpdateProductRequest(productName,Description,categoryID,brandID,Price,Qty,Color,Images,Tag,ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/UpdateProduct/"+ObjectID;
        let PostBody = {
            ProductName: productName,
            CategoryID: categoryID,
            BrandID: brandID,
            description: Description,
            price: Price,
            quantity : Qty,
            color: Color,
            images: Images,
            tags: Tag
        }
        const res = await axios.put(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Product Update Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong")
        return  false
    }
}






export async function DeleteProductRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteProduct/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failled! Product is "+result.data['data'])
            return false;
        }
        else if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Product Delete Success");
            return  true
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



