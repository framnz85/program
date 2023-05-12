import React, { useState, useEffect } from 'react'
import { Card, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Meta } = Card;

const CreateProgram = () => {
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [casyop, setCasyop] = useState(false);
    
    useEffect(() => {
        if (sessionUser) {
            checkCasyopEnroll(sessionUser.programList);
        } else {
            fetchUser();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkCasyopEnroll = (program) => {
        const result = program && program.filter(prog => prog.progid._id === "640c7fbc428b54c4120f1348");
        if (result[0] && result[0].status) setCasyop(true);
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
            checkCasyopEnroll(user.data.programList && user.data.programList);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/p/casyop-ai")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const createProgram = () => {
        if (casyop) navigate("/myprogram/add")
        else showModal();
    }

    return ( 
        <>
            <Card
                key="create"
                style={{
                    width: isMobile ? "100%" : "23%",
                    marginRight: isMobile ? 0 : 20,
                    marginBottom: 20,
                    cursor: "pointer",
                    backgroundColor: "#fafafa",
                    border: "1px solid #eeeeee"
                }}
                cover={
                    <img
                        alt="Create New Program"
                        src={process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/createprogram.jpg"}
                        style={{border: "1px solid #eeeeee"}}
                    />
                }
                onClick={() => createProgram()}
            >
                <Meta
                    title={<div align="center">+ Create New</div>}
                />
            </Card>
            <Modal
                title="Enroll To CASYOP-AI First"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="See Details"
            >
                <p>You need to be enrolled in CASYOP-AI first before you can create a new program</p>
                <img
                    alt="Enroll To CASYO-AI"
                    src={process.env.REACT_APP_CLAVMALL_IMG + "/program_images/640c7fbc428b54c4120f1348.jpg"}
                    style={{width: "100%"}}
                />
            </Modal>
        </>
     );
}
 
export default CreateProgram;