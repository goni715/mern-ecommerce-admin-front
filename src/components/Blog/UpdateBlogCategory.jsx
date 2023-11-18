import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {selectBlogCategoryName} from "../../redux/state-slice/blogCategorySlice";
import {GetBlogCategoryRequest, UpdateBlogCategoryRequest} from "../../ApiServices/BlogCategoryApiRequest";

const UpdateBlogCategory = ({id}) => {

    let categoryNameRef = useRef();
    let navigate = useNavigate();



    useEffect(()=>{
        (async () => {
            await GetBlogCategoryRequest(id);
        })();
    },[id])


    let CategoryName = useSelector(selectBlogCategoryName);


    const SaveChange = async () => {

        let categoryName = categoryNameRef.value.trim();

        if(IsEmpty(categoryName)){
            ErrorToast("Category Name is Required");
        }
        else{

            let result = await UpdateBlogCategoryRequest(categoryName,id);

            if(result === true){
                navigate('/admin/blog-category-list');
            }

        }


    }




    return (
        <>
            <div className="container-fluid">
                <h3 className="title">Update Blog Category</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                ref={(input)=>categoryNameRef=input}
                                                className="form-control"
                                                id="update-brand"
                                                placeholder="Enter Brand"
                                                defaultValue={CategoryName}
                                                key={Date.now()}
                                            />
                                            <label htmlFor="Enter Brand">Enter Category</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="btn btn-success border-0 rounded-3 my-3">Save Change</button>
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

export default UpdateBlogCategory;