import React, {Suspense} from 'react';
import LazyLoader from "../../components/MainLayout/LazyLoader";
const ForgotPassword = React.lazy(() => import('../../components/ForgotPassword/ForgotPassword'));


const ForgotPasswordPage = () => {
    return (
        <>
            <Suspense fallback={LazyLoader}>
                <ForgotPassword/>
            </Suspense>
        </>
    );
};

export default ForgotPasswordPage;