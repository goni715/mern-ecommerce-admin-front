import React, {useEffect} from 'react';
import {Table} from "antd";
import {DeleteProductRequest, ProductListRequest} from "../../ApiServices/ProductApiRequest";
import {useSelector} from "react-redux";
import {selectProductList} from "../../redux/state-slice/productSlice";
import {Link} from "react-router-dom";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {ColorExplore} from "../../helper/ValidationHelper";
import {DeleteAlert} from "../../helper/DeleteAlert";




const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: 'Product Name',
        dataIndex: 'productName',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];




const ProductList = () => {


    useEffect(()=>{
        (async () => {
            await ProductListRequest();
        })();
    },[])


    let ProductList = useSelector(selectProductList);



    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed ===true){
            let DeleteResult= await DeleteProductRequest(id);
            if(DeleteResult ===true){
                await ProductListRequest();
            }
        }
    }





    const tableData = [];


    for (let i = 0; i < ProductList.length; i++) {
        tableData.push({
            key: Number(i + 1),
            productName: ProductList[i].ProductName,
            brand: ProductList[i]['Brand'][0]['BrandName'],
            category: ProductList[i]['Category'][0]['CategoryName'],
            color: ColorExplore(ProductList[i].Colors),
            price: ProductList[i].price,
            action: (
                <>
                    <Link to={"/admin/update-product/"+ProductList[i]._id} className=" fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button onClick={DeleteItem.bind(this,ProductList[i]._id)} className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }


    return (
        <>
            <div>
                <h3 className="mb-4 title">Products</h3>
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
};

export default ProductList;