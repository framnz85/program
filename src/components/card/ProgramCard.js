import React from 'react'
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import { currency } from '../common/currency';

const { Meta } = Card;

const ProgramCard = ({prog}) => {
    const navigate = useNavigate();
    const curSymbol = currency.filter(cur => cur.currency === prog.currency )

    return ( 
        <Card
            style={{
                width: isMobile ? "100%" : "23%",
                marginRight: isMobile ? 0 : 20,
                marginBottom: 20,
                cursor: "pointer",
                backgroundColor: "#fafafa"
            }}
            cover={
                <img
                    alt={prog.title ? prog.title : ""}
                    src={prog.image1 ? process.env.REACT_APP_CLAVMALL_IMG + "/program_images/" + prog.image1 : ""}
                />
            }
            onClick={() => prog.slug ? navigate("/program/" + prog.slug) : ""}
        >
            <Meta
                title={<div style={{ color: "darkgreen" }}>{prog.title ? prog.title : ""}</div>}
                description={
                    <div style={{display: "flex"}}>
                        <div>
                            <b>Price:</b> {prog.discountPrice === "Free" ? prog.discountPrice : <>{curSymbol[0] && curSymbol[0].symbol}{prog.price && prog.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>}
                        </div>
                        <div style={{marginLeft: 10}}>
                            <b>Level 1 Commission:</b> {curSymbol[0] && curSymbol[0].symbol}{prog.commission1 && prog.commission1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                    </div>
                }
            />
        </Card>
     );
}
 
export default ProgramCard;