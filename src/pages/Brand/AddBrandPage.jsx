import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddBrand = React.lazy(() => import('../../components/Brand/AddBrand'));

const AddBrandPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddBrand/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddBrandPage;