import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddProduct = React.lazy(() => import('../../components/Product/AddProduct'));

const AddProductPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddProduct/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddProductPage;