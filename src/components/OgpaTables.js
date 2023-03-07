import React from 'react'
import { Table } from 'antd';
import { isMobile } from 'react-device-detect';

const OgpaTables = ({ values }) => {
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
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
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
        },
    ];

    const data = values.map(value => {
        
        return isMobile ? {
            key: value._id,
            data: 
                <>
                    <b>Name:</b> {value.name}<br />
                    <b>Email:</b> {value.email}<br />
                    <b>Product:</b> {value.product ? value.product : "OGPA Program"}<br />
                    <b>Amount:</b> {value.amount}<br />
                    <b>Commission:</b> {value.commission}<br />
                    <b>Status:</b> {value.status}<br />
                </>
            ,
        } : {
            key: value._id,
            name: value.name,
            email: value.email,
            product: value.product ? value.product : "OGPA Program",
            amount: value.amount || value.monthlyAmount,
            commission: value.commission,
            status: value.status
        }
    })
    
    return ( <Table columns={columns} dataSource={data} /> );
}
 
export default OgpaTables;