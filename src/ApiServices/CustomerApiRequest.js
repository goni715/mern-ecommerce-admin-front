
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {ErrorToast} from "../helper/ValidationHelper";
import {getToken} from "../helper/SessionHelper";
import {SetCustomerList} from "../redux/state-slice/customerSlice";
const AxiosHeader={headers:{"token":getToken()}}



//CustomerList
export async function CustomerListRequest() {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/GetAllUser";
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'].length > 0) {
                store.dispatch(SetCustomerList(res.data['data']))
            } else {
                store.dispatch(SetCustomerList([]))
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
