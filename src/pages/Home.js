import React, {useState, useEffect} from 'react'
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import Referral from '../components/Referral';
import Affiliate from '../components/Affiliate';
import Premium from "../components/Premium"

const { Header, Content, Footer } = Layout;

const Home = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const headerNav = [
        {
            key: 1,
            label: "Referral"
        },
        {
            key: 2,
            label: "Instructions"
        },
        {
            key: 4,
            label: "Premium"
        },
        {
            key: 3,
            label: "Logout",
        }
    ];

    const [tabShow, setTabShow] = useState("1");

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("programUser"));
        if (!localUser && !sessionUser) {
            navigate("/login");
        } else {
            if (localUser) {
                sessionStorage.setItem("programUser", JSON.stringify(localUser))
            }
        }
        const refid = queryParams.get("refid");

        if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
            localStorage.setItem("refid", refid);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onNavChange = (value) => {
        setTabShow(value.key);
        if (value.key === "3") {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/login")
        }
    }

    return (
        <Layout>
            <Header
                style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                }}
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={headerNav.map((head) => ({
                        key: head.key,
                        label: head.label,
                    }))}
                    onClick={value => onNavChange(value)}
                    />
                {!isMobile && <h4 style={{
                    float: "right",
                    marginTop: -50,
                    color: "#ffffff"
                }}>
                    Hi! {sessionUser && sessionUser.name}
                </h4>}
            </Header>

            <div align="center" style={{ marginTop: 10, fontSize: 14 }}>
                To learn how to use this Free Program, you need to{" "}
                <Button type="primary" size="medium" onClick={() => window.open('https://www.facebook.com/groups/clavstoreprogram', '_blank')}>
                    Join our FB Group
                </Button>
            </div>
            
            {isMobile && <div align="center">
                <h4 style={{
                    marginTop: "10px 0 0 0"
                }}>
                    Hi! {sessionUser && sessionUser.name}
                </h4>
            </div>}
                
            <Content
                className="site-layout"
                style={{
                padding: '0 0 10px 0',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        backgroundColor: "#ffffff",
                        marginTop: 10
                    }}
                >
                    {tabShow === "1" && <Referral />}
                    {tabShow === "2" && <Affiliate />}
                    {tabShow === "4" && <Premium />}
                </div>
            </Content>
            <Footer
                style={{
                textAlign: 'center',
                }}
            >
                Free Clavstore Program ©2023 Created by Clavstore & Clavmall
            </Footer>
        </Layout>
    );
}
 
export default Home;