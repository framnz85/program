import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Layout } from 'antd';
import slugify from 'react-slugify';
import { useNavigate  } from "react-router-dom";

import MainHeader from '../components/common/MainHeader';
import MainFooter from '../components/common/MainFooter';
import ProgDetails from '../components/myprogs/ProgDetails';
import SalesPage from '../components/myprogs/SalesPage';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const EditProgram = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [tabMenu, setTabMenu] = useState(1);
    const [program, setProgram] = useState({});
    const [dashboard, setDashboard] = useState(initialState);
    
    useEffect(() => {
        fetchProgram();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            if (sessionUser._id === result.data.owner) {
                setProgram(result.data);
            } else {
                toast.error("Sorry! You are not the owner of that program.")
                navigate("/myprograms");
            }
        }
    }

    const handleSubmit = async (updatedProg) => {
        if (sessionUser._id === updatedProg.owner) {
            const progToSubmit = { ...updatedProg, slug: slugify(updatedProg.slug), saleSlug: slugify(updatedProg.saleSlug) }
            const result = await axios.put(
                process.env.REACT_APP_API + "/university/update-program/" + progToSubmit._id,
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
        } else {
            toast.error("Sorry! You are not the owner of that program.")
            navigate("/myprograms");
        }
    }

    const tabs = {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        width: 150,
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }

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
                <div style={{borderBottom: "1px solid #aaa"}}>
                    <div style={{...tabs, backgroundColor: tabMenu === 1 ? "#fff" : "#eee"}} onClick={() => setTabMenu(1)}>Program Details</div>
                    <div style={{...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 2 ? "#fff" : "#eee"}} onClick={() => setTabMenu(2)}>Sales Page</div>
                    <div style={{clear: "both"}}></div>
                </div>

                {program._id && tabMenu === 1 && <ProgDetails
                    program={program}
                    setProgram={setProgram}
                    handleSubmit={handleSubmit}
                />}

                {program._id && tabMenu === 2 && <SalesPage
                    program={program}
                    setProgram={setProgram}
                    handleSubmit={handleSubmit}
                />}
            </div>
            <MainFooter />
        </Layout>
     );
}
 
export default EditProgram;