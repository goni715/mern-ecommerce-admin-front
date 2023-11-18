import React, {useEffect} from 'react';
import {Table} from "antd";
import {DeleteOrderRequest, GetAllOrdersRequest, UpdateOrderStatusRequest} from "../../ApiServices/OrderApiRequest";
import {useSelector} from "react-redux";
import {selectOrderList} from "../../redux/state-slice/orderSlice";
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {DeleteAlert} from "../../helper/DeleteAlert";



const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Customer Name",
        dataIndex: "name",
    },
    {
        title: "View Orders",
        dataIndex: "product",
    },
    {
        title: "Total Price",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];




const Orders = () => {




    useEffect(()=>{
        (async () => {
            await GetAllOrdersRequest();
        })();
    },[])



    const OrderList = useSelector(selectOrderList);




    //Update Order Status
    const UpdateStatus = async (status,id) => {
        let result = await UpdateOrderStatusRequest(status,id);
        if(result === true){
           await GetAllOrdersRequest();
        }
    }







    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
           let DeleteResult= await DeleteOrderRequest(id);
              if(DeleteResult ===true){
                await GetAllOrdersRequest();
              }
        }
    }






    const tableData = [];

    if(OrderList.length > 0){
        for (let i = 0; i < OrderList.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: OrderList[i]['customer'][0]['firstName'] + " "+ OrderList[i]['customer'][0]['lastName'], //orderBy
                product: (
                    <Link to={"/admin/view-order/"+OrderList[i]._id}>
                        View Orders
                    </Link>
                ),
                amount: OrderList[i]['totalPrice'],
                date: new Date(OrderList[i].createdAt).toLocaleString(),
                status: (
                    <>
                        <select key={Date.now()} defaultValue={OrderList[i]['orderStatus']}
                                className="form-control form-select"
                                onChange={(e)=>UpdateStatus( e.target.value, OrderList[i]._id) }
                        >
                            <option value="Ordered">Ordered</option>
                            <option value="Processed">Processed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </>
                ),
                action: (
                    <>
                        <button onClick={DeleteItem.bind(this,OrderList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                            <AiFillDelete />
                        </button>
                    </>
                ),

            });
        }
    }








    return (
        <>
            <div>
                <h3 className="mb-4 title">Orders</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default Orders;