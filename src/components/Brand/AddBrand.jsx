import React from 'react';
import CustomInput from "../CustomInput/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {CreateBrandRequest} from "../../ApiServices/BrandApiRequest";
import {useNavigate} from "react-router-dom";

const AddBrand = () => {

    const navigate = useNavigate();

    let schema = Yup.object().shape({
        brandName: Yup.string().required("Brand Name is Required"),
    });

    const formik = useFormik({
        initialValues: {
            brandName: '',
        },
        validationSchema: schema,
        onSubmit: async values => {
            //alert(JSON.stringify(values, null, 2));

            let result= await CreateBrandRequest(values.brandName);
            if(result===true){
                    navigate('/admin/brand-list');
            }
        },
    });


    return (
        <>


            <div className="container-fluid">
                <h3 className="title">Add Brand</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form action="" onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col-4 p-2">

                                            <CustomInput
                                                type="text"
                                                label="Enter Brand"
                                                name="title"
                                                onChng={formik.handleChange("brandName")}
                                                onBlr={formik.handleBlur("brandName")}
                                                val={formik.values.brandName}
                                                id="brand"
                                            />
                                            <div className="error">
                                                {formik.touched.brandName && formik.errors.brandName}
                                            </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button type="submit" className="btn btn-success border-0 rounded-3 my-5">Add Brand</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


};

export default AddBrand;