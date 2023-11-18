import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
import {useParams} from "react-router-dom";
const UpdateColor = React.lazy(() => import('../../components/Colors/UpdateColor'));

const UpdateColorPage = () => {

    const params = useParams();

    return (
        <>
            <MainLayout>
                <Suspense fallback={LazyLoader}>
                    <UpdateColor id={params['id']}/>
                </Suspense>
            </MainLayout>
        </>
    );
};

export default UpdateColorPage;