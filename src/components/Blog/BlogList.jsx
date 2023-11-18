import React, {useEffect} from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";
import {selectBlogList} from "../../redux/state-slice/blogSlice";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {BlogListRequest, DeleteBlogRequest} from "../../ApiServices/BlogApiRequest";
import {DeleteAlert} from "../../helper/DeleteAlert";





const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Blog Name',
        dataIndex: 'blogName',
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




const BlogList = () => {


    useEffect(()=>{
        (async () => {
            await BlogListRequest();
        })();
    },[])



    const BlogList = useSelector(selectBlogList);


    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteBlogRequest(id);
            if(DeleteResult ===true){
                 await BlogListRequest();
            }
        }
    }



    const tableData = [];
    for (let i = 0; i < BlogList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            blogName: BlogList[i].BlogName,
            categoryName: BlogList[i]['Category'][0]['CategoryName'],
            action: (
                <>
                    <Link to={"/admin/update-blog/"+BlogList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,BlogList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }



    return (
        <>
            <div>
                <h3 className="mb-4 title">Blog List</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default BlogList;