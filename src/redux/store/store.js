import {configureStore} from "@reduxjs/toolkit";
import {modalSliceReducer} from "../state-slice/ModalSlice";
import {brandSliceReducer} from "../state-slice/brandSlice";
import {blogSliceReducer} from "../state-slice/blogSlice";
import {colorSliceReducer} from "../state-slice/colorSlice";
import {couponSliceReducer} from "../state-slice/couponSlice";
import {customerSliceReducer} from "../state-slice/customerSlice";
import {enquirySliceReducer} from "../state-slice/enquirySlice";
import {productCategorySliceReducer} from "../state-slice/productCategorySlice";
import {productSliceReducer} from "../state-slice/productSlice";
import {settingsSliceReducer} from "../state-slice/settingsSlice";
import {blogCategorySliceReducer} from "../state-slice/blogCategorySlice";
import {orderSliceReducer} from "../state-slice/orderSlice";
import {uploadSliceReducer} from "../state-slice/uploadSlice";


export default configureStore({

    reducer:{
        settings:settingsSliceReducer,
        modal:modalSliceReducer,
        brand:brandSliceReducer,
        blog:blogSliceReducer,
        color:colorSliceReducer,
        coupon:couponSliceReducer,
        customer:customerSliceReducer,
        enquiry:enquirySliceReducer,
        productCategory: productCategorySliceReducer,
        product: productSliceReducer,
        blogCategory: blogCategorySliceReducer,
        order:orderSliceReducer,
        upload: uploadSliceReducer
    }
})