import React, {useEffect, useRef} from 'react';
import {GetCouponRequest, UpdateCouponRequest} from "../../ApiServices/CouponApiRequest";
import {useSelector} from "react-redux";
import {selectCouponName, selectDiscount, selectExpiry} from "../../redux/state-slice/couponSlice";
import {ErrorToast, IsEmpty, IsNonWhiteSpace} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";

const UpdateCoupon = ({id}) => {

    let nameRef, expiryRef, discountRef = useRef();
    let navigate = useNavigate();


    useEffect(()=>{
        (async () => {
            await GetCouponRequest(id);
        })();
    },[id])

    const CouponName = useSelector(selectCouponName);
    const ExpiryDate = useSelector(selectExpiry);
    const Discount = useSelector(selectDiscount);

    //let Expiry =new Date().toISOString(ExpiryDate).slice(0,10);
    let Expiry = ExpiryDate.toLocaleString().slice(0,10);




    const SaveChange = async () => {

        let couponName = nameRef.value.trim();
        let expiry = expiryRef.value.trim();
        let discount = discountRef.value.trim();

        if(IsEmpty(couponName)){
            ErrorToast("Coupon Name is Required");
        }
        else if(IsNonWhiteSpace(couponName)){
            ErrorToast("Coupon must not contain Whitespaces!")
        }
        else if(IsEmpty(expiry)){
            ErrorToast("Expiry Date Required!")
        }
        else if(IsEmpty(discount)){
            ErrorToast("Discount Required!")
        }
        else{

            let result = await UpdateCouponRequest(couponName,expiry, discount,id);

            if(result === true) {
                navigate('/admin/coupon-list');
            }

        }


    }



    return (
        <>
            <div className="p-4">
                <h3 className="mb-4 title">
                    Update Coupon
                </h3>
                <div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            ref={(input)=>nameRef=input}
                            className="form-control"
                            id="update-brand"
                            placeholder="Enter Coupon Name"
                            defaultValue={CouponName}
                            key={Date.now()}
                        />
                        <label htmlFor="Enter Coupon Name">Enter Coupon Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="date"
                            ref={(input)=>expiryRef=input}
                            className="form-control"
                            id="update-brand"
                            placeholder="Enter Expiry Date"
                            defaultValue={Expiry}
                            key={Date.now()}
                        />
                        <label htmlFor="Enter Expiry Date">Enter Expiry Date</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            ref={(input)=>discountRef=input}
                            className="form-control"
                            id="update-brand"
                            placeholder="Enter Discount"
                            defaultValue={Discount}
                            key={Date.now()}
                        />
                        <label htmlFor="Enter Discount">Enter Discount</label>
                    </div>


                        <button
                            onClick={SaveChange}
                            className="btn btn-success border-0 rounded-3 my-5"
                            type="submit">
                            Update Coupon
                        </button>


                </div>
            </div>
        </>
    );
};

export default UpdateCoupon;