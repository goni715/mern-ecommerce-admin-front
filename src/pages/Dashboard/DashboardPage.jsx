import React, {Suspense} from 'react';
import MainLayout from "../../components/MainLayout/MainLayout";
import LazyLoader from "../../components/MainLayout/LazyLoader";
const Dashboard = React.lazy(() => import('../../components/Dashboard/Dashboard'));


const DashboardPage = () => {
    return (
        <>
           <MainLayout>
               <Suspense fallback={LazyLoader}>
                   <Dashboard/>
               </Suspense>
           </MainLayout>
        </>
    );
};

export default DashboardPage;