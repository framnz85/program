import React, {useState, useEffect} from 'react'
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pagination, Radio, Space, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import PromoteCard from '../card/PromoteCard';

const initialState = {
    progid: "",
    pageSize: 8,
    current: 1,
    sortkey: "item",
    sort: -1,
    total: 0,
    type: "all"
}

const OtherProgs = ({program}) => {
    const [promote, setPromote] = useState([]);
    const [showPage, setShowPage] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPromote(showPage.current, showPage.pageSize, showPage.type);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchPromote = async (page, pageSize, type) => {
        setLoading(true);
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/promote",
            { ...showPage, progid: program._id, pageSize, current: page, type },
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setPromote(result.data.promote);
            setShowPage({
                ...showPage,
                pageSize,
                current: page,
                total: result.data.total,
                type
            });
            setLoading(false);
        }
    }
    return ( 
        <>
            <div align="center" style={{ marginTop: 20 }}>
                {!isMobile && <Space
                    style={{
                    marginBottom: 24,
                    }}
                >
                    <Radio.Group value={showPage.type} onChange={e => fetchPromote(showPage.page, showPage.pageSize, e.target.value)}>
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button value="image">Images (Newsfeeds)</Radio.Button>
                        <Radio.Button value="story">Images (Stories)</Radio.Button>
                        <Radio.Button value="video">Videos (Newsfeeds)</Radio.Button>
                        <Radio.Button value="short">Tiktok, Reels, Shorts</Radio.Button>
                        <Radio.Button value="training">Videos (Training)</Radio.Button>
                    </Radio.Group>
                </Space>}

                {isMobile && <Select
                    defaultValue={showPage.type}
                    style={{
                        width: "100%",
                    }}
                    onChange={value => fetchPromote(showPage.page, showPage.pageSize, value)}
                    options={[
                        {
                            value: 'all',
                            label: 'All',
                        },
                        {
                            value: 'image',
                            label: 'Images (Newsfeeds)',
                        },
                        {
                            value: 'story',
                            label: 'Images (Stories)',
                        },
                        {
                            value: 'video',
                            label: 'Videos (Newsfeeds)',
                        },
                        {
                            value: 'short',
                            label: 'Tiktok, Reels, Shorts',
                        },
                        {
                            value: 'training',
                            label: 'Videos (Training)',
                        },
                    ]}
                />}
                
                
                <div style={{height: 30}}>{loading && <LoadingOutlined />}</div>
                
                <Pagination
                    total={showPage.total}
                    pageSize={showPage.pageSize}
                    current={showPage.current}
                    onChange={(page, pageSize) => fetchPromote(page, pageSize, showPage.type)}
                />
            </div>
            <div
                align="left"
                style={{
                    display: "flex",
                    maxWidth: isMobile ? "100%" : "80%",
                    flexWrap: "wrap",
                    marginTop: 20
                }}
            >
                {promote && promote.sort((a, b) => a.item - b.item).map((prom) => 
                    prom ? <PromoteCard key={prom._id ? prom._id : ""} prom={prom} type={showPage.type} program={program} /> : {}
                )}
            </div>
            <div align="center">
                <Pagination
                    total={showPage.total}
                    pageSize={showPage.pageSize}
                    current={showPage.current}
                    onChange={(page, pageSize) => fetchPromote(page, pageSize, showPage.type)}
                />
            </div>
        </>
    );
}
 
export default OtherProgs;