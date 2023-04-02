import React, {useState} from 'react'
import { Layout, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { useNavigate } from "react-router-dom";

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import Dashboard from '../components/Dashboard';
import EarningTable from '../components/EarningTable';
import ReferralTable from '../components/ReferralTable';

const initialState = {
    userid: "",
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Home = () => {
    const navigate = useNavigate();
    const pathToRedirect = sessionStorage.getItem("pathToRedirect");

    if (pathToRedirect) {
        navigate(pathToRedirect, { replace: true });
    }

    const [dashboard, setDashboard] = useState(initialState);
    const [tabMenu, setTabMenu] = useState(1);
    const [noRegBonus, setnoRegBonus] = useState(false);
    const [noMessenger, setNoMessenger] = useState(false);
    
    const tabs = {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        width: 120,
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }

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
                    {noMessenger && <p style={{ color: "red", border: "1px solid red", width: isMobile ? "100%" : 650 }}>
                        We already sent your registration bonus to your email address. Kindly locate it in your email's inbox or on its spam folder. The subject is "Welcome to Clavstore University" and the sender is admin@clavstore.com
                    </p>}
                    <Button
                        type="default"
                        htmlType="submit"
                        style={{
                            width: isMobile ? "100%" : 650,
                            height: 40,
                            fontSize: 16,
                            marginBottom: 30
                        }}
                        onClick={() => setNoMessenger(true)}
                    >
                        I don't have a messenger
                    </Button>
                </div>}
                <div style={{borderBottom: "1px solid #aaa"}}>
                    <div style={{...tabs, backgroundColor: tabMenu === 1 ? "#fff" : "#eee"}} onClick={() => setTabMenu(1)}>Earnings</div>
                    <div style={{...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 2 ? "#fff" : "#eee"}} onClick={() => setTabMenu(2)}>Referrals</div>
                    <div style={{clear: "both"}}></div>
                </div>
                <br />
                {tabMenu === 1 && <EarningTable setnoRegBonus={setnoRegBonus} />}
                {tabMenu === 2 && <ReferralTable />}
            </div>

            <MainFooter />
        </Layout>
    );
}
 
export default Home;