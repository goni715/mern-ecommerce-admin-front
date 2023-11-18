import React, {useEffect} from 'react';
import {CouponListRequest, DeleteCouponRequest} from "../../ApiServices/CouponApiRequest";
import {useSelector} from "react-redux";
import {selectCouponList} from "../../redux/state-slice/couponSlice";
import {Table} from "antd";
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
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Discount",
        dataIndex: "discount",
    },
    {
        title: "Expiry",
        dataIndex: "expiry",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];


const CouponList = () => {


    useEffect(()=>{
        (async () => {
            await CouponListRequest();
        })();
    },[])

    const CouponList = useSelector(selectCouponList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteCouponRequest(id);
            if(DeleteResult ===true){
                await CouponListRequest();
            }
        }
    }





    const tableData = [];
    for (let i = 0; i < CouponList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            name: CouponList[i].name,
            discount: CouponList[i].discount,
            expiry: new Date(CouponList[i].expiry).toLocaleString(),
            action: (
                <>
                    <Link to={"/admin/update-coupon/"+CouponList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,CouponList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }






    return (
        <>
            <div>
                <h3 className="mb-4 title">Coupon List</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default CouponList;