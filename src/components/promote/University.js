import React, {useState, useEffect} from 'react'
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pagination, Radio } from 'antd';

import PromoteCard from '../card/PromoteCard';

const initialState = {
    progid: "640c65d68d23ede1246298dd",
    pageSize: 8,
    current: 1,
    sortkey: "item",
    sort: 1,
    total: 0,
    type: "all"
}

const University = () => {
    const [promote, setPromote] = useState([]);
    const [showPage, setShowPage] = useState(initialState);

    useEffect(() => {
        fetchPromote(showPage.current, showPage.pageSize, showPage.type);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchPromote = async (page, pageSize, type) => {
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/promote",
            { ...showPage, pageSize, current: page, type },
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
            })
        }
    }
    return ( 
        <>
            <div align="center" style={{ marginTop: 20 }}>
                <Radio.Group
                    onChange={
                        e => fetchPromote(showPage.page, showPage.pageSize, e.target.value)
                    }
                    value={showPage.type}
                >
                    <Radio value={"all"}>All</Radio>
                    <Radio value={"image"}>Images</Radio>
                    <Radio value={"video"}>Videos</Radio>
                    <Radio value={"training"}>Trainings</Radio>
                </Radio.Group><br /><br />
                
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
                    prom ? <PromoteCard key={prom._id ? prom._id : ""} prom={prom} type={showPage.type} /> : {}
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
 
export default University;