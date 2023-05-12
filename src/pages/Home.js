import React, {useState} from 'react'
import { Layout, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { useNavigate } from "react-router-dom";

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import Navigator from '../components/common/Navigator';
import Dashboard from '../components/home/Dashboard';
import EarningTable from '../components/home/EarningTable';
import ReferralTable from '../components/home/ReferralTable';
import LoginRewardTable from '../components/home/LoginRewardTable';
import PostRewardTable from '../components/home/PostRewardTable';

const initialState = {
    userid: "",
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Home = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const pathToRedirect = sessionStorage.getItem("pathToRedirect");
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));

    if (pathToRedirect) {
        navigate(pathToRedirect, { replace: true });
    }

    const [dashboard, setDashboard] = useState(initialState);
    const [tabMenu, setTabMenu] = useState(queryParams.get("tab") ? parseInt(queryParams.get("tab")) : 1);
    const [noRegBonus, setnoRegBonus] = useState(false);
    // const [noMessenger, setNoMessenger] = useState(false);

    const tabData = [
        {key: 1, title: "Earnings"},
        {key: 2, title: "Referrals"},
        {key: 3, title: "Login"},
        {key: 4, title: "Post"}
    ]

    return (
        <Layout>
            <MainHeader
                defaultKey="2"
                noRegBonus={noRegBonus}
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
                <Dashboard dashboard={dashboard} />
                <br />
                {noRegBonus && <div align="center">
                    <h4>Welcome to Clavstore University</h4><br />
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: isMobile ? "100%" : 650,
                            height: isMobile ? 70 : 80,
                            fontSize: isMobile ? 18 : 24,
                            marginBottom: 30,
                            backgroundColor: "red"
                        }}
                        onClick={() => window.open('https://m.me/clavstoreuniversity?ref=reward--' + dashboard.userid, '_blank', 'noopener,noreferrer')}
                    >
                        Claim Your 750 Pesos Bonus Here<br />
                        <h6>(Sent via Messenger)</h6>
                    </Button><br />
                    {/* {noMessenger && <p style={{ color: "red", border: "1px solid red", width: isMobile ? "100%" : 650 }}>
                        We already sent your registration bonus to your email address. Kindly locate it in your email's inbox or on its spam folder. The subject is "Welcome to Clavstore University" and the sender is admin@clavstore.com
                    </p>} */}
                    <Button
                        type="default"
                        htmlType="submit"
                        style={{
                            width: isMobile ? "100%" : 650,
                            height: isMobile ? 70 : 80,
                            fontSize: isMobile ? 18 : 24,
                            marginBottom: 30
                        }}
                        onClick={() => window.open('/claim.html?name=' + encodeURI(sessionUser.name) + '&email=' + sessionUser.email, '_blank', 'noopener,noreferrer')}
                    >
                        Claim 750 Thru Email Here
                    </Button>
                </div>}
                <Navigator
                    tabMenu={tabMenu}
                    setTabMenu={setTabMenu}
                    tabData={tabData}
                    width={120}
                />
                <br />
                {tabMenu === 1 && <EarningTable setnoRegBonus={setnoRegBonus} setTabMenu={setTabMenu} />}
                {tabMenu === 2 && <ReferralTable />}
                {tabMenu === 3 && <LoginRewardTable />}
                {tabMenu === 4 && <PostRewardTable />}
            </div>

            <MainFooter setTabMenu={setTabMenu} />
        </Layout>
    );
}
 
export default Home;