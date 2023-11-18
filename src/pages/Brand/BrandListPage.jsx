import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const BrandList = React.lazy(() => import('../../components/Brand/BrandList'));

const BrandListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <BrandList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default BrandListPage;