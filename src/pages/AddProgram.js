import React, {useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Layout } from 'antd';
import slugify from 'react-slugify';
import { useNavigate  } from "react-router-dom";

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import Navigator from '../components/common/Navigator';
import ProgDetails from '../components/myprogs/ProgDetails';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const AddProgram = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [tabMenu, setTabMenu] = useState(1);
    const [program, setProgram] = useState({});
    const [dashboard, setDashboard] = useState(initialState);

    const handleSubmit = async (updatedProg) => {
        const progToSubmit = { ...updatedProg, slug: slugify(updatedProg.slug), saleSlug: slugify(updatedProg.saleSlug) }
        const result = await axios.post(
            process.env.REACT_APP_API + "/university/create-program",
            progToSubmit,
            {
                headers: {
                    authToken: token,
                },
            }
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            toast.success("Update saved!!!");
            navigate("/myprogram/edit/" + progToSubmit.slug)
        }
    }

    const tabData = [
        {key: 1, title: "+ Add Program"}
    ]

    return (
        <Layout>
            <MainHeader
                defaultKey="4"
                dashboard={dashboard}
                setDashboard={setDashboard}
            />
            <div
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10
                }}
            >
                <Navigator
                    tabMenu={tabMenu}
                    setTabMenu={setTabMenu}
                    tabData={tabData}
                    width={150}
                />

                <ProgDetails
                    program={program}
                    setProgram={setProgram}
                    handleSubmit={handleSubmit}
                />
            </div>
            <MainFooter />
        </Layout>
     );
}
 
export default AddProgram;