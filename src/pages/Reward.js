import React, {useEffect, useState} from 'react'
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const ThankYou = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const userid = queryParams.get("userid");
    const mcid = queryParams.get("mcid");
    const email = queryParams.get("email");

    const [error, setError] = useState("");

    useEffect(() => {
        if (userid && mcid) {
            checkMcid(userid, mcid);
        } else if (email) {
            checkEmail(email);
        } else {
            setError("No user account associated with this link");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkMcid = async (userid, mcid) => {
        const checkResult = await axios.put(process.env.REACT_APP_API + "/university/update-user-mcid", {
            userid,
            mcid
        });

        if (checkResult.data.err) {
            setError(checkResult.data.err);
        }
    }    

    const checkEmail = async (email) => {
        const checkResult = await axios.put(process.env.REACT_APP_API + "/university/update-user-mcid", {
            email
        });

        if (checkResult.data.err) {
            setError(checkResult.data.err);
        }
    }   

    return ( 
        <div align="center" style={{padding: 20}}>
            <div
                style={{
                    marginTop: isMobile ? "20px" : "80px",
                    color: "#009A57",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <div>
                    <img
                        src={ClavstoreUniversity}
                        alt="Clavstore University"
                        style={{
                            marginRight: 20,
                            width: 80,
                            height: 80,
                            borderRadius: 6,
                        }}
                    /> 
                </div>
                <h2 style={{fontSize: isMobile ? "24px" : "32px", paddingTop: isMobile ? 25 : 15}}>Clavstore University</h2>
            </div><br /><br />
            <h4>Congratulations on your P100 Bonus!!!</h4>
            <div align="left"
                style={{
                    maxWidth: 450,
                    marginTop: 20
                }}
            >
                {error ? <h3 style={{color: "red"}}>Error: {error}<br /><br /></h3> : <>
                    <img src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/congrats750.gif"} alt="Congrats P300 Earnings" width="100%" />
                    <br /><br />

                    By the way, we also send you the reward link to your email's inbox. Kindly check it.
                    <br /><br />
                </>}

                NEXT STEPS... Now, to earn more, you need to learn more, right? Luckily, we have a Facebook Community where you can find people that can help you grow your earnings.
                <br /><br />

                Go to our Official Facebook Group and ask to join there.
                <br /><br />

                <a
                    href="https://www.facebook.com/groups/clavstoreprogram"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/fbgroup.jpg"} alt="Clavstore University Group Page" width="100%" />
                </a>
                <br /><br />

                Also, like and follow our Official Facebook Page down below.
                <br /><br />

                <a
                    href="https://www.facebook.com/clavstoreuniversity"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/fbpage.jpg"} alt="Clavstore University FB Page" width="100%" />
                </a>
                <br /><br />

                Lastly, proceed now to your account
                <br /><br />

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", height: isMobile ? 50 : 60, fontSize: isMobile ? 16 : 24 }}
                    onClick={() => navigate("/")}
                >
                    Proceed to your Dashboard
                </Button>
                <br /><br />
                <br /><br />
            </div>
        </div>
        
     );
}
 
export default ThankYou;