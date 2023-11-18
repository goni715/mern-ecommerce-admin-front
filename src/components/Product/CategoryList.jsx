import React, {useEffect} from 'react';
import {Table} from "antd";
import {DeleteProductCategoryRequest, ProductCategoryListRequest} from "../../ApiServices/ProductCategoryApiRequest";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {selectProductCategoryList} from "../../redux/state-slice/productCategorySlice";
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


const CategoryList = () => {


    useEffect(()=>{
        (async () => {
            await ProductCategoryListRequest();
        })();
    },[])


    let ProductCategoryList=useSelector(selectProductCategoryList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteProductCategoryRequest(id);
            if(DeleteResult ===true){
                await ProductCategoryListRequest();
            }
        }
    }





    const tableData = [];

    for (let i = 0; i < ProductCategoryList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            categoryName: ProductCategoryList[i].CategoryName,
            action: (
                <>
                    <Link to={"/admin/update-category/"+ProductCategoryList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,ProductCategoryList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }




    return (
        <>
            <div>
                <h3 className="mb-4 title">Product Categories</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default CategoryList;