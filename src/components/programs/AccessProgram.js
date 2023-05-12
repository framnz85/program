import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player/vimeo';

import MainHeader from '../common/MainHeader';
import MainFooter from '../common/MainFooter';
import LessonNav from '../common/LessonNav';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const AccessProgram = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const { slug } = useParams();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    
    const [values, setValues] = useState({});
    const [user, setUser] = useState({});
    const [program, setProgram] = useState({});
    const [dashboard, setDashboard] = useState(initialState);

    useEffect(() => {
        fetchProgram();
        if (sessionUser) {
            setUser(sessionUser);
        } else {
            fetchUser();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setProgram(result.data);
            if (!queryParams.get("video")) {
                setValues({
                    title: result.data.lessons[0].videos[0].title,
                    vimeoId: result.data.lessons[0].videos[0].vimeoId
                });
            }
        }
    }

    const fetchUser = async() => {
        const user = await axios.get(
            process.env.REACT_APP_API + "/university/get-user", {
            headers: {
                authToken: token,
            },
        });
        if (user.data.err) {
            toast.error(user.data.err);
        } else {
            setUser(user.data);
        }
    }

    return ( 
        <Layout>
            <MainHeader
                defaultKey="3"
                dashboard={dashboard}
                setDashboard={setDashboard}
                pathname={"/access/" + slug}
            />
            <div
                align="center"
                style={{
                    padding: 10,
                    backgroundColor: "#ffffff",
                    margin: 10,
                }}
            >
                <h2>{program.title} - {program.subtitle}</h2>
                {user && user.programList && user.programList.some(prog => prog.progid._id === program._id && prog.status) ? <div align="left" style={{
                    display: "flex",
                    flexDirection: isMobile ? "column-reverse" : "row",
                }}>
                    <div style={{
                        borderRadius: 4,
                        width: isMobile ? "100%" : "25%",
                    }}>
                        <LessonNav program={program} setValues={setValues} />
                    </div>

                    <div style={{
                        width: isMobile ? "100%" : "75%",
                        borderRadius: 4,
                        marginLeft: isMobile ? 0 : 10,
                    }}>
                        <div align="left">
                            <div style={{
                                width: "100%",
                                backgroundColor: "#666",
                                marginBottom: 20,
                            }}>
                                {values.vimeoId && <ReactPlayer
                                    url={`https://vimeo.com/${values.vimeoId}`}
                                    width={isMobile ? "100%" : "100%"}
                                    height={isMobile ? "250px" : "650px"}
                                    controls={true}
                                />}
                            </div>
                            <h3>{values.title}</h3>
                        </div>
                    </div>
                </div> : <div
                    style={{
                        width: isMobile ? "100%" : "80%",
                        marginTop: 20,
                        color: "#FF5C5C",
                        fontSize: 28,
                        border: "1px solid #FF5C5C",
                        borderRadius: 8,
                        padding: 25
                    }}
                >
                        Sorry, you are not yet enrolled in this program
                </div>}
            </div>

            <MainFooter />
        </Layout>
     );
}
 
export default AccessProgram;