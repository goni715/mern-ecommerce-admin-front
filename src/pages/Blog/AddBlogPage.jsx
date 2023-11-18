import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddBlog = React.lazy(() => import('../../components/Blog/AddBlog'));

const AddBlogPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddBlog/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddBlogPage;