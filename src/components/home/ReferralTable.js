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

const ReferralTable = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [referrals, setReferrals] = useState([]);
    const [showPage, setShowPage] = useState(initialState);

    useEffect(() => {
        if (token) {
            fetchEarnings(showPage.current, showPage.pageSize);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchEarnings = async (page, pageSize) => {
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/referrals",
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
            setReferrals(result.data.referrals);
            setShowPage({
                ...showPage,
                pageSize,
                current: page,
                total: result.data.referralsTotal
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
            title: 'Date Registered',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Commission',
            dataIndex: 'recruitCommission',
            key: 'recruitCommission',
        },
        {
            title: 'Status',
            dataIndex: 'confirmed',
            key: 'confirmed',
        }
    ];

    const data = referrals ? referrals.map((refer, index) => {
        const date = refer.createdAt && new Date(refer.createdAt);
        const showIndex = index + ((showPage.current - 1) * showPage.pageSize) + 1;
        return refer ? isMobile ? {
            key: refer._id ? refer._id : "",
            data:
                <>
                    <b>#</b>{showIndex}<br />
                    <b>Name:</b> {refer.name ? refer.name : ""}<br />
                    <b>Email:</b> {refer.email ? refer.email : ""}<br />
                    <b>Date Registered:</b> {refer.createdAt ? date.toDateString() : ""}<br />
                    <b>Commission:</b> <NumberFormat
                        value={refer.recruitCommission ? refer.recruitCommission : ""}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    /><br />
                    <b>Confirmed:</b> {refer.confirmed ? <span style={{ color: "green" }}>Confirmed</span> : <span style={{ color: "red" }}>Unconfirmed</span>}<br />
                </>
            ,
        } : {
            key: refer._id ? refer._id : "",
            index: showIndex,
            name: refer.name ? refer.name : "",
            email: refer.email ? refer.email : "",
            date: refer.createdAt ? date.toDateString() : "",
            recruitCommission: <div align="right" style={{ width: "50%" }}>
                <NumberFormat
                    value={refer.recruitCommission ? refer.recruitCommission : ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                />
            </div>,
            confirmed: refer.confirmed ? <span style={{color: "green"}}>Confirmed</span> : <span style={{color: "red"}}>Unconfirmed</span>
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
 
export default ReferralTable;