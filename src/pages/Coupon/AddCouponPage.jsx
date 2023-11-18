import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddCoupon = React.lazy(() => import('../../components/Coupon/AddCoupon'));

const AddCouponPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddCoupon/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddCouponPage;