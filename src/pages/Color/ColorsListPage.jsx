import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const ColorsList = React.lazy(() => import('../../components/Colors/ColorsList'));

const ColorsListPage = () => {
    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <ColorsList/>
                </Suspense>
            </MainLayout>

        </>
    );
};

export default ColorsListPage;