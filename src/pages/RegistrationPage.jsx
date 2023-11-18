import React, {Suspense} from 'react';
import LazyLoader from "../components/MainLayout/LazyLoader";
const Registration = React.lazy(() => import('../components/Registration/Registration'));


const RegistrationPage = () => {
    return (
        <>
            <Suspense fallback={LazyLoader}>
                <Registration/>
            </Suspense>
        </>
    );
};

export default RegistrationPage;