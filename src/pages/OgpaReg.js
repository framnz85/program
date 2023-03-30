import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate  } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

import TimerHeader from '../components/TimerHeader';

const Sarisari = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/sarisari.jpg";

const initialState = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    mobile: "",
    paymentType: "",
    payment: "",
    finalAmount: 0,
    monthlyAmount: 0
}

const OgpaReg = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);

    const [bodyStyle, setBodyStyle] = useState({ backgroundImage: `url(${Sarisari})` });
    const [values, setValues] = useState(initialState);
    const [dayreg, setDayreg] = useState(0);
    const [mcid, setMcid] = useState(0);
    const [timer, setTimer] = useState({
        days: 0, hours: 0, minutes: 0, seconds:0
    });
    const [extend, setExtend] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [earlyDiscount, setEarlyDiscount] = useState("");

    useEffect(() => {
        const d = new Date();
        setDayreg(d.getDay());
        
        setBodyStyle({ ...bodyStyle, height: document.body.scrollHeight });

        if (localStorage.getItem("ogpaUser")) {
            setValues(JSON.parse(localStorage.getItem("ogpaUser")));
        }
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
        getOgpaDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getOgpaDetails = async () => {
        const ogpa = await axios.get(process.env.REACT_APP_API + "/ogpa");
        if (ogpa.data.err) {
            toast.error(ogpa.data.err);
        } else {
            setExtend(ogpa.data.extend)
            setStartDate(ogpa.data.startDate);
            setEarlyDiscount(ogpa.data.earlyDiscount);
        }
    }

    return (
        <div style={bodyStyle}>
            {extend > 0 && <TimerHeader
                title="Time left to finish registration..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={() => ""}
                setSpotLeft={() => ""}
                startDate={startDate}
                earlyDiscount={earlyDiscount}
            />}
            {extend === 0 && <TimerHeader
                title="Time left to finish registration..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={() => ""}
                setSpotLeft={() => ""}
                startDate={startDate}
                earlyDiscount={earlyDiscount}
            />}
            <div align="center" style={{padding: isMobile ? "10px" : "20px"}}>
                <div align="center" style={{ backgroundColor: "#fff", width: isMobile ? "100%" : 1200, marginTop: 20, padding: 30, fontSize: 18, borderRadius: 8 }}>
                    <h3>Check the Details below.If all are correct, click "Continue"</h3><br />
                    <form method="post" className="af-form-wrapper" acceptCharset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl"  >
                        <div style={{display: "none"}}>
                            <input type="hidden" name="meta_web_form_id" value="1976232716" />
                            <input type="hidden" name="meta_split_id" value="" />
                            <input type="hidden" name="listname" value="awlist5388676" />
                            <input type="hidden" name="redirect" value={`https://ogt.clavstore.com/ogpapay${"?ogpaem=" + values.email}${mcid ? "&mcid=" + mcid : ""}`} id="redirect_f3e90645348cbc8a0e9cecd03a97685c" />
                            <input type="hidden" name="meta_redirect_onlist" value={`https://ogt.clavstore.com/ogpapay${"?ogpaem=" + values.email}${mcid ? "&mcid=" + mcid : ""}`} />
                            <input type="hidden" name="meta_adtracking" value="OGPA_Workshop_Form_1" />
                            <input type="hidden" name="meta_message" value="1" />
                            <input type="hidden" name="meta_required" value="name,email" />
                        </div>
                        <div id="af-form-1976232716" className="af-form">
                            <div id="af-body-1976232716" className="af-body af-standards">
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114708941">Name: </label>
                                    <div className="af-textWrap">
                                        <input id="awf_field-114708941" type="text" name="name" className="text" value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} tabIndex="500" />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114708942">Email: </label>
                                    <div className="af-textWrap">
                                        <input className="text" id="awf_field-114708942" type="text" name="email" value={values.email} onChange={(e) => setValues({...values, email: e.target.value})} tabIndex="501" />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114795185">Password</label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114795185" className="text" name="custom password" value={values.password} onChange={() => ""} tabIndex="502" />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114708943">Amount:</label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114708943" className="text" name="custom amount" value={values.monthlyAmount} onChange={() => ""} tabIndex="503" readOnly />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-115415439">Cash or Installment:</label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-115415439" className="text" name="custom Cash or Installment" value={values.paymentType} onChange={() => ""} tabIndex="504" /></div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114708944">Payment:</label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114708944" className="text" name="custom payment" value={values.payment} onChange={() => ""} tabIndex="504" readOnly />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114708945">Mobile: (Optional)</label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114708945" className="text" name="custom mobile" value={values.mobile} onChange={(e) => setValues({...values, mobile: e.target.value})} tabIndex="505" />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114710303"></label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114710303" className="text" name="custom dayreg" value={dayreg} tabIndex="505" style={{border: "#fff", color: "#fff", fontSize: "1px", height: 0, padding: 0, margin: 0}} readOnly />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element">
                                    <label className="previewLabel" htmlFor="awf_field-114795190"></label>
                                    <div className="af-textWrap">
                                        <input type="text" id="awf_field-114795190" className="text" name="custom mcid" value={mcid} tabIndex="507" style={{border: "#fff", color: "#fff", fontSize: "1px", height: 0, padding: 0, margin: 0}} readOnly />
                                    </div>
                                    <div className="af-clear"></div>
                                </div>
                                <div className="af-element buttonContainer">
                                    <input name="submit" className="submit" type="submit" value="Continue" tabIndex="505" /><br /><br />
                                    <input name="submit" type="submit" value="Go Back" tabIndex="505" onClick={() => navigate("/p/ogpaform")} />
                                    <div className="af-clear"></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "none" }}>
                            <img src="https://forms.aweber.com/form/displays.htm?id=jJzsbEzMTOyMbA==" alt="" />
                        </div>
                    </form>
                    <br /><br />
                </div>
            </div>
        </div>
    );
}
 
export default OgpaReg;