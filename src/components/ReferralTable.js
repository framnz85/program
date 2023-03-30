import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

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
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
    ] : [
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
            title: 'Status',
            dataIndex: 'confirmed',
            key: 'confirmed',
        }
    ];

    const data = referrals ? referrals.map(refer => {
        const date = refer.createdAt && new Date(refer.createdAt);
        return refer ? isMobile ? {
            key: refer._id ? refer._id : "",
            data:
                <>
                    <b>Name:</b> {refer.name ? refer.name : ""}<br />
                    <b>Email:</b> {refer.email ? refer.email : ""}<br />
                    <b>Date Registered:</b> {refer.createdAt ? date.toDateString() : ""}<br />
                    <b>Confirmed:</b> {refer.confirmed ? <span style={{color: "green"}}>Confirmed</span> : <span style={{color: "red"}}>Unconfirmed</span>}<br />
                </>
            ,
        } : {
            key: refer._id ? refer._id : "",
            name: refer.name ? refer.name : "",
            email: refer.email ? refer.email : "",
            date: refer.createdAt ? date.toDateString() : "",
            confirmed: refer.confirmed ? <span style={{color: "green"}}>Confirmed</span> : <span style={{color: "red"}}>Unconfirmed</span>,
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