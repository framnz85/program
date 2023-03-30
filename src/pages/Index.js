import React from 'react'
import { Button } from 'antd'
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const Index = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    
    const refid = queryParams.get("refid");

    if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
        localStorage.setItem("refid", refid);
    }
    
    return ( 
        <div align="center" style={{padding: 20}}>
            <div
                style={{
                    marginTop: isMobile ? "10px" : "20px",
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
                            marginRight: 15,
                            width: isMobile ? 50 : 60,
                            height: isMobile ? 50 : 60,
                            borderRadius: 6,
                        }}
                    /> 
                </div>
                <h2 style={{fontSize: isMobile ? "24px" : "32px", paddingTop: isMobile ? 15 : 10}}>Clavstore University</h2>
            </div>
            <div align="center"
                style={{
                    maxWidth: 850,
                    marginTop: 20
                }}
            >
                <p>
                    <iframe
                        title="Welcome To Clavstore University"
                        src={`https://player.vimeo.com/video/809300939?autoplay=1`}
                        width= {isMobile ? "100%" : "850"}
                        height={isMobile ? "200px" : "478"}
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{
                            border: "none",
                        }}
                    />
                </p>
                {token && <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/home")}
                    style={{ width: isMobile ? 200 : 250, height: isMobile ? 40 : 60, fontSize: isMobile ? 18 : 24 }}
                >
                    Go To Dashboard
                </Button>}
                {!token && <>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate("/login")}
                        style={{ width: 150, height: isMobile ? 40 : 60, fontSize: isMobile ? 18 : 24 }}
                    >
                        Login
                    </Button>
                    <Button
                        type="default"
                        size="large"
                        onClick={() => navigate("/register")}
                        style={{ marginLeft: 10, width: 150, height: isMobile ? 40 : 60, fontSize: isMobile ? 18 : 24 }}
                    >
                        Register
                    </Button>
                </>
                }
            </div>
        </div>
     );
}
 
export default Index;