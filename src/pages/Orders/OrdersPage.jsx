import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const Orders = React.lazy(() => import('../../components/Orders/Orders'));

const OrdersPage = () => {
    return (
        <>
            <MainLayout>
                   <Suspense fallback={LazyLoader}>
                       <Orders/>
                   </Suspense>
            </MainLayout>

        </>
    );
};

export default OrdersPage;