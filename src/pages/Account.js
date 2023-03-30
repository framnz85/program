import React, {useState} from 'react'
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';

import MainHeader from '../components/common/MainHeader';
import Profile from '../components/account/Profile';
import Security from '../components/account/Security';
import Withdraw from '../components/account/Withdraw';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Account = () => {
    const [tabMenu, setTabMenu] = useState(1);
    const [dashboard, setDashboard] = useState(initialState);

    const tabs = {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        width: isMobile ? 95 : 120,
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }

    return ( 
        <Layout>
            <MainHeader
                defaultKey="1"
                dashboard={dashboard}
                setDashboard={setDashboard}
            />
                
            <div
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10
                }}
            >
                <div style={{borderBottom: "1px solid #aaa"}}>
                    <div style={{...tabs, backgroundColor: tabMenu === 1 ? "#fff" : "#eee"}} onClick={() => setTabMenu(1)}>Profile</div>
                    <div style={{...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 2 ? "#fff" : "#eee"}} onClick={() => setTabMenu(2)}>Security</div>
                    <div style={{...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 3 ? "#fff" : "#eee"}} onClick={() => setTabMenu(3)}>Withdraw</div>
                    <div style={{clear: "both"}}></div>
                </div>

                {tabMenu === 1 && <Profile />}
                {tabMenu === 2 && <Security />}
                {tabMenu === 3 && <Withdraw dashboard={dashboard} />}
            </div>
        </Layout>
     );
}
 
export default Account;