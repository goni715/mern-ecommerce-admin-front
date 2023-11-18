import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateBlog = React.lazy(() => import('../../components/Blog/UpdateBlog'));

const UpdateBrandPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateBlog id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateBrandPage;