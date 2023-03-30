import React, {useEffect, useState} from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

import NextSteps from './NextSteps';

const { Header } = Layout;

const MainHeader = ({defaultKey, dashboard, setDashboard, noRegBonus = false}) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    
    const [stepModal, showStepModal] = useState(false);
    const [sessionUser, setSessionUser] = useState({});

    useEffect(() => {
        getUserDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getUserDetails = async() => {
        if (!token) {
            navigate("/login");
        } else {
            const user = await axios.get(
                process.env.REACT_APP_API + "/university/get-user", {
                headers: {
                    authToken: token,
                },
            });
            if (user.data.register) {
                toast.error(user.data.register);
                localStorage.clear();
                sessionStorage.clear();
                navigate("/register");
            } else if (user.data.login) {
                toast.error(user.data.login);
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
            } else if (user.data.err) {
                toast.error(user.data.err);
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
            } else {                
                const playWelcome = sessionStorage.getItem("playWelcome");
                delete user.data.password;

                setSessionUser(user.data);
                sessionStorage.setItem("programUser", JSON.stringify(user.data));
                
                if (!playWelcome) {
                    checkNextStep(user.data);
                }

                const earning = await axios.get(
                    process.env.REACT_APP_API + "/university/dashboard/" + user.data._id
                );

                const totalCommission = earning.data.sumCommission[0] ? earning.data.sumCommission[0].sum : 0;
                const totalWithdrawn = earning.data.sumWithdraw[0] ? earning.data.sumWithdraw[0].sum : 0;
                const totalRemaining = totalCommission + totalWithdrawn;

                setDashboard({
                    ...dashboard,
                    userid: user.data._id,
                    totalProducts: earning.data.totalProducts,
                    totalCommission,
                    totalWithdrawn,
                    totalRemaining
                });
            }
        }
        const refid = queryParams.get("refid");

        if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
            localStorage.setItem("refid", refid);
        }
    }

    const checkNextStep = (user) => {
        if (user.programList && user.programList.length < 1) {
            showStepModal(true);
        }
    }

    const headerNav = [
        { key: 2, label: "Home", destination: "/home" },
        { key: 3, label: "Programs", destination: "/programs" },
        { key: 4, label: "My Programs", destination: "/myprograms" },
        { key: 6, label: "Promote", destination: "/promote" },
        { key: 5, label: "Premium", destination: "/premium" },
        { key: 1, label: "Account", destination: "/account" },
    ];

    const onNavChange = (value) => {
        const result = headerNav.filter(head => head.key === parseInt(value.key));
        navigate(result[0].destination);
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
                    defaultSelectedKeys={[defaultKey]}
                    items={headerNav.map((head) => ({
                        key: head.key,
                        label: head.label,
                    }))}
                    onClick={value => onNavChange(value)}
                />
                {!isMobile && <h5 style={{
                    float: "right",
                    marginTop: -45,
                    color: "#ffffff"
                }}>
                    Hi! {sessionUser && sessionUser.name}
                </h5>}
            </Header>

            {sessionUser._id && <NextSteps
                sessionUser={sessionUser}
                stepModal={stepModal}
                showStepModal={showStepModal}
                noRegBonus={noRegBonus}
            />}
        </Layout>
     );
}
 
export default MainHeader;