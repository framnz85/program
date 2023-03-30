import React, {useState, useEffect} from 'react'
import { Layout } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import EnrolledCard from '../components/card/EnrolledCard';
import CreatedCard from '../components/card/CreatedCard';
import CreateProgram from '../components/card/CreateProgram';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const MyProducts = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [programs, setPrograms] = useState([]);
    const [myPrograms, setMyPrograms] = useState([]);
    const [dashboard, setDashboard] = useState(initialState);

    useEffect(() => {
        setPrograms(sessionUser.programList);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchMyPrograms();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchMyPrograms = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/myprogram",
            {
                headers: {
                    authToken: token,
                },
            }
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setMyPrograms(result.data)
        }
    }

    return (
        <Layout>
            <MainHeader
                defaultKey="4"
                dashboard={dashboard}
                setDashboard={setDashboard}
            />
            <div
                align="center"
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10,
                }}
            >
                <div
                    align="left"
                    style={{
                        maxWidth: "80%",
                    }}>
                    <h4>Enrolled</h4>
                </div>
                <div
                    align="left"
                    style={{
                        display: "flex",
                        maxWidth: isMobile ? "100%" : "80%",
                        flexWrap: "wrap",
                    }}
                >
                    {programs && programs.map((prog) =>
                        prog && prog.progid ? <EnrolledCard key={prog.progid._id ? prog.progid._id : ""} prog={prog} /> : {}
                    )}
                </div>
                <div
                    align="left"
                    style={{
                        maxWidth: "80%",
                    }}>
                    <h4>Created</h4>
                </div>
                <div
                    align="left"
                    style={{
                        display: "flex",
                        maxWidth: isMobile ? "100%" : "80%",
                        flexWrap: "wrap",
                    }}
                >
                    {myPrograms && myPrograms.map((prog) => <CreatedCard key={prog._id ? prog._id : ""} prog={prog} /> )}
                    <CreateProgram />
                </div>
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default MyProducts;