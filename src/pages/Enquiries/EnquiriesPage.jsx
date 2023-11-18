import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const Enquiries = React.lazy(() => import('../../components/Enquiries/Enquiries'));


const EnquiriesPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <Enquiries/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default EnquiriesPage;