import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const CouponList = React.lazy(() => import('../../components/Coupon/CouponList'));


const CouponListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <CouponList/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default CouponListPage;