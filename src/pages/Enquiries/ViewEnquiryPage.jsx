import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const ViewEnquiry = React.lazy(() => import('../../components/Enquiries/ViewEnquiry'));

const ViewEnquiryPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <ViewEnquiry id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default ViewEnquiryPage;