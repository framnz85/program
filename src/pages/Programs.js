import React, {useState, useEffect} from 'react'
import { Layout } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import ProgramCard from '../components/card/ProgramCard';
import CreateProgram from '../components/card/CreateProgram';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Programs = () => {
    const [programs, setPrograms] = useState([]);
    const [dashboard, setDashboard] = useState(initialState);

    useEffect(() => {
        fetchPrograms();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchPrograms = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program"
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setPrograms(result.data)
        }
    }

    return ( 
        <Layout>
            <MainHeader
                defaultKey="3"
                dashboard={dashboard}
                setDashboard={setDashboard}
                noRegBonus={false}
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
                        display: "flex",
                        maxWidth: isMobile ? "100%" : "80%",
                        flexWrap: "wrap",
                    }}
                >
                    {programs && programs.map((prog) => 
                        prog ? <ProgramCard key={prog._id ? prog._id : ""} prog={prog} /> : {}
                    )}
                    <CreateProgram />
                </div>
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default Programs;