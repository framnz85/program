import React, {useState, useEffect} from 'react'
import { Button, Input } from 'antd';
import { isMobile } from 'react-device-detect';

import RegisterExist from './premium/RegisterExist';

const Premium = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));

    const [premium, setPremium] = useState(false);

    useEffect(() => {
        setPremium(sessionUser.premiumProgUsed);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return ( 
        <div style={{display: isMobile ? "block" : "flex", justifyContent: "space-evenly"}}>
            <div align="left" style={{maxWidth:"50%"}}>
                <h2>Premium Clavstore Program Links</h2>
                If referral upgrade to Premium Clavstore Program, you will earn Php 1000/yr<br /><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                        defaultValue={`https://{your-domain-name}.com/program`}
                        disabled={true}
                    />
                </Input.Group><br /><br />
                <h2>OGPA Program Sales Page</h2>
                If referral enroll to OGPA Program and you are in Premium, you will earn Php 3000 and 10% Of Monthly Subscription<br />
                If referral enroll to OGPA Program and you are also enrolled to OGPA Program, you will earn Php 6000 and 20% Of Monthly Subscription<br /><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                        defaultValue={`https://{your-domain-name}.com/ogpa`}
                        disabled={true}
                    />
                </Input.Group><br /><br /><br /><br />
                <h2>OGPA Program Registration</h2>
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520, backgroundColor: "#ffffff", color: "#333333" }}
                        defaultValue={`https://{your-domain-name}.com/ogpaform`}
                        disabled={true}
                    />
                </Input.Group><br /><br /><br />
            </div>
            <div align="center" style={{marginLeft: isMobile ? 0 : 40}}>
                <h4>Upgrade to Premium and have a Domain Name for your links</h4><br />

                <Button
                    type="primary"
                    size="large"
                    style={{
                        background: "red",
                        height: 70,
                        fontSize: 24,
                        paddingLeft: 40,
                        paddingRight: 40
                    }}
                    onClick={() => ""}
                >
                    Upgrade To Premium
                </Button><br /><br />
                <h5>Only Php 3,990/yr</h5>
            
                {!premium && <RegisterExist setPremium={setPremium} />}
            </div>
        </div>
     );
}
 
export default Premium;