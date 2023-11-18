import React from 'react';
import CustomInput from "../CustomInput/CustomInput";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {CreateProductCategoryRequest} from "../../ApiServices/ProductCategoryApiRequest";

const AddCategory = () => {

    const navigate = useNavigate();

    let schema = Yup.object().shape({
        categoryName: Yup.string().required("Category Name is Required"),
    });

    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: schema,
        onSubmit: async values => {
            let result= await CreateProductCategoryRequest(values.categoryName);
            if(result===true){
                navigate('/admin/category-list');
            }
        },
    });


    return (
        <>



            <div className="container-fluid">
                <h3 className="title">Add Product Category</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-4 p-2">

                                            <CustomInput
                                                type="text"
                                                label="Enter Category"
                                                name="title"
                                                onChng={formik.handleChange("categoryName")}
                                                onBlr={formik.handleBlur("categoryName")}
                                                val={formik.values.categoryName}
                                                id="category"
                                            />
                                            <div className="error">
                                                {formik.touched.categoryName && formik.errors.categoryName}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button type="submit" className="btn btn-success border-0 rounded-3 my-5">Add Category</button>
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


export default AddCategory;