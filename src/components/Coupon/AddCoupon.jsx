import React from 'react';
import CustomInput from "../CustomInput/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {CreateCouponRequest} from "../../ApiServices/CouponApiRequest";
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsNonWhiteSpace} from "../../helper/ValidationHelper";



let schema = Yup.object().shape({
    name: Yup.string().required("Coupon Name is Required"),
    expiry: Yup.date().required("Expiry Date is Required"),
    discount: Yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {

    const navigate = useNavigate();


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            expiry: "",
            discount: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {

              if(IsNonWhiteSpace(values.name)){
                   ErrorToast("Coupon must not contain Whitespaces!")
              }else{
                   let result = await CreateCouponRequest(values);
                   if(result===true){
                     navigate('/admin/coupon-list');
                  }
            }


        },
    });


    return (
        <>
            <div className="p-4">
                <h3 className="mb-4 title">
                    Add Coupon
                </h3>
                <div>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <CustomInput
                            type="text"
                            name="name"
                            onChng={formik.handleChange("name")}
                            onBlr={formik.handleBlur("name")}
                            val={formik.values.name}
                            label="Enter Coupon Name"
                            id="name"
                        />
                        <div className="error">
                            {formik.touched.name && formik.errors.name}
                        </div>
                        <CustomInput
                            type="date"
                            name="expiry"
                            onChng={formik.handleChange("expiry")}
                            onBlr={formik.handleBlur("expiry")}
                            val={formik.values.expiry}
                            label="Enter Expiry Date"
                            id="date"
                        />
                        <div className="error">
                            {formik.touched.expiry && formik.errors.expiry}
                        </div>
                        <CustomInput
                            type="number"
                            name="discount"
                            onChng={formik.handleChange("discount")}
                            onBlr={formik.handleBlur("discount")}
                            val={formik.values.discount}
                            label="Enter Discount"
                            id="discount"
                        />
                        <div className="error">
                            {formik.touched.discount && formik.errors.discount}
                        </div>
                        <button
                            className="btn btn-success border-0 rounded-3 my-5"
                            type="submit"
                        >
                            Add Coupon
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCoupon;