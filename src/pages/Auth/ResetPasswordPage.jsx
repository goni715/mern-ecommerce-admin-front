import React, {Suspense} from 'react';
import LazyLoader from "../../components/MainLayout/LazyLoader";
const ResetPassword = React.lazy(() => import('../../components/ResetPassword/ResetPassword'));


const ResetPasswordPage = () => {
    return (
        <>
            <Suspense fallback={LazyLoader}>
                <ResetPassword/>
            </Suspense>
        </>
    );
};

export default ResetPasswordPage;