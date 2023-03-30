import React from 'react'
import { Card, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const { Meta } = Card;

const EnrolledCard = ({prog}) => {
    const navigate = useNavigate();

    return ( 
        <Card
            style={{
                width: isMobile ? "100%" : "23%",
                marginRight: isMobile ? 0 : 20,
                marginBottom: 20,
                backgroundColor: "#fafafa"
            }}
            cover={
                <img
                    alt={prog.progid.title ? prog.progid.title : ""}
                    src={prog.progid.image1 ? process.env.REACT_APP_CLAVMALL_IMG + "/program_images/" + prog.progid.image1 : ""}
                />
            }
        >
            <Meta
                title={<div style={{ color: "darkgreen" }}>{prog.progid.title ? prog.progid.title : ""}</div>}
                description={
                    <>
                        {prog.status ? <Button
                            type="primary"
                            size="large"
                            style={{
                                width: "100%",
                                fontSize: 16,
                            }}
                            onClick={() => prog.progid.slug ? navigate("/program/" + prog.progid.slug) : ""}
                        >
                            <EyeOutlined /> Access
                        </Button> : <Button
                            type="default"
                            size="large"
                            style={{
                                width: "100%",
                                fontSize: 16,
                            }}
                            onClick={() => prog.progid.slug ? navigate("/program/" + prog.progid.slug) : ""}
                        >
                            Pending...
                        </Button>}
                    </>
                }
            />
        </Card>
     );
}
 
export default EnrolledCard;