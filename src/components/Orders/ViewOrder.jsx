import React, {useEffect} from 'react';
import { GetSingleOrderRequest} from "../../ApiServices/OrderApiRequest";
import {useSelector} from "react-redux";
import {selectSingleOrderItems} from "../../redux/state-slice/orderSlice";
import {Table} from "antd";



const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Quantity",
        dataIndex: "count",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Price",
        dataIndex: "amount",
    },

];


const ViewOrder = ({id}) => {


    useEffect(()=>{
        (async () => {
            await GetSingleOrderRequest(id);
        })();
    },[id])



    const OrderItems = useSelector(selectSingleOrderItems);//This is Array




    const tableData = [];


    for (let i = 0; i < OrderItems.length; i++) {
        tableData.push({
            key: Number(i + 1),
            name: OrderItems[i]['ProductName'],
            brand: OrderItems[i]['BrandName'],
            count: OrderItems[i]['quantity'],
            amount: OrderItems[i]['price'],
            color: (
                <>
                    <ul className="colors ps-0">
                        <li style={{background: OrderItems[i]['ColorName']}}></li>
                    </ul>
                </>
            ),
        });
    }



    return (
        <>
            <div>
                <h3 className="mb-4 title">View Order</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default ViewOrder;