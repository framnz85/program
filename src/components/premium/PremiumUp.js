import React, {useState, useEffect} from 'react'
import { Button, Modal, Radio, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const Paypal = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/paypal.png";
const BDO = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bdo.png";
const BPI = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bpi.png";
const Unionbank = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/union.png";
const Gcash = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/gcash.png";
const Maya = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/maya.png";

const paymentAmount = [
    {desc: "pal", amount: "$120"},
    {desc: "bdo", amount: "P5990"},
    {desc: "bpi", amount: "P5990"},
    {desc: "uni", amount: "P5990"},
    {desc: "gca", amount: "P5990"},
    {desc: "may", amount: "P5990"},
]

const PremiumUp = ({setPremium, payment, setPayment}) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [amountTxt, setAmountTxt] = useState("$120");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [domainName, setDomainName] = useState("");
    const [domainAvail, setDomainAvail] = useState(false);

    useEffect(() => {
        setPremium(sessionUser.premium ? sessionUser.premium : 0);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        if (domainAvail) {
            const billingHistory = sessionUser.billingHistory ? sessionUser.billingHistory : [];
                
            billingHistory.push({
                productName: "1 Yr Premium",
                totalPrice: amountTxt,
                payment,
                payStatus: "pending",
                duration: 365,
                domainName,
            });
    
            const updateUser = await axios.put(
                process.env.REACT_APP_API + "/university/update-user",
                { premium: 1, billingHistory },
                {
                    headers: {
                        authToken: token,
                    },
                }
            );
            if (updateUser.data.err) {
                toast.error(updateUser.data.err);
            } else {
                sessionStorage.setItem("programUser", JSON.stringify({ ...sessionUser, premium: 1, billingHistory }));
                setPremium(1);
            }
            setIsModalOpen(false);
        } else {
            toast.error("You have to place a Domain Name and have it check for availability");
        }
    };

    const handleOnChange = (e) => {
        const amount = paymentAmount.filter(pay => pay.desc === e.target.value)
        setPayment(e.target.value);
        setAmountTxt(amount[0].amount)
    }

    const checkDomainAvail = async () => {
        if(domainName){
            const apiKey = 'at_pjYcT47ufIQtIueFjzIn8uUKY95mE';
            const url = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=' + apiKey + '&domainName=' + domainName;
            await axios.get(url).then((response) => {
                const available = response.data.DomainInfo.domainAvailability;
                if (available === "UNAVAILABLE") {
                    setDomainAvail(false);
                    toast.error(`Sorry, ${domainName} is not availble`);
                } else {
                    setDomainAvail(true);
                    toast.success(`Yes! ${domainName} is available`);
                }
                }
            ).catch(error => {
                setDomainAvail(false);
                toast.error(error.message);
            });
        } else {
            setDomainAvail(false);
            toast.error("Enter a Domain Name")
        }
    }

    return ( 
        <>
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
                onClick={() => setIsModalOpen(true)}
            >
                Upgrade To Premium
            </Button><br /><br />
            <h5>Only $120/yr or Php 5,990/yr</h5>

            <Modal
                title="Upgrade To Premium?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Upgrade"
            >
                <div align="center" style={{ padding: 20 }}>
                    <h5>Enter your choosen Domain Name</h5>
                    <Input
                        onChange={(e) => setDomainName(e.target.value)}
                        value={domainName}
                        placeholder="Enter a Domain Name"
                    /><br /><br />
                    <button type="button" className="btn-danger" onClick={() => checkDomainAvail()}>
                        Check Domain Availability
                    </button><br /><br />

                    <h5>Choose a Payment Below</h5>
                    <p style={{color: "red"}}>Total Amount: {amountTxt}</p>
                    <Radio.Group onChange={handleOnChange} defaultValue={payment}>
                        <Radio.Button value="pal" style={{ height: 80 }}>
                            <img src={Paypal} width="100" height="50" alt="Card Payment or Paypal" /><br />
                            Credit / Debit Card
                        </Radio.Button>
                        <Radio.Button value="bdo" style={{ height: 80 }}>
                            <img src={BDO} width="100" height="50" alt="BDO Payment" /><br />
                            BDO Deposit or Online
                        </Radio.Button>
                        <Radio.Button value="bpi" style={{ height: 80 }}>
                            <img src={BPI} width="100" height="50" alt="BPI Payment" /><br />
                            BPI Deposit or Online
                        </Radio.Button>
                        <Radio.Button value="uni" style={{ height: 80 }}>
                            <img src={Unionbank} width="100" height="50" alt="Unionbank Payment" /><br />
                            Unionbank Deposit or Online
                        </Radio.Button>
                        <Radio.Button value="gca" style={{ height: 80 }}>
                            <img src={Gcash} width="100" height="50" alt="Gcash Payment" /><br />
                            Gcash Send
                        </Radio.Button>
                        <Radio.Button value="may" style={{ height: 80 }}>
                            <img src={Maya} width="100" height="50" alt="Maya Payment" /><br />
                            Maya Send Money
                        </Radio.Button>
                    </Radio.Group>
                    <br />
                </div>
            </Modal>
        </>
     );
}
 
export default PremiumUp;