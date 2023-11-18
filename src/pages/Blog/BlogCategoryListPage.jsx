import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const BlogCategoryList = React.lazy(() => import('../../components/Blog/BlogCategoryList'));

const BlogCategoryListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <BlogCategoryList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default BlogCategoryListPage;