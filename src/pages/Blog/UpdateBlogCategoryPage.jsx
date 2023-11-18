import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateBlogCategory = React.lazy(() => import('../../components/Blog/UpdateBlogCategory'));

const UpdateBlogCategoryPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateBlogCategory id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateBlogCategoryPage;