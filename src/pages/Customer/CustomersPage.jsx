import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const Customers = React.lazy(() => import('../../components/Customer/Customers'));

const CustomersPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <Customers/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default CustomersPage;