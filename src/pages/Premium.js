import React, {useState} from 'react'
import { Input, Layout, Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import PremiumUp from "../components/premium/PremiumUp"
import PayInstruction from "../components/premium/PayInstruction"

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Premium = () => {
    const [premium, setPremium] = useState(0);
    const [payment, setPayment] = useState("pal");
    const [dashboard, setDashboard] = useState(initialState);

    return ( 
        <Layout>
            <MainHeader
                defaultKey="5"
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
                <div align="center">
                    <h2>Premium Clavstore University Account</h2><br />
                    <h5><span style={{color: "green"}}>✔</span> Upgrading to Premium Account will give you a dedicated Domain Name for your Affiliate or Referral Links.</h5><br />
                    <Input.Group compact>
                        <Tooltip>
                            <Button icon={<CheckOutlined />} style={{color: "green"}} />
                        </Tooltip>
                        <Input
                            style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                            defaultValue={`https://{your-domain-name}.com/{your-affiliate-referral-links}`}
                            disabled={true}
                        />
                    </Input.Group><br />
                    <Input.Group compact style={{marginBottom: 5}}>
                        <Tooltip>
                            <Button icon={<CloseOutlined />} style={{color: "red"}} />
                        </Tooltip>
                        <Input
                            style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                            defaultValue={`https://program.clavmall.com/{your-affiliate-referral-links}`}
                            disabled={true}
                        />
                    </Input.Group>
                    <Input.Group compact style={{marginBottom: 5}}>
                        <Tooltip>
                            <Button icon={<CloseOutlined />} style={{color: "red"}} />
                        </Tooltip>
                        <Input
                            style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                            defaultValue={`https://program.etnants.com/{your-affiliate-referral-links}`}
                            disabled={true}
                        />
                    </Input.Group>
                    <Input.Group compact>
                        <Tooltip>
                            <Button icon={<CloseOutlined />} style={{color: "red"}} />
                        </Tooltip>
                        <Input
                            style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                            defaultValue={`https://program.clavstore.com/{your-affiliate-referral-links}`}
                            disabled={true}
                        />
                    </Input.Group><br /><br /><h5><span style={{ color: "green" }}>✔</span> Premium Account also increases your Recruitment Reward from ₱1.00 to ₱3.00 per invite.</h5><br />
                    <img
                        alt="Recruitment Reward"
                        src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/recreuitreward.jpg"}
                        style={{width: isMobile ? "100%" : "auto"}}
                    /><br /><br />
                    <h5><span style={{color: "green"}}>✔</span> Your will also receive Level 2 Commission everytime your referral purchase any of our Programs.</h5><br /><br />
                    {premium === 0 && <PremiumUp
                        setPremium={setPremium}
                        payment={payment}
                        setPayment={setPayment}
                    />}
                    {premium === 1 && <PayInstruction payment={payment} setPayment={setPayment} setPremium={setPremium} />}
                    {premium > 1 && 
                        <div
                            style={{
                                maxWidth: 650,
                                marginTop: 20,
                                color: "#00D100",
                                fontSize: 32,
                                border: "1px solid #00D100",
                                borderRadius: 8,
                                padding: 50
                            }}
                        >
                            You are already in Premium
                        </div>
                    }
                </div>
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default Premium;