import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const ProductList = React.lazy(() => import('../../components/Product/ProductList'));

const ProductListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <ProductList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default ProductListPage;