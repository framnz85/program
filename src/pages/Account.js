import React, {useState} from 'react'
import { Layout } from 'antd';

import MainHeader from '../components/common/MainHeader';
import Navigator from '../components/common/Navigator';
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
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    
    const [tabMenu, setTabMenu] = useState(1);
    const [dashboard, setDashboard] = useState(initialState);

    const tabData = [
        {key: 1, title: "Profile"},
        {key: 2, title: "Security"},
        {key: 3, title: "Withdraw"}
    ]

    return ( 
        <Layout>
            <MainHeader
                defaultKey="1"
                dashboard={dashboard}
                setDashboard={setDashboard}
            />
                
            {token && <div
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10
                }}
            >
                <Navigator
                    tabMenu={tabMenu}
                    setTabMenu={setTabMenu}
                    tabData={tabData}
                    width={120}
                />

                {tabMenu === 1 && <Profile />}
                {tabMenu === 2 && <Security />}
                {tabMenu === 3 && <Withdraw dashboard={dashboard} />}
            </div>}
        </Layout>
     );
}
 
export default Account;