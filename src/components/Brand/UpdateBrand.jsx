import React, {useEffect, useRef} from 'react';
import {

    GetBrandRequest,
    UpdateBrandRequest
} from "../../ApiServices/BrandApiRequest";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectBrandName} from "../../redux/state-slice/brandSlice";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import CustomInput from "../CustomInput/CustomInput";

const UpdateBrand = ({id}) => {

    let brandNameRef = useRef();
    let navigate = useNavigate();



    useEffect(()=>{
        (async () => {
            await GetBrandRequest(id);
        })();
    },[id])


    let BrandName = useSelector(selectBrandName);


    const SaveChange = async () => {

        let brandName = brandNameRef.value.trim();

        if(IsEmpty(brandName)){
            ErrorToast("Brand Name is Required");
        }
        else{

            let result = await UpdateBrandRequest(brandName,id);

            if(result === true){
                navigate('/admin/brand-list');
            }

        }


    }




    return (
        <>


            <div className="container-fluid">
                <h3 className="title">Update Brand</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                    <div className="row">
                                        <div className="col-4 p-2">

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    ref={(input)=>brandNameRef=input}
                                                    className="form-control"
                                                    id="update-brand"
                                                    placeholder="Enter Brand"
                                                    defaultValue={BrandName}
                                                    key={Date.now()}
                                                />
                                                <label htmlFor="Enter Brand">Enter Brand</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button onClick={SaveChange} type="submit" className="btn btn-success border-0 rounded-3 my-3">Save Change</button>
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

export default UpdateBrand;