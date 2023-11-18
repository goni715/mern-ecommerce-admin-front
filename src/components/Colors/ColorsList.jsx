import React, {useEffect} from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {ColorListRequest, DeleteColorRequest} from "../../ApiServices/ColorApiRequest";
import {selectColorList} from "../../redux/state-slice/colorSlice";
import {DeleteAlert} from "../../helper/DeleteAlert";



const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Color',
        dataIndex: 'colorName',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];



const ColorsList = () => {


    useEffect(()=>{
        (async () => {
            await ColorListRequest();
        })();
    },[])

    let ColorList=useSelector(selectColorList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteColorRequest(id);
            if(DeleteResult ===true){
                await ColorListRequest();
            }
        }
    }







    const tableData = [];

    for (let i = 0; i < ColorList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            //colorName: ColorList[i].ColorName,
            colorName: (
                <>
                    <ul className="colors ps-0">
                        <li style={{background: ColorList[i]['ColorName']}}></li>
                    </ul>
                </>
            ),
            action: (
                <>
                    <Link to={"/admin/update-color/"+ColorList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,ColorList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }



    return (
        <>
            <div>
                <h3 className="mb-4 title">Colors</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default ColorsList;