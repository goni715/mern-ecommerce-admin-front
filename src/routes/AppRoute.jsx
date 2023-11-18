import React, {Fragment} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import EnquiriesPage from "../pages/Enquiries/EnquiriesPage";
import BlogListPage from "../pages/Blog/BlogListPage";
import BlogCategoryListPage from "../pages/Blog/BlogCategoryListPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import CustomersPage from "../pages/Customer/CustomersPage";
import ColorsListPage from "../pages/Color/ColorsListPage";
import ProductCategoryListPage from "../pages/Product/ProductCategoryListPage";
import BrandListPage from "../pages/Brand/BrandListPage";
import ProductListPage from "../pages/Product/ProductListPage";
import AddBlogPage from "../pages/Blog/AddBlogPage";
import AddBlogCategoryPage from "../pages/Blog/AddBlogCategoryPage";
import AddColorPage from "../pages/Color/AddColorPage";
import AddProductCategoryPage from "../pages/Product/AddProductCategoryPage";
import AddBrandPage from "../pages/Brand/AddBrandPage";
import AddProductPage from "../pages/Product/AddProductPage";
import FullscreenLoader from "../components/MainLayout/FullscreenLoader";
import RegistrationPage from "../pages/RegistrationPage";
import UploadPage from "../pages/UploadPage";
import DemoPage from "../pages/DemoPage";
import AddCouponPage from "../pages/Coupon/AddCouponPage";
import CouponListPage from "../pages/Coupon/CouponListPage";
import UpdateBrandPage from "../pages/Brand/UpdateBrandPage";
import UpdateProductCategoryPage from "../pages/Product/UpdateProductCategoryPage";
import UpdateColorPage from "../pages/Color/UpdateColorPage";
import UpdateBlogCategoryPage from "../pages/Blog/UpdateBlogCategoryPage";
import UpdateCouponPage from "../pages/Coupon/UpdateCouponPage";
import UpdateProductPage from "../pages/Product/UpdateProductPage";
import UpdateBlogPage from "../pages/Blog/UpdateBlogPage";
import ViewEnquiryPage from "../pages/Enquiries/ViewEnquiryPage";
import ViewOrderPage from "../pages/Orders/ViewOrderPage";

const AppRoute = () => {
    return (


        <Fragment>
           <HashRouter>
               <Routes>
                   <Route path="/" element={<LoginPage />} />
                   <Route path="/registration" element={<RegistrationPage />} />
                   <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
                   <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                   <Route path="/admin" element={<DashboardPage/>} />
                   <Route path="/admin/enquiries" element={<EnquiriesPage/>} />
                   <Route path="/admin/view-enquiry/:id" element={<ViewEnquiryPage/>} />
                   <Route path="/admin/orders" element={<OrdersPage/>} />
                   <Route path="/admin/view-order/:id" element={<ViewOrderPage/>} />
                   <Route path="/admin/customers" element={<CustomersPage/>} />
                   <Route path="/admin/add-brand" element={<AddBrandPage/>} />
                   <Route path="/admin/update-brand/:id" element={<UpdateBrandPage/>} />
                   <Route path="/admin/brand-list" element={<BrandListPage/>} />
                   <Route path="/admin/add-category" element={<AddProductCategoryPage/>} />
                   <Route path="/admin/update-category/:id" element={<UpdateProductCategoryPage/>} />
                   <Route path="/admin/category-list" element={<ProductCategoryListPage/>} />
                   <Route path="/admin/add-color" element={<AddColorPage/>} />
                   <Route path="/admin/update-color/:id" element={<UpdateColorPage/>} />
                   <Route path="/admin/colors-list" element={<ColorsListPage/>} />
                   <Route path="/admin/add-product" element={<AddProductPage/>} />
                   <Route path="/admin/update-product/:id" element={<UpdateProductPage/>} />
                   <Route path="/admin/product-list" element={<ProductListPage/>} />
                   <Route path="/admin/add-blog" element={<AddBlogPage/>} />
                   <Route path="/admin/update-blog/:id" element={<UpdateBlogPage/>} />
                   <Route path="/admin/add-blog-category" element={<AddBlogCategoryPage/>} />
                   <Route path="/admin/update-blog-category/:id" element={<UpdateBlogCategoryPage/>} />
                   <Route path="/admin/blog-list" element={<BlogListPage/>} />
                   <Route path="/admin/blog-category-list" element={<BlogCategoryListPage/>} />

                   <Route path="/upload" element={<UploadPage/>} />
                   <Route path="/demo" element={<DemoPage/>} />
                   <Route path="/admin/add-coupon" element={<AddCouponPage/>} />
                   <Route path="/admin/update-coupon/:id" element={<UpdateCouponPage/>} />
                   <Route path="/admin/coupon-list" element={<CouponListPage/>} />
               </Routes>
           </HashRouter>
            <FullscreenLoader/>
        </Fragment>

    );
};

export default AppRoute;