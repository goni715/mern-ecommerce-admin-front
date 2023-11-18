import React, {useEffect, useRef} from 'react';
import {Table} from "antd";
import {
    DeleteEnquiryRequest,
    EnquiryListRequest,
    UpdateEnquiryRequest
} from "../../ApiServices/EnquiryApiRequest";
import {useSelector} from "react-redux";
import {selectEnquiryList} from "../../redux/state-slice/enquirySlice";
import {Link} from "react-router-dom";
import {AiFillDelete, AiOutlineEye} from "react-icons/ai";
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
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
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



const Enquiries = () => {


    useEffect(()=>{
        (async () => {
            await EnquiryListRequest();
        })();
    },[])



    const EnquiryList = useSelector(selectEnquiryList);




    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteEnquiryRequest(id);
            if(DeleteResult ===true){
                await EnquiryListRequest();
            }
        }
    }





    //Update Status
    const UpdateStatus = async (status,id) => {

        //SuccessToast(status+id);

        let result = await UpdateEnquiryRequest(status,id);
        if(result === true){
         await EnquiryListRequest();
        }
    }








    const tableData = [];


    for (let i = 0; i < EnquiryList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            name: EnquiryList[i].name,
            email: EnquiryList[i].email,
            mobile: EnquiryList[i].mobile,
            status: (
                <>
                    <select key={Date.now()} defaultValue={EnquiryList[i].status}
                        className="form-control form-select"
                        onChange={(e)=>UpdateStatus( e.target.value, EnquiryList[i]._id) }
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),

            action: (
                <>
                    <Link to={"/admin/view-enquiry/"+EnquiryList[i]._id} className="ms-3 fs-3 text-success">
                        <AiOutlineEye />
                    </Link>
                    <button onClick={DeleteItem.bind(this,EnquiryList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }











    return (
        <>
            <div>
                <h3 className="mb-4 title">Enquiries</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default Enquiries;