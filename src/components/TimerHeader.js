import React, { useRef, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

const TimerHeader = ({ title, timer, setTimer, extend, setSpotTaken, setSpotLeft }) => {
    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / 1000 / 60 / 60 / 24);
        return {
            total, days, hours, minutes, seconds
        };
    }
  
    const startTimer = (e) => {
        let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer({days, hours, minutes, seconds})
        }
    }

    const clearTimer = (e) => {  
        setTimer({days: 0, hours: 0, minutes: 0, seconds: 0})
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    }
  
    const getDeadTime = (endDay) => {
        let deadline = new Date();
        const additionalDays = endDay === 8 ? 7 : 0;
        deadline.setDate(deadline.getDate() + (((1 + endDay - deadline.getDay()) % endDay) || endDay) + additionalDays);
        deadline = new Date(parseInt(deadline.getMonth() + 1) + "/" + deadline.getDate() + "/" + deadline.getFullYear());
        deadline.setSeconds(deadline.getSeconds());
        return deadline;
    }

    const getEndDay = () => {
        let date_1 = new Date('3/6/2023');
        let date_2 = new Date();
        let difference = (date_1.getTime() - date_2.getTime()) / (24 * 60 * 60 * 1000);

        if (extend > 0) {
            return parseInt(extend);
        } else if (difference > 0 && difference < 7) {
            return 7;
        } else if (difference > 7 && difference < 8) {
            return 8;
        } else {
            return 14;
        }
    }

    const getWeekNumber = (endDay) => {
        const currentDate = new Date();
        const adjustedDate = currentDate.getDate()+ currentDate.getDay();
        const prefixes = ['0', '1', '2', '3', '4', '5'];
        const weekNumber = parseInt(prefixes[0 | adjustedDate / 7])+1;
        const spotTaken1 = [
            [0, 0, 0, 0, 0, 0, 0],
            [9, 1, 2, 3, 4, 8, 8],
            [10, 2, 3, 4, 4, 7, 9],
            [10, 1, 2, 4, 5, 8, 9],
            [9, 1, 2, 3, 5, 7, 8],
            [10, 2, 3, 4, 4, 7, 9]
        ];
        const spotTaken2 = [
            [0, 0, 0, 0, 0, 0, 0],
            [17, 10, 11, 12, 13, 14, 15],
            [18, 11, 12, 12, 14, 15, 16],
            [18, 10, 11, 13, 14, 15, 16],
            [17, 11, 11, 13, 13, 14, 16],
            [18, 11, 12, 13, 14, 15, 15]
        ];
        // console.log(weekNumber, currentDate.getDay());
        if (endDay === 14 || endDay === 8) {
            setSpotTaken(spotTaken1[weekNumber][currentDate.getDay()]);
            setSpotLeft(20 - spotTaken1[weekNumber][currentDate.getDay()])
        } else {
            setSpotTaken(spotTaken2[weekNumber][currentDate.getDay()]);
            setSpotLeft(20 - spotTaken2[weekNumber][currentDate.getDay()])
        }
    }

    useEffect(() => {
        const endDay = getEndDay();
        clearTimer(getDeadTime(endDay));
        getWeekNumber(endDay);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div style={{backgroundColor: "#008000", padding: 10}}>
            <center>
                <span style={{
                    fontSize: isMobile ? 16 : 20,
                    color: "#fff",
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
 
export default TimerHeader;