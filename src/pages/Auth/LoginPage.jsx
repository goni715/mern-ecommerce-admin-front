import React, {Suspense} from 'react';
import LazyLoader from "../../components/MainLayout/LazyLoader";
const Login = React.lazy(() => import('../../components/Login/Login'));


const LoginPage = () => {
    return (
        <>

                <Suspense fallback={LazyLoader}>
                    <Login/>
                </Suspense>

        </>
    );
};

export default LoginPage;