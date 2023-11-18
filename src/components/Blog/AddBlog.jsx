import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {BlogCategoryListRequest} from "../../ApiServices/BlogCategoryApiRequest";
import {useSelector} from "react-redux";
import {selectBlogCategoryList} from "../../redux/state-slice/blogCategorySlice";
import {FaCloudUploadAlt} from "react-icons/fa";
import {
    DeleteBlogImageRequest,
    UploadBlogImageRequest,
} from "../../ApiServices/UploadApiRequest";
import {selectBlogImageList, SetBlogImageList} from "../../redux/state-slice/uploadSlice";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";
import {CreateBlogRequest} from "../../ApiServices/BlogApiRequest";
import store from "../../redux/store/store";

const AddBlog = () => {

    let blogNameRef,categoryIDRef, imageRef, descriptionRef = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        (async () => {
            await BlogCategoryListRequest();
        })();
    },[])


    let BlogCategoryList=useSelector(selectBlogCategoryList);
    let BlogImageList = useSelector(selectBlogImageList);





    const handleChangeImage = async ()=>{

        let myFiles = document.getElementById("file-input").files;
        let formData = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }
        await UploadBlogImageRequest(formData);

    }

//DeleteImage
    const handleDeleteImage = async (publicID) => {

       let result = await DeleteBlogImageRequest(publicID);
       if(result === true){
           let data = BlogImageList.filter((currentValue)=> currentValue.public_id !== publicID);
           store.dispatch(SetBlogImageList(data));
       }

    }



    const SaveProduct = async () => {

        let blogName = blogNameRef.value.trim();
        let categoryID = categoryIDRef.value.trim();
        let description = descriptionRef.value;


        if(IsEmpty(blogName)){
            ErrorToast("Blog Name Required !")
        }
        else if(IsEmpty(categoryID)){
            ErrorToast("Select Category !")
        }
        else if(IsEmpty(description)){
            ErrorToast("Description Required");
        }
        else if(BlogImageList.length === 0){
            ErrorToast("Please Choose a Image !")
        }
        else{
            let result = await CreateBlogRequest(blogName,description,categoryID,BlogImageList);
            if(result===true){
                navigate('/admin/blog-list')
            }
        }

    }




    return (
        <>
            <div>
                <h3 className="mb-2 title">Add Blog</h3>

                <div className="row px-5">
                    <div className="col-4 p-2 w-40">
                        <label className="form-label fw-bold">Blog Name</label>
                        <input ref={(input)=> blogNameRef=input} className="form-control form-control-md" type="text"/>
                    </div>
                    <div className="col-4 w-40 p-2 ">
                        <label className="form-label fw-bold">Category</label>
                        <select ref={(select)=>categoryIDRef=select} className="form-select form-select-md">
                            <option value="">Select Category</option>
                            {BlogCategoryList.map((item, i) => {
                                return (
                                    <option key={i.toLocaleString()} value={item._id}>
                                        {item.CategoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>


                <div className="px-5 mt-2">
                    <label className="form-label fw-bold">Write a blog description</label>
                    <textarea ref={(input)=>descriptionRef=input} rows={4} placeholder="write here..." className="form-control animated fadeInUp"/>
                </div>


                <div className="row mt-1">
                    <div className="col-12 p-2 border-1 text-center d-flex justify-content-center">
                        <div className="wrapper2">
                            <form action="#" onClick={()=>imageRef.click()}>
                                <input ref={(input)=>imageRef=input} id="file-input" type="file" hidden onChange={handleChangeImage} multiple />
                                <FaCloudUploadAlt className="uploadIcon"/>
                                <p className="uploadDesc">Browse File to Upload</p>
                            </form>
                        </div>
                    </div>
                    <div className={BlogImageList.length>0 ? "col-12 px-5 py-4  bg-white showImages d-flex flex-wrap gap-80" : "col-12 bg-white showImages d-flex flex-wrap gap-80"}  >

                        {
                            BlogImageList?.map((item, i) => {
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

                <div>
                    <div className="col-12 px-5 py-4">
                        <button onClick={SaveProduct} className="btn btn-success btn-lg border-0 rounded-3 ">Add Blog</button>
                    </div>
                </div>



            </div>
        </>
    );
};

export default AddBlog;