import React, {Suspense} from 'react';
import LazyLoader from "../../components/MainLayout/LazyLoader";
import MainLayout from "../../components/MainLayout/MainLayout";
import {useParams} from "react-router-dom";
const UpdateCoupon = React.lazy(() => import('../../components/Coupon/UpdateCoupon'));


const UpdateCouponPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateCoupon id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateCouponPage;