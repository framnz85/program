import React from 'react'
import { Layout } from 'antd';
import { Link } from "react-router-dom";

const { Footer } = Layout;

const MainFooter = () => {

    return ( 
        <>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                NOTE: You will earn P1 each person who successfully registered using your Clavstore University Affiliate Links. <Link to="/program/clavstore-affiliate-training">Go To Affiliate Links</Link>
            </Footer>
        </>
     );
}
 
export default MainFooter;