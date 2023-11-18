import React, {useEffect, useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import {ProductCategoryListRequest} from "../../ApiServices/ProductCategoryApiRequest";
import {useSelector} from "react-redux";
import {selectProductCategoryList} from "../../redux/state-slice/productCategorySlice";
import {BrandListRequest} from "../../ApiServices/BrandApiRequest";
import {selectBrandList} from "../../redux/state-slice/brandSlice";
import {ColorListRequest} from "../../ApiServices/ColorApiRequest";
import {selectColorList} from "../../redux/state-slice/colorSlice";
import {Select} from "antd";
import {FaCloudUploadAlt} from "react-icons/fa";
import {
     DeleteProductImageRequest,
    UploadProductImageRequest,
} from "../../ApiServices/UploadApiRequest";
import {
    selectProductImageList,
    SetProductImageList
} from "../../redux/state-slice/uploadSlice";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {CreateProductRequest} from "../../ApiServices/ProductApiRequest";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/store";

const AddProduct = () => {

    let productNameRef,brandIDRef, categoryIDRef, priceRef, qtyRef,descRef,tagRef, imageRef = useRef();
    let navigate = useNavigate();
    const [color, setColor] = useState([]);


    useEffect(()=>{
        (async () => {
            await ProductCategoryListRequest();
            await BrandListRequest();
            await ColorListRequest();
        })();
    },[])


    let ProductCategoryList=useSelector(selectProductCategoryList);
    let BrandList=useSelector(selectBrandList);
    let ColorList=useSelector(selectColorList);
    let ProductImageList = useSelector(selectProductImageList);





    const colorOptions = [];

    ColorList.forEach((item,i) => {
        colorOptions.push({
            label: item.ColorName,
            value: item._id,
        });
    });

    const handleChange = (value) => {
        setColor(value);
    };



    const handleChangeImage = async ()=>{
        let myFiles = document.getElementById("file-input").files;
        let formData = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }
        await UploadProductImageRequest(formData);
    }

//DeleteImage
    const handleDeleteImage = async (publicID) => {
        let result = await DeleteProductImageRequest(publicID);
        if(result === true){
            let data = ProductImageList.filter((currentValue)=> currentValue.public_id !== publicID);
            store.dispatch(SetProductImageList(data));
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
        else if(color.length === 0){
            ErrorToast("Select at least one Color !")
        }
        else if(IsEmpty(tag)){
            ErrorToast("Select a Tag!")
        }
        else if(IsEmpty(desc)){
            ErrorToast("Product Details Required !")
        }
        else if(ProductImageList.length === 0){
            ErrorToast("Please Choose a Image !")
        }
        else{
            let result = await CreateProductRequest(productName,desc,categoryID,brandID,price,qty,color,ProductImageList,tag);
            if(result===true){
                navigate('/admin/product-list')
            }
        }

    }



    return (
        <>
            <div className="container-fluid">
                <h3 className="mb-4 title">Add Product</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-light">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label fw-bold">Product Name</label>
                                        <input ref={(input)=>productNameRef=input} className="form-control form-control-md" type="text"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label fw-bold">Price</label>
                                        <input ref={(input)=>priceRef=input} className="form-control form-control-md" type="number"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label fw-bold">Quantity</label>
                                        <input ref={(input)=>qtyRef=input} className="form-control form-control-md" type="number"/>
                                    </div>

                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label fw-bold">Brand</label>
                                        <select ref={(select)=>brandIDRef=select} className="form-select form-select-md">
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
                                        <label className="form-label fw-bold">Category</label>
                                        <select ref={(select)=>categoryIDRef=select} className="form-select form-select-md">
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
                                        <label className="form-label fw-bold">Select Color</label>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        size="middle"
                                        style={{
                                        width: '100%',}}
                                        placeholder="Please select"
                                        onChange={handleChange}
                                        options={colorOptions}
                                        className="goni"
                                        />
                                    </div>
                                    <div className="col-4 p-2 mb-3">
                                        <label className="form-label fw-bold">Select Tag</label>
                                        <select ref={(select)=>tagRef=select} className="form-select form-select-md">
                                            <option value="">Select Tag</option>
                                            <option value="Featured">Featured</option>
                                            <option value="Popular">Popular</option>
                                            <option value="Special">Special</option>
                                        </select>
                                    </div>

                                    <div className="col-4 p-2 mb-2">
                                        <label className="form-label fw-bold">Write a Description</label>
                                        <input type="text" ref={(input)=>descRef=input} className="form-control form-control-md"/>
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
                                    <div className={ProductImageList.length>0 ? "col-12 p-5 bg-white showImages d-flex flex-wrap gap-80" : "col-12 bg-white showImages d-flex flex-wrap gap-80"}  >

                                        {
                                            ProductImageList?.map((item, i) => {
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
                                        <button onClick={SaveProduct} className="btn btn-success btn-lg border-0 rounded-3 ">Add Product</button>
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

export default AddProduct;