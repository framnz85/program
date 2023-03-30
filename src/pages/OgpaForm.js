import React, { useState, useEffect } from 'react';
import {
    MailOutlined,
    KeyOutlined,
    UserOutlined,
    RightCircleOutlined,
    WalletOutlined,
    MobileOutlined
} from '@ant-design/icons';
import { Input, Space, Form, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import Joi from "joi-browser";
import { isMobile } from 'react-device-detect';

import TimerHeader from '../components/TimerHeader';

const Sarisari = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/sarisari.jpg";
const Paypal = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/paypal.png";
const BDO = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bdo.png";
const BPI = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bpi.png";
const Unionbank = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/union.png";
const Gcash = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/gcash.png";
const Maya = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/maya.png";

const OgpaForm = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);

    const initialState = {
        amount: {
            cashAmount: 0,
            installAmount: 0,
            monthlyPay: 0,
            startDate: "",
            earlyDiscount: "",
        },
        name: "",
        email: "",
        password: "",
        repassword: "",
        mobile: "",
        paymentType: "cash",
        payment: "",
        finalAmount: 0,
        monthlyAmount: 0
    }

    const [bodyStyle, setBodyStyle] = useState({ backgroundImage: `url(${Sarisari})` });
    const [values, setValues] = useState(initialState);
    const [mcid, setMcid] = useState(0);
    const [refid, setRefid] = useState("");
    const [timer, setTimer] = useState({
        days: 0, hours: 0, minutes: 0, seconds:0
    });
    const [extend, setExtend] = useState(0);
    const [spotLeft, setSpotLeft] = useState(0);

    useEffect(() => {
        setBodyStyle({ ...bodyStyle, height: document.body.scrollHeight });
        getOgpaDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const mcidExist = queryParams.get("mcid");
        if (mcidExist) {
            setMcid(mcidExist);
            localStorage.setItem("mcid", mcidExist);
        } else {
            if (localStorage.getItem("mcid")) {
                setMcid(localStorage.getItem("mcid"));
            } else {
                setMcid(0);
                localStorage.removeItem("mcid");
            }
        }
        if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
            const isRefid = queryParams.get("refid");
            if (isRefid && isRefid !== "null") {
                localStorage.setItem("refid", isRefid);
                setRefid(isRefid);
            }
        } else {
            setRefid(localStorage.getItem("refid"));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getOgpaDetails = async () => {
        const ogpa = await axios.get(process.env.REACT_APP_API + "/ogpa");
        if (ogpa.data.err) {
            toast.error(ogpa.data.err);
        } else {
            setValues({
                ...values,
                amount: {
                    cashAmount: ogpa.data.cashAmount,
                    installAmount: ogpa.data.installAmount,
                    monthlyPay: ogpa.data.monthlyPay,
                    startDate: ogpa.data.startDate,
                    earlyDiscount: ogpa.data.earlyDiscount,
                },
                finalAmount: ogpa.data.cashAmount,
                monthlyAmount: ogpa.data.cashAmount
            });
            setExtend(ogpa.data.extend)
        }
    }

    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).max(32).required(),
        paymentType: Joi.string().required(),
        payment: Joi.string().required().error(() => {
            return {
                message: 'You need to Choose a Payment first',
                };
            }
        ),
        finalAmount: Joi.number().required(),
        monthlyAmount: Joi.number().required()
    };

    const handleSubmit = async () => {
        const forSubmit = { ...values };

        if (forSubmit.password !== forSubmit.repassword)
            return toast.error("Password does not match");
            
        delete forSubmit.repassword;
        delete forSubmit.mobile;
        delete forSubmit.amount;

        const validate = Joi.validate(forSubmit, schema, {
            abortEarly: false,
        });

        if (validate.error) {
            for (let item of validate.error.details) toast.error(item.message);
            return;
        }

        delete values.repassword;
        delete values.amount;

        const newOgpa = await axios.post(process.env.REACT_APP_API + "/ogt/ogpa-new", {...values, refid, afftype: "non-ogpa", commission: 1000});

        if (newOgpa.data.err) {
            toast.error(newOgpa.data.err);
        } else {
            localStorage.setItem("ogpaUser", JSON.stringify(newOgpa.data));
            navigate(`/p/ogpareg${mcid ? "?mcid=" + mcid : ""}`);
        }

        if(mcid && values.email) {
            const mcemail = await axios.get(process.env.REACT_APP_API + "/manychat-purchase/" + mcid + "/" + values.email);
            if (mcemail) {
                await axios.get(process.env.REACT_APP_API + "/manychat/" + mcid + "/content20221004132940_191845");
            }
        }
    }

    const onChange = (e) => {
        setValues({ ...values, payment: e.target.value });
    };

    return (
        <div style={bodyStyle}>
            {extend > 0 && <TimerHeader
                title="Register as We End in..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={() => ""}
                setSpotLeft={setSpotLeft}
                startDate={values.amount.startDate}
                earlyDiscount={values.amount.earlyDiscount}
            />}
            {extend === 0 && <TimerHeader
                title="Register as We End in..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={() => ""}
                setSpotLeft={setSpotLeft}
                startDate={values.amount.startDate}
                earlyDiscount={values.amount.earlyDiscount}
            />}
            <div align="center" style={{padding: isMobile ? "10px" : "20px"}}>
                <div align="center" style={{ backgroundColor: "#fff", width: isMobile ? "100%" : 1200, marginTop: 20, padding: 30, fontSize: 18, borderRadius: 8 }}>
                    <h2>OGPA Program Registration Form</h2>
                    <h4 style={{color: "red"}}>{spotLeft} Spot Left!!!</h4>
                    <Form onFinish={() => handleSubmit()}>
                        <Space direction="vertical" style={{width: isMobile ? 330 : 480}}>
                            <Input
                                size="large"
                                placeholder="Name"
                                prefix={<UserOutlined />}
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                            />
                            <Input
                                size="large"
                                placeholder="Email"
                                prefix={<MailOutlined />}
                                value={values.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />
                            <Input
                                size="large"
                                placeholder="Amount"
                                prefix={<WalletOutlined />}
                                value={`₱${values.monthlyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                disabled
                            />
                            <Input.Password
                                size="large"
                                placeholder="Password"
                                prefix={<KeyOutlined />}
                                value={values.password}
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                            />
                            <Input.Password
                                size="large"
                                placeholder="Re-type Password"
                                prefix={<KeyOutlined />}
                                value={values.repassword}
                                onChange={(e) => setValues({ ...values, repassword: e.target.value })}
                            />
                            <Input
                                size="large"
                                placeholder="Mobile (Optional)"
                                prefix={<MobileOutlined  />}
                                value={values.mobile}
                                onChange={(e) => setValues({ ...values, mobile: e.target.value })}
                            />
                            <br/>
                        </Space>
                        <h5>Choose if Cash or Installment</h5>
                        <b style={{color: "red"}}>NOTE: Less ₱{(values.amount.installAmount - values.amount.cashAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} if you pay in Cash</b><br /><br />
                        <Radio.Group
                            defaultValue="cash"
                            buttonStyle="solid"
                            size="large"
                            onChange={(e) => setValues({
                                ...values,
                                paymentType: e.target.value,
                                finalAmount: e.target.value === "cash" ? values.amount.cashAmount : values.amount.installAmount,
                                monthlyAmount: e.target.value === "cash" ? values.amount.cashAmount : values.amount.monthlyPay
                            })}
                        >
                            <Radio.Button value="cash">
                                Pay Cash @₱{values.amount && values.amount.cashAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                <span style={{"text-decoration-line": "line-through"}}>(₱{values.amount && values.amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</span>
                            </Radio.Button>
                            <Radio.Button value="install">
                                Installment @₱{values.amount && values.amount.monthlyPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/mo x 3 mo (₱{values.amount && values.amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
                            </Radio.Button>
                        </Radio.Group>
                        <br /><br />
                        <h5>Choose a Payment Below</h5>
                        <Radio.Group onChange={onChange} defaultValue={values.payment}>
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
                            </Radio.Button><br />
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
                        <br /><br />
                        You have been referred by: <b>{refid}</b>
                        <br />
                        <button
                            type="submit"
                            className="btn-primary btn-lg"
                            style={{ fontSize: isMobile ? "18px" : "30px", padding: isMobile ? "15px 40px" : "15px 80px", margin: 30 }}
                        >
                            Proceed To Pay
                            <RightCircleOutlined />
                        </button>
                    </Form>
                </div>
            </div><br /><br />
        </div>
    );
}
 
export default OgpaForm;