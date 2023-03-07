import React, { useState, useEffect } from 'react';
import { RightCircleOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import axios from 'axios';

import TimerHeader from '../components/TimerHeader';
import TimerContent from '../components/TimerContent';
import OgpaContent from '../components/OgpaContent';

import Sarisari from "../images/sarisari.jpg";
import PaymentOpt from "../images/paymentopt.png";

const Ogpa = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const vimeoVideo = [
        "00000000", "795169511", "795173110", "794765719", "795184923", "795207013",
        "795209658", "795214761", "795218849", "794767376", "795224341", "795230754",
        "795235044", "794852526", "795140876", "795140919", "795152301", "795152326",
        "795152351"
    ];

    const [bodyStyle, setBodyStyle] = useState({ backgroundImage: `url(${Sarisari})` });
    const [showInitButton, setShowInitButton] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [active, setActive] = useState(true);
    const [amount, setAmount] = useState({
        cashAmount: 0,
        installAmount: 0,
        monthlyPay: 0,
    });
    const [schedules, setSchedules] = useState({
        registerEnd: "",
        dateStart1: "",
        dateEnd1: "",
        dateStart2: "",
        dateEnd2: "",
        dateStart3: "",
        dateEnd3: "",
        websiteDate1: "",
        websiteDate2: "",
        websiteDate5: "",
        websiteDate6: "",
        websiteDate7: "",
        workshopDate1: "",
        workshopDate2: "",
        workshopDate3: "",
        workshopDate4: "",
        workshopDate5: "",
        workshopDate6: "",
    });
    const [extend, setExtend] = useState(0);
    const [mcid, setMcid] = useState(0);
    const [timer, setTimer] = useState({
        days: 0, hours: 0, minutes: 0, seconds:0
    });
    const [spotTaken, setSpotTaken] = useState(0);
    const [spotLeft, setSpotLeft] = useState(0);

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
        const refid = queryParams.get("refid");

        if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
            localStorage.setItem("refid", refid);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.title = "Online Grocery Prosperity And Abundance Program";
        setBodyStyle({ ...bodyStyle, height: document.body.scrollHeight });
        startCountdown();
        getOgpaDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const startCountdown = () => {
        let count = 90;
        var x = setInterval(function() {
            count--;
            if (count < 30) {
                setShowInitButton(true)
            }
            if (count < 0) {
                setShowButton(true);
                clearInterval(x);
            }
        }, 1000);
    }

    const getOgpaDetails = async () => {
        const ogpa = await axios.get(process.env.REACT_APP_API + "/ogpa");
        if (ogpa.data.err) {
            toast.error(ogpa.data.err);
        } else {
            setActive(ogpa.data.active);
            setAmount({
                ...amount,
                cashAmount: ogpa.data.cashAmount,
                installAmount: ogpa.data.installAmount,
                monthlyPay: ogpa.data.monthlyPay,
            });
            setExtend(ogpa.data.extend);
            setSchedules({
                ...schedules,
                registerEnd: new Date(addDaysToDate(ogpa.data.dateStart, -1)),
                dateStart1: ogpa.data.dateStart,
                dateEnd1: new Date(addDaysToDate(ogpa.data.dateStart, 12)),
                dateStart2: new Date(addDaysToDate(ogpa.data.dateStart, 14)),
                dateEnd2: new Date(addDaysToDate(ogpa.data.dateStart, 54)),
                dateStart3: new Date(addDaysToDate(ogpa.data.dateStart, 56)),
                dateEnd3: new Date(addDaysToDate(ogpa.data.dateStart, 82)),
                websiteDate1: ogpa.data.dateStart,
                websiteDate2: new Date(addDaysToDate(ogpa.data.dateStart, 1)),
                websiteDate5: new Date(addDaysToDate(ogpa.data.dateStart, 4)),
                websiteDate6: new Date(addDaysToDate(ogpa.data.dateStart, 5)),
                websiteDate7: new Date(addDaysToDate(ogpa.data.dateStart, 6)),
                workshopDate1: new Date(addDaysToDate(ogpa.data.dateStart, 7)),
                workshopDate2: new Date(addDaysToDate(ogpa.data.dateStart, 8)),
                workshopDate3: new Date(addDaysToDate(ogpa.data.dateStart, 9)),
                workshopDate4: new Date(addDaysToDate(ogpa.data.dateStart, 10)),
                workshopDate5: new Date(addDaysToDate(ogpa.data.dateStart, 11)),
                workshopDate6: new Date(addDaysToDate(ogpa.data.dateStart, 12)),
            });
        }
    }

    const handleButtonClick = async () => {
        try {
            if(mcid) {
                await axios.get(process.env.REACT_APP_API + "/manychat/" + mcid + "/content20221004105543_802719");
            }
            window.location.href = `/ogpaform${mcid ? "?mcid=" + mcid : ""}`;
        } catch (error) {
            window.location.href = `/ogpaform${mcid ? "?mcid=" + mcid : ""}`;
        }
    }

    const addDaysToDate = (dateToAdd, numDays) => {
        var date = new Date(dateToAdd);
        return date.setDate(date.getDate() + numDays);
    }

    return (
        <div style={bodyStyle}>
            {extend > 0 && active && <TimerHeader
                title="Watch the video below before this time ends..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={setSpotTaken}
                setSpotLeft={setSpotLeft}
            />}
            {extend === 0 && active && <TimerHeader
                title="Watch the video below before this time ends..."
                timer={timer}
                setTimer={setTimer}
                extend={extend}
                setSpotTaken={setSpotTaken}
                setSpotLeft={setSpotLeft}
            />}
            <div align="center" style={{padding: isMobile ? "10px" : "20px"}}>
                {active && <div style={{ backgroundColor: "#fff", width: isMobile ? "100%" : 1200, padding: isMobile ? "20px" : "40px", borderRadius: 8 }}>     
                    <h4 style={{color: "red"}}>Carefully Watch The Video First Below</h4>
                    <div align="center" style={{ padding: 20 }}>
                        <div style={{ width: isMobile ? "100%" : 860, height: isMobile ? "100%" : 485, backgroundColor: "#666" }}>
                            <iframe
                                title="Online Grocery Workshop"
                                src={`https://player.vimeo.com/video/${vimeoVideo[spotTaken]}?autoplay=1`}
                                width={isMobile ? "100%" : "860px"}
                                height={isMobile ? "100%" : "485"}
                                allow="autoplay; fullscreen; picture-in-picture"
                            />
                        </div>
                    </div>
                    {showButton && <div align="center" style={{padding: 20}}>
                        <div style={{ width: isMobile ? "100%" : 860, backgroundColor: "#fff", cursor: "pointer" }} onClick={() => handleButtonClick()}>
                            <TimerContent title="Registration will End in..." timer={timer} />
                            <img src={PaymentOpt} alt="Payment Option" /><br/><br/>
                            <div>
                                <span style={{ fontSize: 24, color: "darkgreen" }}>One Time Payment: <b>₱{amount.cashAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></span><br/>
                                <span style={{ fontSize: 24, color: "darkred" }}>
                                    3 Months Installment (@ ₱{amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}):<br />
                                    <b>₱{amount.monthlyPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>/mo For 3 Months
                                </span>
                            </div><br/>
                            <button
                                type="button"
                                className="btn-primary btn-lg"
                                style={{ fontSize: isMobile ? 20 : 30, padding: isMobile ? "15px 40px" : "15px 80px", marginBottom: 20 }}
                                onClick={() => handleButtonClick()}
                            >
                                Click Here To ENROLL <RightCircleOutlined />
                            </button>
                            <h3>{spotLeft} Spot Left!!!</h3>
                        </div>
                    </div>}
                    <div align="left">
                        <OgpaContent
                            handleButtonClick={handleButtonClick}
                            amount={amount}
                            spotTaken={spotTaken}
                            spotLeft={spotLeft}
                            showInitButton={showInitButton}
                            schedules={schedules}
                        />
                    </div>
                    {showButton && <div align="center">
                        <div style={{ width: isMobile ? "100%" : 860, backgroundColor: "#fff", cursor: "pointer" }} onClick={() => handleButtonClick()}>
                            <TimerContent title="Registration will End in..." timer={timer} />
                            <img src={PaymentOpt} alt="Payment Option" /><br/><br/>
                            <div>
                                <span style={{ fontSize: 24, color: "darkgreen" }}>One Time Payment: <b>₱{amount.cashAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></span><br/>
                                <span style={{ fontSize: 24, color: "darkred" }}>
                                    3 Months Installment (@ ₱{amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}):<br />
                                    <b>₱{amount.monthlyPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>/mo For 3 Months
                                </span>
                            </div><br/>
                            <button
                                type="button"
                                className="btn-primary btn-lg"
                                style={{ fontSize: isMobile ? 20 : 30, padding: isMobile ? "15px 40px" : "15px 80px", marginBottom: 20 }}
                                onClick={() => handleButtonClick()}
                            >
                                Click Here To ENROLL <RightCircleOutlined />
                            </button>
                            <h3>{spotLeft} Spot Left!!!</h3>
                        </div>
                        <br /><br />
                    </div>}
                </div>}
            </div>
        </div>
    );
}
 
export default Ogpa;