import React, {useEffect} from 'react';
import {Table} from "antd";
import {CustomerListRequest} from "../../ApiServices/CustomerApiRequest";
import {useSelector} from "react-redux";
import {selectCustomerList} from "../../redux/state-slice/customerSlice";



const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,//sorting Data ascending & descending
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
];



const Customers = () => {


    useEffect(()=>{
        (async () => {
            await CustomerListRequest();
        })();
    },[])


    let DataList = useSelector(selectCustomerList);
    let CustomerList = DataList.filter((currentValue)=> currentValue.role !== "admin");

    const tableData = [];

    for (let i = 0; i < CustomerList.length; i++) {
        if (CustomerList[i].role !== "admin") {
            tableData.push({
                key: Number(i+1),
                name: CustomerList[i].firstName + " " + CustomerList[i].lastName,
                email: CustomerList[i].email,
                mobile: CustomerList[i].mobile,
            });
        }
    }



    return (
        <>
            <div>
                <h3 className="mb-4 title">Customers</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default Customers;