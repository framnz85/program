import React, {useState, useEffect} from 'react'
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import Navigator from '../components/common/Navigator';
import University from '../components/promote/University';
import OtherProgs from '../components/promote/OtherProgs';
import GetReward from '../components/promote/GetReward';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Promote = () => {
    const { slug } = useParams();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [dashboard, setDashboard] = useState(initialState);
    const [tabMenu, setTabMenu] = useState(slug ? 2 : 1);
    const [program, setProgram] = useState("");
    const [postReward, setPostReward] = useState(0);

    useEffect(() => {
        slug && fetchProgram();
        checkPostToday();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setProgram(result.data)
        }
    }

    const checkPostToday = async() => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/check-post-today", {
            headers: {
                authToken: token,
            },
        });

        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            if (!result.data.postToday) {
                setPostReward(1);
            }
        }
    }

    const tabData = program ? [
        {key: 1, title: "University"},
        {key: 2, title: program.title},
        {key: 3, title: "Get Reward", badge: postReward}
    ] : [
        {key: 1, title: "University"},
        {key: 3, title: "Get Reward", badge: postReward},
    ]

    return ( 
        <Layout>
            <MainHeader
                defaultKey="6"
                dashboard={dashboard}
                setDashboard={setDashboard}
                noRegBonus={false}
                pathname={"/promote"}
            />
            <div
                align="center"
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10,
                }}
            >
                <Navigator
                    tabMenu={tabMenu}
                    setTabMenu={setTabMenu}
                    tabData={tabData}
                    width={120}
                />

                {tabMenu === 1 && <University />}
                {tabMenu === 2 && program && <OtherProgs program={program} />}
                {tabMenu === 3 && <GetReward />}
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default Promote;