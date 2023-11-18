import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const ViewOrder = React.lazy(() => import('../../components/Orders/ViewOrder'));

const ViewOrderPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <ViewOrder id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default ViewOrderPage;