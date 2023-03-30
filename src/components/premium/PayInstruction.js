import React, {useState, useEffect} from 'react'
import { Radio } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const Paypal = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/paypal.png";
const BDO = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bdo.png";
const BPI = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bpi.png";
const Unionbank = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/union.png";
const Gcash = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/gcash.png";
const Maya = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/maya.png";

const PayInstruction = ({payment, setPayment, setPremium}) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const paypalClientId = "ATy4_rfmeiT3mEPwjPOHoUFbNA_ZSsqGT9BvtkFkMW4io40J4kdX0NQpYM9YdSWXmawnKufvTNaEuuOg";
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setAmount(payment === "pal" ? 120 : 5990);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = async (e) => {
        setPayment(e.target.value);
        setAmount(e.target.value === "pal" ? 120 : 5990);
    };

    const handleApprove = async (sellerTxnID) => {
        const billingHistory = sessionUser.billingHistory ? sessionUser.billingHistory : [];
        if (sellerTxnID) {
            setSuccess(true);
            const newBillingHistory = billingHistory.map(bill => {
                return bill.payStatus === "pending" ? { ...bill, subscriptionID: sellerTxnID } : bill
            });
            const updateUser = await axios.put(
                process.env.REACT_APP_API + "/university/update-user",
                { premium: 2, billingHistory: newBillingHistory },
                {
                    headers: {
                        authToken: token,
                    },
                }
            );
            if (updateUser.data.err) {
                toast.error(updateUser.data.err);
            } else {
                sessionStorage.setItem("programUser", JSON.stringify({ ...sessionUser, premium: 2, billingHistory: newBillingHistory }));
                localStorage.setItem("programUser", JSON.stringify({ ...sessionUser, premium: 2, billingHistory: newBillingHistory }));
                setPremium(2);
            }
        }
    };

    return ( 
        <>
            <div
                align="center"
                style={{
                    padding: 20,
                    border: "1px solid red",
                    borderRadius: 8,
                    maxWidth: isMobile ? "90%" : 850
                }}
            >
                <h5>Pending Upgrade... Please send you payment by following these instructions:</h5>

                <div align="center" style={{ marginTop: 20, fontSize: 18, borderRadius: 8 }}>
                    <h3>Choose Payment Below</h3>
                    <span style={{ color: "#f00", fontSize: 24 }}>
                        Total Amount to Pay Now: <b>{payment === "pal" ? "$" : "₱"}{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
                        {payment !== "pal" && <h6>
                            WARNING: Send your payments only to the Account Number and Account Name shown below.
                            We are not liable if payment are not sent directly to our accounts.
                        </h6>}
                    </span><br /><br />
                    <Radio.Group onChange={onChange} value={payment && payment.toString()}>
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
                                Unionbak Deposit or Online
                            </Radio.Button>
                            <Radio.Button value="gca" style={{ height: 80 }}>
                                <img src={Gcash} width="100" height="50" alt="Gcash Payment" /><br />
                                Gcash Send
                            </Radio.Button>
                            <Radio.Button value="may" style={{ height: 80 }}>
                                <img src={Maya} width="100" height="50" alt="Maya Payment" /><br />
                                Maya Send Money
                            </Radio.Button>
                    </Radio.Group><br /><br />
                    {payment === "pal" && !success &&
                        <PayPalScriptProvider options={{ "client-id": paypalClientId, currency: "USD", }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                description: "Payment for OGPA Workshop - email: " + sessionUser.email,
                                                amount: {
                                                    value: Number(amount).toFixed(2)
                                                }
                                            }
                                        ]
                                    })
                                }}
                                onApprove={async (data, actions) => {
                                    const order = await actions.order.capture();
                                    handleApprove(order.purchase_units[0].payments.captures[0].id);
                                }}
                                onError={(err) => {
                                    toast.error(err);
                                }}
                            />
                        </PayPalScriptProvider>
                    }
                    {payment === "pal" && success &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <h2 style={{color:"green"}}>Success!!! Thank you for your Payment.</h2>
                                Please notify us together with your email registered <b>{sessionUser.email}</b> that you have paid the workshop by emailing us at davgros.85@gmail.com or chat us on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a> so we can approve your registration.
                            </div><br />
                        </div>
                    }
                    {payment === "bdo" &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <b>Here's how to Pay:</b><br/>
                            Send your payments by going to the nearest BDO branch or by transferring thru your BDO Online Banking and by using the details below: <br /><br/>
                            <div align="center">
                                <b>Account Number:</b> 006760032739<br/>
                                <b>Account Name:</b> Francis John Clavano<br/>
                                <b>Amount:</b> ₱{amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <br /><br/>
                                After sending the payment, send the screenshot of your Payment Receipt together with the email address you registered here <b>{sessionUser.email}</b> to davgros.85@gmail.com or chat it on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a>.
                            </div><br />
                        </div>
                    }
                    {payment === "bpi" &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <b>Here's how to Pay:</b><br/>
                            Send your payments by going to the nearest BPI branch or by transferring thru your BPI Online Banking and by using the details below: <br /><br/>
                            <div align="center">
                                <b>Account Number:</b> 2149704874<br/>
                                <b>Account Name:</b> Francis John Clavano<br/>
                                <b>Amount:</b> ₱{amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <br /><br/>
                                After sending the payment, send the screenshot of your Payment Receipt together with the email address you registered here <b>{sessionUser.email}</b> to davgros.85@gmail.com or chat it on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a>.
                            </div><br />
                        </div>
                    }
                    {payment === "uni" &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <b>Here's how to Pay:</b><br/>
                            Send your payments by going to the nearest Unionbank branch or by transferring thru your Unionbank Online Banking and by using the details below: <br /><br/>
                            <div align="center">
                                <b>Account Number:</b> 109430284113<br/>
                                <b>Account Name:</b> Francis John Clavano<br/>
                                <b>Amount:</b> ₱{amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <br /><br/>
                                After sending the payment, send the screenshot of your Payment Receipt together with the email address you registered here <b>{sessionUser.email}</b> to davgros.85@gmail.com or chat it on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a>.
                            </div><br />
                        </div>
                    }
                    {payment === "gca" &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <b>Here's how to Pay:</b><br/>
                            Send your payments by logging in to your Gcash App and choose Send. Then provide the details below: <br /><br/>
                            <div align="center">
                                <b>Account/Mobile Number:</b> 09778557778<br/>
                                <b>Account Name:</b> Francis John Clavano<br/>
                                <b>Amount:</b> ₱{amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <br /><br/>
                                After sending the payment, send the screenshot of your Payment Receipt together with the email address you registered here <b>{sessionUser.email}</b> to davgros.85@gmail.com or chat it on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a>.
                            </div><br />
                        </div>
                    }
                    {payment === "may" &&
                        <div>
                            <div align="center" className="alert alert-success" role="alert">
                            <b>Here's how to Pay:</b><br/>
                            Send your payments by logging in to your Maya App and choose Send money. Then provide the details below: <br /><br/>
                            <div align="center">
                                <b>Account/Mobile Number:</b> 09778557778<br/>
                                <b>Account Name:</b> Francis John Clavano<br/>
                                <b>Amount:</b> ₱{amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <br /><br/>
                                After sending the payment, send the screenshot of your Payment Receipt together with the email address you registered here <b>{sessionUser.email}</b> to davgros.85@gmail.com or chat it on my <a href="https://www.facebook.com/francisjohn.clavano" target="_blank" rel="noreferrer">FB Account "Francis Clavano"</a>.
                            </div><br />
                        </div>
                    }
                </div>
            </div>
        </>
     );
}
 
export default PayInstruction;