import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import NumberFormat from "react-number-format";

const initialState = {
    pageSize: 10,
    current: 1,
    sortkey: "createdAt",
    sort: -1,
    total: 0,
}

const LoginRewardTable = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [loginRewards, setLoginRewards] = useState([]);
    const [showPage, setShowPage] = useState(initialState);

    useEffect(() => {
        if (token) {
            fetchEarnings(showPage.current, showPage.pageSize);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchEarnings = async (page, pageSize) => {
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/login-rewards",
            {...showPage, pageSize, current: page},
            {
                headers: {
                    authToken: token,
                },
            }
        );

        if (result.data.err) {
            toast.error(result.data.err);
        }else{
            setLoginRewards(result.data.loginRewards);
            setShowPage({
                ...showPage,
                pageSize,
                current: page,
                total: result.data.loginRewardsTotal
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
            title: 'Reward Date',
            dataIndex: 'rewardDate',
            key: 'rewardDate',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
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
        }
    ];

    const data = loginRewards ? loginRewards.map((login, index) => {
        const showIndex = index + ((showPage.current - 1) * showPage.pageSize) + 1;
        return login ? isMobile ? {
            key: login._id ? login._id : "",
            data:
                <>
                    <b>#</b>{showIndex}<br />
                    <b>Reward Date:</b> {login.rewardDate}<br />
                    <b>Amount:</b> <NumberFormat
                        value={login.amount ? login.amount : ""}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    /><br />
                    <b>Commission:</b> <NumberFormat
                        value={login.commission ? login.commission : ""}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    /><br />
                    <b>Status:</b> {login.status ? <span style={{ color: "green" }}>Approved</span> : <span style={{ color: "red" }}>Pending</span>}<br />
                </>
            ,
        } : {
            key: login._id ? login._id : "",
            index: showIndex,
            rewardDate: login.rewardDate,
            amount: <div align="right" style={{ width: "50%" }}>
                <NumberFormat
                    value={login.amount ? login.amount : ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                />
            </div>,
            commission: <div align="right" style={{ width: "50%" }}>
                <NumberFormat
                    value={login.commission ? login.commission : ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                />
            </div>,
            status: login.status ? <span style={{color: "green"}}>Approved</span> : <span style={{color: "red"}}>Pending</span>
        } : {}
    }) : []
    
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
 
export default LoginRewardTable;