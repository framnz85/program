import React from 'react';
import { isMobile } from 'react-device-detect';

const TimerContent = ({ title, timer }) => {
    const timerBody = {
        width: 80,
        backgroundColor: "#f00",
        padding: "3px 15px",
        borderRadius: 4,
        margin: "0 3px",
        color: "#fff"
    }

    const timerHead = {
        fontSize: 30
    }

    return ( 
        <div style={{padding: 10}}>
            <center>
                <span style={{
                    fontSize: isMobile ? 16 : 20,
                    color: "#333",
                    fontWeight: "bold"
                }}>
                    {title}
                </span>
                <div className="d-flex justify-content-center">
                    <div style={timerBody}>
                        <div style={timerHead}><b>{timer.days}</b></div>
                        <div>{timer.days > 1 ? "Days" : "Day"}</div>
                    </div>
                    <div style={timerBody}>
                        <div style={timerHead}><b>{timer.hours}</b></div>
                        <div>{timer.hours > 1 ? "Hours" : "Hour"}</div>
                    </div>
                    <div style={timerBody}>
                        <div style={timerHead}><b>{timer.minutes}</b></div>
                        <div>{timer.minutes > 1 ? "Minutes" : "Minute"}</div>
                    </div>
                    <div style={timerBody}>
                        <div style={timerHead}><b>{timer.seconds}</b></div>
                        <div>{timer.seconds > 1 ? "Seconds" : "Second"}</div>
                    </div>
                </div>
            </center>
        </div>
     );
}
 
export default TimerContent;