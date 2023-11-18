import React from 'react';
import CustomInput from "../CustomInput/CustomInput";
import {Link, useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/ValidationHelper";
import {LoginRequest} from "../../ApiServices/UserApiRequest";

const Login = () => {

    const navigate = useNavigate();

    const SubmitLogin=async () => {

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        if(IsEmpty(email)) {
            ErrorToast("Email is Required");
        }
        else if(IsEmail(email)) {
            ErrorToast("Invalid Email Address")
        }
        else if(IsEmpty(password)) {
            ErrorToast("Password Required")
        }
        else{
            let result= await LoginRequest(email, password);
            if(result){

                setTimeout(()=>{
                    //window.location.href="/"
                    navigate('/admin');

                },500)
            }
        }
    }









    return (
        <>

            <div className="py-5 loginWrapper" style={{minHeight:"100vh"}}>
                <br />
                <br />
                <br />
                <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                    <h3 className="text-center title">Login</h3>
                    <p className="text-center">Login to your account to continue</p>
                        <CustomInput type="text" label="Email Address" id="email" />
                        <CustomInput type="password" label="Password" id="password" />

                        <div className="mb-3 text-end">
                            <Link to="/ForgotPassword" className="">
                                Forgot Password?
                            </Link>
                        </div>
                        <button onClick={SubmitLogin} className="border button px-3 py-2 py-2 text-white fw-bold w-100" style={{background: "#ffd333"}}>
                            Login
                        </button>
                </div>
            </div>

        </>
    );
};

export default Login;