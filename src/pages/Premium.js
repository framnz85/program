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
                pathname={"/premium"}
            />
            <div
                align="center"
                style={{
                    padding: isMobile ? 10 : 24,
                    backgroundColor: "#bbbbbb",
                    marginTop: 10
                }}
            >
                <div align="center" style={{
                    backgroundColor: "#ffffff",
                    width: isMobile ? "100%" : 950,
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20
                }}>
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
                    </Input.Group>Ex. https://francisjohnclavano.com/refid=123456789abcdef<br /><br />
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
                    </Input.Group>
                </div>
                <div align="center" style={{
                    backgroundColor: "#ffffff",
                    width: isMobile ? "100%" : 950,
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20
                }}>
                    <h5><span style={{color: "green"}}>✔</span> Instantly earn Patronage Refund worth Php3,000 reflected directly into your dashboard.</h5>
                </div>
                <div align="center" style={{
                    backgroundColor: "#ffffff",
                    width: isMobile ? "100%" : 950,
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20
                }}>
                    <h5><span style={{ color: "green" }}>✔</span> Premium Account also increases your Login, Post, and Recruitment Reward per invite.</h5><br />
                    <img
                        alt="Login Reward"
                        src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/loginrewardpremium.jpg"}
                        style={{width: isMobile ? "100%" : "auto"}}
                    /><br />
                    <img
                        alt="Post Reward"
                        src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/postrewardpremium.jpg"}
                        style={{width: isMobile ? "100%" : "auto"}}
                    /><br />
                    <img
                        alt="Recruitment Reward"
                        src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/recreuitreward.jpg"}
                        style={{width: isMobile ? "100%" : "auto"}}
                    />
                </div>
                <div align="center" style={{
                    backgroundColor: "#ffffff",
                    width: isMobile ? "100%" : 950,
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20
                }}>
                    <h5><span style={{color: "green"}}>✔</span> You will also receive Level 2 Commission everytime your referral purchase any of our Programs.</h5>
                </div>
                <div align="center" style={{
                    backgroundColor: "#ffffff",
                    width: isMobile ? "100%" : 950,
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20
                }}>                    
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