import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateCategory = React.lazy(() => import('../../components/Product/UpdateCategory'));

const UpdateProductCategoryPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateCategory id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateProductCategoryPage;