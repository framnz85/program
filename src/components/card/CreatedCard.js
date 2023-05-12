import React from 'react'
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import { noImage } from '../common/uriImages';

const { Meta } = Card;

const CreatedCard = ({prog}) => {
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
                    alt={prog.title ? prog.title : ""}
                    src={prog.image1 ? prog.image1 : noImage}
                />
            }
        >
            <Meta
                title={<div style={{ color: "darkgreen" }}>{prog.title ? prog.title : ""}</div>}
                description={
                    <Button
                        type="default"
                        size="large"
                        style={{
                            width: "100%",
                            fontSize: 16,
                        }}
                        onClick={() => prog.slug ? navigate("/myprogram/edit/" + prog.slug) : ""}
                    >
                        <EditOutlined />Edit
                    </Button>
                }
            />
        </Card>
     );
}
 
export default CreatedCard;