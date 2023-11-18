import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {IoIosNotifications} from "react-icons/io";
import {
    AiOutlineBgColors,
    AiOutlineDashboard,
    AiOutlineLogout,
    AiOutlineShoppingCart,
    AiOutlineUser
} from "react-icons/ai";
import {SiBrandfolder} from "react-icons/si";
import {BiCategoryAlt} from "react-icons/bi";
import {FaBloggerB, FaClipboardList} from "react-icons/fa";
import {ImBlog} from "react-icons/im";
import Profile from '../../assets/images/profile.jpg';
import {RiCouponLine} from "react-icons/ri";
const { Header, Content, Sider } = Layout;



const items = [
    {
        key: "/admin",
        icon: <AiOutlineDashboard className="fs-4" />,
        label: "Dashboard",
    },
    {
        key: "/admin/customers",
        icon: <AiOutlineUser className="fs-4" />,
        label: "Customers",
    },
    {
        key: "Product",
        icon: <AiOutlineShoppingCart className="fs-4" />,
        label: "Product",
        children: [
            {
                key: "/admin/add-brand",
                icon: <SiBrandfolder className="fs-4" />,
                label: "Add Brand",
            },
            {
                key: "/admin/brand-list",
                icon: <SiBrandfolder className="fs-4" />,
                label: "Brand List ",
            },
            {
                key: "/admin/add-category",
                icon: <BiCategoryAlt className="fs-4" />,
                label: " Add Category",
            },
            {
                key: "/admin/category-list",
                icon: <BiCategoryAlt className="fs-4" />,
                label: "Category List",
            },
            {
                key: "/admin/add-color",
                icon: <AiOutlineBgColors className="fs-4" />,
                label: "Add Color",
            },
            {
                key: "/admin/colors-list",
                icon: <AiOutlineBgColors className="fs-4" />,
                label: "Color List",

            },
            {
                key: "/admin/add-product",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Add Product",
            },
            {
                key: "/admin/product-list",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Product List",
            },
        ],
    },
    {
        key: "/admin/orders",
        icon: <FaClipboardList className="fs-4" />,
        label: "Orders",
    },
    {
        key: "Coupon",
        icon: <RiCouponLine className="fs-4" />,
        label: "Coupon",
        children: [
            {
                key: "/admin/add-coupon",
                icon: <ImBlog className="fs-4" />,
                label: "Add Coupon",
            },
            {
                key: "/admin/coupon-list",
                icon: <RiCouponLine className="fs-4" />,
                label: "Coupon List",
            },
        ],
    },
    {
        key: "blogs",
        icon: <FaBloggerB className="fs-4" />,
        label: "Blogs",
        children: [
            {
                key: "/admin/add-blog",
                icon: <ImBlog className="fs-4" />,
                label: "Add Blog",
            },
            {
                key: "/admin/blog-list",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blog List",
            },
            {
                key: "/admin/add-blog-category",
                icon: <ImBlog className="fs-4" />,
                label: "Add Blog Category",
            },
            {
                key: "/admin/blog-category-list",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blog Category List",
            },
        ],
    },
    {
        key: "/admin/enquiries",
        icon: <FaClipboardList className="fs-4" />,
        label: "Enquiries",
    },
    {
        key: "/signout",
        icon: <AiOutlineLogout className="fs-4" />,
        label: "Sign Out",
    },
]


const MainLayout = (props) => {


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const navigate = useNavigate();



    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo">
                        <h2 className="text-white fs-5 text-center py-3 mb-0">
                            <span className="sm-logo">GH</span>
                            <span className="lg-logo">GH Admin </span>
                        </h2>
                    </div>

                    <Menu theme="dark" defaultSelectedKeys={['1']} onClick={({ key }) => {
                        if (key === "/signout") {
                            localStorage.clear();
                            window.location.href="/";
                        } else {
                            navigate(key);
                        }
                    }} mode="inline"  items={items} />


                </Sider>
                <Layout className="site-layout">

                    <Header
                        className="d-flex justify-content-between ps-1 pe-5 mb-4"
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                        <div className="d-flex gap-4 align-items-center">
                            <div className="d-flex gap-3 align-items-center dropdown">
                                <div>
                                    <img
                                        width={32}
                                        height={32}
                                        src={Profile}
                                        alt="profile"
                                    />
                                </div>
                                <div
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li>
                                        <Link
                                            className="dropdown-item py-1 mb-1"
                                            style={{ height: "auto", lineHeight: "20px" }}
                                            to="/"
                                        >
                                            View Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item py-1 mb-1"
                                            style={{ height: "auto", lineHeight: "20px" }}
                                            to="/"
                                        >
                                            Signout
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>

                    </Header>

                    <Content style={{margin: '0 16px',}}>
                            {props.children}
                    </Content>
                </Layout>
            </Layout>
            
        </>
    );
};

export default MainLayout;