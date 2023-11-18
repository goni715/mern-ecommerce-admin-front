import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateBrand = React.lazy(() => import('../../components/Brand/UpdateBrand'));

const UpdateBrandPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateBrand id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateBrandPage;