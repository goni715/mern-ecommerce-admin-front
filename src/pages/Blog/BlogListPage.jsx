import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const BlogList = React.lazy(() => import('../../components/Blog/BlogList'));

const BlogListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <BlogList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default BlogListPage;