import React, {useEffect} from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {BlogCategoryListRequest, DeleteBlogCategoryRequest} from "../../ApiServices/BlogCategoryApiRequest";
import {selectBlogCategoryList} from "../../redux/state-slice/blogCategorySlice";
import {DeleteAlert} from "../../helper/DeleteAlert";



const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Category Name',
        dataIndex: 'categoryName',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];




const BlogCategoryList = () => {


    useEffect(()=>{
        (async () => {
            await BlogCategoryListRequest();
        })();
    },[])

    let BlogCategoryList=useSelector(selectBlogCategoryList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteBlogCategoryRequest(id);
            if(DeleteResult ===true){
                await BlogCategoryListRequest();
            }
        }
    }







    const tableData = [];

    for (let i = 0; i < BlogCategoryList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            categoryName: BlogCategoryList[i].CategoryName,
            action: (
                <>
                    <Link to={"/admin/update-blog-category/"+BlogCategoryList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,BlogCategoryList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }





    return (
        <>
            <div>
                <h3 className="mb-4 title">Blog Categories</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default BlogCategoryList;