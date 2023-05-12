import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import NumberFormat from "react-number-format";

const initialState = {
    pageSize: 10,
    current: 1,
    sortkey: "updatedAt",
    sort: -1,
    total: 0,
}

const EarningTable = ({setnoRegBonus, setTabMenu}) => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [earnings, setEarnings] = useState([]);
    const [showPage, setShowPage] = useState(initialState);

    useEffect(() => {
        if (token) {
            fetchEarnings(showPage.current, showPage.pageSize);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchEarnings = async (page, pageSize) => {
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/earnings",
            { ...showPage, pageSize, current: page },
            {
                headers: {
                    authToken: token,
                },
            }
        );

        if (result.data.err) {
            toast.error(result.data.err);
        }else{
            const earningsData = [...earnings, ...result.data.earnings];
            const regBonusCheck = earningsData.filter(earn => earn.productName === "Registration Bonus");

            setnoRegBonus(result.data.earningsTotal < 10 && regBonusCheck.length < 1);
            setEarnings(result.data.earnings);
            setShowPage({
                ...showPage,
                pageSize,
                current: page,
                total: result.data.earningsTotal
            })
        }
    }

    const columns = isMobile ? [
        {
            title: '',
            dataIndex: 'data',
            key: 'data',
        },
    ] : [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Commission',
            dataIndex: 'commission',
            key: 'commission',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const data = earnings ? earnings.map((earn, index) =>
    {
        const showIndex = index + ((showPage.current - 1) * showPage.pageSize) + 1;
        return earn ? 
            isMobile ? {
                    key: earn._id ? earn._id : "",
                    data:
                        <>
                            <b>#</b>{showIndex}<br />
                            <b>Name:</b> {earn.customer && earn.customer.name}<br />
                            <b>Email:</b> {earn.customer && earn.customer.email}<br />
                            <b>Product:</b> {earn.product && earn.product.title ? earn.product.title : earn.productName ? <div>
                                {earn.productName}
                                {earn.productName === "Recruitment Reward" && <>
                                    (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(2)}>See Details</span>)
                                </>}
                                {earn.productName === "Login Reward" && <>
                                    (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(3)}>See Details</span>)
                                </>}
                                {earn.productName === "Post Reward" && <>
                                    (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(4)}>See Details</span>)
                                </>}
                                </div> : ""}<br />
                            <b>Commission:</b> <NumberFormat
                                value={earn.commission ? earn.commission : ""}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                            /><br />
                            <b>Status:</b> {earn.status ? <span style={{color: "green"}}>Approved</span> : <span style={{color: "red"}}>Pending</span>}<br />
                        </>
                    ,
                } : {
                    key: earn._id ? earn._id : "",
                    index: showIndex,
                    name: earn.customer && earn.customer.name,
                    email: earn.customer && earn.customer.email,
                    product: earn.product && earn.product.title ? earn.product.title : earn.productName ? <div>
                        {earn.productName}{" "}
                        {earn.productName === "Recruitment Reward" && <>
                            (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(2)}>See Details</span>)
                        </>}
                        {earn.productName === "Login Reward" && <>
                            (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(3)}>See Details</span>)
                        </>}
                        {earn.productName === "Post Reward" && <>
                            (<span style={{ cursor: "pointer", color: "blue" }} onClick={() => setTabMenu(4)}>See Details</span>)
                        </>}
                    </div> : "",
                    commission: <NumberFormat
                            value={earn.commission ? earn.commission : ""}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                        />,
                    status: earn.status ? <span style={{color: "green"}}>Approved</span> : <span style={{color: "red"}}>Pending</span>
                }
            : {}
        }
    ) : []
    
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{
                ...showPage,
                onChange: (page, pageSize) => fetchEarnings(page, pageSize),
            }}
        />
    );
}
 
export default EarningTable;