import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const CategoryList = React.lazy(() => import('../../components/Product/CategoryList'));

const ProductCategoryListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <CategoryList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default ProductCategoryListPage;