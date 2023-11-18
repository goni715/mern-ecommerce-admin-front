import React, {useEffect, useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {ProductCategoryListRequest} from "../../ApiServices/ProductCategoryApiRequest";
import {useSelector} from "react-redux";
import {selectProductCategoryList} from "../../redux/state-slice/productCategorySlice";
import {BrandListRequest} from "../../ApiServices/BrandApiRequest";
import {selectBrandList} from "../../redux/state-slice/brandSlice";
import {ColorListRequest} from "../../ApiServices/ColorApiRequest";
import {selectColorList} from "../../redux/state-slice/colorSlice";
import {FaCloudUploadAlt} from "react-icons/fa";
import {
    DeleteUpdateProductImageRequest,
    UploadUpdateProductImageRequest
} from "../../ApiServices/UploadApiRequest";
import {ErrorToast, IsEmpty,} from "../../helper/ValidationHelper";
import {GetProductRequest, UpdateProductRequest} from "../../ApiServices/ProductApiRequest";
import {useNavigate} from "react-router-dom";

import {
    selectBrandID,
    selectCategoryID, selectColorID,
    selectProductColor,
    selectProductDesc, selectProductImage,
    selectProductName, selectProductPrice, selectProductQuantity, selectProductTag, SetColorID, SetProductImage
} from "../../redux/state-slice/productSlice";
import {Select} from "antd";
import { Modal } from 'antd';
import store from "../../redux/store/store";
const UpdateProduct = ({id}) => {

    let productNameRef,brandIDRef, categoryIDRef, priceRef, qtyRef,descRef,tagRef, imageRef = useRef();
    let navigate = useNavigate();


    useEffect(()=>{
        (async () => {
            await ProductCategoryListRequest();
            await BrandListRequest();
            await ColorListRequest();
            await GetProductRequest(id);
        })();
    },[id])







    let ProductCategoryList=useSelector(selectProductCategoryList);
    let BrandList=useSelector(selectBrandList);
    let ColorList=useSelector(selectColorList);



    let ProductName=useSelector(selectProductName);
    let CategoryID=useSelector(selectCategoryID);
    let BrandID=useSelector(selectBrandID);
    let ProductDesc=useSelector(selectProductDesc);
    let ProductQuantity=useSelector(selectProductQuantity);
    let ProductPrice=useSelector(selectProductPrice);
    let ProductTag=useSelector(selectProductTag);
    let ProductImage=useSelector(selectProductImage);//This is an Array
    let ProductColorID=useSelector(selectColorID);//This is an Array




    const colorOptions = [];

    ColorList.forEach((item,i) => {
        colorOptions.push({
            label: item.ColorName,
            value: item._id,
        });
    });

    const handleChange = (value) => {
        store.dispatch(SetColorID(value));
        //console.log("Selected "+ value)
    };








    /// Default Color Set-up in ant design Select
    let ProductColor=useSelector(selectProductColor);
    const DefaultColors=[];

        ProductColor.forEach((item,i) => {
            DefaultColors.push({
                label: item.ColorName,
                value: item._id,
            });
        });






    const handleChangeImage = async ()=>{
        let myFiles = document.getElementById("file-input").files;
        let formData = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }

        await UploadUpdateProductImageRequest(formData);

    }


//DeleteImage
    const handleDeleteImage = async (publicID) => {
        let result = await DeleteUpdateProductImageRequest(publicID,id);
        if(result.data['result'] === "ProductImageDelete"){
            store.dispatch(SetProductImage(result.data['data']));
        }
        else{
            let data = ProductImage.filter((currentValue)=> currentValue.public_id !== publicID);
            store.dispatch(SetProductImage(data));
        }
    }



    const SaveProduct = async () => {

        let productName = productNameRef.value.trim();
        let brandID = brandIDRef.value.trim();
        let categoryID = categoryIDRef.value.trim();
        let price = priceRef.value.trim();
        let qty = qtyRef.value.trim();
        let desc = descRef.value.trim();
        let tag = tagRef.value.trim();


        if(IsEmpty(productName)){
            ErrorToast("Product Name Required !")
        }
        else if((IsEmpty(price)) || (price < 1)){
            ErrorToast("Price Required !")
        }
        else if((IsEmpty(qty)) || (qty < 1)){
            ErrorToast("Quantity Required !")
        }
        else if(IsEmpty(brandID)) {
            ErrorToast("Select Brand !")
        }
        else if(IsEmpty(categoryID)){
            ErrorToast("Select Category !")
        }
        else if(ProductColorID.length === 0){
           ErrorToast("Select at least one Color !")
        }
        else if(IsEmpty(tag)){
            ErrorToast("Select a Tag!")
        }
        else if(IsEmpty(desc)){
            ErrorToast("Product Details Required !")
        }
        else if(ProductImage.length === 0){
            ErrorToast("Please Choose a Image !")
        }
        else{
            let result = await UpdateProductRequest(productName,desc,categoryID,brandID,price,qty,ProductColorID,ProductImage,tag,id);
            if(result===true){
                navigate('/admin/product-list')
            }
        }

    }





    //Modal Show

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };








    return (
        <>
            <div className="container-fluid">
                <h3 className="mb-4 title">Update Product</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-light">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input key={Date.now()} defaultValue={ProductName} ref={(input)=>productNameRef=input} className="form-control form-control-md" type="text"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Price</label>
                                        <input key={Date.now()} defaultValue={ProductPrice} ref={(input)=>priceRef=input} className="form-control form-control-md" type="number"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input key={Date.now()} defaultValue={ProductQuantity}  ref={(input)=>qtyRef=input} className="form-control form-control-md" type="number"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Brand</label>
                                        <select key={Date.now()} defaultValue={BrandID}  ref={(select)=>brandIDRef=select} className="form-select form-select-md">
                                            <option value="">Select Brand</option>
                                            {BrandList.map((item, i) => {
                                                return (
                                                    <option key={i.toLocaleString()} value={item._id}>
                                                        {item.BrandName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Category</label>
                                        <select key={Date.now()} defaultValue={CategoryID} ref={(select)=>categoryIDRef=select} className="form-select form-select-md">
                                            <option value="">Select Category</option>
                                            {ProductCategoryList.map((item, i) => {
                                                return (
                                                    <option key={i.toLocaleString()} value={item._id}>
                                                        {item.CategoryName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Select Color</label>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                disabled
                                                autoFocus={true}
                                                size="middle"
                                                style={{
                                                    width: '100%',}}
                                                placeholder="Please select"
                                                onChange={handleChange}
                                                options={colorOptions}
                                                className="goni"
                                                defaultValue={DefaultColors}
                                                key={Date.now()}
                                            />
                                            <button onClick={showModal} className="btn btn-primary mt-1">Edit Color</button>


                                        {/*Modal Part*/}
                                        <Modal title="Select Colors " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                            <div className="p-3">
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    autoFocus={true}
                                                    size="middle"
                                                    style={{
                                                        width: '100%',}}
                                                    placeholder="Please select"
                                                    onChange={handleChange}
                                                    options={colorOptions}
                                                    className="goni"
                                                    defaultValue={DefaultColors}
                                                />
                                            </div>

                                        </Modal>
                                        {/*Modal Ended*/}

                                    </div>
                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label">Select Tag</label>
                                        <select key={Date.now()} defaultValue={ProductTag} ref={(select)=>tagRef=select} className="form-select form-select-md">
                                            <option value="">Select Tag</option>
                                            <option value="Featured">Featured</option>
                                            <option value="Popular">Popular</option>
                                            <option value="Special">Special</option>
                                        </select>
                                    </div>

                                    <div className="col-4 p-2 mb-2">
                                        <label className="form-label">Write a Description</label>
                                        <input key={Date.now()} defaultValue={ProductDesc} type="text" ref={(input)=>descRef=input} className="form-control form-control-md"/>
                                    </div>

                                </div>
                                <div className="row mt-2">
                                    <div className="col-12 p-2 border-1 text-center d-flex justify-content-center">
                                        <div className="wrapper2">
                                            <form action="#" onClick={()=>imageRef.click()}>
                                                <input ref={(input)=>imageRef=input} id="file-input" type="file" hidden onChange={handleChangeImage} multiple />
                                                <i className="fas fa-cloud-upload-alt"></i>
                                                <FaCloudUploadAlt className="uploadIcon"/>
                                                <p className="uploadDesc">Browse File to Upload</p>
                                            </form>
                                        </div>
                                    </div>
                                    <div className={ProductImage.length>0 ? "col-12 p-5 bg-white showImages d-flex flex-wrap gap-80" : "col-12 bg-white showImages d-flex flex-wrap gap-80"}  >

                                        {
                                            ProductImage?.map((item, i) => {
                                                return(
                                                    <>
                                                        <div className=" position-relative">
                                                            <button type="button" onClick={handleDeleteImage.bind(this, item.public_id)} className="btn-close position-absolute" style={{ top: "10px", right: "-25px" }}></button>
                                                            <img src={item.image_url} alt="" width={200} height={200} />
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 p-5">
                                        <button onClick={SaveProduct} className="btn btn-success btn-lg border-0 rounded-3 ">Save Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;