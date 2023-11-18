import React, {useEffect} from 'react';
import {Table} from "antd";
import {BrandListRequest, DeleteBrandRequest} from "../../ApiServices/BrandApiRequest";
import {useSelector} from "react-redux";
import {selectBrandList} from "../../redux/state-slice/brandSlice";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {DeleteAlert} from "../../helper/DeleteAlert";




const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Brand Name',
        dataIndex: 'brandName',
        sorter: (a, b) => a.brandName.length - b.brandName.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];








const BrandList =  () => {


    useEffect(()=>{
        (async () => {
            await BrandListRequest();
        })();
    },[])

    let BrandList=useSelector(selectBrandList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteBrandRequest(id);
            if(DeleteResult ===true){
                await BrandListRequest();
            }
        }
    }




    const tableData = [];

    for (let i = 0; i < BrandList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            brandName: BrandList[i].BrandName,
            action: (
                <>
                    <Link to={"/admin/update-brand/"+BrandList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,BrandList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }














    return (
        <>
            <div>
                <h3 className="mb-4 title">Brands</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default BrandList;