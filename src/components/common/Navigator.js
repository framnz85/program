import React from 'react'
import { isMobile } from 'react-device-detect';
import { Badge } from 'antd';

const Navigator = ({tabMenu, setTabMenu, tabData, width}) => {
    const tabs = isMobile ? {
        width: "25%",
        textAlign: "center"
    } : {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        width,
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }
    return ( 
        <>
            <div style={{ borderBottom: isMobile ? "1px solid #ddd" : "1px solid #aaa", display: "flex", }}>

                {tabData.map(tab => <div
                    key={tab.key}
                    style={{
                        ...tabs,
                        backgroundColor: tabMenu === tab.key ? "#fff" : isMobile ? "#fff" : "#eee",
                        borderRight: tabData.length > tab.key ? "none" : isMobile ? "none" : "1px solid #aaa",
                        borderBottom: tabMenu === tab.key ? isMobile ? "1px solid #999" : "none" : "none",
                    }}
                    onClick={() => setTabMenu(tab.key)}
                >
                    {tab.badge > 0 ? <Badge count={tab.badge} style={{right: -15}}>
                        {tab.title}
                    </Badge> : tab.title}
                </div>)}
                <div style={{clear: "both"}}></div>
            </div>
        </>
     );
}
 
export default Navigator;