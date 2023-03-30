import React, {useState, useEffect} from 'react'
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import University from '../components/promote/University';
import OtherProgs from '../components/promote/OtherProgs';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Promote = () => {
    const { slug } = useParams();

    const [dashboard, setDashboard] = useState(initialState);
    const [tabMenu, setTabMenu] = useState(slug ? 2 : 1);
    const [program, setProgram] = useState("");

    useEffect(() => {
        slug && fetchProgram();
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

    const tabs = {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }

    return ( 
        <Layout>
            <MainHeader
                defaultKey="6"
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
                <div style={{borderBottom: "1px solid #aaa"}}>
                    <div style={{...tabs, backgroundColor: tabMenu === 1 ? "#fff" : "#eee", borderRight: program ? "none" : "1px solid #aaa", width: isMobile ? 95 : 120,}} onClick={() => setTabMenu(1)}>University</div>
                    {program && <div style={{ ...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 2 ? "#fff" : "#eee" }} onClick={() => setTabMenu(2)}>{program.title}</div>}
                    <div style={{clear: "both"}}></div>
                </div>

                {tabMenu === 1 && <University />}
                {tabMenu === 2 && program && <OtherProgs program={program} />}
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default Promote;