import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddBlogCategory = React.lazy(() => import('../../components/Blog/AddBlogCategory'));

const AddBlogCategoryPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddBlogCategory/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddBlogCategoryPage;