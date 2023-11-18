import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const AddColor = React.lazy(() => import('../../components/Colors/AddColor'));

const AddColorPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <AddColor/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default AddColorPage;