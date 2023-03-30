import React, { useState } from 'react'
import { Card, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const { Meta } = Card;

const CreateProgram = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
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
                onClick={() => showModal()}
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