import axios from "axios";

import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import store from "../redux/store/store";
import {setToken, setUserDetails} from "../helper/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";


export async function LoginRequest(email,password){

    try {
        //debugger;
        store.dispatch(ShowLoader())
        //debugger;
        let URL=BaseURL+"/AdminLogin";
        //debugger;
        let PostBody={"email":email,"password":password}
        //debugger;
        let res =await axios.post(URL,PostBody);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status'] === "success"){
                let MyToken = res.data['token'];
                let user = res.data['data']; //This is Object
                setToken(MyToken);
                let userDetails = {
                    email: user['email'],
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    mobile:user['mobile']
                }
                setUserDetails(userDetails);
                SuccessToast("Login Success");
                return true;
            }
            else{
                ErrorToast(res.data['data']);
                return false;
            }
        }
        else{

            ErrorToast("Something Went Wrong");
            return false;
        }
    }
    catch (e) {

        ErrorToast("Something Went Wrong")
        return false;
    }
}

