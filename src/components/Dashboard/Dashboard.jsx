import React, {useEffect} from 'react';
import {BsArrowDownRight} from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import {BrandListRequest} from "../../ApiServices/BrandApiRequest";
import {useSelector} from "react-redux";
import {selectBrandList} from "../../redux/state-slice/brandSlice";
import {
    GetMonthlyOrderIncomeRequest,
    GetMonthlyOrdersCountRequest,
    GetYearlyOrdersRequest
} from "../../ApiServices/DashboardApiRequest";
import {
    selectMonthlyOrderCount,
    selectMonthlyOrderIncome, selectOrderList,
    selectYearlyOrderCount, selectYearlyTotalIncome
} from "../../redux/state-slice/orderSlice";
import {GetAllOrdersRequest} from "../../ApiServices/OrderApiRequest";






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
        title: "Product Count",
        dataIndex: "product",
    },
    {
        title: "Total Price",
        dataIndex: "tPrice",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
];





//Demo Chart Data
/*

    const data = [
        {
            month: "Jan",
            count: 38,
        },
        {
            month: "Feb",
            count: 38,
        },
        {
            month: "Mar",
            count: 38,
        },
        {
            month: "Apr",
            count: 38,
        },
        {
            month: "May",
            count: 38,
        },
        {
            month: "Jun",
            count: 38,
        },
        {
            month: "July",
            count: 38,
        },
        {
            month: "Aug",
            count: 38,
        },
        {
            month: "Sept",
            count: 38,
        },
        {
            month: "Oct",
            count: 38,
        },
        {
            month: "Nov",
            count: 38,
        },
        {
            month: "Dec",
            count: 38,
        },
    ];

 */


const Dashboard = () => {


    useEffect(()=>{
        (async () => {
            await GetAllOrdersRequest();
            await GetMonthlyOrdersCountRequest();
            await GetMonthlyOrderIncomeRequest();
            await GetYearlyOrdersRequest()
        })();
    },[])

    let monthlyOrderIncome =useSelector(selectMonthlyOrderIncome);
    let monthlyOrderCount =useSelector(selectMonthlyOrderCount);
    let YearlyOrderCount =useSelector(selectYearlyOrderCount);
    let YearlyTotalIncome =useSelector(selectYearlyTotalIncome);
    const OrderList = useSelector(selectOrderList);





    const config = {
        data:monthlyOrderIncome,
        xField: "month",
        yField: "amount",
        color: ({ type }) => {
            return "#4158d0";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };





    const config2 = {
        data:monthlyOrderCount,
        xField: "month",
        yField: "count",
        color: ({ type }) => {
            return "#4158d0";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };












    const tableData = [];
    for (let i = 0; i < OrderList.length; i++) {
        tableData.push({
            key: Number(i+1),
            name: OrderList[i]['customer'][0]['firstName'] + " "+ OrderList[i]['customer'][0]['lastName'],
            product: OrderList[i].orderItems.length,
            tPrice: OrderList[i]['totalPrice'],
            status: OrderList[i]['orderStatus']
        });
    }












    return (
        <>
           <div>
               <h3 className="mb-3 title">Dashboard</h3>
               <div className="d-flex justify-content-between align-items-center gap-3">
                   <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                       <div>
                           <p className="desc">Total Income</p>
                           <h4 className="mb-0 sub-title">${YearlyTotalIncome}</h4>
                       </div>
                       <div className="d-flex flex-column align-items-end">
                           <p className="mb-0  desc">Income in Last Year from Today</p>
                       </div>
                   </div>
                   <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                       <div>
                           <p className="desc">Total Sales</p>
                           <h4 className="mb-0 sub-title">{YearlyOrderCount}</h4>
                       </div>
                       <div className="d-flex flex-column align-items-end">
                           <p className="mb-0 desc">Sales in Last Year from Today</p>
                       </div>
                   </div>
               </div>


                    <div className="mt-4 mb-2">
                       <h3 className="mb-5 title">Income Statics</h3>
                       <div>
                          <Column {...config} />
                        </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="mb-5 title">Sales Statistics</h3>
                       <div>
                          <Column {...config2} />
                      </div>
               </div>
                     <div className="mt-4">
                       <h3 className="mb-5 title">Recent Orders</h3>
                        <div>
                           <Table columns={columns} dataSource={tableData} />
                      </div>
               </div>
           </div>

        </>
    );
};

export default Dashboard;