import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddCategory = React.lazy(() => import('../../components/Product/AddCategory'));

const AddProductCategoryPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddCategory/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddProductCategoryPage;