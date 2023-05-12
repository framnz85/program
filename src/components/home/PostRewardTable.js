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

const PostRewardTable = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [postRewards, setPostRewards] = useState([]);
    const [showPage, setShowPage] = useState(initialState);

    useEffect(() => {
        if (token) {
            fetchEarnings(showPage.current, showPage.pageSize);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchEarnings = async (page, pageSize) => {
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/post-rewards",
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
            setPostRewards(result.data.postRewards);
            setShowPage({
                ...showPage,
                pageSize,
                current: page,
                total: result.data.postRewardsTotal
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
            title: 'Posted Link',
            dataIndex: 'postLink',
            key: 'postLink',
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

    const data = postRewards ? postRewards.map((post, index) => {
        const showIndex = index + ((showPage.current - 1) * showPage.pageSize) + 1;
        return post ? isMobile ? {
            key: post._id ? post._id : "",
            data:
                <>
                    <b>#</b>{showIndex}<br />
                    <b>Reward Date:</b> {post.rewardDate}<br />
                    <b>Posted Link:</b> <a href={post.postLink} target="_blank" rel="noreferrer">{post.postLink}</a><br />
                    <b>Amount:</b> <NumberFormat
                        value={post.amount ? post.amount : ""}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    /><br />
                    <b>Commission:</b> <NumberFormat
                        value={post.commission ? post.commission : ""}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    /><br />
                    <b>Status:</b> {post.status ? <span style={{ color: "green" }}>Approved</span> : <span style={{ color: "red" }}>Pending</span>}<br />
                </>
            ,
        } : {
            key: post._id ? post._id : "",
            index: showIndex,
            rewardDate: post.rewardDate,
            postLink: <a href={post.postLink} target="_blank" rel="noreferrer">{post.postLink}</a>,
            amount: <div align="right" style={{ width: "50%" }}>
                <NumberFormat
                    value={post.amount ? post.amount : ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                />
            </div>,
            commission: <div align="right" style={{ width: "50%" }}>
                <NumberFormat
                    value={post.commission ? post.commission : ""}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                />
            </div>,
            status: post.status ? <span style={{color: "green"}}>Approved</span> : <span style={{color: "red"}}>Pending</span>
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
 
export default PostRewardTable;