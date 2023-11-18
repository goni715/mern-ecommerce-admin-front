import React, {useRef} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {CreateColorRequest} from "../../ApiServices/ColorApiRequest";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";

const AddColor = () => {

    let colorNameRef = useRef();

    const navigate = useNavigate();







    const SaveBrand = async () => {

        let colorName = colorNameRef.value;
        if(IsEmpty(colorName)){
            ErrorToast("Please pick a Color");
        }
        else{
            let result= await CreateColorRequest(colorName);
            if(result===true){
                navigate('/admin/colors-list');
            }
        }
    }




    return (
        <>
            <div className="container-fluid">
                <h3 className="title" >Add Color</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label className="form-label">Pick a Color</label>
                                        <input ref={(input)=>colorNameRef=input} className="form-control form-control-sm" type="color"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveBrand} className="btn btn-success border-0 rounded-3 my-3">Add Color</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddColor;