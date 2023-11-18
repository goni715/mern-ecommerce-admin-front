import {createSlice} from "@reduxjs/toolkit";

export const productSlice=createSlice({
    name:'product',
    initialState:{
        List:[],
        CategoryID:"",
        BrandID:"",
        ProductName: "",
        ProductQuantity: "",
        ProductPrice: "",
        ProductDesc: "",
        ProductColor:[],
        ProductTag:"",
        ProductImage:[],
        ColorID:[],
        DefaultColors:[]


    },
    reducers:{
        SetProductList:(state,action)=>{
            state.List=action.payload
        },
        SetCategoryID:(state,action)=>{
            state.CategoryID=action.payload
        },
        SetBrandID:(state,action)=>{
            state.BrandID=action.payload
        },
        SetProductName:(state,action)=>{
            state.ProductName=action.payload
        },
        SetProductQuantity:(state,action)=>{
            state.ProductQuantity=action.payload
        },
        SetProductPrice:(state,action)=>{
            state.ProductPrice=action.payload
        },
        SetProductDesc:(state,action)=>{
            state.ProductDesc=action.payload
        },
        SetProductColor:(state,action)=>{
            state.ProductColor=action.payload
        },
        SetProductTag:(state,action)=>{
            state.ProductTag=action.payload
        },
        SetProductImage:(state,action)=>{
            state.ProductImage=action.payload
        },
        SetColorID:(state,action)=>{
            state.ColorID=action.payload
        },
        SetDefaultColors:(state,action)=>{
            state.DefaultColors=action.payload
        }
    }
})
export  const {SetProductList, SetCategoryID, SetBrandID, SetProductName, SetProductQuantity, SetProductPrice, SetProductDesc, SetProductColor, SetProductTag, SetProductImage, SetColorID, SetDefaultColors}=productSlice.actions;
export const selectProductList = (state) => state.product.List;
export const selectProductName = (state) => state.product.ProductName;
export const selectCategoryID = (state) => state.product.CategoryID;
export const selectBrandID = (state) => state.product.BrandID;
export const selectProductQuantity = (state) => state.product.ProductQuantity;
export const selectProductPrice = (state) => state.product.ProductPrice;
export const selectProductDesc = (state) => state.product.ProductDesc;
export const selectProductColor = (state) => state.product.ProductColor;
export const selectProductTag = (state) => state.product.ProductTag;
export const selectProductImage = (state) => state.product.ProductImage;
export const selectColorID = (state) => state.product.ColorID;
export const selectDefaultColors = (state) => state.product.DefaultColors;
export const productSliceReducer = productSlice.reducer;
