import React, {useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css';
import {BlogCategoryListRequest} from "../../ApiServices/BlogCategoryApiRequest";
import {useSelector} from "react-redux";
import {selectBlogCategoryList} from "../../redux/state-slice/blogCategorySlice";
import {FaCloudUploadAlt} from "react-icons/fa";
import {
     DeleteUpdateBlogImageRequest,
    UploadUpdateBlogImageRequest,
} from "../../ApiServices/UploadApiRequest";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";
import {GetBlogRequest, UpdateBlogRequest} from "../../ApiServices/BlogApiRequest";
import {
    selectBlogCategoryID,
    selectBlogDesc,
    selectBlogImage,
    selectBlogName,
    SetBlogImage
} from "../../redux/state-slice/blogSlice";
import store from "../../redux/store/store";

const UpdateBlog = ({id}) => {

    let blogNameRef,categoryIDRef, imageRef, descriptionRef= useRef();
    const navigate = useNavigate();


    useEffect(()=>{
        (async () => {
            await GetBlogRequest(id);
            await BlogCategoryListRequest();
        })();
    },[id])



    let BlogCategoryList=useSelector(selectBlogCategoryList);




    let BlogName=useSelector(selectBlogName);
    let CategoryID=useSelector(selectBlogCategoryID);
    let BlogDesc=useSelector(selectBlogDesc);
    let BlogImage=useSelector(selectBlogImage);//This is an Array





    const handleChangeImage = async ()=>{
        let myFiles = document.getElementById("file-input").files;
        let formData = new FormData();
        for (let i = 0; i < myFiles.length; i++) {
            formData.append("images", myFiles[i]);
        }

        await UploadUpdateBlogImageRequest(formData);

    }


//DeleteImage
    const handleDeleteImage = async (publicID) => {
        let result = await DeleteUpdateBlogImageRequest(publicID,id);
        if(result.data['result'] === "BlogImageDelete"){
            store.dispatch(SetBlogImage(result.data['data']));
        }
        else{
            let data = BlogImage.filter((currentValue)=> currentValue.public_id !== publicID);
            store.dispatch(SetBlogImage(data));
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
        else if(BlogImage.length === 0){
            ErrorToast("Please Choose Image !")
        }
        else{
            let result = await UpdateBlogRequest(blogName,description,categoryID,BlogImage, id);
            if(result===true){
                navigate('/admin/blog-list')
            }
        }

    }



    return (
        <>
            <div>
                <h3 className="mb-2 title">Update Blog</h3>

                <div className="row px-5">
                    <div className="col-4 p-2 w-40">
                        <label className="form-label fw-bold">Blog Name</label>
                        <input key={Date.now()} defaultValue={BlogName} ref={(input)=> blogNameRef=input} className="form-control form-control-md" type="text"/>
                    </div>
                    <div className="col-4 w-40 p-2 ">
                        <label className="form-label fw-bold">Category</label>
                        <select key={Date.now()} defaultValue={CategoryID} ref={(select)=>categoryIDRef=select} className="form-select form-select-md">
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
                    <textarea defaultValue={BlogDesc} ref={(input)=>descriptionRef=input} rows={4} placeholder="write here..." className="form-control animated fadeInUp"/>
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
                    <div className={BlogImage.length>0 ? "col-12 px-5 py-4 bg-white showImages d-flex flex-wrap gap-80" : "col-12 bg-white showImages d-flex flex-wrap gap-80"}  >

                        {
                            BlogImage?.map((item, i) => {
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
                        <button onClick={SaveProduct} className="btn btn-success btn-lg border-0 rounded-3 ">Update Blog</button>
                    </div>
                </div>



            </div>
        </>
    );
};

export default UpdateBlog;