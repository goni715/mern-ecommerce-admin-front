import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateProduct = React.lazy(() => import('../../components/Product/UpdateProduct'));

const UpdateProductPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateProduct id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateProductPage;