import React from 'react'
import { Table } from 'antd';
import { isMobile } from 'react-device-detect';

const FreeTables = ({ values }) => {
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
        }
    ];

    const data = values.map(value => {
        const date = new Date(value.createdAt);
        
        return isMobile ? {
            key: value._id,
            data: 
                <>
                    <b>Name:</b> {value.name}<br />
                    <b>Email:</b> {value.email}<br />
                    <b>Date Registered:</b> {date.toDateString()}<br />
                </>
            ,
        } : {
            key: value._id,
            name: value.name,
            email: value.email,
            date: date.toDateString(),
        }
    })
    
    return ( <Table columns={columns} dataSource={data} /> );
}
 
export default FreeTables;